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


def _stub_synsets(groups):
    """作り物の類義語表: {英語: {まとまりの名前}}（形容詞の隣り合うまとまりは expand=True のとき足す）。"""
    def synsets(word, pos, expand=False):
        names = set(groups.get(word.lower(), set()))
        if expand:
            for n in list(names):
                names |= groups.get(n, set())
        return names
    return synsets


def test_english_synonym_is_found_through_wordnet_style_groups():
    rows = ROWS + [_row("fff", "adj", "丈夫な", "sturdy")]
    by_word = {r["regenerated"]: r for r in rows}
    english = {"adjust": ["aaa"], "sturdy": ["fff"]}
    synsets = _stub_synsets({"sturdy": {"hardy"}, "stout": {"hardy"}})
    candidates = [{"english": "stout", "pos": "adj", "meaning_ja": "頑強な", "aliases": ""}]
    report = overlap_check.check(candidates, rows, by_word, english, synsets)
    assert [(t, w, tok) for t, w, tok, _ in report[0][4]] == [("stout", "fff", "sturdy")]
    assert overlap_check.check(candidates, rows, by_word, english)[0][4] == []   # WordNet がなければ調べない


def test_candidates_in_the_same_batch_are_compared_with_each_other():
    candidates = [
        {"english": "citadel", "pos": "noun", "meaning_ja": "城塞", "aliases": ""},
        {"english": "fortress", "pos": "noun", "meaning_ja": "要塞", "aliases": ""},
        {"english": "walk", "pos": "verb", "meaning_ja": "歩く", "aliases": ""},
    ]
    synsets = _stub_synsets({"citadel": {"fort"}, "fortress": {"fort"}})
    pairs = overlap_check.batch_overlaps(candidates, synsets)
    assert pairs == [(0, 1, "漢字が共通・英語が類義語")]   # 品詞が違う語は比べない
    report = overlap_check.check(candidates, ROWS, BY_WORD, ENGLISH, synsets)
    assert [e for e, _, _ in report[0][5]] == ["fortress"] and [e for e, _, _ in report[1][5]] == ["citadel"]


def test_table_puts_strong_overlaps_first_and_marks_kanji_only_rows():
    candidates = [
        {"english": "coordinate", "pos": "verb", "meaning_ja": "調整する", "aliases": ""},   # 漢字が1字共通するだけ
        {"english": "sleep", "pos": "verb", "meaning_ja": "寝る", "aliases": ""},       # 英語の見出し語が同じ → 強い
        {"english": "zzz", "pos": "noun", "meaning_ja": "走者", "aliases": ""},
    ]
    rows = ROWS
    by_word = BY_WORD
    english = {"adjust": ["aaa"], "drink": ["bbb"], "sleep": ["ccc"]}
    table = overlap_check.render_table(overlap_check.check(candidates, rows, by_word, english))
    body = table.splitlines()
    assert body[0].startswith("強い重なりのある語: 1 / 3 語")
    first_row = body[4]
    assert "sleep (verb)" in first_row and "（要記入）" in first_row
    assert "漢字が共通するだけ" in table and "重なりなし" in table
