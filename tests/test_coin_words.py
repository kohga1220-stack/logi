"""tools/coin_words.py の造語の探索（variants で足りないときの deeper_variants）のテスト。"""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
import coin_words  # noqa: E402


def hamming(a, b):
    return sum(x != y for x, y in zip(a, b))


def test_coin_searches_three_changes_before_returning_a_distance_one_form():
    stem = coin_words.build_stem("tempo", "noun")
    # 語幹と1文字だけ違う形（と語幹そのもの）を使用済みにすると、2か所の変更では編集距離2以上にならない
    taken = {c + "a" for c in coin_words.variants(stem) if hamming(c, stem) <= 1}
    word = coin_words.coin("tempo", "noun", taken, set())
    assert word is not None
    assert word not in taken
    assert coin_words.nearest_distance(word, taken) >= 2
    assert hamming(word[:-1], stem) == 3


def test_coin_result_is_unchanged_when_a_close_variant_is_free():
    # 空きが十分あるときは、これまでと同じ（variants の最初の受け入れ可能な形）
    stem = coin_words.build_stem("tempo", "noun")
    word = coin_words.coin("tempo", "noun", set(), set())
    assert word == next(c + "a" for c in coin_words.variants(stem)
                        if coin_words.acceptable(c + "a", "noun", set(), set()))
