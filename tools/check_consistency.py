"""文書・ツールが辞書の実態と食い違っていないかを確かめる（誰が辞書を変えても、ずれに気づける）。

確かめること:
  1. 語数の表記: README.md・web/README.md・web/index.html の「現在の語数」が final.csv と一致する
  2. バージョン: docs/STATUS.md の「現在のバージョン」が、README.md の変更履歴の最新と一致する
  3. 追加リスト: dictionary/*_additions.csv がすべて tools/coin_words.py の SOURCES に登録されている

使い方:
  python tools/check_consistency.py          # 食い違いを表示（あれば終了コード1）
  python tools/check_consistency.py --fix    # 語数の表記を実際の数に書き直す
"""

import csv
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))
import coin_words  # noqa: E402

STATUS = ROOT / "docs" / "STATUS.md"
README = ROOT / "README.md"

# (ファイル, 正規表現, 数の種類)。正規表現の数の部分は括弧で囲む。total=全行、active=active の語、tens=active を10の位に丸めた数
COUNT_SPOTS = [
    ("README.md", r"\*\*([\d,]+)-word core dictionary\*\*", "total"),
    ("README.md", r"([\d,]+)-word validated dictionary / 検証済み辞書[\d,]+語", "total"),
    ("README.md", r"[\d,]+-word validated dictionary / 検証済み辞書([\d,]+)語", "total"),
    ("web/README.md", r"active のみ、([\d,]+)語", "active"),
    ("web/index.html", r"辞書（約([\d,]+)語）", "tens"),
]


def counts():
    with (ROOT / "dictionary" / "final.csv").open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    total = len(rows)
    active = sum(1 for r in rows if r["status"] == "active")
    return {"total": total, "active": active, "tens": round(active / 10) * 10}


def fmt(n):
    return f"{n:,}"


def count_problems(fix=False):
    problems = []
    actual = counts()
    for rel, pattern, kind in COUNT_SPOTS:
        path = ROOT / rel
        text = path.read_text(encoding="utf-8")
        match = re.search(pattern, text)
        if not match:
            problems.append(f"{rel}: 語数の表記が見つかりません（パターン {pattern}）")
            continue
        want = fmt(actual[kind])
        if match.group(1) != want:
            problems.append(f"{rel}: 語数の表記が {match.group(1)} ですが、実際は {want}（{kind}）です")
            if fix:
                text = text[:match.start(1)] + want + text[match.end(1):]
                path.write_text(text, encoding="utf-8")
    return problems


def version_key(v):
    return tuple(int(x) for x in v.lstrip("v").split("."))


def latest_readme_version():
    versions = re.findall(r"^\| (v\d+\.\d+(?:\.\d+)?) \|", README.read_text(encoding="utf-8"), flags=re.M)
    return max(versions, key=version_key) if versions else None


def version_problems():
    latest = latest_readme_version()
    text = STATUS.read_text(encoding="utf-8") if STATUS.exists() else ""
    match = re.search(r"現在のバージョン:\s*(v\d+\.\d+(?:\.\d+)?)", text)
    if not match:
        return ["docs/STATUS.md: 「現在のバージョン: vX.Y」の行が見つかりません"]
    if match.group(1) != latest:
        return [f"docs/STATUS.md: 現在のバージョンが {match.group(1)} ですが、README.md の変更履歴の最新は {latest} です"]
    return []


def source_problems():
    registered = {Path(p).resolve() for p, _ in coin_words.SOURCES}
    problems = []
    for path in sorted((ROOT / "dictionary").glob("*_additions.csv")):
        if path.resolve() not in registered:
            problems.append(f"{path.relative_to(ROOT)}: tools/coin_words.py の SOURCES に登録されていません")
    return problems


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    fix = "--fix" in argv
    problems = count_problems(fix=fix)
    if fix and problems:
        print("語数の表記を書き直しました:")
        for p in problems:
            print("  " + p)
        problems = count_problems()
    problems += version_problems() + source_problems()
    if problems:
        print("食い違いがあります:")
        for p in problems:
            print("  - " + p)
        return 1
    print("文書と辞書は食い違っていません")
    return 0


if __name__ == "__main__":
    sys.exit(main())
