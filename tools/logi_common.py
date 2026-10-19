"""tools / tests で共有する Logi の語彙ヘルパー。"""

import re


def tokenize(sentence):
    """Logi 文を小文字の語に分ける。"""
    return re.findall(r"[a-z]+", sentence.lower())


def gerund_stem(token, verbs):
    """token が動詞 + na の動名詞なら元の動詞を返す。違えば None。"""
    if token.endswith("na") and token[:-2] in verbs:
        return token[:-2]
    return None


def derived_adverb_stem(token, adjectives):
    """token が形容詞の語尾 -e を -i に替えた派生の副詞（docs/proposals/016）なら元の形容詞を返す。違えば None。"""
    if token.endswith("i") and token[:-1] + "e" in adjectives:
        return token[:-1] + "e"
    return None


def is_known(token, words, verbs, adjectives=frozenset()):
    """辞書の語、動名詞、または形容詞から作る副詞なら True。"""
    return (token in words or gerund_stem(token, verbs) is not None
            or derived_adverb_stem(token, adjectives) is not None)


def logi_sentences_in_doc(text):
    """Markdown の表・箇条書きの中の Logi 例文（代名詞・ipu などで始まり . か ? で終わる）。"""
    found = []
    for line in text.splitlines():
        if not line.startswith(("|", "- ")):
            continue
        for cell in line.lstrip("- ").split("|"):
            cell = re.sub(r"[（(].*$", "", cell).strip()
            if re.fullmatch(r"(mi|tu|li|ipu|tuka|kua|somena|misu|mipu)\b[a-z ,]*[.?]", cell):
                found.append(cell)
    return found
