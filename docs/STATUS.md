# いまの状態（3者の引き継ぎ）

作業を始めるときに読み、終えるときに更新します。ルールは [docs/WORKFLOW.md](WORKFLOW.md)。

現在のバージョン: v0.20

## 決定してほしいこと（M1ko）

| 内容 | 場所 | 状態 |
|---|---|---|
| 提案013: 助数詞（Q1）・順序数と回数（Q2）・単位の語（Q3）| `docs/proposals/013-counters-and-units.md` | 決定待ち（Q3の単位5語 `kilometer`・`millimeter`・`kilogram`・`liter`・`percent` は第5弾 PR #60 で先行追加済み）|
| 提案014: 同じくらい（Q1）・動詞の比較と最上級の範囲（Q2）・「より」と the + 最上級（Q3）| `docs/proposals/014-comparison.md` | 決定待ち |
| 提案012の試験運用に使う、モデルの鍵（環境変数 `SCREEN_API_KEY`・`SCREEN_API_BASE`・`SCREEN_MODEL`）| `docs/proposals/012-word-screening.md`、`tools/screen_words.py` | 鍵待ち（Claude は鍵を持っていない）|
| 第5弾〜第14弾の追加語（計500語）の確認 | `docs/review/new_words.md`、`dictionary/word_review.csv` | Claude の確認は済み（note に【修正推奨】7語・【任意】61語）。M1ko の確認待ち（`draft` → `ok` / `fix`）。次のバッチは、この確認が終わってから（WORKFLOW §2 の4）|

## 進行中のPR

| PR | 担当 | 内容 | 状態 |
|---|---|---|---|
| （なし）| | | |

## 文法への依頼（Antigravity → Claude）

単語を増やす途中で、文法の決めごとが足りないと気づいたことをここに書きます。

| 日付 | 依頼 | 状態 |
|---|---|---|
| （まだありません）| | |

## 担当ごとの次の作業

- **Claude**: 次の文法の提案を書く（候補: 比較・最上級の整理、そのほか M1ko が決めてほしい分野）。提案013が決まったら実装する。提案012は、鍵が用意できたら測る。ANTI の追加語を PR ごとに確認し、気づいた点を確認表の note に書く。毎回の報告に、次の文法の提案を含める。
- **Antigravity**: M1ko が第5弾〜第14弾の確認を終えるまで、新しいバッチは出さない。確認で `fix` になった語があれば、直す（既存語の変更なので、そのPRは M1ko がマージ）。
- **M1ko**: GitHub の設定（Automatically delete head branches を有効にする。squash merge を許可する）、マージ済みブランチの削除（Claude は git プロキシの制限で消せなかった）、提案012の鍵の用意、提案013の決定、500語の確認。

## 最近の主な変更

`docs/CHANGELOG.md`（v0.16 までの記録）と `git log`、`docs/grammar.md` §11 を見てください。この STATUS には、いまの状態だけを書きます（`docs/WORKFLOW.md` §4）。
