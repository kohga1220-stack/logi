import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "tools"))
import check_sources


def row(english, ja, cite):
    return {"english": english, "meaning_ja": ja, "source": f"国語研教育基本語彙: {cite}"}


TEXT = "庭,中庭,換気,古風"


def test_exact_headword_passes():
    assert check_sources.problems([row("garden", "庭", "庭")], TEXT) == []


def test_suffix_is_ignored():
    assert check_sources.problems([row("ventilate", "換気する", "換気")], TEXT) == []


def test_nearby_word_is_flagged():
    found = check_sources.problems([row("courtyard", "中庭", "庭")], TEXT)
    assert found and "近い基本語" in found[0][3]


def test_word_missing_from_source_is_flagged():
    found = check_sources.problems([row("inland", "内陸に", "内陸")], TEXT)
    assert found and "載っていない" in found[0][3]


def test_non_matching_prefix_is_skipped():
    assert check_sources.problems([{"english": "x", "meaning_ja": "y", "source": "別の出典"}], TEXT) == []
