"""docs/grammar.md と README.md の Logi 例文が、辞書の語だけで書かれていることを検証する。"""

import csv
import re
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))

from validate import DEFAULT_DICTIONARY, load_rows  # noqa: E402


@pytest.fixture(scope="module")
def lexicon():
    rows = load_rows(DEFAULT_DICTIONARY)
    words = {r["word"] for r in rows}
    verbs = {r["word"] for r in rows if r["pos"] == "verb"}
    return words, verbs


def logi_paragraphs(path):
    """'**Logi**' 見出しの直後の段落を返す。"""
    text = path.read_text(encoding="utf-8")
    return re.findall(r"\*\*Logi\*\*\s*\n(.+)", text)


def tokens(sentence):
    return re.findall(r"[a-z]+", sentence.lower())


def is_known(token, words, verbs):
    if token in words:
        return True
    # 動名詞: 動詞 + na（pio → piona）
    return token.endswith("na") and token[:-2] in verbs


@pytest.mark.parametrize("doc", ["README.md", "docs/grammar.md"])
def test_sample_text_uses_dictionary_words(doc, lexicon):
    words, verbs = lexicon
    paragraphs = logi_paragraphs(ROOT / doc)
    assert paragraphs, f"{doc} に Logi 例文が見つかりません"
    unknown = {
        t for para in paragraphs for t in tokens(para) if not is_known(t, words, verbs)
    }
    assert unknown == set()


@pytest.mark.parametrize("doc", ["README.md", "docs/grammar.md"])
def test_questions_end_with_ka_question_mark(doc):
    for para in logi_paragraphs(ROOT / doc):
        for sentence in re.findall(r"[^.?]+[.?]", para):
            if sentence.strip().endswith("?"):
                assert sentence.strip().endswith("ka?")


CORPUS = ROOT / "corpus" / "examples.csv"


@pytest.fixture(scope="module")
def corpus():
    with CORPUS.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def test_corpus_uses_only_dictionary_words(corpus, lexicon):
    words, verbs = lexicon
    unknown = {
        (row["id"], t)
        for row in corpus
        for t in tokens(row["logi"])
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


def doc_sentences(path):
    """表・箇条書きの中の Logi 例文（代名詞・ipu で始まり . か ? で終わる）を返す。"""
    found = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.startswith(("|", "- ")):
            continue
        for cell in line.lstrip("- ").split("|"):
            cell = re.sub(r"[（(].*$", "", cell).strip()
            if re.fullmatch(r"(mi|tu|li|ipu|tuka|kua)\b[a-z ,]*[.?]", cell):
                found.append(cell)
    return found


@pytest.mark.parametrize("doc", ["README.md", "docs/grammar.md"])
def test_doc_example_sentences_use_dictionary_words(doc, lexicon):
    words, verbs = lexicon
    sentences = doc_sentences(ROOT / doc)
    assert sentences, f"{doc} に例文が見つかりません"
    unknown = {
        t for s in sentences for t in tokens(s) if not is_known(t, words, verbs)
    }
    assert unknown == set()


def test_corpus_waia_aua_sit_between_subject_and_verb(corpus):
    rows = load_rows(DEFAULT_DICTIONARY)
    pos = {}
    for r in rows:
        pos.setdefault(r["word"], set()).add(r["pos"])
    for row in corpus:
        toks = tokens(row["logi"])
        for i, t in enumerate(toks):
            if t in {"waia", "aua"}:
                assert pos[toks[i - 1]] & {"pronoun", "noun"}, row["id"]
                assert pos[toks[i + 1]] & {"marker", "verb"}, row["id"]
