"""文の一覧を翻訳機にかけて、訳せなかった語（未登録語）と、訳の一覧を出す（助言だけ）。

語を足す前に「どの語が足りないか」を、実際の文から調べるために使う。日本語・英語の文を、1行に1文で書いた
テキストファイルを渡す（文は自分で書く。他の文章を写さない）。空行と # で始まる行は無視する。

  python tools/coverage_check.py sentences.txt            # 訳の一覧 + 未登録語の数え上げ（Markdown）
  python tools/coverage_check.py sentences.txt --unknown  # 未登録語の数え上げだけ
  python tools/coverage_check.py sentences.txt --lang ja  # 言語を決める（既定は自動判定）

出力の使い方:
  - 未登録語の多い順が、足す語の優先順（よく使う語から足せる）。
  - 訳が明らかにおかしい文（語順、助詞の取りこぼし）は、`docs/STATUS.md` の「文法への依頼」に、入力文と出力を書く（Claude が直す）。
"""

import argparse
import collections
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def run(path, lang="auto"):
    result = subprocess.run(["node", str(ROOT / "tools" / "translate_batch.js"), str(path), lang],
                            capture_output=True, text=True, check=True)
    return json.loads(result.stdout)


def unknown_counts(rows):
    counts = collections.Counter()
    examples = {}
    for r in rows:
        for u in r["unknown"]:
            counts[u] += 1
            examples.setdefault(u, r["text"])
    return counts, examples


def render(rows, unknown_only=False):
    counts, examples = unknown_counts(rows)
    total = len(rows)
    ok = sum(1 for r in rows if not r["unknown"])
    lines = [f"文 {total} 件のうち、未登録語なしで訳せた文: {ok} 件（{ok * 100 // max(total, 1)}%）", ""]
    lines += ["## 未登録語（多い順）", "", "| 語 | 回数 | 例文 |", "|---|---|---|"]
    for word, n in counts.most_common():
        lines.append(f"| {word} | {n} | {examples[word]} |")
    if not unknown_only:
        lines += ["", "## 訳の一覧", "", "| 入力 | 言語 | 出力 | 未登録語 |", "|---|---|---|---|"]
        for r in rows:
            lines.append(f"| {r['text']} | {r['lang']} | {r['logi']} | {'、'.join(r['unknown']) or '-'} |")
    return "\n".join(lines)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("sentences", help="1行に1文のテキストファイル")
    parser.add_argument("--lang", choices=["ja", "en", "auto"], default="auto")
    parser.add_argument("--unknown", action="store_true", help="未登録語の数え上げだけを出す")
    args = parser.parse_args(argv)
    rows = run(args.sentences, args.lang)
    if not rows:
        print("文がありません。", file=sys.stderr)
        return 1
    print(render(rows, args.unknown))
    return 0


if __name__ == "__main__":
    sys.exit(main())
