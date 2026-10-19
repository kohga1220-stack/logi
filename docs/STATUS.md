# いまの状態（3者の引き継ぎ）

作業を始めるときに読み、終えるときに更新します。ルールは [docs/WORKFLOW.md](WORKFLOW.md)。

現在のバージョン: v0.24

## 決定してほしいこと（M1ko）

| 内容 | 場所 | 状態 |
|---|---|---|
| 提案017: 倍・半分・分数（Q1〜Q3）| `docs/proposals/017-multiples-and-fractions.md` | 決定待ち（「お任せ」でもよい。おすすめは Q1〜Q3 すべて A）|
| 第26弾の追加語（101語: 第26弾100語 + `highly`）の確認 | `dictionary/word_review.csv`、`docs/review/new_words.md` | Claude の確認は済み（【修正推奨】3語: `tupoja`・`kelute`・`semaka`、【任意】12語）。M1ko の確認待ち（`draft` → `ok` / `fix`）。【修正推奨】3語の直しは、別のPR（M1ko がマージ）で出す |

## 進行中のPR

| PR | 担当 | 内容 | 状態 |
|---|---|---|---|
| （なし）| | | |

## 文法への依頼（Antigravity → Claude）

単語を増やす途中で、文法の決めごとが足りないと気づいたことをここに書きます。

| 日付 | 依頼 | 状態 |
|---|---|---|
| 2026-10-19 | `tools/coin_words.py` の造語について（情報共有）：名詞（`-a`）が 1,689 語に達し、2音節の名詞枠（空き0個）や母音始まりの3音節名詞枠（`VCVCa`、残り空き4個）、語頭子音連続の3音節名詞枠（`CuCuCa`）では、`variants(stem)`（最大2文字置換）の範囲内に編集距離2以上の空き形が見つからず編集距離1にフォールバックする英語名詞（`alcohol`, `antenna`, `escalator`, `studio`, `helmet` など）が増えています。第25弾では事前に全語シミュレーションを行い、編集距離2以上になる語のみ100語を選びました。今後さらに名詞を増やす場合は、`coin_words.py` の探索候補の広げ方をご検討いただけると助かります。 | 対応済み（Claude: `coin()` が、2か所までの変更で編集距離2以上の形が見つからないとき、3か所の変更まで探すようにした。既存の語は変わらない）|
| 2026-10-19 | 提案016の副詞 `highly`（高く、造語形 `uji`）について：`dictionary/anti_additions.csv` に `highly,adv,高く` を追加して `build_web.py` を走らせると、「高く飛ぶ。」が辞書副詞 `uji` を使って `'uji pulajo.'` と訳せるようになり `unknown` が空になるため、`web/test/translator.test.js` 724行目の `assert.ok(translator.translate('高く飛ぶ。', 'ja').unknown.length > 0);`（および `tests/test_web.py::test_translator_node_tests_pass`）が失敗します。`anti/*` ブランチでは `tools/check_scope.py` により `web/test/translator.test.js` を変更できないため、第26弾には `slyly`（ずる賢く → `sulili`）の1語と内容語99語の計100語を入れ、`highly` は見送りました。Claude 側で `web/test/translator.test.js:724` の更新（例: 副詞を造らない4語のうち「赤く」などで検査するか、`!logi.startsWith('ili ')` に変更）とあわせて `highly` を追加いただくか、テスト更新後に ANTI が追加する形をご検討ください。 | 対応済み（Claude: `highly` = `uji` を追加し、テストを「赤く」（辞書に `leti` があるため派生しない）と「高く飛ぶ」= `uji pulaio.` の検査に更新した）|
| 2026-10-19 | 第26弾の指示にあった基本形容詞の例「熱い・冷たい・危ない」について：WORKFLOW §2 の手順1・2で調べたところ、既存の `ote`（暑い、`hot`）・`kole`（寒い、`cold`）・`tene`（危険な、`dangerous`）と英語見出し語が重なるため新規追加できませんでした。既存の `ote`・`kole`・`tene` の `meaning_ja` に `/熱い`・`/冷たい`・`/危ない` を併記するのが自然と思われますので、Claude 側でご検討いただけると助かります。 | 対応中（Claude: 既存語の書き換えなので、直しのPRに入れて M1ko がマージする）|

## 担当ごとの次の作業

- **Claude**: 提案017が決まったら実装する（提案015・016は v0.23・v0.24 で実装済み）。次の文法の提案を書く（候補: 〜ことになる・〜ようになる、make + 目的語 + 名詞（授与との区別）、そのほか M1ko が決めてほしい分野）。第26弾の【修正推奨】3語と、熱い・冷たい・危ない の併記の直しのPRを出す（M1ko がマージ）。ANTI の新しいバッチが出たら確認し、気づいた点を確認表の note に書く。毎回の報告に、次の文法の提案を含める。
- **Antigravity**: 第26弾（100語：提案016の `slyly` 1語 + 内容語99語）の追加・マージを完了（Claude が `highly` を足して合計 2,981 語 / 有効 2,948 語）。確認が終わるまで待機。
- **M1ko**: 提案017の決定。第26弾の確認（`word_review.csv` の `draft` → `ok` / `fix`）。

## 最近の主な変更

`docs/CHANGELOG.md`（v0.16 までの記録）と `git log`、`docs/grammar.md` §11 を見てください。この STATUS には、いまの状態だけを書きます（`docs/WORKFLOW.md` §4）。
