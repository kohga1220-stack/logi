"""tools/screen_words.py のテスト（モデルは呼ばず、決まった返事で確かめる）。"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
import screen_words  # noqa: E402


def make_items():
    return screen_words.load_items(ROOT / "dictionary" / "word_review.csv", "ANTI追加")


def test_load_items_reads_review_table_batch():
    items = make_items()
    assert len(items) >= 100
    by_english = {i["english"]: i for i in items}
    assert by_english["sympathy"]["aliases"] == "compassion"
    assert "【修正推奨】" in by_english["sympathy"]["note"]


def test_parse_response_keeps_only_requested_and_valid():
    chunk = [{"english": "pity"}, {"english": "garden"}]
    text = "説明\n" + json.dumps([
        {"english": "pity", "verdict": "bad", "alternative": "sympathy", "reason": "違う"},
        {"english": "garden", "verdict": "????"},
        {"english": "other", "verdict": "ok"},
    ]) + "\n以上"
    assert screen_words.parse_response(text, chunk) == {
        "pity": {"verdict": "bad", "alternative": "sympathy", "reason": "違う"}}
    assert screen_words.parse_response("読めない返事", chunk) == {}


def test_screen_splits_into_chunks_and_never_invents_answers():
    items = [{"english": f"w{n}", "pos": "noun", "meaning_ja": "x", "aliases": "", "note": ""} for n in range(25)]
    calls = []

    def ask(messages):
        calls.append(messages)
        return "[]"

    assert screen_words.screen(items, ask) == {}
    assert len(calls) == 3


def test_compare_counts_agreement_with_manual_notes():
    items = [
        {"english": "a", "note": "Claude【修正推奨】x"},
        {"english": "b", "note": "Claude【任意】y"},
        {"english": "c", "note": ""},
        {"english": "d", "note": ""},
        {"english": "e", "note": "Claude【修正推奨】z"},
    ]
    advice = {"a": {"verdict": "bad"}, "b": {"verdict": "ok"}, "c": {"verdict": "partial"}, "d": {"verdict": "ok"}}
    assert screen_words.compare(items, advice) == {
        "words": 5, "unanswered": 1, "manual_fix": 1, "manual_optional": 1,
        "fix_found": 1, "optional_found": 0, "false_flags": 1}


def test_main_stops_without_environment(monkeypatch, capsys):
    for name in screen_words.ENV_NAMES:
        monkeypatch.delenv(name, raising=False)
    assert screen_words.main([str(ROOT / "dictionary" / "anti_additions.csv")]) == 2
    assert "止まります" in capsys.readouterr().err
