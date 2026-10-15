"""文書・辞書・ツールの整合性（tools/check_consistency.py）と、担当範囲の検査（tools/check_scope.py）を確かめる。"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "tools"))

import check_consistency  # noqa: E402
import check_scope  # noqa: E402


def test_docs_and_dictionary_are_consistent():
    assert check_consistency.count_problems() == []
    assert check_consistency.version_problems() == []
    assert check_consistency.source_problems() == []


def test_every_count_spot_exists():
    # 語数の表記の場所が文書から消えたら、検査が黙って通らないようにする
    for rel, pattern, _ in check_consistency.COUNT_SPOTS:
        text = (check_consistency.ROOT / rel).read_text(encoding="utf-8")
        assert check_consistency.re.search(pattern, text), (rel, pattern)


def test_anti_branch_may_change_vocabulary_files():
    changed = ["dictionary/core_additions.csv", "dictionary/final.csv", "dictionary/glossary_en.csv",
               "web/lexicon.js", "docs/review/new_words.md", "docs/STATUS.md", "README.md"]
    assert check_scope.violations("anti/food-words", changed, lambda p: None, lambda p: None) == []


def test_anti_branch_may_not_change_grammar_or_tools():
    changed = ["docs/grammar.md", "web/translator.js", "tools/coin_words.py", "tests/test_dictionary.py", ".github/workflows/tests.yml"]
    problems = check_scope.violations("anti/food-words", changed, lambda p: None, lambda p: None)
    assert len(problems) == len(changed)


def test_anti_branch_may_change_only_the_numbers_in_count_files():
    base = "辞書（約1,630語）と簡単なルール"
    assert check_scope.violations("anti/x", ["web/index.html"], lambda p: base, lambda p: base.replace("1,630", "1,700")) == []
    problems = check_scope.violations("anti/x", ["web/index.html"], lambda p: base, lambda p: base + " 新しい機能")
    assert len(problems) == 1


def test_other_branches_are_not_restricted():
    assert check_scope.violations("claude/anything", ["docs/grammar.md"], lambda p: None, lambda p: None) == []
    assert check_scope.violations("user/hand-edit", ["web/translator.js"], lambda p: None, lambda p: None) == []


def test_anti_additions_list_is_registered_and_in_anti_scope():
    # Antigravity が tools/ を変えずに追記できる専用リスト
    import coin_words

    path = check_consistency.ROOT / "dictionary" / "anti_additions.csv"
    assert path.exists()
    assert path.read_text(encoding="utf-8").splitlines()[0] == "english,pos,meaning_ja,aliases,source"
    assert path.resolve() in {Path(p).resolve() for p, _ in coin_words.SOURCES}
    assert check_scope.violations("anti/x", ["dictionary/anti_additions.csv"], lambda p: None, lambda p: None) == []
