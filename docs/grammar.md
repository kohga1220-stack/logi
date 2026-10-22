# Logi 文法仕様書（確定版）

## 1. 基本理念

- 名称: **Logi**（ロジ）
- 旧称: SVO-Logi / NGSL
- 理念: 「すべての人類にわかりやすい」論理的人工言語
- 語源: logical → logi。log(1)=0 で「原点」の意も持つ

---

## 2. 音韻論（確定）

### 母音（5音）
a, e, i, o, u

### 子音（9音）
p, t, k, m, n, s, l, w, j

※ r は廃止。l に統一（l/r 区別が困難な言語話者への配慮）。
※ h, b, d, f, g, v, z 等は使用不可。

### 音節構造
- 許可: **(C)V のみ**（子音0〜1 + 母音1）
- 禁止: 子音連続（CCV）・音節末子音（CVC）
- 例: pa, ta, lo, ki, su ✓ / pra, stua, -n ✗

### アクセント
語末から2番目の音節に固定（規則アクセント）。

---

## 3. 品詞と語尾（確定）

| 品詞 | 語尾 | 例 |
|---|---|---|
| 名詞 | -a | mana（人）, puta（食べ物）|
| 動詞 | -o | toko（話す）, laiko（好む）|
| 形容詞 | -e | kute（良い）, nue（新しい）|
| 副詞 | -i | mosi（最も）, naui（今）|
| 前置詞 | **-te** | tote（〜へ）, witute（〜と） ※旧-deから変更 |
| 動名詞 | **-na** | piona（であること）, titusona（教えること）※旧-inaから変更 |

### 形容詞から作る副詞（v0.24 確定、提案016）
- 形容詞の語尾 `-e` を `-i` に替えた形が、その形容詞の副詞。派生の副詞は辞書に登録せず、翻訳機が作る。`ape`（幸せな）→ `api`（幸せに）、`piete`（美しい）→ `pieti`（美しく）、`pole`（礼儀正しい）→ `poli`。副詞の位置は §7（主語の直後、マーカーの前）。
  `li pieti sino.`（彼女は美しく歌う。She sings beautifully.）、`li api pasu lapo.`（彼女は幸せに笑った）。
- 辞書にその形の語があるときは、派生せず、辞書の語を使う（`pasute` → `pasuti` = 速く、`ise` → `isi` = 簡単に）。辞書の語が別の意味のとき（`ile` 高い / `ili` ここで など 6 語）は、派生しない。必要なら、別の形の副詞を足す（`highly` と `slyly` を Antigravity に依頼）。
- 日本語は、い形容詞の〜く・な形容詞の〜に。英語は -ly（happily → happy）。辞書の副詞（`well` = `poni` など）が先。

### 機能語の語末子音（v0.4 確定）
マーカー・代名詞複数形・接続詞など、元の語形が子音で終わる機能語は語末に **-u** を付ける。
子音連続を含む語は、子音の間に **u** を挿入して解消する（tan-te → tanute）。
(C)V 規則を保つための措置で、辞書の形が正本である。前置詞語尾 -te で終わる tanute は、
比較の基準を導くため辞書では conj に分類する。
- 例: pas → **pasu**, kon → **konu**, pin → **pinu**, wut → **wutu**, ip → **ipu**
- 例: mis → **misu**, tus → **tusu**, lis → **lisu**, tante → **tanute**
- f は使えないため fut → **putu**。r は廃止のため mor は廃止し、辞書既存の副詞 **moli**（もっと）で代替

### 動名詞の作り方
動詞（-o で終わる形）の末尾に **na** を付ける: pio → piona, tituso → titusona。

---

## 4. 文法マーカー

動詞の直前に置く。複数を組み合わせ可能。

| マーカー | 意味 | 例 |
|---|---|---|
| pasu | 過去 | mi pasu toko tu. |
| putu | 未来 | mi putu toko tu. |
| konu | 進行（〜している）| mi konu toko tu. |
| pinu | 完了（〜してしまった）| mi pinu toko tu. |
| no | 否定 | mi no toko tu. |
| ka + **?** | 疑問（文末）| tu nema pio wata ka? |

### 組み合わせ例
- 過去進行: mi pasu konu toko tu.
- 過去否定: mi pasu no toko tu.
- 未来完了: mi putu pinu toko tu.

### 返事（はい／いいえ）（v0.10 確定）

| Logi | 意味 |
|---|---|
| `jesu` | はい（yes。品詞は感動詞 `interj`）|
| `no` | いいえ（否定マーカーをそのまま使う）|

返事は文頭に置き、コンマで本文と区切る。

```
tu laiko apa ka?
jesu, mi laiko apa.     （はい、私はリンゴが好きです）
no, mi no laiko apa.    （いいえ、私はリンゴが好きではありません）
```

日本語の「はい／いいえ」は、否定の質問への答えが英語と逆になる（「食べないの？」「はい、食べません」）。翻訳機は、この逆転を扱わず、文の意味で訳す。

### あいさつ（v0.11 確定）

あいさつと依頼の言葉は、`jesu` と同じ感動詞（`interj`）。文頭に置き、コンマで本文と区切る。

| Logi | 意味 |
|---|---|
| `kelosu` | こんにちは（hello。hi も同じ）|
| `kupaju` | さようなら（goodbye。bye も同じ）|
| `pilisu` | どうぞ（please）|

```
kelosu, mi laiko apa.       （こんにちは、私はリンゴが好きです）
kupaju.                     （さようなら）
pilisu, iliu pio kute.      （どうぞ、これは良いです）
```

- 形は、3音節の空き形から選び、機能語の語尾 `-u` で終える。既存のどの語とも編集距離2以上（§8.1）。
- 依頼（「〜してください」）や命令の文型は、次の「命令・依頼・禁止・勧誘」で決めた。`pilisu` は、その文頭に置く。
- 英語は、文頭の Hello / Hi / Goodbye / Bye / Please と、文末の「, please」を、文頭の感動詞にする。

### 日常のあいさつ（v0.14 確定）

おはよう・おやすみ・すみません・ありがとうには、専用の語を作らず、既存の語の決まった言い方にする。

| 日本語・英語 | Logi |
|---|---|
| おはよう（ございます）/ Good morning | `kute mola.`（良い朝）|
| おやすみ（なさい）/ Good night | `kute naita.`（良い夜）|
| すみません・ごめん（なさい）/ Sorry・I'm sorry・Excuse me | `mi pio moke.`（私は申し訳ない）|
| ありがとう（ございます・ございました）/ Thanks・Thank you | `mi tanako tu.`（私はあなたに感謝する）|

- あいさつなので、文末は `.` で終える。
- 「すみません」は、謝罪（Sorry）・お礼・呼びかけ（Excuse me）のどれにも使われるが、謝罪の `moke` に統一する。
- 「おはよう」と「おはようございます」のような、丁寧さの違いは区別しない。
- 翻訳機は、文の全体がこの言い方のときだけ、この形にする（「おはよう、元気ですか？」のように、文の一部の場合は、あいさつとして拾わない）。
- おめでとう・はじめまして・ただいま・おかえり・いただきます・どういたしまして は、専用の語を作らない。翻訳機は、辞書にない語として `[語?]` のまま残す。言いたいときは、ふつうの文で言う。ごちそうさま・いらっしゃいませ・お願いします は、v0.19 で決めた（次の「敬語」）。

### あいさつの続きと願いの言葉（v0.20 確定、提案011）

| 日本語・英語 | Logi |
|---|---|
| こんばんは / Good evening | `kute ipa.`（良い夕方）|
| Good afternoon | `kute apuja.`（良い午後。こんにちは `kelosu` と同じ使い方もあるが、翻訳機は文字どおりに訳す）|
| お元気ですか / How are you? | `tu pio miwe ka?`（主語 `tu` を補う。「どう」の `aua` は使わない）|
| 元気です / I am fine. | `mi pio miwe.`（主語 `mi` を補う）|
| Good luck | `kute luna!` |
| Have a nice day | `kute teia!` |
| See you tomorrow | `mi putu sio tu moloa.`（主語を省かず、未来の `putu`）|

- 「良い + 名詞」の形で、新しい語なし。願いの言葉は文末 `!`。
- 形容詞だけの文に主語を補うのは、お元気ですか・元気です の 2 つに限る（「寒いです」などに一般には補わない）。
- お元気で・お大事に・気をつけて・お疲れ様・お久しぶり は、意味が日本語に強く結びついているので、含めない。

### 敬語（v0.19 確定、提案010）

**Logi に敬語の段階は作らない。** 敬語の動詞・接頭辞（お・ご）・接尾辞（さん・様）は、意味だけを訳し、敬意は落とす。丁寧に頼むときだけ `pilisu` を使う（これまでどおり）。新しい語はない。

| 日本語 | Logi |
|---|---|
| おっしゃる・申す・申し上げる | 言う `juo` |
| 召し上がる・いただく（食べる）| 食べる `ito` |
| ご覧になる・拝見する | 見る `sio` |
| なさる・いたす | する `topo` |
| いらっしゃる・参る | へ・に があれば `iko`、から があれば `komo`、どちらもなければ、いらっしゃる は `alo`（いる）、参る は `iko` |
| お／ご + 動詞 + ください（お待ちください・ご確認ください）| `pilisu, mato!`・`pilisu, jejo!`（動詞 + ください と同じ）|
| 田中さん・お客様（お・ご・さん・様）| 名前・名詞だけ（`kesuta`）|
| いらっしゃいませ | `weluko!`（Welcome. と同じ）|
| ごちそうさま（でした）| `mi tanako tu.`（ありがとうと同じ）|
| お願いします・お願いいたします | `pilisu.` |

- いただきます・はじめまして などは、これまでどおり訳さない（`[語?]`）。
- 敬意の段階を訳し分けることはしない。必要になったら、別に提案する。
- 翻訳機は日本語だけが対象。英語の敬称（Mr.・Sir）は含めない。

### 命令・依頼・禁止・勧誘（v0.12 確定）

文末に **`!`** を置く（書記上の符号。疑問文の `ka ?` と同じように、必須）。新しい語は作らない。

| 意味 | 作り方 | 例 |
|---|---|---|
| 命令（〜しなさい・〜して）| 2人称の主語を**省いた**動詞文 + `!` | `ito apa!`（リンゴを食べなさい）|
| 依頼（〜してください）| 文頭に `pilisu,` を足す | `pilisu, ito apa!`（リンゴを食べてください）|
| 禁止（〜するな・〜しないでください）| 命令の形に否定マーカー `no` を入れる | `no ito apa!` / `pilisu, no ito apa!` |
| 勧誘（〜しましょう・〜しよう）| 主語を `misu`（私たち。聞き手を含む）にして + `!` | `misu ito apa!`（リンゴを食べましょう）|

```
iko tote ili!             （ここへ行きなさい）
misu iko tote ili!        （ここへ行きましょう）
```

- Logi の平叙文は主語を省かない（§10.3.1）。そのため、**主語のない文は命令**として読む。平叙文の `tu ito apa.` と、命令の `ito apa!` は、主語と `!` で区別する。
- 「してください」「しなさい」「して」は区別しない。丁寧さは、`pilisu` の有無だけで表す。
- 「〜してもいいですか」「〜してくれませんか」は、命令の文型ではなく、疑問文（`mi kani … ka?` など）で言う。
- 翻訳機は、日本語の 〜なさい・〜て・〜てください・〜るな・〜ないでください・〜ましょう・〜よう（文末だけ）と、英語の命令文・Please …・Don't …・Let's … を、この形に訳す。英語の Thank you は命令ではなく、`mi tanako tu.` にする。

### 許可・疑問での依頼・申し出（v0.13 確定）

文末の `ka ?`（§4）で疑問文にし、法副詞（§7）を使う。新しい語は作らない。

| 意味 | 作り方 | 例 |
|---|---|---|
| 許可を求める（〜てもいいですか・May I・Can I）| 主語 `mi` + `kani`（できる・してよい）| `mi kani ito apa ka?`（リンゴを食べてもいいですか）|
| 依頼を疑問で言う（〜てくれませんか・Could you）| 主語 `tu` + `kani` | `tu kani ito apa ka?`（リンゴを食べてくれませんか）|
| 丁寧な依頼（〜てもらえませんか・〜てください ませんか・〜ていただけますか）| 文頭に `pilisu,` を足す | `pilisu, tu kani ito apa ka?` |
| 申し出（〜ましょうか・Shall I）| 主語 `mi` + `sati`（べき）| `mi sati ito apa ka?`（私がリンゴを食べましょうか）|

- 許可の May I は `kani`。`mei` は「かもしれない」（可能性の may。He may come. = `li mei komo.`）のまま。
- 「できる」と「してよい」は、同じ `kani` で、文脈で区別する（英語の can と同じ）。

#### 平叙文の許可・禁止・不要（v0.15 確定）

| 意味 | 作り方 | 例 |
|---|---|---|
| 許可（〜てもいい・〜てもよい・You may）| `kani`。日本語で主語がなければ `tu` を補う | `tu kani ito apa.`（リンゴを食べてもいい）|
| 禁止（〜てはいけない・〜てはならない・You must not・You may not）| `masi no`（ねばならない + 否定）。主語がなければ `tu` | `tu masi no ito apa.`（リンゴを食べてはいけない）|
| 不要（〜なくてもいい・You do not have to・You need not）| `kani no`（してよい + 否定。しなくてよい）| `tu kani no ito apa.`（リンゴを食べなくてもいい）|

- 禁止の `masi no` は、「しなければならない」の否定ではなく、「してはならない」。「しなくてもよい」は `kani no`。`no` は、法副詞のあと・動詞の前（§7）のまま。
- 英語の `may` は、`You may …`（許可）だけ `kani`（`You may not` は `masi no`）。`He may come.`・`I may go.` のような可能性は、これまでどおり `mei`。
- `kani no` は「できない」（`mi kani no lano.`）と同じ形。「できない」と「しなくてもよい」は、文脈で区別する。
- 主語のある日本語（「私は食べてもいい」）は、その主語を使う（`mi kani ito apa.`）。文末の「よ・ね」は訳さない。
- 命令の禁止（`no ito apa!`。〜するな）とは別。「〜してはいけない」は、状態を述べる平叙文。

- 翻訳機は、日本語の 〜てもいいですか・〜てくれませんか・〜てもらえませんか・〜ていただけますか・〜てくださいませんか・〜ましょうか と、英語の May I / Could I / Could you (please) / Can you please / Would you please / Shall I / Shall we を、この形に訳す。くれ・もらえ・くださ・いただけ のうち、`pilisu` を付けるのは、もらえ・くださ・いただけ。

### 疑問文のルール（新規確定）
- 文末に **ka ?** を置く。
- ka は疑問マーカー、? は書記上の疑問符。両方必須。
- 例: tu laiko wata puta ka? （あなたは何の食べ物が好きですか？）

---

## 5. 数・複数（確定）

### 複数形語尾の廃止
旧来の名詞 + s（例: manas）は廃止。
複数概念は **mene（多くの）** で表現する。

| 旧 | 新 |
|---|---|
| manas（人々）| mene mana |
| sinas（物事）| mene sina |

### 数詞（確定）
0〜9は1音節語。

| 数 | Logi |
|---|---|
| 0 | ni |
| 1 | pa |
| 2 | to |
| 3 | te |
| 4 | ku |
| 5 | pe |
| 6 | so |
| 7 | se |
| 8 | wa |
| 9 | ja |

10以上は位取り合成。位の単位語: pulu（〜十）、kupulu（〜百）、mipulu（〜千）

### 数詞と同音語（v0.5 確定）
数詞は辞書の他の語と同音にならない。v0.4 で代名詞 tu・li、疑問マーカー ka と同音だった数詞 2・5・4 を、
それぞれ **to・pe・ku** に改めた（v0.5）。これにより `mi oto to ila.`（2歳）のような文は代名詞と取り違えられない。
- 数詞列: 数詞と位の単位語（pulu kupulu mipulu）の連続は一つの数詞句として読む。
  例: mi oto to pulu ila.（私は20歳）の to pulu は数詞句。

| 数 | Logi |
|---|---|
| 10 | pa pulu |
| 20 | to pulu |
| 25 | to pulu pe |
| 100 | pa kupulu |
| 2025 | to mipulu ni kupulu to pulu pe |

### 助数詞・順序数・単位（v0.21 確定、提案013）
- **助数詞は作らない。** 数は名詞の前に置き、日本語の助数詞（個・匹・冊・本・枚・台・頭・羽・杯）は落とす。`mi ito te apa.`（リンゴを3個食べる）、`to tuka alo.`（犬が2匹いる）。
  名詞のあとに付く数（「リンゴを3個」「犬が2匹」）は、翻訳機が名詞の前に移す（`te apa`・`to tuka`）。提案013 の例（`tuka alo to.`）は、この「数は名詞の前」の決まりに合わせて直した。
- **順序数**: `semuna`（順序）を名詞のあとに置き、数を続ける。`usa semuna te.`（3番目の家。the third house）。英語の first〜tenth、日本語の N番目・第N に対応する。
- **回数**: 数量の `te taima`（3回）。日本語の 回・度 も同じ。
- **単位**: ふつうの名詞（`metela` メートル・`kipoma` キロメートル・`milima` ミリメートル・`lulama` グラム・`kikoka` キログラム・`litapa` リットル・`pepuka` パーセント）。数 + 単位の語（`pa pulu kipoma` = 10キロメートル）。「水を2リットル」「two liters of water」は、数 + 単位の語を名詞の前に置く（`to litapa jeta`。英語の of は訳さない）。
- 日本語の本・頭は、助詞（を・が・は・も）のあとの数のときだけ助数詞として読む（名詞の「本」を壊さない）。

### 倍・半分・分数・割合（v0.25 確定、提案017）
新しい語は造らない。
- **倍**: 同等の比較（`seme`、提案014）の前に、回数（`数 taima`）を置く。`iliu pio to taima seme lase tote teliu.`（これはあれの2倍大きい。It is twice as big as that.）。直訳は「あれと同じくらい大きい、が2回」。英語の twice as ~ as・N times as ~ as・N times ADJer than も同じ形。
- **半分**: `alema`（半分）を、名詞の前に置く。`mi ito alema apa.`（リンゴを半分食べる。I ate half of the apple.）。英語の of は訳さない。
- **分数**: 分子 + `semuna` + 分母。名詞の前に置く。`pa semuna te`（3分の1。one third）、`to semuna te apa`（リンゴの3分の2。two thirds of the apple）。`semuna` は順序数（名詞のあとに置く。`usa semuna te` = 3番目の家）と同じ語だが、分数は数が先なので区別できる。
- **割合**: 数 + `pepuka`（パーセント）。`to pulu pepuka`（20パーセント。20%）。日本語の「%」「パーセント」、英語の percent・% を同じ形にする。
- 小数（0.5）、計算の言い方、「倍額」「倍増」などの慣用は含めない。

### 暦と時刻（v0.17 確定、提案008）
「単位の語 + 数」は暦の番号・時刻、「数 + 単位の語」は数量（期間）。大きい単位から小さい単位の順に並べる。

| 意味 | Logi | 数量の形（比較）|
|---|---|---|
| 3月 | `monata te` | 3か月 `te monata` |
| 3月5日 | `monata te teia pe` | 5日間 `pe teia` |
| 2026年3月5日 | `ila to mipulu ni kupulu to pulu so monata te teia pe` | 2年 `to ila` |
| 3時 | `ula te` | 3時間 `te ula` |
| 午後2時30分 | `apuja ula to minuta te pulu` | 30分 `te pulu minuta` |

- 英語の月の名前（January〜December）は `monata` + 月の数に直す（March = `monata te`）。
- 前置詞は、時の種類で決める: 時刻 `atute`、曜日・日付 `onute`、月・年 `inute`。日本語の「に」は前の語の種類で選ぶ（`mi oko atute ula te.` = 3時に起きる、`mito onute wetuna.` = 水曜日に会う、`iko inute monata te.` = 3月に行く）。
- 毎〜は `epule`、来〜は `nete`、先〜・去年・昨年は `sese`、今〜は `iliu` を単位の語の前に置く。前置詞は付けない（`lano epule wika.` = 毎週走る、`iko nete ila.` = 来年行く）。
- 時刻・日付だけの文の主語は `li`（`li pio ula te.` = 3時です。It is 3 o'clock.）。
- 翻訳機は、日本語の「N月」「N年（100以上）」「N時」「N月M日」「N時M分」を暦・時刻に、「N日」「N年（100未満）」「N分」「Nか月」「N時間」「N年間」を数量として扱う。

---

## 6. 代名詞（確定）

| 人称 | 単数 | 複数（包括） | 複数（排他）|
|---|---|---|---|
| 1人称 | mi | misu | mipu |
| 2人称 | tu | tusu | — |
| 3人称 | li | lisu | — |
| 再帰 | selu | — | — |

※ 包括（inclusive）: 聞き手を含む「私たち」
※ 排他（exclusive）: 聞き手を含まない「私たち」

### 6.1 指示詞（this / that）と場所（v0.10 確定）

| Logi | 意味 | 作り方 |
|---|---|---|
| `iliu` | これ・この（this）| `ili`（ここで）+ 機能語の `-u` |
| `teliu` | あれ・あの・その（that）| `teli`（そこで）+ 機能語の `-u` |

- **使い方は1つ**: 名詞の前に置けば限定詞、単独なら代名詞。語尾は変わらない。複数形は作らない（these / those も `iliu` / `teliu`）。
- 日本語の3分類（これ／それ／あれ）は、英語と同じ2分類にまとめる: これ → `iliu`、あれ・あの・その → `teliu`。ただし、前の文を受ける「それ」は `li` のまま。
- **場所（ここ・そこ・あそこ）**は新しい語を作らず、`ili`・`teli` を前置詞の目的語にも使う。

```
iliu apa pio kute.      （このリンゴは良い）
iliu pio kute.          （これは良い）
mi laiko teliu.         （私はあれが好きだ）
mi iko tote ili.        （私はここへ行く）
li komo pulomute teli.  （彼はそこから来る）
```

`iliu` は `ili`、`teliu` は `teli` とだけ編集距離1で、それ以外の語とは2以上（§8.1 の規則を守っている。語の登録は `dictionary/function_additions.csv` の `partner` 列で相手を明示する）。

---

## 7. 構文規則

### 基本語順: 厳格 SVO
[S] [副詞] [マーカー] [V] [形容詞+O] [前置詞句]

### 疑問詞の位置（v0.4 確定案）
疑問詞は文頭へ動かさず、答えが入る位置にそのまま置く（その場置き）。文末は §4 の `ka?`。

| 疑問詞 | 位置 | 例 |
|---|---|---|
| wata（何）, kua（誰）| 名詞の位置（主語・目的語・修飾語）| kua komo ka?（誰が来ますか）|
| wela（どこ）, wena（いつ）| 文末の前置詞句の位置。前置詞の目的語として必ず前置詞を伴う（場所・時の一般形は atute）| tuka alo atute wela ka? / tu iko tote wela ka? |
| waia（なぜ）, aua（どうやって）| 副詞の位置（主語の直後、マーカーの前）| tu waia no ito apa ka? |

### 数量・年齢の疑問（v0.10 確定）

新しい語は作らず、`aua`（どうやって）と `mene`（多くの）を並べる（副詞が形容詞を修飾するときは形容詞の直前に置く規則のまま）。

```
tu pasu ito aua mene apa ka?   （あなたはリンゴをいくつ食べましたか）
iliu pio aua mene ka?          （これはいくらですか）
tu oto wata ila ka?            （あなたは何歳ですか。年齢は §5 の `mi oto to ila` と同じ形）
```

### 法の副詞（v0.4 確定案）
kani（できる）, masi（ねばならない）, mei（かもしれない）, sati（べき）は副詞の位置に置き、マーカーの前に来る。
否定 `no` は動詞にかかり、法副詞の後ろに置くと法副詞が否定の外側に立つ。
- mi kani lano.（私は走れる）/ mi kani no lano.（私は走れない）
- mi masi pasu ito apa.（私はリンゴを食べねばならなかった）

### 受動態: 禁止
常に能動態で表現。能動主体不明の場合は somena（誰か）を主語に置く。

### SVOO / SVOC: 禁止
SVO + 前置詞句で代替。
- 「私はあなたに本をあげた」→ mi pasu kipo puka tote tu.

### 関係節
マーカー **ta** を名詞の直後に置く。
- mi sio mana ta li lano.（私は走っている人を見る）

### 比較
- 比較級: moli + 形容詞 + tanute + 基準（〜より）（moli は辞書既存の副詞「もっと」。mor の代替）
  例: mi pio moli kute tanute tu.（私はあなたより良い）
- 最上級: mosi + 形容詞または動詞（mi mosi laiko apa.）
- 副詞が形容詞を修飾するとき（moli, peli など）は形容詞の直前に置く。上の「副詞の位置」は動詞を修飾する副詞の規則。
- 同等: seme + tote（〜と同じ）
- 同じくらい・〜ほど…ない（v0.22 確定、提案014）: `seme` を形容詞の前に置き、基準は `tote` で導く。否定は `no` を `pio` の前に置く。
  `mi pio seme wuje tote li.`（私は彼と同じくらい忙しい）、`li no pio seme pasute tote mi.`（彼は私ほど速くない）、英語 as ~ as も同じ。
- 動詞の比較（v0.22）: 動詞のあとに `moli` + 副詞 + `tanute` + 基準 を、ひとまとまりで置く（副詞は辞書の副詞だけ。`poni` = よく・上手に）。
  `li sino moli poni tanute mi.`（彼女は私より上手に歌う。She sings better than me.）、`li ito moli tanute mi.`（彼は私よりもっと食べる）。提案014 の例と同じ並び。
- 最上級の範囲（v0.22）: 最上級のあとに前置詞 `inute` を置く。`li pio mosi jowe inute misu.`（私たちの中で一番若い。the youngest of us）。英語の the + 最上級は the を訳さない。
### 使役
動詞 koso（させる）+ 動名詞（-na）
- mi koso li tote komona.（私は彼を来させる）

### 変化（v0.23 確定、提案015）
- 〜になる・〜くなる: `pekomo`（成る）は `pio` と同じく、補語に名詞か形容詞を直接取る。時制・マーカーは `pekomo` の前。
  `li pekomo kole.`（寒くなる）、`li pasu pekomo titusa.`（彼は先生になった）、`jeta pekomo aisa.`（水が氷になる）。主語のない「寒くなる」は、天候などの it にあたる `li` を補う。
- だんだん = `kulapi`、ますます = `initi`（辞書の副詞）。どちらも副詞の位置（主語の直後、マーカーの前）。`li kulapi pekomo kole.`（だんだん寒くなる）、`li initi pekomo wuje.`（ますます忙しくなる）。
  もっと寒くなる は補語に `moli` を付ける（`li pekomo moli kole.`。比較の形、提案014）。英語の gradually・more and more・ADJer and ADJer も同じ形にする。
- 〜にする・〜くする: `koso`（させる）+ 目的語 + 補語（名詞か形容詞）。`mi koso luma lase.`（部屋を大きくする）、`mi koso li titusa.`（彼を先生にする）。動名詞の使役（`koso li komona`）は、そのまま。
  目的語のない「コーヒーにする」は、変化ではなく「選ぶ」の意味で `tuso kupa.`。
- 〜てきた・〜ていく: 時間の流れの意味は訳さない。〜てきた は過去（`pasu`）、〜ていく は現在として読む。
- 英語: become / get / turn / grow + 形容詞（become は名詞も）、make + 目的語 + 形容詞。`turn left` は曲がる（`tuluno`）で、変化ではない。make + 目的語 + 名詞（`made him a teacher`）は、授与との区別がつかないため未対応。
- この規則に含めないもの: 〜ことになる・〜ようになる、受け身・可能の慣用句、形容詞から副詞を作る規則。

### 動詞に続く表現（v0.26 確定、提案018）
新しい語は作らない。辞書の語と、動名詞（`-na`、§3）を使う。否定 `no`・時制 `pasu` `putu` は、これまでどおり動詞（ここでは `wonuto` など）の前に置く。
- 〜たい: `wonuto`（欲する）+ 動名詞。`mi wonuto itona.`（食べたい）、`mi no wonuto itona.`（食べたくない）、`mi pasu wonuto ikona.`（行きたかった）。動名詞のあとに、目的語・前置詞句が続く（`mi wonuto lotona pupa.` = 本を読みたい）。
- 〜始める・〜終わる・〜続ける: `sutato`・`pino`・`konupo` + 動名詞。`li pasu sutato itona.`（食べ始めた）、`mi pasu pino lotona pupa.`（本を読み終わった）、`li pasu konupo likona jeta.`（水を飲み続けた）。
- 〜すぎる: `tui`（あまりに）を、副詞の位置（主語の直後、マーカーの前）に置く。`mi tui pasu ito.`（食べすぎた）。形容詞の「暑すぎる」も同じ（`li tui pio ote.`）。名詞を修飾する形容詞のときは、形容詞の直前（`tui kue luma.` = 静かすぎる部屋）。
- 〜やすい・〜にくい: `pio ise` / `pio tipike` + 動名詞。主語は、動作の対象（日本語・英語の主語と同じ）。`iliu pupa pio ise lotona.`（この本は読みやすい）、`iliu pupa pio tipike lotona.`（読みにくい）。名詞を修飾するときは関係節（`pupa ta li pio ise lotona`）。
- 英語: want to V、start / begin / finish / continue / keep + ~ing（keep は `konupo`）、too + 形容詞・副詞・much（`tui`。文末の too = 〜も は `olusi`）、easy / difficult / hard + to V（hard は「難しい」）。
- 名詞にする形（〜たいこと など）は、動名詞にできないため、〜たい・〜すぎる の部分を省く（翻訳機が注意を出す）。
- この規則に含めないもの: 〜かける・〜出す・〜きる・〜そうだ・〜らしい・〜はずだ などの様態・推量、受け身。

### 仮定法
接続詞 ipu（もし）+ 仮定マーカー wutu
- ipu mi wutu pio pata, mi wutu pulaio.（もし鳥なら、飛ぶのに）

---

## 8. 語彙生成アルゴリズム

### 音訳ルール（英語ベース）
| 英語音 | Logi音 |
|---|---|
| b, f, v | → p |
| d, th | → t |
| g, c(hard) | → k |
| z, sh, ch | → s |
| r | → l |
| h | → 削除 |
| y | → j |

### 語源優先順位
1. 音象徴（意味と音が対応）
2. 英語・日本語・スペイン語・中国語からの多言語投票（今後拡張）
3. 衝突回避（編集距離1以内の語幹を禁止）

### 8.1 英検3級レベルの語の追加（v0.7）
`tools/coin_words.py` が `dictionary/eiken3_additions.csv`（英語・品詞・日本語の意味・別名）の語を造語し、`final.csv` と `dictionary/glossary_en.csv` に追記する。同じ語は二度追加されない（`--check` で全語の存在を確認できる）。

- 英語の綴りを上の音訳ルールで Logi の音にし、子音連続は `u` で割る。同じ母音が続く形（`awaa` など）は避ける。
- 語幹は3音節以下（代名詞は2音節以下）、語尾は品詞ごとに -a・-o・-e・-i、前置詞は先頭2音節＋`te`。
- 既存のどの語とも編集距離2以上になる形を探す。同じ英語の別品詞（cook の `kuka`/`kuko`）と、形容詞から作る -ly 副詞（`aluke`/`aluki`）は語幹を共有し、この組の相手とだけは1文字違いを許す（v0.9.1。相手以外の語と1文字違いになるときは、語幹を共有せずに造語する）。
- 動詞に `na` を付けた動名詞が別の語と衝突する形は使わない。
- 意味（日本語・英語）は Claude が書いた案で、人の確認を受けていない。造語した音も提案であり、気に入らない語は `final.csv` で直してよい（その後 `python tools/build_web.py`）。
- 語彙の元にした見出し語は、公開されている英検3級の単語リスト2件（edule.jp、step.saitama.jp）の見出し語のみ。例文や解説は使っていない。

### 8.2 日本語の基本語彙の追加（v0.8）
英検3級は英語学習者向けの範囲で、「夢」や「人生」のような日常語が抜けていた。そこで日本語の基本語彙を基準にし直した。

- 基準: 国立国語研究所の「日本語教育基本語彙データベース」（CC BY 4.0。`dictionary/sources/`）で、6つのリストのうち5つ以上に採用され、国語研教育基本語彙で◎の語。候補は `python tools/core_candidates.py` で出せる。
- 英語・品詞・日本語の意味を付けた `dictionary/core_additions.csv` から、§8.1 と同じ方法（`tools/coin_words.py`）で549語を造語した。
- 数詞・日付の数え方（v0.17 で決定、§5）・敬語（v0.19 で決定、§4）・指示詞（これ・あれ）・はい／いいえは入れていない。複合語で言えるものと、文法に枠が無いものは、設計が決まってから足す（出典 README に一覧）。
- 英語と日本語の意味は Claude が書いた案で、人の確認を受けていない。

---

## 9. 確定例文

### 自己紹介文
**日本語**
こんにちは。私は20歳で、大学生です。好きな食べ物はリンゴです。私はあなたと友達になりたいと思います。あなたの名前はなんですか？好きな食べ物はなんですか？いろいろ私に教えてください。

**Logi**
mi toko tu. mi oto to pulu ila e mi pio sutua. mi mosi laiko apa. mi wonuto piona pulena witute tu. tu nema pio wata ka? tu laiko wata puta ka? tituso mene sina tote mi.

### 語注
| Logi | 意味 | 変更点 |
|---|---|---|
| toko | 話す | 変更なし |
| oto | 持つ | hoto → h削除 |
| to pulu ila | 20歳 | iras → ila（r→l）|
| sutua | 学生 | stua → sutua（子音連続解消）|
| mosi | 最も | mos → mosi（副詞語尾統一）|
| laiko | 好む | raiko → laiko（r→l）|
| piona | 〜になること | pioina → piona（動名詞語尾-na）|
| pulena | 友達 | prena → pulena（r→l, pr→pul）|
| witute | 〜と | witde → witute（-de→-te）|
| tote | 〜へ | tode → tote（-de→-te）|
| tituso | 教える | titso → tituso（子音連続解消）|

---

## 10. 派生・複合語と接続詞（v0.4 草案・未確定）

辞書 `dictionary/final.csv` を調べた結果に基づく草案。例文コーパスで検証してから確定する。

### 10.1 派生語
- 確定済みの規則は動名詞 **動詞 + na**（pio → piona）のみ。
- **品詞語尾の母音交替による品詞転換（-a → -o など）は採用しない。**
  辞書では、末尾母音だけが違う語が複数の品詞にまたがる語幹が127ある。
  意味が関連するもの（kaia「親切」と kaie「親切な」）と、無関係なもの
  （peta「美」と peto「話す」、apa「リンゴ」と apo「起こる」）が混在している。
  母音交替を生産的な規則にすると、既存の無関係な語と衝突する。
- 新しい派生接辞が必要になった場合は、独立した音節の接辞として追加し、辞書で衝突を確認する。

### 10.2 複合語
- 複合語は新語を作らず、**修飾語 + 被修飾語** の語順で語を並べて表す（主要語が後ろ）。
  例文の `tu nema`（あなたの名前）と同じ形。
- 形容詞は名詞の前に置く（§7）。名詞が名詞を修飾する場合も同じ順序。
- 語幹は3音節以内（`validate.py` の制約）なので、長い概念は複合語ではなく語の並びで表す。

### 10.3 接続詞（辞書にある語）
並列・対比・結果をつなぐ語（節の間に置く）:
| 語 | 意味 | 用法 |
|---|---|---|
| e | と（および）| 語・句・節を対等に結ぶ |
| o | または | 同上 |
| patu | しかし | 節を結ぶ |
| sonu | だから | 節を結ぶ（旧 so。数詞6 so と分離）|
| tanute | より | 比較の基準を導く（§7）|

従属接続語（その節の頭に置く。v0.6 で追加）:
| 語 | 意味 | 由来（英語の音訳）|
|---|---|---|
| ipu | もし | if（§7）|
| pikosu | なぜなら | because（b→p、語尾 -u）|
| wenute | とき | when（接続詞語尾 -nute。疑問詞 wena とは別語）|
| kasolu | ように | as（様態。v0.16 で追加。語尾 -u の3音節）|
| wailu | 間 | while |
| pipolu | 前に | before（b→p, f→p, r→l）|
| aputi | 後で | after（f→p）|
| utilu | まで | until（n 削除）|
| ulesu | でなければ | unless |
| oluto | のに | although |

### 10.3.1 接続語の使い方（v0.6 確定案・翻訳機の取り決め）
- **従属接続語は、かかる節の直前に置く。** 節どうしの順序は原文のまま変えない（`ipu A, B.` も `B, ipu A.` も可）。節の間にはコンマを置く。
- **並列・対比・結果の接続語は、節の間に置く。** `A, patu B.` のように、後ろの節の直前に置く。
- 主語が同じ節の主語は省かず、後ろの節にも置く。時制・否定は節ごとに付ける。

`web/translator.js` は次のように訳す。
| 日本語・英語 | Logi |
|---|---|
| しかし／〜が・けど／but | `A, patu B.` |
| だから（文頭・「〜だ、だから」）／so | `A, sonu B.` |
| なぜなら・〜から・〜ので・〜だから（述語の直後）／because | `pikosu A, B.` / `B, pikosu A.` |
| 〜とき／when | `wenute A, B.` / `B, wenute A.` |
| 〜間・〜ながら／while | `wailu A, B.` |
| 〜前に／before | `pipolu A, B.` |
| 〜後で・〜てから／after | `aputi A, B.` |
| 〜まで／until | `utilu A, B.` |
| 〜のに／although | `oluto A, B.` |
| unless | `B, ulesu A.` |
| そして・〜て／and（節）| `A, e B.` |
| または／or（節）| `A, o B.` |
| もし A なら・〜ば・〜たら／if A | `ipu A, B.` |
| もし〜なら…だろうに／if I were ~, I would ~ | `ipu A wutu …, B wutu ….`（両方の節に wutu を置き、時制は置かない）|
| 〜と思う・言う／think (that) ~ | `mi omo [節].`（節をそのまま目的語にする。「that」に当たる語は置かない）|

日本語の「〜でなければ」（unless）は、否定の条件（〜なければ）と区別できないため、翻訳機では訳しません。

### 間接疑問と間接命令（v0.18 確定、提案009）
- **間接疑問**: 疑問の節をそのまま目的語にし、節の終わりに `ka` を置く（`?` は置かない。文全体は平叙文）。疑問詞も、はい／いいえも同じ形。
  `li pasu asuko mi pasu ito wata ka.`（彼は、私が何を食べたか聞いた）、`mi no mo li komo ka.`（彼が来るかどうか知らない）。
  日本語の「聞く」は、あとに「か」の節が続くとき `asuko`（尋ねる）にする（「音が聞こえる」の `oo` とは別）。尋ねた相手（「私に」）は、文の最後に `tote` で置く（`… ka tote mi.`）。
- **間接命令・依頼**: 命じられた人を主語にした節に、法副詞 `sati`（べき）を入れて、目的語にする。禁止は `sati no`。動詞は `juo`（言う）・`tano`（頼む）・`olo`（命じる）。
  `li pasu juo mi sati ito apa.`（彼は私にリンゴを食べるように言った）、`li pasu juo mi sati no iko.`（行くなと言った）。
- **引用の主語**: 言った人（主節の主語）は前に置く。中身の主語が言った人と同じときは `selu`（`li pasu juo selu komo.` = 彼は、自分が来ると言った）。別の人なら、その人を書く（`li pasu juo li komo.`）。
- 翻訳機: 日本語は 〜か／〜かどうか＋聞く・尋ねる・知る・覚える、〜ように／〜なと＋言う・頼む・命じる。英語は asked/know/wonder/remember/forget ＋ what/where/who/why/how/whether/if、told/asked/ordered ＋ 人 ＋（not）to V。

### 10.4 目的・様態・対比（v0.16 確定）
v0.6 で理由（pikosu）と時（wenute など）の語を追加した。v0.16 で、目的・様態・対比を決めた（提案007）。

| 意味 | 作り方 | 例 |
|---|---|---|
| 目的（〜ために・in order to・to + 動詞）| `pote`（のために。for）+ 動名詞（動詞 + `na`）。目的語・前置詞句を取り込み、文の最後に置く | `mi iko tote sukula pote itona apa.`（私はリンゴを食べるために学校へ行く）|
| 様態（〜ように・as）| 新しい従属接続語 `kasolu`。かかる節の直前に置く（§10.3.1）| `kasolu li juo, mi iko.`（彼が言うように、私は行く）|
| 対比（〜一方（で）・whereas・on the other hand）| 既存の `patu`（しかし）| `mi ito, patu li neo.`（私は食べる一方で、彼は寝る）|

- 目的の `pote + 動名詞` は、主語が主節と同じときだけ（主語の違う目的は表せない）。
- 日本語の「ために」は、動詞のあとだけを目的とする。名詞のあとの「〜のために」は、これまでどおり `pote + 名詞`（`iko pote pupa.`）。原因の「ために」（病気のために休んだ）は、`pikosu`（なぜなら）で言う。
- 英語の `to + 動詞` は、目的語か前置詞句があるとき、または移動の動詞（go・come など）のあとだけ目的として読む。`want to`・`need to`・`ask him to` のような補語の to は、目的にしない。
- 「〜ように」の目的（so that）と願い（〜ますように）は含めない。
- 次は未定義のまま:
  - 内容節（〜と思う／〜ということ）: 語は置かず、節をそのまま並べる（§10.3.1）。専用の語が必要か、例文で確かめる

### 10.5 例文コーパスで未検証の項目
`corpus/examples.csv`（90文）は辞書の語だけで書かれ、`tests/test_examples.py` で検証される。次は仕様が未確定のため含めていない。
- 副詞 sati と、複数の法副詞・マーカーが並ぶ文

### 10.6 同義語の整理
辞書には同じ意味・同じ品詞の語が30グループあった。`dictionary/final.csv` の `status` 列で正本（active）と非推奨（deprecated）を区別し、
非推奨語には `replaced_by` に正本を書く。非推奨語は削除せず残すが、例文では使わない。
正本の選び方（`tools/synonyms.py`）:
1. 動名詞（動詞 + na）が既存の別語と衝突する語は正本にしない
2. 音節数が少ない語
3. README・文法仕様書・コーパスですでに使われている語
4. 辞書の並び順で先の語

例外は `OVERRIDES` に記す（現在は naue のみ。naua「現在」・naui「今」と語族をなすため）。
30グループ中20グループは音節数が同じで、3・4番の機械的な基準で決めた。語感による見直しを歓迎する。

### 10.7 動名詞の衝突（解決済み）
動詞 + na が既存の別語と一致する例は po（夢見る）→ pona（点数と同形）だけだった。
v0.5 で po を **tulimo**（英 dream の音訳: d→t, r→l, 子音連続を u で分割）に改めた。
`tests/test_dictionary.py` が、新しい衝突が生まれないことを検査する。

---

## 11. 変更履歴

| 版 | 変更内容 |
|---|---|
| v0.1 | SVO-Logi / NGSL 初版 |
| v0.2 | r廃止、子音9音へ、音節構造(C)V限定 |
| v0.3 | 前置詞語尾 -de → -te、動名詞語尾 -ina → -na |
| v0.3 | 複数語尾 -s 廃止、meneで代替 |
| v0.3 | 疑問文 ka + ? 規則確定 |
| v0.3 | osujo廃止（titusoniに統合）|
| v0.3 | 辞書602語、新ルール100%適合 |
| v0.4 | 語末子音を持つ機能語に `-u` を付加（pas→pasu, fut→putu, mis→misu, ip→ipu, tante→tanute 等）。辞書の形が正 |
| v0.4 | 再帰代名詞 so→selu、接続詞「だから」so→sonu（数詞6の so と分離）|
| v0.4 | 数詞0〜9・位の単位・mipu・selu を辞書に追加、重複行 komo を削除し616語。比較は mor を廃し既存の moli を使用 |
| v0.4 | 数詞と機能語の同音（tu/li/ka）を許容し、曖昧性規則を §5 に追加 |
| v0.5 | 数詞 2・4・5 を tu・ka・li から to・ku・pe に変更し、数詞と機能語の同音をなくした |
| v0.5 | 動詞 po（夢見る）を tulimo に改め、動名詞 pona と点数 pona の衝突を解消 |
| v0.6 | 従属接続語を8語追加（pikosu 〜なので・wenute 〜とき・wailu 〜間・pipolu 〜前に・aputi 〜後で・utilu 〜まで・ulesu 〜でなければ・oluto 〜のに）し、624語。従属接続語は節の直前に置き、節の順序は原文のままとする（§10.3.1）|
| v0.7 | 英検3級レベルの語を487語追加し、1,111語（§8.1）。名詞・動詞・形容詞・副詞・前置詞・代名詞。前置詞は above/across/against/among/around/behind/between/during/into/near/off/over/through/under/without/onto/beside |
| v0.8 | 日本語の基本語彙を549語追加し、1,660語（§8.2）。夢 `tulima`（動詞 `tulimo` と同じ語幹）・人生 `lipeta`・する `topo` など |
| v0.9 | 現代・IT語彙を10語追加し、1,670語（人工知能 `alutipa`・ネットワーク `netuwa`・スマートフォン `sumawa`・プログラムする `pupoko` など。`dictionary/modern_tech_additions.csv`）|
| v0.9.1 | 名詞 `puwoja`（プログラム）を追加し、1,671語。語幹を共有する組（`kuka`/`kuko` など）も、相手以外の語とは編集距離2以上を保つ規則に改めた（§8.1）。`modern_tech_additions.csv` を `tools/coin_words.py` の対象に登録 |
| v0.10 | 指示詞 `iliu`（これ）・`teliu`（あれ）、はい `jesu`（いいえは `no`）、数量の疑問 `aua mene`、年齢の疑問 `wata ila` を追加（提案001、§4・§6.1・§7）。1,674語。例文を7文足して65文 |
| v0.11 | あいさつ `kelosu`（こんにちは）・`kupaju`（さようなら）・`pilisu`（どうぞ）を追加（提案002、§4）。短い機能語は、3音節の空き形を指定して登録する。`interjection_additions.csv` を `tools/coin_words.py` の対象に登録。例文を3文足して68文。1,702語 |
| v0.12 | 命令・依頼・禁止・勧誘を、文末の `!` で表す（命令は主語を省く、依頼は `pilisu,`、禁止は `no`、勧誘は主語 `misu`。提案003、§4）。新しい語はなし。例文を7文足して75文 |
| v0.13 | 疑問文での許可・依頼・申し出を、法副詞で表す（許可と依頼は `kani`、申し出は `sati`。丁寧な依頼は文頭に `pilisu,`。提案004、§4）。May I の `mei` の誤訳を直した。新しい語はなし。例文を5文足して80文 |
| v0.14 | 日常のあいさつを、既存の語の決まった言い方で表す（おはよう `kute mola.`、おやすみ `kute naita.`、すみません `mi pio moke.`、ありがとう `mi tanako tu.`。提案005、§4）。新しい語はなし。翻訳機が日本語・英語に対応。例文を4文足して84文 |
| v0.15 | 平叙文の許可・禁止・不要を、法副詞で表す（許可 `kani`、禁止 `masi no`、不要 `kani no`。日本語で主語がなければ `tu`。提案006、§4）。英語の `You may` を `kani` にした（可能性の `may` は `mei` のまま）。新しい語はなし。例文を3文足して87文 |
| v0.16 | 目的・様態・対比を表す（目的 `pote` + 動名詞、様態 `kasolu`（新語・接続詞）、対比 `patu`。提案007、§10.4）。翻訳機が日本語（〜ために・〜ように・〜一方）と英語（in order to・to + 動詞・as・whereas・on the other hand）に対応。例文を3文足して90文。1,745語 |
| v0.17 | 暦と時刻を表す（単位 + 数 = 暦・時刻、数 + 単位 = 数量。前置詞は時刻 `atute`・曜日と日付 `onute`・月と年 `inute`。毎〜 `epule`・来〜 `nete`・先〜 `sese`・今〜 `iliu`。提案008、§5）。翻訳機が日本語（N月M日・N年・N時M分・毎〜・来〜・先〜・今〜）と英語（月の名前・o'clock）に対応。新語なし。1,745語 |
| v0.18 | 間接疑問（節 + `ka`、`?` なし）と間接命令（`sati` で言い換える。禁止は `sati no`）、引用の主語（同じ人は `selu`）を決めた（提案009、§10.3.1）。翻訳機が日本語（〜か聞いた・〜かどうか知らない・〜ように言った・〜なと言った）と英語（asked what / whether、told me to V）に対応。新語なし。1,745語 |
| v0.19 | 敬語は段階を作らず、意味だけ訳す（敬語の動詞はふつうの動詞に直す、お／ご・さん／様は落とす、お／ご + 動詞 + ください = `pilisu, 動詞!`、いらっしゃいませ = `weluko!`、ごちそうさま = `mi tanako tu.`、お願いします = `pilisu.`。提案010、§4）。翻訳機が日本語の敬語に対応。新語なし。1,745語 |
| v0.20 | あいさつの続きと願いの言葉を決めた（こんばんは・Good evening = `kute ipa.`、Good afternoon = `kute apuja.`、お元気ですか = `tu pio miwe ka?`、元気です = `mi pio miwe.`、Good luck = `kute luna!`、Have a nice day = `kute teia!`、See you tomorrow = `mi putu sio tu moloa.`。提案011、§4）。翻訳機が対応。新語なし。1,745語 |
| v0.21 | 助数詞・順序数・回数・単位を決めた（助数詞は作らず落とす、順序数は名詞のあとに `semuna` + 数、回数は `te taima`、単位は数 + 単位の語。提案013、§5）。翻訳機が日本語（個・匹・冊・本・枚・台・頭・羽・杯、N番目・第N、回・度）と英語（first〜tenth、unit + of）に対応。新語なし。M1ko は「お任せ」と返事をし、Claude がおすすめの A を採った。2,780語 |
| v0.22 | 比較の続きを決めた（同じくらい `pio seme 形容詞 tote 基準`、動詞の比較 `moli 副詞 tanute 基準`、最上級の範囲 `inute`。提案014、§7）。翻訳機が日本語（〜と同じくらい・〜ほど…ない・〜より（動詞文）・〜の中で一番）と英語（as ~ as・better than・the + 最上級・of / in + 範囲）に対応。新語なし。M1ko は「お任せ」と返事をし、Claude がおすすめの A を採った。2,780語 |
| v0.23 | 変化を決めた（〜になる `pekomo` + 補語、だんだん `kulapi`、ますます `initi`、〜にする `koso` + 目的語 + 補語。提案015、§7）。翻訳機が日本語（〜になる・〜くなる・〜になってきた・〜にする・〜くする・だんだん・ますます）と英語（become・get・turn・grow + 形容詞、make + 目的語 + 形容詞、gradually、more and more）に対応。新語なし。M1ko は「お任せ」と返事をし、Claude がおすすめの A を採った（ますますは、辞書の `initi` を使った）。2,880語 |
| v0.24 | 形容詞から作る副詞を決めた（語尾 `-e` → `-i`、派生は辞書に登録しない。辞書に同じ形の語があれば派生しない。提案016、§3）。翻訳機が日本語（〜く・〜に）と英語（-ly）に対応。M1ko は「お任せ」と返事をし、Claude がおすすめの A を採った（Q2 は、別の副詞を足す語を 6 語から 2 語に絞った）。2,880語 |
| v0.25 | 倍・半分・分数・割合を決めた（倍 `N taima seme 形容詞 tote 基準`、半分 `alema` + 名詞、分数 `分子 semuna 分母`、割合 `数 pepuka`。提案017、§5）。翻訳機が日本語（N倍・半分・N分のM・%）と英語（twice as ~ as・N times as ~ as・half of・two thirds of・percent・%）に対応。新語なし。M1ko は「お任せ」と返事をし、Claude がおすすめの A を採った。2,979語 |
| v0.26 | 動詞に続く表現を決めた（〜たい `wonuto`、〜始める・〜終わる・〜続ける `sutato`・`pino`・`konupo`、〜すぎる `tui`、〜やすい・〜にくい `pio ise`・`pio tipike`。すべて動名詞を使う。提案018、§7）。翻訳機が日本語と英語（want to・start / finish / keep ~ing・too・easy / hard to）に対応し、英語 `too` が `olusi` になる誤りを直した。新語なし。M1ko は「お任せ」と返事をし、Claude がおすすめの A を採った（すぎる の語順は、既存の副詞の位置の規則に合わせた）。3,070語 |
| v0.4 | 疑問詞はその場置き、法副詞は副詞の位置（マーカーの前）と §7 に追記 |
| v0.4 | 同義語33語を deprecated にし（status / replaced_by 列を追加）、正本の選び方を §10.6 に記載 |
