"""辞書に追加できる「空き形」を探す。

空き形 = 辞書にまだ無く、既存のどの語とも編集距離が2以上で、同じ母音が続かない語形。
短い基本語（指示詞など）を新しく造れるかを調べるときに使う。

使い方:
  python tools/free_forms.py                 # 音節数ごとの空き形の数
  python tools/free_forms.py --list 2        # 2音節の空き形を全部出す
  python tools/free_forms.py --check iliu teliu jesu   # 指定した形の近い語を出す
"""

import csv
import itertools
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from coin_words import CONSONANTS, VOWELS, neighbors
from validate import DEFAULT_DICTIONARY


def taken_words():
    with DEFAULT_DICTIONARY.open(newline="", encoding="utf-8") as f:
        return {r["regenerated"]: (r["pos"], r["meaning_ja"]) for r in csv.DictReader(f)}


def syllable_count(word):
    return len(re.findall(r"[aeiou]", word))


def free_forms(taken, syllables):
    syl = [c + v for c in CONSONANTS for v in VOWELS] + list(VOWELS)
    for combo in itertools.product(syl, repeat=syllables):
        word = "".join(combo)
        if word in taken or re.search(r"([aeiou])\1", word):
            continue
        if neighbors(word) & set(taken):
            continue
        # 母音だけの音節が続く形は、音節の切り方が決まらないので除く
        if syllable_count(word) != syllables:
            continue
        yield word


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    taken = taken_words()
    if argv[:1] == ["--check"]:
        for word in argv[1:]:
            near = sorted(w for w in neighbors(word) if w in taken)
            state = "辞書にある" if word in taken else "空き"
            print(f"{word}: {state} / 編集距離1の語: " + (", ".join(f"{w}({taken[w][0]} {taken[w][1]})" for w in near) or "なし"))
        return 0
    if argv[:1] == ["--list"]:
        for word in free_forms(taken, int(argv[1])):
            print(word)
        return 0
    for n in (1, 2, 3):
        count = sum(1 for _ in free_forms(taken, n))
        print(f"{n}音節の空き形: {count}個")
    return 0


if __name__ == "__main__":
    sys.exit(main())
