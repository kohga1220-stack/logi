"""Antigravity のブランチ（anti/*）が、担当範囲の外を変更していないかを確かめる。

担当範囲は docs/WORKFLOW.md の §2 を参照。anti/* 以外のブランチは、このツールでは制限しない。

使い方:
  python tools/check_scope.py <基準のブランチ> <作業ブランチ名>
  例: python tools/check_scope.py origin/main anti/add-food-words
"""

import fnmatch
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# anti/* が丸ごと変更してよいパス
ANTI_ALLOWED = [
    "dictionary/*_additions.csv",
    "dictionary/final.csv",
    "dictionary/glossary_en.csv",
    "dictionary/word_review.csv",
    "dictionary/sources/*",
    "web/lexicon.js",
    "docs/review/*",
    "docs/STATUS.md",
    "README.md",
]
# 語数の数字だけ変えてよいファイル（check_consistency.py --fix が書き換える）
ANTI_COUNT_ONLY = ["web/README.md", "web/index.html"]
NUMBER = re.compile(r"\d[\d,]*")


def normalize(text):
    return NUMBER.sub("N", text)


def git(*args):
    return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True, check=True).stdout


def violations(branch, changed, read_base, read_head):
    """違反のメッセージの一覧を返す。changed は変更されたパス、read_base / read_head はパスから内容を返す関数。"""
    if not branch.startswith("anti/"):
        return []
    out = []
    for path in changed:
        if any(fnmatch.fnmatch(path, pattern) for pattern in ANTI_ALLOWED):
            continue
        if path in ANTI_COUNT_ONLY:
            base, head = read_base(path), read_head(path)
            if base is not None and head is not None and normalize(base) == normalize(head):
                continue
            out.append(f"{path}: 語数の数字以外も変わっています（文法・翻訳機は Claude の担当です）")
            continue
        out.append(f"{path}: anti/* ブランチでは変更できないパスです（docs/WORKFLOW.md §2）")
    return out


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    if len(argv) != 2:
        print(__doc__)
        return 2
    base, branch = argv
    changed = [p for p in git("diff", "--name-only", f"{base}...HEAD").splitlines() if p]

    def read_base(path):
        try:
            return git("show", f"{base}:{path}")
        except subprocess.CalledProcessError:
            return None

    def read_head(path):
        file = ROOT / path
        return file.read_text(encoding="utf-8") if file.exists() else None

    problems = violations(branch, changed, read_base, read_head)
    if problems:
        print(f"ブランチ {branch} が担当範囲の外を変更しています:")
        for p in problems:
            print("  - " + p)
        print("文法・翻訳機・ツール・テストを変えたいときは、docs/STATUS.md の「文法への依頼」に書いて、Claude に任せてください。")
        return 1
    print(f"ブランチ {branch}: 担当範囲の中です（変更 {len(changed)} ファイル）")
    return 0


if __name__ == "__main__":
    sys.exit(main())
