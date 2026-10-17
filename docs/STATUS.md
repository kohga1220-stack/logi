# いまの状態（3者の引き継ぎ）

作業を始めるときに読み、終えるときに更新します。ルールは [docs/WORKFLOW.md](WORKFLOW.md)。

現在のバージョン: v0.20

## 決定してほしいこと（M1ko）

| 内容 | 場所 | 状態 |
|---|---|---|
| 提案013: 助数詞（Q1）・順序数と回数（Q2）・単位の語（Q3）| `docs/proposals/013-counters-and-units.md` | 決定待ち（Q3の単位5語 `kilometer`・`millimeter`・`kilogram`・`liter`・`percent` は第5弾 PR #60 で先行追加済み）|
| 提案012の試験運用に使う、モデルの鍵（環境変数 `SCREEN_API_KEY`・`SCREEN_API_BASE`・`SCREEN_MODEL`）| `docs/proposals/012-word-screening.md`、`tools/screen_words.py` | 鍵待ち（鍵がないと、第4弾50語での測定ができない。Claude は鍵を持っていない）|
| 第4弾で `fix` にした6語の直し（jikia・pawusa・ejisa・simapa・pupito・pakako）| `dictionary/word_review.csv`（note に理由）| `tests/test_screen_words.py` 20行目に `by_english["sympathy"]` がハードコードされており ANTI 権限では変更できないため、Claude の修正またはテスト更新を待つ（既存語の変更なので M1ko がマージ）|
| 第5弾〜第14弾の追加語（計500語、PR #60〜#69）の確認 | `docs/review/new_words.md`、`dictionary/word_review.csv` | Claude と M1ko の確認待ち |

## 進行中のPR

| PR | 担当 | 内容 | 状態 |
|---|---|---|---|
| （このPR #69）| Antigravity | 第14弾（50語）追加、STATUS 更新（第5弾〜第14弾の計500語完了）| ドラフト → CI が通ったらスカッシュでマージ |

## 文法への依頼（Antigravity → Claude）

単語を増やす途中で、文法の決めごとが足りないと気づいたことをここに書きます。

| 日付 | 依頼 | 状態 |
|---|---|---|
| 2026-10-18 | 第4弾の `ejisa`（以外）は前置詞に近い機能語（except / besides）と指摘されたため、辞書から削除するか機能語として設計するか決めてほしい | 未着手 |
| 2026-10-18 | `tests/test_screen_words.py` 20行目（`assert by_english["sympathy"]["aliases"] == "compassion"`）が第4弾 `fix` 語の `simapa`（`sympathy`）に依存しており、`simapa` を削除または見出し語変更すると `pytest` が落ちるため、ハードコードを外すか Claude 側で `fix` 6語の修正と同乗してほしい | 未着手 |

## 担当ごとの次の作業

- **Claude**: 第5弾〜第14弾（PR #60〜#69、計500語）を確認し、確認表の note に書く。第4弾で `fix` になった6語（`jikia`・`pawusa`・`ejisa`・`simapa`・`pupito`・`pakako`）について、`tests/test_screen_words.py` の `sympathy` ハードコードを直したうえで修正PRを出す（またはテストのみ直して ANTI に渡す）。次の文法の提案を書く。提案012は鍵が用意できたら測る。
- **Antigravity**: 第5弾〜第14弾（計500語）の確認が終わるまで、新しいバッチは出さずに待つ。`tests/test_screen_words.py` のハードコードが解消され次第（または Claude 側で対応しない場合）、第4弾 `fix` 6語を直す。
- **M1ko**: GitHub の設定（Automatically delete head branches を有効にする。squash merge を許可する）、マージ済みブランチの削除（Claude は git プロキシの制限で消せなかった）、提案012の鍵の用意、提案013の決定、第5弾〜第14弾（500語）の確認、自動マージされないPR（`docs/WORKFLOW.md` §9 の対象外）のマージ。

## 最近の主な変更

`docs/CHANGELOG.md`（v0.16 までの記録）と `git log`、`docs/grammar.md` §11 を見てください。この STATUS には、いまの状態だけを書きます（`docs/WORKFLOW.md` §4）。
