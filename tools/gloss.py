"""Logi 文の語注を辞書から機械的に作る。

使い方:
  python tools/gloss.py "mi pasu ito apa."
  python tools/gloss.py            # corpus/examples.csv 全文
"""

import csv
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from validate import DEFAULT_DICTIONARY, load_rows

CORPUS = Path(__file__).resolve().parent.parent / "corpus" / "examples.csv"


def build_lexicon(rows):
    lexicon = {}
    for r in rows:
        lexicon.setdefault(r["word"], []).append(f"{r['meaning_ja']}({r['pos']})")
    return lexicon


def gloss_token(token, lexicon, verbs):
    if token in lexicon:
        return "/".join(lexicon[token])
    if token.endswith("na") and token[:-2] in verbs:
        return f"{lexicon[token[:-2]][0]}+na(動名詞)"
    return None


def gloss_sentence(sentence, lexicon, verbs):
    parts = []
    for token in re.findall(r"[a-z]+", sentence.lower()):
        parts.append(f"{token}={gloss_token(token, lexicon, verbs) or '??'}")
    return " ".join(parts)


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    rows = load_rows(DEFAULT_DICTIONARY)
    lexicon = build_lexicon(rows)
    verbs = {r["word"] for r in rows if r["pos"] == "verb"}
    if argv:
        sentences = [" ".join(argv)]
    else:
        with CORPUS.open(newline="", encoding="utf-8") as f:
            sentences = [row["logi"] for row in csv.DictReader(f)]
    for s in sentences:
        print(s)
        print("  " + gloss_sentence(s, lexicon, verbs))


if __name__ == "__main__":
    main()
