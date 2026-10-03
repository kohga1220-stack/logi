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


def test_one_active_word_per_meaning_and_pos(rows):
    groups = defaultdict(list)
    for r in rows:
        if r["status"] == "active":
            groups[(r["meaning_ja"], r["pos"])].append(r["word"])
    assert {k: v for k, v in groups.items() if len(v) > 1} == {}


def test_deprecated_words_point_to_active_words(rows):
    active = {r["word"] for r in rows if r["status"] == "active"}
    for r in rows:
        if r["status"] == "deprecated":
            assert r["replaced_by"] in active, r["word"]
        else:
            assert r["status"] == "active" and r["replaced_by"] == "", r["word"]


def test_gerunds_do_not_collide_with_active_words(rows):
    # 動詞 + na が既存の別語と衝突する例。新しい衝突を増やさないための既知リスト。
    active = {r["word"] for r in rows if r["status"] == "active"}
    collisions = {
        r["word"] for r in rows
        if r["status"] == "active" and r["pos"] == "verb" and r["word"] + "na" in active
    }
    assert collisions == {"po"}  # pona（点数）と衝突。未解決（docs/grammar.md §10）


def test_synonym_status_matches_rules():
    import synonyms

    assert synonyms.main(["--check"]) == 0
