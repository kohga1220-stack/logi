"""同義語の整理: 同じ (meaning_ja, pos) を持つ語から正本を1つ選び、他を deprecated にする。

選び方（上から順に適用）:
  0. 動名詞（動詞 + na）が既存の別語と衝突する語は正本にしない
  1. 音節数が少ない語
  2. README・文法仕様書・例文コーパスですでに使われている語
  3. 辞書の並び順で先の語
OVERRIDES に載せた語は上の規則より優先する。

使い方:
  python tools/synonyms.py           # 提案を表示するだけ
  python tools/synonyms.py --apply   # dictionary/final.csv に status / replaced_by を書き込む
"""

import csv
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DICTIONARY = ROOT / "dictionary" / "final.csv"
USAGE_FILES = [ROOT / "README.md", ROOT / "docs" / "grammar.md", ROOT / "corpus" / "examples.csv"]
EXTRA_FIELDS = ["status", "replaced_by"]

# 規則より優先する例外: (meaning_ja, pos) -> 正本
# naue は同語幹の naua（現在）・naui（今）と語族をなすため、音節数が多くても残す
OVERRIDES = {("現在の", "adj"): "naue"}


def syllables(word):
    return len(re.findall(r"[ptkmnslwj]?[aeiou]", word))


def used_words():
    used = set()
    for path in USAGE_FILES:
        used |= set(re.findall(r"[a-z]+", path.read_text(encoding="utf-8").lower()))
    return used


def choose(group, all_words, used):
    """group: 同じ意味・品詞の行のリスト。正本の行を返す。"""
    key = (group[0]["meaning_ja"], group[0]["pos"])
    for r in group:
        if OVERRIDES.get(key) == r["regenerated"]:
            return r
    def collides(row):
        w = row["regenerated"]
        return row["pos"] == "verb" and (w + "na") in all_words

    candidates = [r for r in group if not collides(r)] or group
    order = {id(r): i for i, r in enumerate(group)}
    return min(
        candidates,
        key=lambda r: (syllables(r["regenerated"]), r["regenerated"] not in used, order[id(r)]),
    )


def propose(rows):
    all_words = {r["regenerated"] for r in rows}
    used = used_words()
    groups = defaultdict(list)
    for r in rows:
        groups[(r["meaning_ja"], r["pos"])].append(r)
    result = {}
    for group in groups.values():
        if len(group) < 2:
            continue
        canonical = choose(group, all_words, used)
        for r in group:
            if r is not canonical:
                result[id(r)] = canonical["regenerated"]
    return result


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    with DICTIONARY.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fields = list(reader.fieldnames)
        rows = list(reader)
    deprecated = propose(rows)
    for r in rows:
        r.setdefault("status", "active")
        r.setdefault("replaced_by", "")
        if id(r) in deprecated:
            r["status"] = "deprecated"
            r["replaced_by"] = deprecated[id(r)]
    for r in rows:
        if r["status"] == "deprecated":
            print(f"{r['regenerated']:<10} -> {r['replaced_by']:<10} ({r['meaning_ja']}, {r['pos']})")
    print(f"deprecated: {len(deprecated)} / {len(rows)}")
    if "--apply" in argv:
        for extra in EXTRA_FIELDS:
            if extra not in fields:
                fields.append(extra)
        with DICTIONARY.open("w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fields)
            writer.writeheader()
            writer.writerows(rows)


if __name__ == "__main__":
    main()
