# 提案 024: 数量・程度の言い方（たくさん・少し・全部・ほとんど・あまり〜ない）

状態: **決定済み**。M1ko が「全て許可」と返事をしたので、Claude がおすすめの A（Q1〜Q4 すべて）を選んで実装した（v0.31）。仕様は docs/grammar.md §7 を参照。

## 1. 何が足りないか

辞書には、多くの `mene`、すべての `epule`、少数の `piue`、ほとんど `elumi`、少し `sumoli`、とても `peli`、十分に `nipi` があります。しかし、日本語の「たくさん食べた」「全部食べた」「ほとんどの人」「あまり食べない」と、英語の a lot・most・all of it・not very は、うまく訳せません。翻訳機を実際に動かして確かめた、いまの出力です。

| 入力 | 現状の出力 | 問題 |
|---|---|---|
| たくさん食べた。| `pasu ito [たくさん?].` | 訳せない |
| 全部食べた。| `pasu ito [全部?].` | 訳せない |
| ほとんどの人が来た。| `mana elumi pasu komo.` | 「の」が落ち、`elumi`（ほとんど）が動詞を修飾する副詞になる |
| 私はあまり食べない。| `mi no ito [あまり?].` | 訳せない |
| 私はあまり背が高くない。| `mi no pio ile.` | 「あまり」が落ち、ふつうの否定になる |
| とても大きい家がある。| `lase usa alo.` | 「とても」が落ちる |
| I ate a lot. | `mi ito lotema.` | `lot` が「くじ（lotema）」になる |
| I am a little tired. | `mi pio [a?].` | 訳せない |
| Most people came. | （未対応）| 訳せない |
| Few students came. | `mene piue sutua pasu komo.` | 複数形の `mene`（多くの）と `piue`（少数の）が両方つく |
| All the students came. | `mene epule sutua pasu komo.` | 同上（多くの + すべての）|
| I ate all of it. | `mi pasu ito [all?] [of?] li.` | 訳せない |
| I do not eat much. | `mi no ito [much?].` | 訳せない |

## 2. 手がかり（すでにある決まり）

- 形容詞 `-e` から作る副詞は `-i`（`mene` → `meni`、`epule` → `epuli`）。辞書に別に登録しない（提案016）。
- 動詞を修飾する副詞は、主語の直後、マーカーの前（`mi nepi pinu ito tosa.`）。否定の `no` はマーカーなので、副詞のあと（`mi enuti no mo.`）。
- 程度の副詞は、述語の形容詞のとき、`tui` と同じく副詞の位置（`iliu tui pio lase.`、`li peli pio wawe.`）。名詞を修飾する形容詞のときは、形容詞の直前（`tui kue luma.`）。

## 3. 提案

### Q1. たくさん・much・a lot（動詞を修飾する）

| 案 | 内容 | 例 |
|---|---|---|
| **A（おすすめ）** | `mene` の派生副詞 `meni` を、副詞の位置に置く。名詞を修飾するとき（たくさんの本）は、これまでどおり `mene` | `mi meni pasu ito.`（たくさん食べた。I ate a lot）<br>`mi meni no ito.`（あまり食べない。I do not eat much）|
| B | 新しい副詞を造る | |
| C | 決めない | |

おすすめは A です。理由は、新しい語が要らず、`meni` は提案016の決まりで作れる形だからです。

### Q2. 全部・all of it（動詞を修飾する）

| 案 | 内容 | 例 |
|---|---|---|
| **A（おすすめ）** | `epule` の派生副詞 `epuli` を、副詞の位置に置く。名詞を修飾するとき（すべての学生）は `epule` | `mi epuli pasu ito.`（全部食べた）<br>`mi epuli pasu ito li.`（I ate all of it）|
| B | `epule` を名詞として使う（`mi pasu ito epule.`）| |
| C | 決めない | |

おすすめは A です。理由は、Q1 と同じ考え方で、副詞の位置がそろうからです。

### Q3. ほとんど・most

| 案 | 内容 | 例 |
|---|---|---|
| **A（おすすめ）** | ほとんどの N（most N・most of the N）= `elumi epule` + N（ほとんどすべての）。動詞の「ほとんど〜した」は、これまでどおり `elumi` を副詞の位置に置く | `elumi epule mana pasu komo.`（ほとんどの人が来た。Most people came）|
| B | `mene` を使う（多くの人）| |
| C | 決めない | |

おすすめは A です。理由は、新しい語が要らず、「ほとんど + すべて」が日本語の意味に近いからです。

### Q4. あまり〜ない・数量の語と複数形

| 案 | 内容 | 例 |
|---|---|---|
| **A（おすすめ）** | あまり〜ない = 述語が形容詞なら `peli`、動詞なら `meni` を副詞の位置に置き、`no` を続ける。複数形の英語に数量の語（many・most・all・few・some）がつくときは、自動の `mene` を足さない | `li peli no pio wawe.`（あまり背が高くない）<br>`piue sutua pasu komo.`（Few students came）|
| B | あまり〜ない 専用の語を造る | |
| C | 決めない | |

おすすめは A です。理由は、`no` の位置が `enuti no mo` と同じで、複数形の `mene` の二重がなくなるからです。

## 4. 選んでほしい点

| # | 決めること | 私のおすすめ |
|---|---|---|
| Q1 | たくさん・much・a lot | **A**（`meni`）|
| Q2 | 全部・all of it | **A**（`epuli`）|
| Q3 | ほとんど・most | **A**（`elumi epule` + 名詞）|
| Q4 | あまり〜ない・数量の語と複数形 | **A**（`peli`／`meni` + `no`）|

## 5. 決まったあとにやること

1. `docs/grammar.md` §7 に決まりを足し、履歴を足す。
2. 翻訳機に、日本語（たくさん・全部・ほとんどの・あまり〜ない・とても + 形容詞 + 名詞）と、英語（a lot・a little・most・all of it・much・few・all the）を足す。
3. 例文集に例文を足し、テストを追加。

## 6. この提案に含まれないもの

- 否定の範囲（全部〜ではない、必ずしも〜ない）は、次の提案（025）で決める。
- 「二人とも」「全員」（Both came など）。
- 数の言い方そのもの（`docs/grammar.md` §5）。
