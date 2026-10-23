"""追加候補の語と、すでにある語の意味の重なりを機械的に探す（助言だけ。docs/WORKFLOW.md §2 の手順1の補助）。

`coin_words.py` が止めるのは、日本語の意味の文字列が「完全に同じ」ときだけです。
このツールは、次の2つを表にします。変更や削除はしません。

  1. 日本語の意味の重なり: 候補の日本語の2文字の連なり（漢字かカタカナを含むもの）が、同じ品詞の既存語の意味に含まれる語
  2. 漢字が1字共通する語: 同じ品詞で、候補と漢字が1字共通する既存語（例: 調整する と 調節する、飲料 と 飲み物、風景 と 景色 は、
     2文字の連なりは違うが、漢字が共通するので出る。眠る と 寝る のように漢字も違う近い語は出ないので、英語の類義語を手で調べる）
  3. 英語の見出し語・別名の重なり: 候補の英語（見出し語と別名）を、すでに使っている語（品詞が違う語も表に出す）
  4. 英語の類義語（WordNet。入っているときだけ）: 見出し語が違っても、WordNet で同じ意味のまとまり（形容詞は似た意味のまとまりも）に
     入る既存語。stout と sturdy、amicable と friendly、beverage と drink のような近い語が出る。
     使うには `pip install wn==0.0.23`（辞書のデータが入っている版。リポジトリには入れず、入っていなければこの項目だけ出ない）
  5. 同じバッチの中の重なり: 候補どうしで、同じ品詞で日本語・漢字・英語の類義語が近い組（citadel と fortress のような組）

  python tools/overlap_check.py                        # dictionary/anti_additions.csv の、まだ辞書にない行
  python tools/overlap_check.py candidates.csv         # 列: english,pos,meaning_ja,aliases,source の CSV
  python tools/overlap_check.py --all-new 100          # 辞書の末尾 N 語（追加直後の見直し用）
  python tools/overlap_check.py --table                # PR 本文の確認表（ツールの結果を先に埋め、「判断」の列を人が書く）

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


_WN_POS = {"noun": "n", "verb": "v", "adj": "a", "adv": "r"}


def load_synsets():
    """WordNet が使えるとき、(英語, 品詞) → 意味のまとまりの名前の集合 を返す関数を作る。使えないときは None。"""
    try:
        from wn import WordNet
        wordnet = WordNet()
        wordnet.synsets("test")
    except Exception:   # 入っていない・版が違う
        return None
    cache = {}

    def synsets(word, pos, expand=False):
        """expand=True のとき、形容詞は「似た意味」でつながる1つ隣のまとまり（頭の語と衛星の語）も含める。
        片方だけ広げて比べるので、同じ頭の語につながるだけの遠い語（generous と big など）は出ない。"""
        key = (word.lower(), pos, expand)
        if pos not in _WN_POS:   # 代名詞・前置詞などは WordNet にない
            return set()
        if key not in cache:
            names = set()
            for s in wordnet.synsets(word.lower()):
                kind = s.pos()
                if kind == _WN_POS[pos] or (pos == "adj" and kind == "s"):
                    names.add(s.name())
                    if expand and pos == "adj":
                        names.update(t.name() for t in s.similar_tos())
            cache[key] = names
        return cache[key]

    return synsets


def _synonym_index(rows, english, synsets):
    """意味のまとまりの名前 → [(既存の語, 英語)]"""
    by_word = {r["regenerated"]: r for r in rows}
    index = {}
    for token, words in english.items():
        for word in words:
            if word not in by_word:
                continue
            for name in synsets(token, by_word[word]["pos"], True):
                index.setdefault(name, []).append((word, token))
    return index


def _tokens(c):
    return [c["english"]] + [a for a in c.get("aliases", "").split("|") if a]


def batch_overlaps(candidates, synsets=None):
    """同じバッチの候補どうしで近い組: [(i, j, 理由)]（同じ品詞だけ）。"""
    pairs = []
    for i, a in enumerate(candidates):
        for j in range(i + 1, len(candidates)):
            b = candidates[j]
            if a["pos"] != b["pos"]:
                continue
            reasons = []
            if japanese_stems(a["meaning_ja"]) & japanese_stems(b["meaning_ja"]):
                reasons.append("日本語が近い")
            elif kanji_of(a["meaning_ja"]) & kanji_of(b["meaning_ja"]):
                reasons.append("漢字が共通")
            if synsets and any(synsets(x, a["pos"]) & synsets(y, b["pos"], True) or synsets(x, a["pos"], True) & synsets(y, b["pos"])
                               for x in _tokens(a) for y in _tokens(b)):
                reasons.append("英語が類義語")
            if reasons:
                pairs.append((i, j, "・".join(reasons)))
    return pairs


def check(candidates, rows, by_word, english, synsets=None):
    """candidates: {english, pos, meaning_ja, aliases} の一覧。返り値: 候補ごとの
    (候補, 日本語の重なり, 漢字の共通, 英語の重なり, 英語の類義語, 同じバッチの近い語)。synsets は load_synsets() の関数（なければ類義語は調べない）。"""
    report = []
    index = _synonym_index(rows, english, synsets) if synsets else {}
    near = {i: [] for i in range(len(candidates))}
    for i, j, why in batch_overlaps(candidates, synsets):
        near[i].append((candidates[j]["english"], candidates[j]["meaning_ja"], why))
        near[j].append((candidates[i]["english"], candidates[i]["meaning_ja"], why))
    for n, c in enumerate(candidates):
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
        syn_hits = []
        if synsets:
            seen = set()
            for token in tokens:
                for name in synsets(token, c["pos"]):
                    for word, tok in index.get(name, []):
                        if (token, word) not in seen and by_word[word]["pos"] == c["pos"] and tok.lower() != token.lower():
                            seen.add((token, word))
                            syn_hits.append((token, word, tok, by_word[word]["meaning_ja"]))
        report.append((c, ja_hits, shared, en_hits, syn_hits, near[n]))
    return report


def new_candidates(additions=ADDITIONS, rows=()):
    """追加リストのうち、まだ辞書に入っていない行（英語 + 品詞 + 日本語の意味が辞書の見出しにない）。"""
    taken = {(r["original"].lower(), r["pos"], r["meaning_ja"]) for r in rows}
    with Path(additions).open(newline="", encoding="utf-8") as f:
        return [r for r in csv.DictReader(f) if (r["english"].lower(), r["pos"], r["meaning_ja"]) not in taken]


def render(report):
    lines = []
    for c, ja_hits, shared, en_hits, syn_hits, near in report:
        if not ja_hits and not shared and not en_hits and not syn_hits and not near:
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
        if syn_hits:
            shown = "、".join(f"{w}={m} ({tok})" for _, w, tok, m in syn_hits[:MAX_HITS])
            more = f" ほか{len(syn_hits) - MAX_HITS}語" if len(syn_hits) > MAX_HITS else ""
            lines.append(f"  英語の類義語（WordNet）の既存語: {shown}{more}")
        if near:
            shown = "、".join(f"{en}={m}（{why}）" for en, m, why in near[:MAX_HITS])
            lines.append(f"  同じバッチの中の近い語: {shown}")
    return "\n".join(lines)


def is_strong(entry):
    """強い重なり: 日本語の2文字の連なりが同じ、英語の見出し語が同じ、英語の類義語、同じバッチの類義語。
    漢字が1字共通するだけ（弱い重なり）は含めない。強い重なりのある語は、必ず1語ずつ「同じ意味か」を書く。"""
    c, ja_hits, shared, en_hits, syn_hits, near = entry
    return bool(ja_hits or en_hits or syn_hits or any("類義語" in why or "日本語が近い" in why for _, _, why in near))


def render_table(report):
    """PR 本文の確認表。ツールの結果を先に埋め、「判断」の列は人が書く（空のままにしない）。
    強い重なりのある語を先に並べ、漢字が共通するだけの語は、あとにまとめる。"""
    strong = sum(1 for e in report if is_strong(e))
    lines = [f"強い重なりのある語: {strong} / {len(report)} 語（先に並べた。1語ずつ、同じ意味か別の意味かを書く）", "",
             "| 日本語 | 英語 | 近い既存語（日本語・漢字）| 英語の類義語の既存語 | 同じバッチの近い語 | 判断（同じ意味か、別の意味か。理由を1行）|",
             "|---|---|---|---|---|---|"]
    for entry in sorted(report, key=lambda e: not is_strong(e)):
        c, ja_hits, shared, en_hits, syn_hits, near = entry
        near_ja = "、".join(f"{w}={m}" for w, m in (ja_hits + shared)[:MAX_HITS]) or "なし"
        near_en = "、".join(f"{w}={m} ({tok})" for _, w, tok, m in syn_hits[:MAX_HITS])
        near_en += "、".join(f"{w}={m} ({t})" for t, w, _, m in en_hits[:MAX_HITS])
        near_batch = "、".join(f"{en}={m}" for en, m, _ in near[:MAX_HITS]) or "なし"
        judge = "（要記入）" if is_strong(entry) else ("漢字が共通するだけ" if (shared or near) else "重なりなし")
        lines.append(f"| {c['meaning_ja']} | {c['english']} ({c['pos']}) | {near_ja} | {near_en or 'なし'} | {near_batch} | {judge} |")
    return "\n".join(lines)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("csv", nargs="?", help="候補の CSV（省略すると dictionary/anti_additions.csv の未追加の行）")
    parser.add_argument("--all-new", type=int, metavar="N", help="辞書の末尾 N 語を候補として、それより前の語と比べる")
    parser.add_argument("--table", action="store_true", help="PR 本文に貼る確認表（Markdown）を出す")
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
    synsets = load_synsets()
    if synsets is None:
        print("注意: WordNet が入っていないので、英語の類義語は調べていません（pip install wn==0.0.23）。手で glossary_en.csv を調べてください。", file=sys.stderr)
    report = check(candidates, rows, by_word, english, synsets)
    if args.table:
        print(render_table(report))
        return 0
    text = render(report)
    print(text if text else "重なりのある語は見つかりませんでした。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
