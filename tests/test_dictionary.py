"""dictionary/final.csv が Logi の音韻・形態ルールに適合していることを検証する。"""

import sys
from collections import defaultdict
from pathlib import Path

import pytest

TOOLS = Path(__file__).resolve().parent.parent / "tools"
sys.path.insert(0, str(TOOLS))

from validate import DEFAULT_DICTIONARY, POS_SUFFIX, check_word, load_rows  # noqa: E402

KNOWN_POS = set(POS_SUFFIX) | {"pronoun", "marker", "wh", "conj", "num"}


@pytest.fixture(scope="module")
def rows():
    return load_rows(DEFAULT_DICTIONARY)


def test_dictionary_size(rows):
    assert len(rows) == 617


def test_all_words_follow_phonology_and_morphology(rows):
    violations = {
        r["word"]: v for r in rows if (v := check_word(r["word"], r["pos"]))
    }
    assert violations == {}


def test_pos_values_are_known(rows):
    assert {r["pos"] for r in rows} <= KNOWN_POS


def test_no_homophone_collisions(rows):
    # 数詞（pos=num）と機能語の同音は仕様上許容（docs/grammar.md §5）。それ以外は禁止。
    groups = defaultdict(list)
    for r in rows:
        groups[r["word"]].append(r["pos"])
    collisions = {
        w: pos for w, pos in groups.items()
        if len(pos) > 1 and "num" not in pos
    }
    assert collisions == {}


def test_numeral_overlaps_are_only_with_function_words(rows):
    groups = defaultdict(list)
    for r in rows:
        groups[r["word"]].append(r["pos"])
    overlaps = {w for w, pos in groups.items() if "num" in pos and len(pos) > 1}
    assert overlaps == {"tu", "li", "ka"}


def test_validator_detects_violations():
    assert check_word("pra", "noun")        # 子音連続
    assert check_word("tok", "verb")        # 語末子音
    assert check_word("kora", "noun")       # r は廃止
    assert check_word("toda", "noun")       # d は使用不可
    assert not check_word("toko", "verb")
