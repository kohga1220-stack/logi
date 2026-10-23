# いまの状態（3者の引き継ぎ）

作業を始めるときに読み、終えるときに更新します。ルールは [docs/WORKFLOW.md](WORKFLOW.md)。

現在のバージョン: v0.27

## 決定してほしいこと（M1ko）

| 内容 | 場所 | 状態 |
|---|---|---|
| 提案020: 経験・予定・決心（〜たことがある・〜つもり・〜ことにする・〜たばかり。Q1〜Q3）| `docs/proposals/020-experience-and-plans.md` | 決定待ち（「お任せ」でもよい。おすすめは Q1〜Q3 すべて A）|
| `elowe`（心細い）の確認 | `dictionary/word_review.csv` | 第27弾の `elowe` だけ `draft` のまま（見出し語を forlorn / uneasy に直したため）。M1ko の `ok` / `fix` 待ち |
| 第28弾の追加語（60語）の確認 | `dictionary/word_review.csv`、`docs/review/new_words.md` | Claude の確認は済み。【修正推奨】8語の直し（削除8語、既存語6語への意味の併記）は #106 でマージ済み。残りは M1ko の確認（`draft` → `ok` / `fix`）と、【任意】12語を直すかの判断 |

（決定済み: 提案018 → v0.26、提案019 → v0.27 で実装。第27弾の追加語 90語 → `ok`（【任意】26語は、M1ko の指示でそのまま）。第28弾（60語）の案 → 承認済み。いずれも 2026-10-22 の M1ko の返事）

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
| 2026-10-19 | 第26弾の指示にあった基本形容詞の例「熱い・冷たい・危ない」について：WORKFLOW §2 の手順1・2で調べたところ、既存の `ote`（暑い、`hot`）・`kole`（寒い、`cold`）・`tene`（危険な、`dangerous`）と英語見出し語が重なるため新規追加できませんでした。既存の `ote`・`kole`・`tene` の `meaning_ja` に `/熱い`・`/冷たい`・`/危ない` を併記するのが自然と思われますので、Claude 側でご検討いただけると助かります。 | 対応済み（Claude: `ote` = 暑い/熱い、`kole` = 寒い/冷たい、`tene` = 危険な/危ない に併記した。直しのPRに入れており、M1ko がマージする）|

## 担当ごとの次の作業

- **Claude**: 提案020の決定を待つ（提案015〜019 は v0.23〜v0.27 で実装済み）。ANTI の第29弾を確認する。毎回の報告に、次の文法の提案と、ANTI の次のバッチの量と内容の提案（M1ko の依頼、2026-10-19）を含める。
- **Antigravity**: 第28弾（60語：副詞 5語・動詞 10語・形容詞 15語・名詞 30語、合計 3,130 語 / 有効 3,097 語）の追加・マージを完了。確認待ち（WORKFLOW §2-4）。**第29弾はまだ始めない**（M1ko の決定待ち）。
- **M1ko**: 提案020の決定。`elowe` の確認。第28弾の確認（`word_review.csv` の `draft` → `ok` / `fix`）。
