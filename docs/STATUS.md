# いまの状態（3者の引き継ぎ）

作業を始めるときに読み、終えるときに更新します。ルールは [docs/WORKFLOW.md](WORKFLOW.md)。

現在のバージョン: v0.11

## 決定してほしいこと（M1ko）

| 内容 | 場所 | 状態 |
|---|---|---|
| （提案の決定待ちはありません）| | |
| 追加語（約1,075語）の音と意味の確認 | `docs/review/new_words.md`、`dictionary/word_review.csv` | 未確認 |

## 進行中のPR

| PR | 担当 | 内容 | 状態 |
|---|---|---|---|
| （開いているPRはありません）| | | |

## 文法への依頼（Antigravity → Claude）

単語を増やす途中で、文法の決めごとが足りないと気づいたことをここに書きます。

| 日付 | 依頼 | 状態 |
|---|---|---|
| （まだありません）| | |

## 担当ごとの次の作業

- **Claude**: 命令・依頼の文型（「〜してください」）の提案を書く。
- **Antigravity**: 新しい追加語のPRは、M1ko が追加語の確認表の確認を終えてから（`docs/WORKFLOW.md` §2「語を選ぶときの決まり」）。
- **M1ko**: 追加語の確認表の確認。自動マージされないPR（`docs/WORKFLOW.md` §9 の対象外）のマージ。

## 最近の主な変更

- 自動マージの決まり（`docs/WORKFLOW.md` §9。M1ko が了承、2026-10-15）: 条件（CI成功・衝突なし・未対応のコメントなし ほか）を満たすPRは、Claude と Antigravity がマージする。決まりの変更・CI・`CLAUDE.md`・`AGENTS.md`・既存の語の削除や書き換え・未決定の文法の実装は、M1ko がマージする。
- `.github/workflows/antigravity-agent.yml` は、M1ko が公式のものと確認済み。
- 25語（PR #26）の見直し（Antigravity。PR #30）: `mekula`（規則）を削除して既存の `lula`（ルール）に統一し、`lula` に別名 `regulation` を追加。`anti_additions.csv` の `source` を日本語の見出し語に。辞書は1,701語（active 1,668語）。
- `coin_words.py`: 追加する行の別名（aliases）が、同じ品詞の別の語の英語と重なるときも止める。WORKFLOW §2 の別名の例（lesson・class・few・little は、すでに別の語が持っている）を直した。
- v0.11: あいさつ `kelosu`（こんにちは）・`kupaju`（さようなら）・`pilisu`（どうぞ）（提案002の決定を実装）。翻訳機の日本語・英語の対応と、例文3文。辞書は1,702語（active 1,669語）。
- `docs/WORKFLOW.md` に「語を選ぶときの決まり」（意味の重なりの事前確認、英語の見出し語の選び方、新しいバッチは前の確認が終わってから）と、コミットの作者を上書きしない決まりを追加。
- 内容語25語の追加（Antigravity。庭・葬式・商売など。PR #26）。辞書は1,699語（active 1,666語）。
- v0.10: 指示詞 `iliu`・`teliu`、はい `jesu`（いいえは `no`）、数量の疑問 `aua mene`、年齢の疑問 `wata ila`（提案001の決定を実装）。翻訳機の英語・日本語の対応と、例文7文（PR #23）。
- `coin_words.py`: すでにある語と同じ意味になる追加行を止める（PR #22）。
- 分担と進め方（`docs/WORKFLOW.md`）、整合性と担当範囲の検査をCIに追加（PR #19）。
- 翻訳機: 動詞の名詞化に対応（「食べるのが好き」・Reading books is fun.。PR #18）。
- 追加語の確認表（`docs/review/new_words.md`、`dictionary/word_review.csv`。PR #17）。
- 設計案 001（指示詞・はい／いいえ・いくつ／いくら。PR #16）。

- v0.9.1: 名詞 `puwoja`（プログラム）を追加（1,671語）。
- v0.9: 現代・IT語彙10語（Antigravity）。
- v0.8: 日本語の基本語彙549語（国立国語研究所のリストが基準）。
- v0.7: 英検3級レベルの語487語。
