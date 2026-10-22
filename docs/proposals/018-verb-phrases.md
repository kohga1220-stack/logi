# 提案 018: 動詞に続く表現（〜たい・〜始める・〜続ける・〜すぎる・〜やすい）

状態: **決定済み（2026-10-22）**。M1ko が「提案018・019: 「お任せ」」と返事をしたので、Claude がおすすめの A（Q1〜Q3 すべて）を選んで実装した（v0.26）。仕様は docs/grammar.md §7 を参照。

**実装で変えた点**:
- すぎる（`tui`）の位置は、提案の例（`mi pasu tui ito.`）ではなく、既存の副詞の位置の規則（主語の直後、マーカーの前。`docs/grammar.md` §7）に合わせて `mi tui pasu ito.` にした。
- 形容詞 + すぎる（暑すぎる）と、英語の too + 形容詞・副詞（too hot・too fast）も、同じ `tui` にした（`li tui pio ote.`）。英語の `too` が「も」の `olusi` になる誤りは、この規則で直った。文末の too（〜も）は `olusi` のまま。
- 英語の keep ~ing（kept eating）は `konupo`（続ける）にした。keep + 名詞は `kipo` のまま。
- 英語の hard to V は「難しい」（`tipike`）、to + 動詞が続かない hard は「硬い」（`aluke`）のまま。

## 1. 何が足りないか

辞書には、欲する `wonuto`、始まる `sutato`、終わる `pino`、続ける `konupo`、（あまりに）`tui`、簡単な `ise`、難しい `tipike` があります。動名詞（`-na`）の規則（`docs/grammar.md` §3）もあります。英語から入れる場合は、すでに多くが訳せます。しかし、日本語から入れる場合は、動詞の活用に続く形が訳せません。翻訳機を実際に動かして確かめた、いまの出力です。

| 入力 | 現状の出力 | 問題 |
|---|---|---|
| 私は食べたい。| `mi [い?] ta li pasu ito.` | 訳せず、構造が崩れる |
| 食べたくない。| `[くない?] ta li pasu ito.` | 同上 |
| 私は行きたかった。| `mi [行きた?] [った?].` | 同上 |
| 食べ続けた。| `pasu konupo [食べ?].` | 動詞が残る |
| 食べ終わった。| `pasu pino [食べ?].` | 同上 |
| 食べ始めた。| `[食べ始めた?].` | 同上 |
| 食べすぎた。| `[食べすぎた?].` | 同上 |
| これは読みやすい。| `iliu [読み?] [くい?].` | 同上 |
| I want to eat. | `mi wonuto itona.` | これでよい形 |
| I don't want to eat. | `mi no wonuto itona.` | 同上 |
| He started to eat. | `li pasu sutato itona.` | 同上 |
| He continued to eat. | `li pasu konupo itona.` | 同上 |
| I finished eating. | `mi pasu pino itona.` | 同上 |
| I ate too much. | `mi olusi pasu ito [much?].` | `too` が `olusi`（も）になる。「あまりに」は `tui` |
| It is easy to eat. | `li pio ise.` | 「to eat」が落ちる |
| He kept eating. | （訳せない）| |

## 2. 手がかり（すでにある決まり）

- 動名詞: 動詞 + `na`（`itona` = 食べること）。`mi wonuto piona pulena witute tu.`（あなたと友達でいたい。`docs/grammar.md` の例文）。
- 副詞 `tui`（too much・あまりに）は、辞書にある。
- 時制・否定のマーカーは、動詞の前（`mi pasu wonuto ikona.`）。

## 3. 提案

### Q1. 〜たい（願望）

| 案 | 内容 | 例 |
|---|---|---|
| **A（おすすめ）** | `wonuto` + 動名詞。否定・過去は `wonuto` の前（英語の訳と同じ形）| `mi wonuto itona.`（私は食べたい）<br>`mi no wonuto itona.`（食べたくない）<br>`mi pasu wonuto ikona.`（行きたかった）|
| B | 〜たい専用の語を造る | |
| C | 決めず、訳さない（いまのまま）| |

おすすめは A です。理由は、英語（I want to eat）がすでにこの形で、新しい語が要らないからです。

### Q2. 〜始める・〜終わる・〜続ける

| 案 | 内容 | 例 |
|---|---|---|
| **A（おすすめ）** | `sutato`・`pino`・`konupo` + 動名詞 | `li pasu sutato itona.`（食べ始めた）<br>`mi pasu pino itona.`（食べ終わった）<br>`li pasu konupo itona.`（食べ続けた）|
| B | 動詞の前に置く副詞を造る | |
| C | 決めない | |

おすすめは A です。理由は、英語（started to eat・finished eating・continued to eat）がすでにこの形だからです。「〜かける」「〜出す」などの似た言い方は、この提案に含めません。

### Q3. 〜すぎる・〜やすい・〜にくい

| 案 | 内容 | 例 |
|---|---|---|
| **A（おすすめ）** | すぎる = `tui` を動詞の前に置く。やすい = `pio ise` + 動名詞、にくい = `pio tipike` + 動名詞 | `mi tui pasu ito.`（食べすぎた）<br>`iliu pio ise lotona.`（これは読みやすい）<br>`iliu pio tipike lotona.`（読みにくい）|
| B | 〜すぎる・〜やすい・〜にくい を、専用の語にする | |
| C | 決めない | |

おすすめは A です。理由は、新しい語が要らず、形容詞 + 動名詞（`pio ise` + 動名詞）は、これまでの `pio` + 補語と同じ作りだからです。ただし、「これは読みやすい」の動名詞は、読む対象（これ）が主語になる点が、日本語・英語と少し違います。実装の前に例を見て確かめてください。

## 4. 選んでほしい点

| # | 決めること | 私のおすすめ |
|---|---|---|
| Q1 | 〜たい | **A**（`wonuto` + 動名詞）|
| Q2 | 〜始める・〜終わる・〜続ける | **A**（`sutato`・`pino`・`konupo` + 動名詞）|
| Q3 | 〜すぎる・〜やすい・〜にくい | **A**（`tui`、`pio ise` / `pio tipike` + 動名詞）|

## 5. 決まったあとにやること

1. `docs/grammar.md` §7 に決まりを足し、履歴を足す。
2. 翻訳機に、日本語（〜たい・〜たくない・〜たかった・〜始める・〜終わる・〜続ける・〜すぎる・〜やすい・〜にくい）と、英語（too much・easy to ~・hard to ~・kept ~ing）を足し、英語の `too` が `olusi` になる誤りを直す。
3. 例文集に例文を足し、テストを追加。

## 6. この提案に含まれないもの

- 〜かける・〜出す・〜きる・〜そうだ・〜らしい・〜はずだ などの様態・推量。
- くれる・あげる・もらう（授受）。別の提案にします。
- 受け身（`docs/grammar.md` で「禁止」と決めてある）。
