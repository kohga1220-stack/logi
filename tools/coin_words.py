"""英検3級レベルの語彙を、音訳規則（docs/grammar.md §8）で Logi の語にして辞書へ足す。

入力: dictionary/eiken3_additions.csv（英語・品詞・日本語の意味・別名）
出力: dictionary/final.csv に行を追加し、dictionary/glossary_en.csv に英語訳を追加する。

語の作り方:
  1. 英語のつづりを Logi の音に変える（b,f,v→p / d,th→t / g,c→k / z,sh,ch,j→s / r→l / h は削除 …）
  2. 子音連続は u で割り、語末子音は品詞語尾（名詞 -a・動詞 -o・形容詞 -e・副詞 -i・前置詞 -te）で閉じる
  3. 語幹は3音節まで（それ以上は先頭3音節）
  4. 既存の語と同形、または1文字違いの語は避け、母音・子音を1つ変えて衝突を避ける
  5. 動詞 + na が別の語と一致する形は避ける
-ly の副詞は、元の形容詞の語尾 -e を -i に変えて作る（pasute→pasuti と同じ型）。

使い方:
  python tools/coin_words.py           # まだ入っていない語を足す
  python tools/coin_words.py --check   # 追加リストの全語が辞書に入っているか確かめる
"""

import csv
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from validate import DEFAULT_DICTIONARY, check_word

ROOT = Path(__file__).resolve().parent.parent
ADDITIONS = ROOT / "dictionary" / "eiken3_additions.csv"
GLOSSARY = ROOT / "dictionary" / "glossary_en.csv"
TAG = "v0.7追加: 英検3級語彙 "

ENDING = {"noun": "a", "verb": "o", "adj": "e", "adv": "i", "pronoun": "a", "prep": "te"}
VOWELS = "aeiou"
CONSONANTS = "ptkmnslwj"

# つづり → 音（上から順に適用）
RULES = [
    ("tch", "s"), ("sh", "s"), ("ch", "s"), ("ph", "p"), ("th", "t"), ("ck", "k"), ("ng", "n"),
    ("wh", "w"), ("kn", "n"), ("wr", "l"), ("gh", ""), ("qu", "ku"), ("x", "ks"),
    ("tion", "sun"), ("sion", "sun"), ("ture", "tula"),
    ("ee", "i"), ("ea", "i"), ("ie", "i"), ("oo", "u"), ("ou", "u"), ("ew", "u"), ("ue", "u"),
    ("ai", "e"), ("ay", "e"), ("ei", "e"), ("ey", "e"), ("oa", "o"), ("ow", "o"), ("oe", "o"),
    ("au", "o"), ("aw", "o"), ("oy", "oi"),
]
LETTER = {"b": "p", "f": "p", "v": "p", "d": "t", "g": "k", "c": "k", "q": "k", "z": "s", "j": "s",
          "r": "l", "h": "", "x": "ks"}


def sound(english):
    s = english.lower().replace(" ", "")
    # 語末の黙字 e（子音のあとの e）を落とす
    if len(s) > 3 and s.endswith("e") and s[-2] not in VOWELS:
        s = s[:-1]
    s = re.sub(r"c([eiy])", r"s\1", s)
    for a, b in RULES:
        s = s.replace(a, b)
    out = []
    for i, ch in enumerate(s):
        if ch == "y":
            out.append("j" if i == 0 or (i + 1 < len(s) and s[i + 1] in VOWELS) else "i")
        else:
            out.append(LETTER.get(ch, ch))
    s = "".join(out)
    s = re.sub(r"([^aeiou])\1+", r"\1", s)  # 重子音
    s = "".join(c for c in s if c in VOWELS + CONSONANTS)
    # 子音連続・語中の n/m + 子音 は u で割る
    s = re.sub(r"([ptkmnslwj])(?=[ptkmnslwj])", r"\1u", s)
    return s


def syllables(s):
    return re.findall(r"[ptkmnslwj]?[aeiou]|[ptkmnslwj]$", s)


def edit_distance(a, b):
    d = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        prev, d[0] = d[:], i
        for j, cb in enumerate(b, 1):
            d[j] = min(prev[j] + 1, d[j - 1] + 1, prev[j - 1] + (ca != cb))
    return d[-1]


def build_stem(english, pos):
    syl = syllables(sound(english))
    if pos == "prep":
        stem = "".join(syl[:2])
        if stem and stem[-1] not in VOWELS:
            stem += "u"
        return stem
    limit = 2 if pos == "pronoun" else 3  # 品詞語尾のない語は、語全体で3音節まで
    stem = "".join(syl[:limit])
    if stem and stem[-1] in VOWELS:
        # 語末が母音なら、その母音を品詞語尾に置き換える。1音節の語（cow など）は l を足して2音節にする。
        stem = stem[:-1] if len(syllables(stem)) >= 2 else stem + "l"
    return stem


def variants(stem):
    """stem の母音・子音を1つずつ変えた候補（変更が少ない順）。"""
    seen = {stem}
    yield stem
    for pos in range(len(stem) - 1, -1, -1):
        ch = stem[pos]
        pool = VOWELS if ch in VOWELS else CONSONANTS
        for alt in pool:
            if alt != ch:
                cand = stem[:pos] + alt + stem[pos + 1:]
                if cand not in seen:
                    seen.add(cand)
                    yield cand
    for p1 in range(len(stem) - 1, -1, -1):
        for p2 in range(p1 - 1, -1, -1):
            pool1 = VOWELS if stem[p1] in VOWELS else CONSONANTS
            pool2 = VOWELS if stem[p2] in VOWELS else CONSONANTS
            for a1 in pool1:
                for a2 in pool2:
                    if a1 != stem[p1] and a2 != stem[p2]:
                        cand = list(stem)
                        cand[p1], cand[p2] = a1, a2
                        cand = "".join(cand)
                        if cand not in seen:
                            seen.add(cand)
                            yield cand


def acceptable(word, pos, taken, verbs):
    if word in taken or re.search(r"([aeiou])\1", word):  # 同じ母音の連続（awaa など）は避ける
        return False
    if check_word(word, pos if pos in ("noun", "verb", "adj", "adv", "prep") else "pronoun"):
        return False
    if pos == "verb" and word + "na" in taken:
        return False
    if word.endswith("na") and word[:-2] in verbs:
        return False
    return True


def coin(english, pos, taken, verbs, base_word=None, base_pos=None):
    """base_word: 同じ語幹を共有する語（同じ英語の別品詞、または -ly 副詞の元の形容詞）。"""
    ending = ENDING[pos]
    if base_word:
        # 語幹を共有し、語尾だけを変える（pasute / pasuti と同じ型）。この組だけは1文字違いを許す。
        base_ending = ENDING.get(base_pos, base_word[-1])
        if base_word.endswith(base_ending):
            word = base_word[: len(base_word) - len(base_ending)] + ending
            # 母音が連続する形（olaa など）は避ける
            if not re.search(r"([aeiou])\1", word) and acceptable(word, pos, taken, verbs):
                return word
    stem = build_stem(english, pos)
    best = None
    for cand in variants(stem):
        word = cand + ending
        if not acceptable(word, pos, taken, verbs):
            continue
        dist = min(edit_distance(word, t) for t in taken)
        if dist >= 2:
            return word
        if best is None or dist > best[0]:
            best = (dist, word)
    return best[1] if best else None


def load_dictionary():
    with DEFAULT_DICTIONARY.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        return reader.fieldnames, list(reader)


def load_additions():
    with ADDITIONS.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    fields, rows = load_dictionary()
    additions = load_additions()
    done = {r["notes"][len(TAG):].split(" ")[0]: r["regenerated"] for r in rows if r["notes"].startswith(TAG)}
    done_keys = {(r["notes"][len(TAG):]): r["regenerated"] for r in rows if r["notes"].startswith(TAG)}
    if "--check" in argv:
        missing = [a["english"] for a in additions if f"{a['english']} {a['pos']}" not in done_keys]
        if missing:
            print("辞書に入っていない語:", ", ".join(missing), file=sys.stderr)
            return 1
        print("追加リストの語はすべて入っています")
        return 0

    taken = {r["regenerated"] for r in rows}
    verbs = {r["regenerated"] for r in rows if r["pos"] == "verb"}
    english_to_word = {}
    for r in rows:
        if r["status"] == "active":
            pass
    with GLOSSARY.open(newline="", encoding="utf-8") as f:
        for g in csv.DictReader(f):
            for e in g["en"].split("|"):
                english_to_word.setdefault((e.lower(), None), g["word"])
    pos_of = {r["regenerated"]: r["pos"] for r in rows}
    for (e, _), w in list(english_to_word.items()):
        english_to_word[(e, pos_of.get(w))] = w

    new_rows, new_gloss = [], []
    for a in additions:
        key = f"{a['english']} {a['pos']}"
        if key in done_keys:
            continue
        base_word = None
        lemma = a["english"].lower()
        if a["pos"] == "adv" and lemma.endswith("ly"):
            base = {"easi": "easy"}.get(lemma[:-2], lemma[:-2])
            base_word = english_to_word.get((base, "adj"))
        if base_word is None:
            # 同じ英語の別品詞があれば、その語幹を使う
            for other in ("adj", "noun", "verb", "adv"):
                if other != a["pos"] and (lemma, other) in english_to_word:
                    base_word = english_to_word[(lemma, other)]
                    break
        word = coin(a["english"], a["pos"], taken, verbs, base_word, pos_of.get(base_word))
        if word is None:
            print(f"語を作れませんでした: {a['english']}", file=sys.stderr)
            return 1
        taken.add(word)
        pos_of[word] = a["pos"]
        if a["pos"] == "verb":
            verbs.add(word)
        english_to_word[(a["english"].lower(), a["pos"])] = word
        new_rows.append({
            "original": a["english"], "regenerated": word, "pos": a["pos"], "meaning_ja": a["meaning_ja"],
            "violations_before": "OK", "violations_after": "OK", "notes": TAG + key, "status": "active", "replaced_by": "",
        })
        en = [a["english"]] + [x for x in a["aliases"].split("|") if x]
        new_gloss.append((word, "|".join(en)))
    if not new_rows:
        print("追加する語はありません")
        return 0
    with DEFAULT_DICTIONARY.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows + new_rows)
    text = GLOSSARY.read_text(encoding="utf-8")
    if not text.endswith("\n"):
        text += "\n"
    text += "".join(f"{w},{en}\n" for w, en in new_gloss)
    GLOSSARY.write_text(text, encoding="utf-8")
    print(f"{len(new_rows)}語を追加しました")
    return 0


if __name__ == "__main__":
    sys.exit(main())
