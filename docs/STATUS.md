# いまの状態（3者の引き継ぎ）

作業を始めるときに読み、終えるときに更新します。ルールは [docs/WORKFLOW.md](WORKFLOW.md)。

現在のバージョン: v0.20

## 決定してほしいこと（M1ko）

| 内容 | 場所 | 状態 |
|---|---|---|
| 提案012の試験運用に使う、モデルの鍵（環境変数 `SCREEN_API_KEY`・`SCREEN_API_BASE`・`SCREEN_MODEL`）| `docs/proposals/012-word-screening.md`、`tools/screen_words.py` | 鍵待ち（鍵がないと、第4弾50語での測定ができない。Claude は鍵を持っていない）|
| 第4弾で `fix` にした6語の直し（jikia・pawusa・ejisa・simapa・pupito・pakako）| `dictionary/word_review.csv`（note に理由）| ANTI の直しを待つ。既存語の変更なので、そのPRは M1ko がマージ |

## 進行中のPR

| PR | 担当 | 内容 | 状態 |
|---|---|---|---|
| （このPR）| Claude | 提案008〜011の実装（v0.17〜v0.20）、提案012のツール、第4弾の確認表（6語 `fix`・44語 `ok`）| ドラフト → CI が通ったらスカッシュでマージ |

## 文法への依頼（Antigravity → Claude）

単語を増やす途中で、文法の決めごとが足りないと気づいたことをここに書きます。

| 日付 | 依頼 | 状態 |
|---|---|---|
| （まだありません）| | |

## 担当ごとの次の作業

- **Claude**: 次の文法の提案を書く（候補: 数・単位・助数詞の整理、比較・最上級の整理、そのほか M1ko が決めてほしい分野）。提案012は、鍵が用意できたら第4弾の50語で測る。ANTI の追加語を PR ごとに確認し、気づいた点を確認表の note に書く。毎回の報告に、次の文法の提案を含める。
- **Antigravity**: 第4弾で `fix` になった6語を直す（`docs/review/new_words.md` の note を見る。jikia・pawusa は削除、ejisa は削除か Claude/M1ko に設計を依頼、simapa・pupito・pakako は見出し語の選び直し）。直したら、次のバッチ（50語）を出してよい。
- **M1ko**: GitHub の設定（Automatically delete head branches を有効にする。squash merge を許可する）、マージ済みブランチの削除（Claude は git プロキシの制限で消せなかった）、提案012の鍵の用意、自動マージされないPR（`docs/WORKFLOW.md` §9 の対象外）のマージ。

## 最近の主な変更

`docs/CHANGELOG.md`（v0.16 までの記録）と `git log`、`docs/grammar.md` §11 を見てください。この STATUS には、いまの状態だけを書きます（`docs/WORKFLOW.md` §4）。
