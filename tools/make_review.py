"""人が確認するための表を作る。

  docs/review/synonyms.md  同義語グループと正本の決め手（機械的に決めたものを要確認として示す）
  docs/review/corpus.md    例文コーパスと辞書ベースの語注
  docs/review/new_words.md 追加した語（v0.7〜）の確認表
  corpus/review_status.csv が無ければ全文 draft で作る（確認した文は reviewed に書き換える）
  dictionary/word_review.csv 追加語の確認状況（status: draft / ok / fix、note に直したい点を書く）。
                             再生成しても、書いた status と note は残る

使い方: python tools/make_review.py
"""

import csv
import sys
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from gloss import build_lexicon, gloss_sentence
from synonyms import CORPUS, OVERRIDES, syllables, used_words
from validate import DEFAULT_DICTIONARY, load_rows

ROOT = Path(__file__).resolve().parent.parent
REVIEW_DIR = ROOT / "docs" / "review"
STATUS = ROOT / "corpus" / "review_status.csv"
GLOSSARY = ROOT / "dictionary" / "glossary_en.csv"
WORD_REVIEW = ROOT / "dictionary" / "word_review.csv"
WORD_STATUSES = ("draft", "ok", "fix")
# final.csv の notes の先頭 → 表示名（追加した順）
BATCHES = [
    ("v0.7追加", "v0.7 英検3級レベルの語"),
    ("v0.8追加", "v0.8 日本語の基本語彙"),
    ("v0.9追加", "v0.9 現代・IT語彙"),
    ("ANTI追加", "Antigravity の追加語（dictionary/anti_additions.csv）"),
    ("v0.10追加", "v0.10 機能語（指示詞・はい／いいえ）"),
]
POS_ORDER = ["noun", "verb", "adj", "adv", "prep", "pronoun", "interj"]


def reason(group, canonical, all_words, used):
    key = (canonical["meaning_ja"], canonical["pos"])
    if OVERRIDES.get(key) == canonical["regenerated"]:
        return "例外（OVERRIDES）", False

    def collides(r):
        return r["pos"] == "verb" and r["regenerated"] + "na" in all_words

    candidates = [r for r in group if not collides(r)] or group
    shortest = min(syllables(r["regenerated"]) for r in candidates)
    tied = [r for r in candidates if syllables(r["regenerated"]) == shortest]
    if len(tied) == 1:
        return ("動名詞の衝突回避" if len(candidates) < len(group) else "音節数が少ない"), False
    in_use = [r for r in tied if r["regenerated"] in used]
    if len(in_use) == 1:
        return "例文で使用中", False
    return "辞書の並び順（機械的）", True


def synonyms_table(rows):
    all_words = {r["regenerated"] for r in rows}
    used = used_words()
    groups = defaultdict(list)
    for r in rows:
        groups[(r["meaning_ja"], r["pos"])].append(r)
    lines = [
        "# 同義語グループの確認表", "",
        "`tools/make_review.py` で生成。正本（active）が気に入らない場合は、望ましい語を教えてください。", "",
        "| 意味 | 品詞 | 正本 | 非推奨 | 決め手 | 要確認 |", "|---|---|---|---|---|---|",
    ]
    checks = 0
    for (meaning, pos), group in groups.items():
        if len(group) < 2:
            continue
        canonical = next(r for r in group if r["status"] == "active")
        why, check = reason(group, canonical, all_words, used)
        checks += check
        dep = ", ".join(r["regenerated"] for r in group if r is not canonical)
        lines.append(f"| {meaning} | {pos} | {canonical['regenerated']} | {dep} | {why} | {'要' if check else ''} |")
    lines += ["", f"機械的に決めたグループ（要確認）: {checks}"]
    return "\n".join(lines) + "\n"


def corpus_table(rows):
    lexicon = build_lexicon(rows)
    verbs = {r["word"] for r in rows if r["pos"] == "verb"}
    with CORPUS.open(newline="", encoding="utf-8") as f:
        corpus = list(csv.DictReader(f))
    lines = [
        "# 例文コーパスの確認表", "",
        "`tools/make_review.py` で生成。不自然な文や訳は、id を挙げて教えてください。",
        "確認した文は `corpus/review_status.csv` の status を reviewed に書き換えます。", "",
        "| id | 機能 | Logi | 日本語訳 |", "|---|---|---|---|",
    ]
    for row in corpus:
        lines.append(f"| {row['id']} | {row['feature']} | {row['logi']} | {row['ja']} |")
    lines += ["", "## 語注（辞書から機械的に生成）", ""]
    for row in corpus:
        lines.append(f"- **{row['id']}** `{row['logi']}`  ")
        lines.append(f"  {gloss_sentence(row['logi'], lexicon, verbs)}")
    return "\n".join(lines) + "\n", corpus


def load_glossary():
    with GLOSSARY.open(newline="", encoding="utf-8") as f:
        return {g["word"]: g["en"] for g in csv.DictReader(f)}


def batch_of(row):
    for tag, _ in BATCHES:
        if row["notes"].startswith(tag):
            return tag
    return None


def added_words(rows):
    """追加語（v0.7〜）を、バッチ・品詞の順に並べて返す。同じバッチの中は辞書の並び順。"""
    glossary = load_glossary()
    out = []
    for r in rows:
        tag = batch_of(r)
        if tag:
            out.append({
                "word": r["regenerated"], "pos": r["pos"], "meaning_ja": r["meaning_ja"],
                "english": glossary.get(r["regenerated"], ""), "batch": tag,
            })
    order = {tag: i for i, (tag, _) in enumerate(BATCHES)}
    out.sort(key=lambda w: (order[w["batch"]], POS_ORDER.index(w["pos"]) if w["pos"] in POS_ORDER else 99))
    return out


def notes_for(word, dictionary_words, glossary_words):
    """確認するときの手がかり: 語幹が同じ別の語、同じ英語を持つ別の語。

    dictionary_words は辞書の全語 {語: 品詞}。語幹が同じ = 語尾の1文字だけが違う、別の品詞の語。
    """
    notes = []
    partners = sorted(w for w, pos in dictionary_words.items()
                      if w != word["word"] and pos != word["pos"] and len(w) > 2
                      and w[:-1] == word["word"][:-1] and word["pos"] in POS_ORDER and pos in POS_ORDER)
    if partners:
        notes.append("語幹が同じ: " + ", ".join(partners[:3]))
    mine = {x.lower() for x in word["english"].split("|") if x}
    shared = sorted(w for w, en in glossary_words.items()
                    if w != word["word"] and mine & {x.lower() for x in en.split("|") if x})
    shared = [w for w in shared if w not in partners]
    if shared:
        notes.append("同じ英語の語: " + ", ".join(shared[:3]))
    return "; ".join(notes)


def sync_word_review(rows):
    """dictionary/word_review.csv を、辞書の追加語に合わせて作り直す（書いた status と note は残す）。"""
    previous = {}
    if WORD_REVIEW.exists():
        with WORD_REVIEW.open(newline="", encoding="utf-8") as f:
            previous = {r["word"]: r for r in csv.DictReader(f)}
    out = []
    for w in added_words(rows):
        old = previous.get(w["word"], {})
        out.append({**w, "status": old.get("status") or "draft", "note": old.get("note", "")})
    return out


def write_word_review(entries):
    with WORD_REVIEW.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["word", "pos", "meaning_ja", "english", "batch", "status", "note"], lineterminator="\n")
        writer.writeheader()
        writer.writerows(entries)


def new_words_table(entries, rows):
    glossary = load_glossary()
    dictionary_words = {r["regenerated"]: r["pos"] for r in rows if r["status"] == "active"}
    names = dict(BATCHES)
    lines = [
        "# 追加語の確認表", "",
        "`tools/make_review.py` で生成。気になる語は、Logi の語を挙げて「音」「日本語の意味」「英語」のどれを直したいか教えてください。",
        "確認の状況は `dictionary/word_review.csv` の status（draft / ok / fix）と note に書きます。", "",
        "「手がかり」は、見直しの優先度を決めるための目安です。",
        "- 語幹が同じ: 語尾の1文字だけが違う、別の品詞の語（例: `kuka` 名詞と `kuko` 動詞）。同じ英語の別品詞なら意図した組です。そうでなければ偶然の一致なので、見分けにくくないか見てください",
        "- 同じ英語の語: 同じ英語の訳を持つ、別の語（同義語の候補）", "",
    ]
    total = {"ok": 0, "fix": 0, "draft": 0}
    for e in entries:
        total[e["status"]] += 1
    lines += [f"確認済み(ok): {total['ok']} / 要修正(fix): {total['fix']} / 未確認(draft): {total['draft']}", ""]
    for tag, name in BATCHES:
        group = [e for e in entries if e["batch"] == tag]
        if not group:
            continue
        lines += [f"## {names[tag]}（{len(group)}語）", ""]
        for pos in POS_ORDER:
            sub = [e for e in group if e["pos"] == pos]
            if not sub:
                continue
            lines += [f"### {pos}（{len(sub)}語）", "", "| Logi | 日本語 | 英語 | 手がかり | 状況 |", "|---|---|---|---|---|"]
            for e in sub:
                hint = notes_for(e, dictionary_words, glossary)
                status = {"draft": "", "ok": "ok", "fix": "要修正"}[e["status"]]
                if e["note"]:
                    status = (status + " " + e["note"]).strip()
                lines.append(f"| {e['word']} | {e['meaning_ja']} | {e['english'].replace('|', ' / ')} | {hint} | {status} |")
            lines.append("")
    return "\n".join(lines) + "\n"


def main():
    rows = load_rows(DEFAULT_DICTIONARY)
    REVIEW_DIR.mkdir(parents=True, exist_ok=True)
    (REVIEW_DIR / "synonyms.md").write_text(synonyms_table(rows), encoding="utf-8")
    text, corpus = corpus_table(rows)
    (REVIEW_DIR / "corpus.md").write_text(text, encoding="utf-8")
    entries = sync_word_review(rows)
    write_word_review(entries)
    (REVIEW_DIR / "new_words.md").write_text(new_words_table(entries, rows), encoding="utf-8")
    if not STATUS.exists():
        with STATUS.open("w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["id", "status"])
            for row in corpus:
                writer.writerow([row["id"], "draft"])


if __name__ == "__main__":
    main()
