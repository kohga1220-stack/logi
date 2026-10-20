"""追加候補の語と、すでにある語の意味の重なりを機械的に探す（助言だけ。docs/WORKFLOW.md §2 の手順1の補助）。

`coin_words.py` が止めるのは、日本語の意味の文字列が「完全に同じ」ときだけです。
このツールは、次の2つを表にします。変更や削除はしません。

  1. 日本語の意味の重なり: 候補の日本語の2文字の連なり（漢字かカタカナを含むもの）が、同じ品詞の既存語の意味に含まれる語
  2. 漢字が1字共通する語: 同じ品詞で、候補と漢字が1字共通する既存語（例: 調整する と 調節する、飲料 と 飲み物、風景 と 景色 は、
     2文字の連なりは違うが、漢字が共通するので出る。眠る と 寝る のように漢字も違う近い語は出ないので、英語の類義語を手で調べる）
  3. 英語の見出し語・別名の重なり: 候補の英語（見出し語と別名）を、すでに使っている語（品詞が違う語も表に出す）

  python tools/overlap_check.py                        # dictionary/anti_additions.csv の、まだ辞書にない行
  python tools/overlap_check.py candidates.csv         # 列: english,pos,meaning_ja,aliases,source の CSV
  python tools/overlap_check.py --all-new 100          # 辞書の末尾 N 語（追加直後の見直し用）

出た表は、人が読んで判断します（近い語がすべて同じ意味とは限りません）。
"""

import argparse
import csv
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FINAL = ROOT / "dictionary" / "final.csv"
GLOSSARY = ROOT / "dictionary" / "glossary_en.csv"
ADDITIONS = ROOT / "dictionary" / "anti_additions.csv"

MAX_HITS = 4
MAX_SHARED = 8
SUFFIX = re.compile(r"(する|な|の|い|く)$")
HIRAGANA = re.compile(r"^[ぁ-ん]+$")
KANJI = re.compile(r"[一-鿿々]")
COMMON_KANJI = set("不無的性化者人物大小新古前後中上下内外同")   # どの語にも付く字は、漢字の共通として数えない


def japanese_stems(meaning_ja):
    """候補の日本語から、重なりを探す2文字の連なり（漢字かカタカナを含むもの）を作る。"""
    stem = SUFFIX.sub("", meaning_ja) if len(meaning_ja) > 2 else meaning_ja
    windows = {stem[i:i + 2] for i in range(len(stem) - 1)}
    return {w for w in windows if not HIRAGANA.match(w)}


def kanji_of(meaning_ja):
    return {k for k in KANJI.findall(meaning_ja) if k not in COMMON_KANJI}


def surfaces(meaning_ja):
    return [m.strip() for m in meaning_ja.split("/") if m.strip()]


def load_existing(path=FINAL, glossary=GLOSSARY):
    """有効な語の一覧と、英語（見出し語・別名）→ 語 の対応を読む。"""
    with Path(path).open(newline="", encoding="utf-8") as f:
        rows = [r for r in csv.DictReader(f) if r.get("status", "active") == "active"]
    by_word = {r["regenerated"]: r for r in rows}
    english = {}
    if Path(glossary).exists():
        with Path(glossary).open(newline="", encoding="utf-8") as f:
            for line in f:
                word, _, en = line.strip().partition(",")
                if word in by_word:
                    for token in en.split("|"):
                        if token:
                            english.setdefault(token.lower(), []).append(word)
    return rows, by_word, english


def check(candidates, rows, by_word, english):
    """candidates: {english, pos, meaning_ja, aliases} の一覧。返り値: 候補ごとの (日本語の重なり, 英語の重なり)。"""
    report = []
    for c in candidates:
        windows = japanese_stems(c["meaning_ja"])
        ja_hits = []
        for r in rows:
            if r["pos"] != c["pos"]:
                continue
            if any(w in m for m in surfaces(r["meaning_ja"]) for w in windows):
                ja_hits.append((r["regenerated"], r["meaning_ja"]))
        kanji = kanji_of(c["meaning_ja"])
        shared = [(r["regenerated"], r["meaning_ja"]) for r in rows
                  if r["pos"] == c["pos"] and (r["regenerated"], r["meaning_ja"]) not in ja_hits and kanji & kanji_of(r["meaning_ja"])]
        # 共通する字が多く、日本語の長さが近い語を先に出す
        shared.sort(key=lambda h: (-len(kanji & kanji_of(h[1])), abs(len(h[1]) - len(c["meaning_ja"]))))
        en_hits = []
        tokens = [c["english"]] + [a for a in c.get("aliases", "").split("|") if a]
        for token in tokens:
            for word in english.get(token.lower(), []):
                en_hits.append((token, word, by_word[word]["pos"], by_word[word]["meaning_ja"]))
        report.append((c, ja_hits, shared, en_hits))
    return report


def new_candidates(additions=ADDITIONS, rows=()):
    """追加リストのうち、まだ辞書に入っていない行（英語 + 品詞 + 日本語の意味が辞書の見出しにない）。"""
    taken = {(r["original"].lower(), r["pos"], r["meaning_ja"]) for r in rows}
    with Path(additions).open(newline="", encoding="utf-8") as f:
        return [r for r in csv.DictReader(f) if (r["english"].lower(), r["pos"], r["meaning_ja"]) not in taken]


def render(report):
    lines = []
    for c, ja_hits, shared, en_hits in report:
        if not ja_hits and not shared and not en_hits:
            continue
        lines.append(f"{c['english']} ({c['pos']}) {c['meaning_ja']}")
        if ja_hits:
            shown = "、".join(f"{w}={m}" for w, m in ja_hits[:MAX_HITS])
            more = f" ほか{len(ja_hits) - MAX_HITS}語" if len(ja_hits) > MAX_HITS else ""
            lines.append(f"  日本語が近い既存語: {shown}{more}")
        if shared:
            shown = "、".join(f"{w}={m}" for w, m in shared[:MAX_SHARED])
            more = f" ほか{len(shared) - MAX_SHARED}語" if len(shared) > MAX_SHARED else ""
            lines.append(f"  漢字が1字共通する既存語: {shown}{more}")
        for token, word, pos, meaning in en_hits:
            lines.append(f"  英語 {token} を使っている語: {word} ({pos}) {meaning}")
    return "\n".join(lines)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("csv", nargs="?", help="候補の CSV（省略すると dictionary/anti_additions.csv の未追加の行）")
    parser.add_argument("--all-new", type=int, metavar="N", help="辞書の末尾 N 語を候補として、それより前の語と比べる")
    args = parser.parse_args(argv)

    rows, by_word, english = load_existing()
    if args.all_new:
        tail = rows[-args.all_new:]
        older = rows[:-args.all_new]
        older_words = {r["regenerated"] for r in older}
        english = {k: [w for w in v if w in older_words] for k, v in english.items()}
        candidates = [{"english": r["original"], "pos": r["pos"], "meaning_ja": r["meaning_ja"], "aliases": ""} for r in tail]
        rows = older
    elif args.csv:
        with open(args.csv, newline="", encoding="utf-8") as f:
            candidates = list(csv.DictReader(f))
    else:
        candidates = new_candidates(ADDITIONS, rows)
    if not candidates:
        print("候補がありません。", file=sys.stderr)
        return 1
    text = render(check(candidates, rows, by_word, english))
    print(text if text else "重なりのある語は見つかりませんでした。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
