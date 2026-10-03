"""docs/grammar.md と README.md の Logi 例文が、辞書の語だけで書かれていることを検証する。"""

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
