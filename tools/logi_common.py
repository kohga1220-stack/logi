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


def is_known(token, words, verbs):
    """辞書の語、または動名詞なら True。"""
    return token in words or gerund_stem(token, verbs) is not None


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
