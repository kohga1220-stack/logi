"""web/ の翻訳機: 辞書データが最新か、Node のテストが通るかを検証する。"""

import shutil
import subprocess
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))

import build_web  # noqa: E402


def test_lexicon_js_is_up_to_date():
    expected = build_web.render(build_web.build())
    assert build_web.OUTPUT.read_text(encoding="utf-8") == expected, "python tools/build_web.py を実行してください"


def test_glossary_covers_every_active_word():
    # build() は英語訳の無い語があると SystemExit する
    assert build_web.build()


@pytest.mark.skipif(shutil.which("node") is None, reason="node が無い環境ではスキップ")
def test_translator_node_tests_pass():
    result = subprocess.run(
        ["node", "--test", "web/test/translator.test.js"],
        cwd=ROOT, capture_output=True, text=True, timeout=120,
    )
    assert result.returncode == 0, result.stdout + result.stderr
