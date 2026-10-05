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

### 使役
動詞 koso（させる）+ 動名詞（-na）
- mi koso li tote komona.（私は彼を来させる）

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
- 既存のどの語とも編集距離2以上になる形を探す。同じ英語の別品詞（cook の `kuka`/`kuko`）と、形容詞から作る -ly 副詞（`aluke`/`aluki`）は語幹を共有し、この組だけは1文字違いを許す。
- 動詞に `na` を付けた動名詞が別の語と衝突する形は使わない。
- 意味（日本語・英語）は Claude が書いた案で、人の確認を受けていない。造語した音も提案であり、気に入らない語は `final.csv` で直してよい（その後 `python tools/build_web.py`）。
- 語彙の元にした見出し語は、公開されている英検3級の単語リスト2件（edule.jp、step.saitama.jp）の見出し語のみ。例文や解説は使っていない。

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

辞書 `dictionary/final.csv`（1,111語）を調べた結果に基づく草案。例文コーパスで検証してから確定する。

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

### 10.4 未定義の接続（語の追加が必要）
v0.6 で理由（pikosu）と時（wenute など）の語を追加した。次は未定義のまま。
- 内容節（〜と思う／〜ということ）: 語は置かず、節をそのまま並べる（§10.3.1）。専用の語が必要か、例文で確かめる
- 目的（〜ために＋節）、方法・様態（〜ように）、同時の対比（〜一方）

### 10.5 例文コーパスで未検証の項目
`corpus/examples.csv`（58文）は辞書の語だけで書かれ、`tests/test_examples.py` で検証される。次は仕様が未確定のため含めていない。
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
| v0.4 | 疑問詞はその場置き、法副詞は副詞の位置（マーカーの前）と §7 に追記 |
| v0.4 | 同義語33語を deprecated にし（status / replaced_by 列を追加）、正本の選び方を §10.6 に記載 |
