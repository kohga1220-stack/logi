"""tools/coverage_check.py のテスト（実際の翻訳機を使う）。"""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))

import coverage_check  # noqa: E402


def test_unknown_words_are_counted_and_known_sentences_pass(tmp_path):
    path = tmp_path / "s.txt"
    path.write_text("# 注釈\n私は毎日パンを食べる。\n私はカピバラを見た。\n私はカピバラを見る。\nI see a dog.\n", encoding="utf-8")
    rows = coverage_check.run(path)
    assert [r["lang"] for r in rows] == ["ja", "ja", "ja", "en"]
    counts, examples = coverage_check.unknown_counts(rows)
    assert counts == {"カピバラ": 2} and examples["カピバラ"] == "私はカピバラを見た。"
    text = coverage_check.render(rows, unknown_only=True)
    assert "未登録語なしで訳せた文: 2 件（50%）" in text and "カピバラ | 2" in text
