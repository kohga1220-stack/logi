# いまの状態（3者の引き継ぎ）

作業を始めるときに読み、終えるときに更新します。ルールは [docs/WORKFLOW.md](WORKFLOW.md)。

現在のバージョン: v0.20

## 決定してほしいこと（M1ko）

| 内容 | 場所 | 状態 |
|---|---|---|
| 提案013: 助数詞（Q1）・順序数と回数（Q2）・単位の語（Q3）| `docs/proposals/013-counters-and-units.md` | 決定待ち（Q3の単位5語 `kilometer`・`millimeter`・`kilogram`・`liter`・`percent` は第5弾 PR #60 で先行追加済み）|
| 提案014: 同じくらい（Q1）・動詞の比較と最上級の範囲（Q2）・「より」と the + 最上級（Q3）| `docs/proposals/014-comparison.md` | 決定待ち |
| 提案012の試験運用に使う、モデルの鍵（環境変数 `SCREEN_API_KEY`・`SCREEN_API_BASE`・`SCREEN_MODEL`）| `docs/proposals/012-word-screening.md`、`tools/screen_words.py` | 鍵待ち（Claude は鍵を持っていない）|
| 第5弾〜第14弾の追加語（計500語）の確認 | `docs/review/new_words.md`、`dictionary/word_review.csv` | Claude の確認は済み（note に【修正推奨】7語・【任意】61語）。M1ko の確認待ち（`draft` → `ok` / `fix`）。M1ko の不在中は、WORKFLOW §2 の4を今回だけ免除して、ANTI が最大500語まで続ける（下の「担当ごとの次の作業」）|

## 進行中のPR

| PR | 担当 | 内容 | 状態 |
|---|---|---|---|
| #73 | Claude | 第5〜14弾の【修正推奨】7語の直し（削除5語・見出し語の変更2語）| ドラフト（既存語の変更なので、M1ko がマージ）|

## 文法への依頼（Antigravity → Claude）

単語を増やす途中で、文法の決めごとが足りないと気づいたことをここに書きます。

| 日付 | 依頼 | 状態 |
|---|---|---|
| （まだありません）| | |

## 担当ごとの次の作業

- **Claude**: 次の文法の提案を書く（候補: 「なる」の言い方（変化）、形容詞から副詞を作る規則、そのほか M1ko が決めてほしい分野）。提案013が決まったら実装する。提案012は、鍵が用意できたら測る。ANTI の追加語を PR ごとに確認し、気づいた点を確認表の note に書く（M1ko の不在中も続ける）。#73 のマージ後、残りの【修正推奨】があれば同じ形で出す。毎回の報告に、次の文法の提案を含める。
- **Antigravity**（M1ko が不在の間、長時間の作業。M1ko の選択、2026-10-18「追加を続ける」「直しのPRも並行」）:
  - **WORKFLOW §2 の4は、今回だけ免除**する（500語の確認が終わる前でも、次のバッチを出してよい）。上限は **50語 × 10バッチ（500語）まで**。上限に達したら止まり、STATUS に「上限まで完了」と書く。
  - 1バッチ = 50語 = 1PR。§5 の検査を全部通し、CI が通ったらスカッシュでマージし、ブランチを消す（これまでどおり）。バッチの前に `git pull` して、衝突したら `main` を取り込み、`python tools/make_review.py` と `python tools/build_web.py` で生成物を作り直す。
  - **#73（Claude が出す【修正推奨】7語の直し）には触らない。** M1ko のマージ待ち。その7語（`keliwa`・`katui`・`tumato`・`pinulo`・`tisimo`・`metana`・`mupala`）は、バッチの候補にも入れない。
  - 第5〜14弾の確認 note（`dictionary/word_review.csv` の【任意】）の失敗パターンを、次のバッチで繰り返さない。語を選ぶとき、次を守る:
    1. **英語の見出し語は、最もよく使う1語**にする。まれな語（`knead`・`serene`・`pellucid` など）しか思いつかない語は、**足さずに飛ばす**（候補が尽きるまで質を下げない）。
    2. **別名に、別の語の意味を入れない。** 例: lobster（伊勢海老）、onion（玉ねぎ）、seaweed、hip（腰）、bolt、teapot、tambourine、cement、syntax、satan、chancellor、angler。迷ったら別名は空にする。
    3. **日本語が自動詞なら、英語も自然な自動詞**にする（dampen・dishevel・dumbfound のような他動詞は避ける）。逆に他動詞のときは、他動詞にする。
    4. **名詞の見出し語を、-ing の形（boiling）・複数形（academics・scores）・形容詞が主の語（solid・offshore）**にしない。
    5. **動名詞（動詞 + `na`）や既存の語で言える名詞は足さない**（例: 迎え は `weluko` + `na`）。
    6. 英語1語が見つからない語（例: 億）は、足さない。
  - 手順1（意味の重なりの検索）と手順2（見出し語と別名の確認）の結果は、PR の本文の表に付ける（これまでどおり）。
  - 文法が足りないと気づいたら、勝手に決めず、上の「文法への依頼」に書いて、次の語に進む（止まらない）。
  - 候補は `python tools/core_candidates.py` が出す。同じ候補が尽きたり、質を守れる語が見つからなくなったりしたら、上限に達していなくても止まり、STATUS に状況を書く。
- **M1ko**: GitHub の設定（Automatically delete head branches を有効にする。squash merge を許可する）、マージ済みブランチの削除（Claude は git プロキシの制限で消せなかった）、提案012の鍵の用意、提案013の決定、500語の確認、#73（【修正推奨】7語の直し）のマージ。

## 最近の主な変更

`docs/CHANGELOG.md`（v0.16 までの記録）と `git log`、`docs/grammar.md` §11 を見てください。この STATUS には、いまの状態だけを書きます（`docs/WORKFLOW.md` §4）。
