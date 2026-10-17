"""追加語の事前スクリーニング（助言だけ。docs/proposals/012）。

追加リストの各語について、LLM に「英語の見出し語が日本語の意味に合っているか」を助言させ、
PR 本文の表の下書きを標準出力に出す。合否の判定や、辞書・確認表の変更はしない。

  python tools/screen_words.py dictionary/anti_additions.csv          # 追加リスト（english, meaning_ja, aliases）
  python tools/screen_words.py dictionary/word_review.csv --batch ANTI追加 --compare
                                                                       # 確認表の語を助言させ、Claude の手での確認（note）と比べる

鍵は環境変数で渡す（リポジトリには置かない）。1 つでも無ければ、何もせず止まる。
  SCREEN_API_KEY   鍵
  SCREEN_API_BASE  OpenAI 互換の API の基底 URL（例: https://example.com/v1。末尾に /chat/completions を付けて呼ぶ）
  SCREEN_MODEL     モデル名

送るのは、語の英語の見出し語・品詞・日本語の意味・別名だけ（公開情報）。個人情報・認証情報は送らない。
"""

import argparse
import csv
import json
import os
import sys
import urllib.request
from pathlib import Path

CHUNK = 10
VERDICTS = ("ok", "partial", "bad")
VERDICT_JA = {"ok": "合う", "partial": "一部ずれる", "bad": "ずれる"}
ENV_NAMES = ("SCREEN_API_KEY", "SCREEN_API_BASE", "SCREEN_MODEL")

SYSTEM_PROMPT = (
    "あなたは辞書の校正者です。各項目は、人工言語の辞書に加える語の「英語の見出し語」「品詞」「日本語の意味」「別名」です。"
    "英語の見出し語（最初の語）が、日本語の意味に、品詞も含めて合っているかを判定してください。"
    "判定は ok（合う）・partial（一部ずれる。別名や見出し語の選び直しで直る）・bad（ずれる。意味が違う・範囲が違う）のどれか。"
    "ずれる場合は、より合う英語の見出し語を alternative に、理由を reason に、短く書いてください。"
    "JSON の配列だけを返してください。各要素は {\"english\": 入力の見出し語, \"verdict\": ..., \"alternative\": ..., \"reason\": ...}。"
)


def load_items(path, batch=None):
    """CSV から {english, pos, meaning_ja, aliases, note} の一覧を読む（追加リストと確認表のどちらでもよい）。"""
    items = []
    with open(path, encoding="utf-8", newline="") as f:
        for row in csv.DictReader(f):
            if batch and row.get("batch") != batch:
                continue
            english, aliases = row.get("english", "").strip(), row.get("aliases", "").strip()
            if "|" in english:   # 確認表は「見出し語|別名|別名」の形
                english, rest = english.split("|", 1)
                aliases = rest.replace("|", ", ")
            items.append({
                "english": english,
                "pos": row.get("pos", "").strip(),
                "meaning_ja": row.get("meaning_ja", "").strip(),
                "aliases": aliases,
                "note": row.get("note", "").strip(),
            })
    return [i for i in items if i["english"]]


def build_messages(chunk):
    lines = [f"{n}. 見出し語={i['english']} / 品詞={i['pos']} / 日本語の意味={i['meaning_ja']} / 別名={i['aliases'] or 'なし'}"
             for n, i in enumerate(chunk, 1)]
    return [{"role": "system", "content": SYSTEM_PROMPT}, {"role": "user", "content": "\n".join(lines)}]


def parse_response(text, chunk):
    """モデルの返事から、見出し語 → 助言 の辞書を作る。読めない項目は入れない（推測で補わない）。"""
    start, end = text.find("["), text.rfind("]")
    if start < 0 or end < start:
        return {}
    try:
        data = json.loads(text[start:end + 1])
    except ValueError:
        return {}
    wanted = {i["english"] for i in chunk}
    out = {}
    for entry in data:
        if not isinstance(entry, dict):
            continue
        english, verdict = entry.get("english"), entry.get("verdict")
        if english in wanted and verdict in VERDICTS:
            out[english] = {"verdict": verdict, "alternative": str(entry.get("alternative") or ""),
                            "reason": str(entry.get("reason") or "")}
    return out


def call_model(messages, env):
    body = json.dumps({"model": env["SCREEN_MODEL"], "messages": messages, "temperature": 0}).encode("utf-8")
    req = urllib.request.Request(
        env["SCREEN_API_BASE"].rstrip("/") + "/chat/completions", data=body,
        headers={"Content-Type": "application/json", "Authorization": "Bearer " + env["SCREEN_API_KEY"]})
    with urllib.request.urlopen(req, timeout=120) as res:
        return json.loads(res.read().decode("utf-8"))["choices"][0]["message"]["content"]


def screen(items, ask):
    """items を CHUNK 語ずつ ask(messages) に渡し、助言の辞書（見出し語 → 助言）を返す。"""
    advice = {}
    for n in range(0, len(items), CHUNK):
        chunk = items[n:n + CHUNK]
        advice.update(parse_response(ask(build_messages(chunk)), chunk))
    return advice


def manual_label(note):
    """Claude の手での確認（note）から、期待する判定を返す。印がなければ ok。"""
    if "【修正推奨】" in note:
        return "bad"
    if "【任意】" in note:
        return "partial"
    return "ok"


def compare(items, advice):
    """手での確認と助言の一致を数える。flagged = partial か bad。"""
    result = {"words": 0, "unanswered": 0, "manual_fix": 0, "manual_optional": 0,
              "fix_found": 0, "optional_found": 0, "false_flags": 0}
    for i in items:
        label = manual_label(i["note"])
        got = advice.get(i["english"])
        result["words"] += 1
        if got is None:
            result["unanswered"] += 1
            continue
        flagged = got["verdict"] != "ok"
        if label == "bad":
            result["manual_fix"] += 1
            result["fix_found"] += flagged
        elif label == "partial":
            result["manual_optional"] += 1
            result["optional_found"] += flagged
        elif flagged:
            result["false_flags"] += 1
    return result


def render_table(items, advice):
    rows = ["| 英語 | 日本語 | 助言 | 代案 | 理由 |", "|---|---|---|---|---|"]
    for i in items:
        a = advice.get(i["english"])
        if a is None:
            rows.append(f"| {i['english']} | {i['meaning_ja']} | （返事なし） | | |")
        else:
            rows.append(f"| {i['english']} | {i['meaning_ja']} | {VERDICT_JA[a['verdict']]} | {a['alternative']} | {a['reason']} |")
    return "\n".join(rows)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("csv", help="追加リスト（anti_additions.csv）か確認表（word_review.csv）")
    parser.add_argument("--batch", help="確認表の batch の値（例: ANTI追加）")
    parser.add_argument("--compare", action="store_true", help="確認表の note（Claude の確認）と比べて数える")
    args = parser.parse_args(argv)

    env = {name: os.environ.get(name, "") for name in ENV_NAMES}
    missing = [name for name, value in env.items() if not value]
    if missing:
        print("環境変数が足りないため、何もせず止まります: " + "、".join(missing), file=sys.stderr)
        return 2
    items = load_items(Path(args.csv), args.batch)
    if not items:
        print("対象の語がありません。", file=sys.stderr)
        return 1
    advice = screen(items, lambda messages: call_model(messages, env))
    print("<!-- 助言です。合否の判定ではありません（docs/proposals/012）。最終確認は M1ko -->")
    print(render_table(items, advice))
    if args.compare:
        print()
        print(json.dumps(compare(items, advice), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
