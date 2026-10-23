# 提案 020: 経験・予定・決心（〜たことがある・〜つもり・〜ことにする・〜たばかり）

状態: **決定済み（2026-10-23）**。M1ko が「お任せとする」と返事をしたので、Claude がおすすめの A（Q1〜Q3 すべて）を選んで実装した（v0.28）。仕様は docs/grammar.md §7 を参照。

**実装で変えた点**:
- 「I have just read」は、`onuli pasu`（Q3 の形）にした。`pinu` を使う英語の完了形でも、just があれば過去にそろえる。
- 英語の have been to X は、`pinu iko tote X`（行ったことがある）にした。それ以外の been（have been happy など）は、これまでどおり。
- 英語の intend は plan と同じ `pulao` にした（辞書に intend がないため、翻訳機の中で対応させた）。
- 「つもり」「予定」は、動詞の辞書形のあとに「だ・です・でした・だった・はない」が続く形だけ。名詞としての「予定」（`setupa`）は、これまでどおり。
- 〜たことがある は、過去形（〜た）のあとだけ。「ある」「いる」の動詞自身には使わない。

## 1. 何が足りないか

辞書には、完了のマーカー `pinu`、副詞の これまでに `epepi`・決してない `nepi`・だけ（ちょうど）`onuli`、決める `poso`、計画する `pulao`、予定 `setupa` があります。しかし、日本語の「〜たことがある」「〜つもり」「〜たばかり」と、英語の現在完了（have read・have never read）は、うまく訳せません。翻訳機を実際に動かして確かめた、いまの出力です。

| 入力 | 現状の出力 | 問題 |
|---|---|---|
| 私は本を読んだことがある。| `mi alo lotona pupa.` | 「ある（alo）」と動名詞になり、経験の意味が落ちる |
| 私は魚を食べたことがない。| `mi itona tosa [ない?].` | 訳せない |
| あなたは本を読んだことがありますか。| `tu alo lotona pupa ka?` | 同上（経験の意味が落ちる）|
| 私は来年旅行するつもりだ。| `mi pio [り?].` | 訳せない |
| 私は本を読んだばかりだ。| `mi pio [り?].` | 訳せない |
| 私は毎日本を読むことにした。| `mi pasu tuso lotona pupa epule teia.` | 「ことにする」が「選ぶ（tuso）」になる |
| I have read a book. | `mi oto [read?] pupa.` | `read` が過去分詞と読まれず、`have` が「持つ（oto）」になる |
| I have never read a book. | `mi nepi oto [read?] pupa.` | 同上 |
| Have you ever read a book? | `tu epepi oto [read?] pupa ka?` | 同上 |
| I plan to read a book. | `mi pulao [read?] pupa.` | `to` + 動詞が動名詞にならない（`read` は別の問題で未登録扱い）|
| I have just read a book. | `mi onuli oto [read?] pupa.` | 同上 |

## 2. 手がかり（すでにある決まり）

- 完了のマーカー `pinu` は、時制 `pasu` `putu` と同じく動詞の前に置く（`mi pinu ito apa.`）。副詞は、主語の直後、マーカーの前（`docs/grammar.md` §7）。
- 英語の「I have eaten」は、`pinu` で訳せる（`read` のように、過去分詞と原形が同じ動詞は、いまは読み取れない）。
- 動名詞（`-na`）が、動詞に続く表現に使える（提案018）。

## 3. 提案

### Q1. 経験（〜たことがある・〜たことがない・have ever / never + 過去分詞）

| 案 | 内容 | 例 |
|---|---|---|
| **A（おすすめ）** | 完了のマーカー `pinu` で表す。英語の現在完了と同じ形（同じ曖昧さを持つ）。「ない」は `nepi`、「これまでに（疑問）」は `epepi` を、副詞の位置に置く | `mi pinu loto pupa.`（本を読んだことがある）<br>`mi nepi pinu ito tosa.`（魚を食べたことがない）<br>`tu epepi pinu loto pupa ka?`（本を読んだことがありますか）|
| B | `ekesa`（経験）を使う: `mi alo ekesa pote lotona pupa.` | |
| C | 決めない（いまのまま）| |

おすすめは A です。理由は、新しい語が要らず、英語（have read・have never read・Have you ever read）と、同じ形になるからです。「完了」と「経験」の区別は、英語の現在完了と同じく、文脈と副詞（`epepi`・`nepi`）で分かります。

### Q2. 予定・決心（〜つもり・〜予定・〜ことにする）

| 案 | 内容 | 例 |
|---|---|---|
| **A（おすすめ）** | つもり・予定 = `pulao`（計画する）+ 動名詞。〜ことにする・〜ことにした = `poso`（決める）+ 動名詞。〜つもりはない は `no` を `pulao` の前に置く | `mi pulao ikona nete ila.`（来年行くつもりだ）<br>`mi pasu poso lotona pupa epule teia.`（毎日本を読むことにした）<br>`mi no pulao ikona.`（行くつもりはない）|
| B | つもり・予定を表す語を造る | |
| C | 決めない | |

おすすめは A です。理由は、新しい語が要らず、英語（plan to read・decided to read）がすでに近い形で、動名詞の規則（提案018）とそろうからです。「〜ことになる」（自分では決めない決定）は、この提案に含めません（受動態の禁止と関わるので、別に決めます）。

### Q3. 〜たばかり・ちょうど〜した

| 案 | 内容 | 例 |
|---|---|---|
| **A（おすすめ）** | `onuli`（ちょうど）を副詞の位置に置き、時制は `pasu`。英語 just も同じ | `mi onuli pasu loto pupa.`（本を読んだばかりだ。I have just read a book / I just read a book）|
| B | 〜たばかり 専用の語を造る | |
| C | 決めない | |

おすすめは A です。理由は、`onuli` がすでに「だけ・ちょうど」で、英語（I just ate）がこの形で訳せているからです。

## 4. 選んでほしい点

| # | 決めること | 私のおすすめ |
|---|---|---|
| Q1 | 経験 | **A**（`pinu` + `epepi` / `nepi`）|
| Q2 | 予定・決心 | **A**（`pulao` / `poso` + 動名詞）|
| Q3 | 〜たばかり | **A**（`onuli` + `pasu`）|

## 5. 決まったあとにやること

1. `docs/grammar.md` §7 に決まりを足し、履歴を足す。
2. 翻訳機に、日本語（〜たことがある・〜たことがない・〜つもり・〜予定・〜ことにする・〜たばかり）と、英語（have + 過去分詞、`read` のように原形と同じ形の過去分詞、have ever / never / just、plan to・intend to・decide to + 動詞）を足す。
3. 例文集に例文を足し、テストを追加。

## 6. この提案に含まれないもの

- 〜ことになる・〜ようになる（受動態の禁止と関わる）。
- 〜ところだ（直前・最中）、〜ばかりいる、〜てばかり。
- 「日本に行ったことがある」の「日本」のように、辞書にない語（未登録語は `[日本?]` のまま。語の追加は ANTI の担当）。
