# 旧パイプライン（legacy）

v0.3 の辞書 `dictionary/final.csv` は、次の順で作られた。

1. `raw.csv`（変換前の原典）→ `regenerate.py` → `master.csv`
2. `master.csv` → `resolve.py`（同音衝突の手動解決を適用）→ `final.csv`

`raw.csv` と `master.csv` はこのリポジトリに含まれない。そのためこの2つのツールは通常のままでは動かず、
`resolve.py` は実行すると `final.csv` を上書きする（v0.4 以降に足した `status` / `replaced_by` 列も失われる）。

**v0.4 以降、`dictionary/final.csv` を正本とする。** 辞書の追加・変更は `final.csv` を直接編集し、
`python tools/validate.py` と `python -m pytest` で検証する。同義語の整理は `tools/synonyms.py` を使う。

履歴のために残してあり、実行するには `--force` を付ける。
