"""追加語の `source` 列が、日本語の見出し語そのものの出典になっているかを確かめる（助言だけ。docs/WORKFLOW.md §2 の手順7の補助）。

`dictionary/anti_additions.csv` の `source`（例: 国語研教育基本語彙: 庭）について、次の二つを調べる。
  1. 出典に書いた語が、`dictionary/sources/kyoikukihongoi_2009A.csv` のどこかに文字列として載っているか。
  2. 出典に書いた語が、日本語の見出し語そのもの（末尾の する・な・い・の・に を除いた形）か。近い基本語（庭 → 中庭 など）を書いていないか。

使い方:
  python tools/check_sources.py            # anti_additions.csv の全行
  python tools/check_sources.py --last 100 # 末尾の 100 行だけ
"""

import csv
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ADDITIONS = ROOT / "dictionary" / "anti_additions.csv"
SOURCE = ROOT / "dictionary" / "sources" / "kyoikukihongoi_2009A.csv"
PREFIX = "国語研教育基本語彙:"
TAIL = re.compile(r"(する|な|い|の|に|った|いた)$")


def stem(ja):
    """見出し語の語幹（活用語尾・助詞を除く）。複数の意味は / で分ける"""
    return {TAIL.sub("", part.strip()) or part.strip() for part in ja.split("/")}


def cited_word(source):
    if not source.startswith(PREFIX):
        return None
    return source[len(PREFIX):].strip()


def problems(rows, source_text):
    out = []
    for r in rows:
        cite = cited_word(r.get("source", ""))
        if cite is None:
            continue
        ja = r["meaning_ja"]
        if cite not in source_text:
            out.append((r["english"], ja, cite, "出典に書いた語が、出典のファイルに載っていない"))
        elif cite not in stem(ja) and cite != ja:
            out.append((r["english"], ja, cite, "出典に書いた語が、見出し語そのものではない（近い基本語）"))
    return out


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    with ADDITIONS.open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    if "--last" in argv:
        rows = rows[-int(argv[argv.index("--last") + 1]):]
    source_text = SOURCE.read_text(encoding="utf-8-sig")
    found = problems(rows, source_text)
    for english, ja, cite, why in found:
        print(f"{english}（{ja}）: source = {cite} … {why}")
    print(f"\n{len(rows)} 行のうち {len(found)} 行に注意")
    return 1 if found else 0


if __name__ == "__main__":
    sys.exit(main())
