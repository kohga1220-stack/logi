"""dictionary/final.csv が Logi の音韻・形態ルールに適合していることを検証する。"""

import sys
from collections import defaultdict
from pathlib import Path

import pytest

TOOLS = Path(__file__).resolve().parent.parent / "tools"
sys.path.insert(0, str(TOOLS))

from validate import DEFAULT_DICTIONARY, POS_SUFFIX, check_word, load_rows  # noqa: E402

KNOWN_POS = set(POS_SUFFIX) | {"pronoun", "marker", "wh", "conj"}


@pytest.fixture(scope="module")
def rows():
    return load_rows(DEFAULT_DICTIONARY)


def test_dictionary_size(rows):
    assert len(rows) == 602


def test_all_words_follow_phonology_and_morphology(rows):
    violations = {
        r["word"]: v for r in rows if (v := check_word(r["word"], r["pos"]))
    }
    assert violations == {}


def test_pos_values_are_known(rows):
    assert {r["pos"] for r in rows} <= KNOWN_POS


def test_no_homophone_collisions(rows):
    # 同じ語形・品詞・意味の重複行（resolve.py での統合残り）は衝突とみなさない
    groups = defaultdict(set)
    for r in rows:
        groups[r["word"]].add((r["pos"], r["meaning_ja"]))
    collisions = {w: sorted(m) for w, m in groups.items() if len(m) > 1}
    assert collisions == {}


def test_validator_detects_violations():
    assert check_word("pra", "noun")        # 子音連続
    assert check_word("tok", "verb")        # 語末子音
    assert check_word("kora", "noun")       # r は廃止
    assert check_word("toda", "noun")       # d は使用不可
    assert not check_word("toko", "verb")
