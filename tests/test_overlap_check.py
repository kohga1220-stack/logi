"""tools/overlap_check.py のテスト（作り物の小さな辞書で確かめる）。"""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))

import overlap_check  # noqa: E402


def _row(word, pos, meaning, original="x"):
    return {"regenerated": word, "pos": pos, "meaning_ja": meaning, "original": original, "status": "active"}


ROWS = [
    _row("aaa", "verb", "調節する", "adjust"),
    _row("bbb", "noun", "飲み物", "drink"),
    _row("ccc", "verb", "寝る", "sleep"),
]
BY_WORD = {r["regenerated"]: r for r in ROWS}
ENGLISH = {"adjust": ["aaa"], "drink": ["bbb"]}


def test_japanese_stems_ignore_plain_hiragana():
    assert overlap_check.japanese_stems("調整する") == {"調整"}
    assert overlap_check.japanese_stems("ぼんやり") == set()


def test_near_synonym_is_found_by_shared_kanji_in_same_pos_only():
    candidates = [
        {"english": "coordinate", "pos": "verb", "meaning_ja": "調整する", "aliases": ""},
        {"english": "coordinate", "pos": "noun", "meaning_ja": "調整", "aliases": ""},
    ]
    report = overlap_check.check(candidates, ROWS, BY_WORD, ENGLISH)
    assert [w for w, _ in report[0][1]] == []            # 調整 と 調節 は2文字の連なりが違う
    assert [w for w, _ in report[0][2]] == ["aaa"]       # 漢字「調」が共通
    assert report[1][2] == []                              # 品詞が違えば出ない


def test_shared_two_character_window_is_found():
    rows = ROWS + [_row("ddd", "noun", "科学技術", "technology")]
    by_word = {r["regenerated"]: r for r in rows}
    candidates = [{"english": "tech", "pos": "noun", "meaning_ja": "技術者", "aliases": ""}]
    report = overlap_check.check(candidates, rows, by_word, ENGLISH)
    assert [w for w, _ in report[0][1]] == ["ddd"] and report[0][3] == []


def test_english_headword_and_alias_overlap():
    candidates = [{"english": "adjust", "pos": "verb", "meaning_ja": "合わせる", "aliases": "drink|other"}]
    report = overlap_check.check(candidates, ROWS, BY_WORD, ENGLISH)
    assert [(t, w) for t, w, _, _ in report[0][3]] == [("adjust", "aaa"), ("drink", "bbb")]


def test_common_kanji_do_not_count_as_shared():
    rows = ROWS + [_row("eee", "adj", "不便な", "inconvenient")]
    by_word = {r["regenerated"]: r for r in rows}
    candidates = [{"english": "unfair", "pos": "adj", "meaning_ja": "不公平な", "aliases": ""}]
    assert overlap_check.check(candidates, rows, by_word, ENGLISH)[0][2] == []


def test_render_skips_words_without_overlap():
    candidates = [{"english": "zzz", "pos": "verb", "meaning_ja": "走る", "aliases": ""}]
    assert overlap_check.render(overlap_check.check(candidates, ROWS, BY_WORD, ENGLISH)) == ""
