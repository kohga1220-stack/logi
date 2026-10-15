"""確認表と corpus/review_status.csv が、辞書・コーパスと食い違っていないことを検証する。"""

import csv
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))

import make_review  # noqa: E402
from validate import DEFAULT_DICTIONARY, load_rows  # noqa: E402


def test_review_status_matches_corpus():
    with make_review.CORPUS.open(newline="", encoding="utf-8") as f:
        corpus_ids = [row["id"] for row in csv.DictReader(f)]
    with make_review.STATUS.open(newline="", encoding="utf-8") as f:
        status = list(csv.DictReader(f))
    assert [row["id"] for row in status] == corpus_ids
    assert {row["status"] for row in status} <= {"draft", "reviewed"}


def test_review_tables_are_up_to_date():
    rows = load_rows(DEFAULT_DICTIONARY)
    synonyms = (make_review.REVIEW_DIR / "synonyms.md").read_text(encoding="utf-8")
    corpus, _ = make_review.corpus_table(rows)
    assert synonyms == make_review.synonyms_table(rows)
    assert (make_review.REVIEW_DIR / "corpus.md").read_text(encoding="utf-8") == corpus


def test_word_review_matches_added_words():
    rows = load_rows(DEFAULT_DICTIONARY)
    with make_review.WORD_REVIEW.open(newline="", encoding="utf-8") as f:
        review = list(csv.DictReader(f))
    expected = [w["word"] for w in make_review.added_words(rows)]
    assert [r["word"] for r in review] == expected
    assert {r["status"] for r in review} <= set(make_review.WORD_STATUSES)


def test_new_words_table_is_up_to_date():
    rows = load_rows(DEFAULT_DICTIONARY)
    entries = make_review.sync_word_review(rows)
    table = (make_review.REVIEW_DIR / "new_words.md").read_text(encoding="utf-8")
    assert table == make_review.new_words_table(entries, rows)
