"""人が確認するための表を作る。

  docs/review/synonyms.md  同義語グループと正本の決め手（機械的に決めたものを要確認として示す）
  docs/review/corpus.md    例文コーパスと辞書ベースの語注
  corpus/review_status.csv が無ければ全文 draft で作る（確認した文は reviewed に書き換える）

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


def main():
    rows = load_rows(DEFAULT_DICTIONARY)
    REVIEW_DIR.mkdir(parents=True, exist_ok=True)
    (REVIEW_DIR / "synonyms.md").write_text(synonyms_table(rows), encoding="utf-8")
    text, corpus = corpus_table(rows)
    (REVIEW_DIR / "corpus.md").write_text(text, encoding="utf-8")
    if not STATUS.exists():
        with STATUS.open("w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["id", "status"])
            for row in corpus:
                writer.writerow([row["id"], "draft"])


if __name__ == "__main__":
    main()
