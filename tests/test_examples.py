"""docs/grammar.md・README.md・corpus/examples.csv の Logi 例文を辞書と照合する。"""

import csv
import re
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))

from logi_common import is_known, logi_sentences_in_doc, tokenize  # noqa: E402
from validate import DEFAULT_DICTIONARY, load_rows  # noqa: E402

DOCS = ["README.md", "docs/grammar.md"]
CORPUS = ROOT / "corpus" / "examples.csv"


@pytest.fixture(scope="module")
def dictionary():
    return load_rows(DEFAULT_DICTIONARY)


@pytest.fixture(scope="module")
def lexicon(dictionary):
    words = {r["word"] for r in dictionary}
    verbs = {r["word"] for r in dictionary if r["pos"] == "verb"}
    return words, verbs


@pytest.fixture(scope="module")
def pos(dictionary):
    table = {}
    for r in dictionary:
        table.setdefault(r["word"], set()).add(r["pos"])
    return table


@pytest.fixture(scope="module")
def corpus():
    with CORPUS.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def logi_paragraphs(path):
    """'**Logi**' 見出しの直後の段落を返す。"""
    text = path.read_text(encoding="utf-8")
    return re.findall(r"\*\*Logi\*\*\s*\n(.+)", text)


@pytest.mark.parametrize("doc", DOCS)
def test_sample_text_uses_dictionary_words(doc, lexicon):
    words, verbs = lexicon
    paragraphs = logi_paragraphs(ROOT / doc)
    assert paragraphs, f"{doc} に Logi 例文が見つかりません"
    unknown = {
        t for para in paragraphs for t in tokenize(para) if not is_known(t, words, verbs)
    }
    assert unknown == set()


@pytest.mark.parametrize("doc", DOCS)
def test_questions_end_with_ka_question_mark(doc):
    for para in logi_paragraphs(ROOT / doc):
        for sentence in re.findall(r"[^.?]+[.?]", para):
            if sentence.strip().endswith("?"):
                assert sentence.strip().endswith("ka?")


@pytest.mark.parametrize("doc", DOCS)
def test_doc_example_sentences_use_dictionary_words(doc, lexicon):
    words, verbs = lexicon
    sentences = logi_sentences_in_doc((ROOT / doc).read_text(encoding="utf-8"))
    assert sentences, f"{doc} に例文が見つかりません"
    unknown = {
        t for s in sentences for t in tokenize(s) if not is_known(t, words, verbs)
    }
    assert unknown == set()


def test_docs_and_corpus_do_not_use_deprecated_words(dictionary, corpus):
    deprecated = {r["word"] for r in dictionary if r["status"] == "deprecated"}
    texts = [row["logi"] for row in corpus]
    for doc in DOCS:
        texts += logi_sentences_in_doc((ROOT / doc).read_text(encoding="utf-8"))
    used = {t for text in texts for t in tokenize(text)}
    assert used & deprecated == set()


def test_corpus_uses_only_dictionary_words(corpus, lexicon):
    words, verbs = lexicon
    unknown = {
        (row["id"], t)
        for row in corpus
        for t in tokenize(row["logi"])
        if not is_known(t, words, verbs)
    }
    assert unknown == set()


def test_corpus_ids_are_unique_and_sentences_end_properly(corpus):
    ids = [row["id"] for row in corpus]
    assert len(ids) == len(set(ids))
    for row in corpus:
        assert row["logi"].endswith((".", "?")), row["id"]
        assert row["ja"], row["id"]


def test_corpus_questions_end_with_ka_question_mark(corpus):
    for row in corpus:
        if row["logi"].endswith("?"):
            assert row["logi"].endswith(" ka?"), row["id"]


def test_corpus_covers_grammar_features(corpus):
    features = {row["feature"] for row in corpus}
    required = {
        "past", "future", "progressive", "perfective", "negation",
        "question-yesno", "comparative", "superlative", "equality",
        "relative-clause", "gerund", "causative", "subjunctive",
        "numeral", "dative", "reflexive", "unspecified-agent",
        "pronoun-inclusive", "pronoun-exclusive",
        "question-what", "question-who", "question-where", "question-where-to",
        "question-when", "question-why", "question-how",
        "modal", "modal-negation", "modal-tense",
    }
    assert required <= features


def test_corpus_waia_aua_sit_between_subject_and_verb(corpus, pos):
    """waia・aua は副詞の位置: 主語（代名詞・名詞）の直後、マーカーか動詞の直前。"""
    for row in corpus:
        toks = tokenize(row["logi"])
        for i, t in enumerate(toks):
            if t not in {"waia", "aua"}:
                continue
            assert 0 < i < len(toks) - 1, f"{row['id']}: {t} は文頭・文末に置けない"
            assert pos.get(toks[i - 1], set()) & {"pronoun", "noun"}, row["id"]
            assert pos.get(toks[i + 1], set()) & {"marker", "verb"}, row["id"]


def test_corpus_wela_wena_follow_a_preposition(corpus, pos):
    """wela・wena は前置詞の目的語としてのみ現れる。"""
    for row in corpus:
        toks = tokenize(row["logi"])
        for i, t in enumerate(toks):
            if t in {"wela", "wena"}:
                assert i > 0 and "prep" in pos.get(toks[i - 1], set()), row["id"]
