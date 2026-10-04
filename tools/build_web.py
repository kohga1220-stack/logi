"""web/lexicon.js を作る（翻訳機が読む辞書データ）。

dictionary/final.csv の active な語と dictionary/glossary_en.csv（英語訳）を合わせ、
ブラウザでも Node でも読める classic script として書き出す。

使い方: python tools/build_web.py
"""

import csv
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from validate import DEFAULT_DICTIONARY, load_rows

ROOT = Path(__file__).resolve().parent.parent
GLOSSARY = ROOT / "dictionary" / "glossary_en.csv"
OUTPUT = ROOT / "web" / "lexicon.js"

# 英語訳を持たない語（翻訳機のコードが直接扱う）
NO_GLOSS = {"ni", "pa", "to", "te", "ku", "pe", "so", "se", "wa", "ja", "pulu", "kupulu", "mipulu",
            "pasu", "putu", "konu", "pinu", "no", "ka", "ta", "wutu"}


def japanese_surfaces(meaning):
    """'彼/彼女/それ' や '私たち（包括）' から、入力として受け付ける日本語表記を取り出す。"""
    meaning = re.sub(r"（.*?）", "", meaning)
    return [m for m in meaning.split("/") if m]


def load_glossary():
    with GLOSSARY.open(newline="", encoding="utf-8") as f:
        return {r["word"]: [e for e in r["en"].split("|") if e] for r in csv.DictReader(f)}


def build():
    rows = [r for r in load_rows(DEFAULT_DICTIONARY) if r["status"] == "active"]
    glossary = load_glossary()
    missing = [r["word"] for r in rows if r["word"] not in glossary and r["word"] not in NO_GLOSS]
    if missing:
        raise SystemExit(f"glossary_en.csv に英語訳がありません: {', '.join(missing)}")
    entries = []
    for r in rows:
        entries.append({
            "w": r["word"],
            "pos": r["pos"],
            "ja": japanese_surfaces(r["meaning_ja"]),
            "jaNote": r["meaning_ja"],
            "en": glossary.get(r["word"], []),
        })
    return entries


def render(entries):
    lines = ",\n".join(json.dumps(e, ensure_ascii=False, separators=(",", ":")) for e in entries)
    return (
        "// 自動生成: python tools/build_web.py（編集しないでください）\n"
        "var LOGI_LEXICON = [\n" + lines + "\n];\n"
        "if (typeof module !== 'undefined') { module.exports = LOGI_LEXICON; }\n"
    )


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    entries = build()
    OUTPUT.write_text(render(entries), encoding="utf-8")
    print(f"wrote {OUTPUT} ({len(entries)} entries)")


if __name__ == "__main__":
    main()
