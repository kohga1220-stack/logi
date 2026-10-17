# 提案 008: 日付・時刻（月日・年・時刻・「毎週」「来週」）

状態: **決定済み（2026-10-17）**。M1ko が「すべて A」と返事をしたので、Q1〜Q3 はすべて A で実装した（v0.17）。仕様は docs/grammar.md §5 を参照。

## 1. 何が足りないか

`docs/grammar.md` §8.2 に「日付の数え方は入れていない」と書いたままです。語は、すでに十分あります。

| 種類 | すでにある語 |
|---|---|
| 曜日 | `moputa`（月）`tusuma`（火）`wetuna`（水）`tupusa`（木）`pukipa`（金）`satuka`（土）`sunuta`（日）|
| 単位 | `ila`（年）`monata`（月・暦）`wika`（週）`teia`（日）`ula`（時間）`minuta`（分）`sekopa`（秒）|
| 時 | `tuteia`（今日）`moloa`（明日）`jesutea`（昨日）`naui`（今）`mola`（朝）`apuja`（午後）`ipa`（夕方）`naita`（夜）|
| 修飾 | `nete`（次の）`sese`（最後の）`epule`（すべての）|
| 数詞 | 0〜9（`ni` … ）と位の単位（`pulu`・`kupulu`・`mipulu`）|

足りないのは、**語の並べ方の決まり**です。翻訳機を実際に動かして確かめた、いまの出力です。

| 入力 | 現状の出力 | 問題 |
|---|---|---|
| 今日は3月5日です。 | `tuteia pio pe teia.` | 「3月」が消えている |
| 3月に行く。 | `iko tote te muna.` | 「月」が、天体の月 `muna` になっている |
| 2026年に生まれた。 | `pasu poleno tote to mipulu ni kupulu to pulu so ila.` | 「2026 年間」（数 + `ila`）の形。暦の年と区別できない |
| 水曜日に会う。 | `mito tote wetuna.` | 英語の On Wednesday（`onute wetuna`）と前置詞が違う |
| 私は3時に起きる。 | `mi oko tote te [とき?].` | 「時」が、接続語の「とき」（`wenute`）になって訳せない |
| 午後2時30分に会う。 | `mito apuja tote te pulu minuta to [とき?].` | 同上。語順も崩れる |
| 毎週走る。 | `lano [毎?] wika.` | 「毎」が訳せない |
| 先週リンゴを食べた。 | `pasu ito apa [先?] wika.` | 「先」が訳せない |
| 来年日本へ行く。 | `iko [来?] tote pupa ila teia.` | 「来」が訳せない。語順も崩れる |
| I go in March. | `mi iko [march?].` | 月の名前が訳せない |
| It is 3 o'clock. | `li pio [3?].` | 時刻が訳せない |
| I wake up at 7 o'clock. | `mi wapo [up?] [7?] [o?] wuta.` | 同上 |
| I run every week. | `mi lano epule wika.` | これでよい形 |
| I ate an apple last week. | `mi pasu ito apa sese wika.` | これでよい形 |
| What time is it? | `li pio wata taima ka?` | これでよい形 |

## 2. 手がかり（すでにある決まり）

- 数 + 単位は**数量**（`mi oto to ila.` = 私は2歳。§5）。
- 英語の前置詞は、英語に合わせて訳している: at = `atute`、on = `onute`、in = `inute`。
- 英語の every week = `epule wika`、last week = `sese wika`、next week = `nete wika` は、すでに訳せる。

## 3. 提案

### Q1. 年・月・日の表し方

| 案 | 内容 | 例 |
|---|---|---|
| **A（おすすめ）** | **単位の名詞 + 数**は、暦の番号（数が後ろ）。「数 + 単位」は数量（期間）のまま。大きい単位から小さい単位の順に並べる。英語の月の名前（January〜December）は、`monata` + 月の数に直す | `monata te teia pe`（3月5日）<br>`ila to mipulu ni kupulu to pulu so`（2026年。数詞の並べ方は、いまの翻訳機の出力のまま）<br>`mi iko inute monata te.`（3月に行く）|
| B | 月・日の名前を、専用の語として新しく造る（12か月 + 31日）| |
| C | 暦の表し方は決めず、翻訳機は訳さない | |

おすすめは A です。理由は、新しい語が要らず、「3か月」（`te monata`）と「3月」（`monata te`）の違いが、語順だけで決まるからです。B は、語が40以上増え、機能的な利点がありません。

### Q2. 時刻

| 案 | 内容 | 例 |
|---|---|---|
| **A（おすすめ）** | `ula`（時間）+ 数 = 〜時、`minuta`（分）+ 数 = 〜分（Q1 と同じ「単位 + 数」）。前置詞は `atute`（at）。日本語の「時」は、数のあとにあるとき、接続語の「とき」ではなく時刻として読む | `mi oko atute ula te.`（3時に起きる）<br>`mito atute apuja ula to minuta te pulu.`（午後2時30分に会う）<br>`li pio ula te.`（3時です。It is 3 o'clock.）|
| B | 時刻を表す専用の語を新しく造る | |
| C | 時刻は決めず、翻訳機は訳さない | |

おすすめは A です。理由は、新しい語が要らず、Q1 の考え方と同じだからです。「半」「15分前」などの言い方は、この提案に含めません。

### Q3. 時の前置詞と、毎〜・来〜・先〜

| 案 | 内容 | 例 |
|---|---|---|
| **A（おすすめ）** | 前置詞は、英語に合わせて、種類で決める: 時刻 `atute`、曜日・日付 `onute`、月・年・季節 `inute`。日本語の「に」は、前の語の種類で選ぶ。「毎〜」= `epule` + 単位、「来〜」= `nete` + 単位、「先〜・去年・昨年」= `sese` + 単位、「今〜」= `iliu` + 単位 | `mito onute wetuna.`（水曜日に会う）<br>`mi lano epule wika.`（毎週走る）<br>`mi iko nete ila.`（来年行く）<br>`mi pasu ito apa sese wika.`（先週リンゴを食べた）|
| B | 前置詞は変えず、日本語の「に」は `tote` のままにする | `mito tote wetuna.` |
| C | 毎〜・来〜・先〜は、翻訳機が訳さない | |

おすすめは A です。理由は、英語の翻訳機がすでにその形で、日本語を合わせるだけで済むからです。

## 4. 選んでほしい点

| # | 決めること | 私のおすすめ |
|---|---|---|
| Q1 | 年・月・日 | **A**（単位 + 数 = 暦。数 + 単位 = 数量）|
| Q2 | 時刻 | **A**（`ula` + 数・`minuta` + 数。`atute`）|
| Q3 | 前置詞・毎来先 | **A**（前置詞は種類で決める。`epule`・`nete`・`sese`・`iliu`）|

## 5. 決まったあとにやること

1. `docs/grammar.md` §5（数・複数）に暦と時刻の決まりを足し、§8.2 の「日付の数え方は入れていない」を直し、履歴を足す。
2. 翻訳機に、次を足す。
   - 日本語: 〜月〜日・〜年・〜時〜分、毎〜・来〜・先〜・今〜、時間の「に」（種類で前置詞を選ぶ）
   - 英語: 月の名前、〜 o'clock、at/on/in + 時
3. 例文集（`corpus/examples.csv`）に例文を足し、テストを追加。

## 6. この提案に含まれないもの

- 元号（令和など）、「半」「〜分前」「〜時過ぎ」、午前0時などの細かい時刻の言い方。
- 期間の言い方（「3日間」）。数 + 単位の数量（§5）のままにする。
- 曜日の略称、日付の序数（1st・2nd）。
