"""日本語の基本語彙リストのうち、辞書にまだ無い語の候補を出す。

入力: dictionary/sources/rokusyutaisyo.csv（日本語教育基本語彙データベース、CP932）
      dictionary/final.csv
基準: 6つのリスト（国語研・初級500語・七種対照・工藤・木幡・玉村）のうち5つ以上に採用され、
      国語研教育基本語彙で◎（基本）の語。接尾辞・接頭辞・感動詞・助詞は除く。
並び: 採用数が多い順 → 語彙配当 → 見出し。

使い方:
  python tools/core_candidates.py          # 候補を「番号<TAB>見出し<TAB>表記<TAB>品詞<TAB>採用数」で出力
  python tools/core_candidates.py --count  # 件数だけ出力

候補の語に英語・品詞・日本語の意味を付けたものが dictionary/core_additions.csv で、
そこから tools/coin_words.py が Logi の語を作る。
出典: 国立国語研究所『教育基本語彙の基本的研究―増補改訂版―（国立国語研究所報告127）』付属CD-ROM
      「日本語教育基本語彙データベース」（CC BY 4.0）
"""

import csv
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "dictionary" / "sources" / "rokusyutaisyo.csv"
DICTIONARY = ROOT / "dictionary" / "final.csv"
MARKS = ["国語研", "初級500語", "七種対照", "工藤", "木幡", "玉村"]
SKIP_POS = ("接尾", "接頭", "感", "連語", "格助", "終助", "間助", "助動", "副助", "接続助", "並助", "係助")


def load_source():
    with SOURCE.open(newline="", encoding="cp932") as f:
        rows = list(csv.reader(f))
    header = rows[0]
    return [dict(zip(header, r + [""] * (len(header) - len(r)))) for r in rows[1:]]


def marks(row):
    return sum(1 for m in MARKS if row[m].strip())


def spellings(row):
    out = []
    for s in (row["表記"] or "").split("・"):
        s = re.sub(r"[△×〈〉《》]", "", s).strip()
        if s:
            out.append(s)
    out.append(row["見出し"])
    return out


def dictionary_surfaces():
    surf = set()
    with DICTIONARY.open(newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            if r["status"] != "active":
                continue
            for s in r["meaning_ja"].split("/"):
                s = re.sub(r"（.*?）", "", s).strip()
                if not s:
                    continue
                surf.add(s)
                if s.endswith("する"):
                    surf.add(s[:-2])
                if s[-1] in "なの":
                    surf.add(s[:-1])
                if s.startswith("の"):
                    surf.add(s[1:])
    return surf


def candidates():
    surf = dictionary_surfaces()
    sel = [
        r for r in load_source()
        if marks(r) >= 5 and r["国語研"] == "◎"
        and not any(spellings_ in surf for spellings_ in spellings(r))
        and not any(t in r["品詞"] for t in SKIP_POS)
    ]
    sel.sort(key=lambda r: (-marks(r), r["語彙配当"] or "9", r["見出し"]))
    return sel


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    sel = candidates()
    if "--count" in argv:
        print(len(sel))
        return 0
    for i, r in enumerate(sel, 1):
        first = re.sub(r"[△×〈〉《》]", "", r["表記"].split("・")[0]) if r["表記"] else ""
        print(f"{i}\t{r['見出し']}\t{first}\t{r['品詞']}\t{marks(r)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
