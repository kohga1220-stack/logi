# いまの状態（3者の引き継ぎ）

作業を始めるときに読み、終えるときに更新します。ルールは [docs/WORKFLOW.md](WORKFLOW.md)。

現在のバージョン: v0.16

## 決定してほしいこと（M1ko）

| 内容 | 場所 | 状態 |
|---|---|---|
| 提案008: 年月日（Q1）・時刻（Q2）・時の前置詞と毎来先（Q3）| `docs/proposals/008-dates-and-times.md` | 決定待ち |
| 提案009: 間接疑問（Q1）・間接命令（Q2）・引用の主語（Q3）| `docs/proposals/009-indirect-questions-and-commands.md` | 決定待ち |
| 提案010: 敬語の方針（Q1）・敬語の動詞とお／ご・さん／様（Q2）・定型句（Q3）| `docs/proposals/010-honorifics.md` | 決定待ち |
| 第4弾の50語の確認（確認表。`dictionary/word_review.csv` で `draft` の語。Claude の確認の note つき）| `docs/review/new_words.md` | 確認待ち（終わるまで、ANTI の次のバッチは出さない。WORKFLOW §2）|

## 進行中のPR

| PR | 担当 | 内容 | 状態 |
|---|---|---|---|
| （このPR）| Claude | PR とマージを減らす決まり（スカッシュ・ラウンドでまとめる・STATUS を軽く）| ドラフト（決まりの変更なので、M1ko がマージ）|

## 文法への依頼（Antigravity → Claude）

単語を増やす途中で、文法の決めごとが足りないと気づいたことをここに書きます。

| 日付 | 依頼 | 状態 |
|---|---|---|
| （まだありません）| | |

## 担当ごとの次の作業

- **Claude**: 提案008・009・010が決まったら実装する（v0.17〜v0.19）。次の提案（時刻によるあいさつ・追加語の事前スクリーニング）を書く。ANTI の追加語を、PR ごとに確認し（意味の重なり・英語の見出し語・別名）、気づいた点を確認表の note に書く（M1ko の依頼、2026-10-17）。毎回の報告に、次の文法の提案を含める（同）。残りの候補: 時刻によるあいさつ（Good afternoon など）、追加語の事前スクリーニング（LLM）、そのほか M1ko が決めてほしい分野。
- **Antigravity**: 第4弾（#54）はマージ済み。M1ko の確認（`docs/review/new_words.md` / `dictionary/word_review.csv`）が終わるまで次のバッチは出さない。
- **M1ko**: PR とマージを減らす決まり（このPR）のマージ、GitHub の設定（Automatically delete head branches を有効にする。squash merge を許可する）、マージ済みブランチ55本の削除の許可（Claude の自動判定が止めたため、M1ko が許可するか、GitHub 画面で消す）。提案008・009・010の決定。自動マージされないPR（`docs/WORKFLOW.md` §9 の対象外）のマージ。第4弾50語の確認表（`docs/review/new_words.md`）の確認。

## 最近の主な変更

`docs/CHANGELOG.md`（v0.16 までの記録）と `git log`、`docs/grammar.md` §11 を見てください。この STATUS には、いまの状態だけを書きます（`docs/WORKFLOW.md` §4）。
