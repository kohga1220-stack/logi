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
    changed = ["dictionary/anti_additions.csv", "dictionary/final.csv", "dictionary/glossary_en.csv",
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


def test_coin_words_refuses_words_that_duplicate_existing_ones(tmp_path, monkeypatch):
    import coin_words

    extra = tmp_path / "extra_additions.csv"
    extra.write_text(
        "english,pos,meaning_ja,aliases,source\n"
        "shine,verb,光る,,t\n"           # 同じ英語・品詞の語がすでにある
        "gizmo,noun,小道具,,t\n"          # 新しい語
        "gizmo,noun,別の小道具,,t\n",     # リストの中で重なる
        encoding="utf-8",
    )
    monkeypatch.setattr(coin_words, "SOURCES", [(extra, "T追加: ")])
    fields, rows = coin_words.load_dictionary()
    english_to_word = {}
    import csv
    pos_of = {r["regenerated"]: r["pos"] for r in rows}
    with coin_words.GLOSSARY.open(newline="", encoding="utf-8") as f:
        for g in csv.DictReader(f):
            for e in g["en"].split("|"):
                english_to_word.setdefault((e.lower(), pos_of.get(g["word"])), g["word"])
    problems = coin_words.duplicate_problems(rows, english_to_word)
    assert any("shine" in p and "sipo" in p for p in problems)
    assert any("gizmo" in p and "追加リストの中" in p for p in problems)
    assert len(problems) >= 2


def test_anti_branch_may_not_change_function_word_list():
    problems = check_scope.violations("anti/x", ["dictionary/function_additions.csv"], lambda p: None, lambda p: None)
    assert len(problems) == 1


def test_function_words_use_the_fixed_form_and_keep_distance(monkeypatch):
    # 形を指定した機能語（iliu・teliu・jesu）が、規則を満たしている
    import csv
    import coin_words

    fields, rows = coin_words.load_dictionary()
    taken = {r["regenerated"] for r in rows}
    path = check_consistency.ROOT / "dictionary" / "function_additions.csv"
    with path.open(newline="", encoding="utf-8") as f:
        additions = list(csv.DictReader(f))
    assert {a["word"] for a in additions} == {"iliu", "teliu", "jesu"}
    for a in additions:
        others = taken - {a["word"]}
        assert coin_words.fixed_word_problem(a["word"], a, others) is None, a["word"]
