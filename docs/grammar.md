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
| 動名詞 | **-na** | piona（であること）, tikona（教えること）※旧-inaから変更 |

### 機能語の語末子音（v0.4 確定）
マーカー・代名詞複数形・接続詞など、語形が子音で終わる機能語は語末に **-u** を付ける。
(C)V 規則を保つための措置で、辞書の形が正本である。
- 例: pas → **pasu**, kon → **konu**, pin → **pinu**, wut → **wutu**, ip → **ipu**
- 例: mis → **misu**, tus → **tusu**, lis → **lisu**, tante → **tanute**
- f は使えないため fut → **putu**、r は廃止のため mor → **molu**

### 動名詞の作り方
動詞（-o で終わる形）の末尾に **na** を付ける: pio → piona, tiko → tikona。

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
| 2 | tu |
| 3 | te |
| 4 | ka |
| 5 | li |
| 6 | so |
| 7 | se |
| 8 | wa |
| 9 | ja |

10以上は位取り合成。位の単位語: pulu（〜十）、kupulu（〜百）、mipulu（〜千）

### 数詞と機能語の同音（v0.4・暫定規則）
数詞 tu(2) / li(5) / ka(4) は、代名詞 tu・li、疑問マーカー ka と同音である（辞書で唯一許容する同音）。
- 数詞列: 数詞と位の単位語（pulu kupulu mipulu）の連続は一つの数詞句として読む。
  例: mi oto tu pulu ila.（私は20歳）の tu pulu は数詞句。
- 疑問マーカー ka は文末の `ka?` の形でのみ現れる。数詞4で文を終える場合は直後に名詞または単位語を置く。
- 未解決: 目的語の代名詞 tu/li の直後に数詞句が続く文（例: 「あなたたち二人を見る」を tu tu mana と書く場合）は
  曖昧になり得る。この場合は前置詞句で言い換える。例文コーパスの拡充（ステップ3）で実例を検証して確定する。

| 数 | Logi |
|---|---|
| 10 | pa pulu |
| 20 | tu pulu |
| 25 | tu pulu li |
| 100 | pa kupulu |
| 2025 | tu mipulu ni kupulu tu pulu li |

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

### 受動態: 禁止
常に能動態で表現。能動主体不明の場合は somena（誰か）を主語に置く。

### SVOO / SVOC: 禁止
SVO + 前置詞句で代替。
- 「私はあなたに本をあげた」→ mi pasu kipo puka tote tu.

### 関係節
マーカー **ta** を名詞の直後に置く。
- mi sio mana ta li rano.（私は走っている人を見る）

### 比較
- 比較級: molu + tanute（〜より）
- 最上級: mosi + 形容詞
- 同等: seme + tote（〜と同じ）

### 使役
動詞 koso（させる）+ 動名詞（-na）
- mi koso li tote koina.（私は彼をここへ来させる）

### 仮定法
接続詞 ipu（もし）+ 仮定マーカー wutu
- ipu mi wutu pio pata, mi wutu palaio.（もし鳥なら、飛ぶのに）

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

---

## 9. 確定例文

### 自己紹介文
**日本語**
こんにちは。私は20歳で、大学生です。好きな食べ物はリンゴです。私はあなたと友達になりたいと思います。あなたの名前はなんですか？好きな食べ物はなんですか？いろいろ私に教えてください。

**Logi**
mi toko tu. mi oto tu pulu ila e mi pio sutua. mi mosi laiko apa. mi wonuto piona pulena witute tu. tu nema pio wata ka? tu laiko wata puta ka? tituso mene sina tote mi.

### 語注
| Logi | 意味 | 変更点 |
|---|---|---|
| toko | 話す | 変更なし |
| oto | 持つ | hoto → h削除 |
| tu pulu ila | 20歳 | iras → ila（r→l）|
| sutua | 学生 | stua → sutua（子音連続解消）|
| mosi | 最も | mos → mosi（副詞語尾統一）|
| laiko | 好む | raiko → laiko（r→l）|
| piona | 〜になること | pioina → piona（動名詞語尾-na）|
| pulena | 友達 | prena → pulena（r→l, pr→pul）|
| witute | 〜と | witde → witute（-de→-te）|
| tote | 〜へ | tode → tote（-de→-te）|
| tituso | 教える | titso → tituso（子音連続解消）|

---

## 10. 変更履歴

| 版 | 変更内容 |
|---|---|
| v0.1 | SVO-Logi / NGSL 初版 |
| v0.2 | r廃止、子音9音へ、音節構造(C)V限定 |
| v0.3 | 前置詞語尾 -de → -te、動名詞語尾 -ina → -na |
| v0.3 | 複数語尾 -s 廃止、meneで代替 |
| v0.3 | 疑問文 ka + ? 規則確定 |
| v0.3 | osujo廃止（titusoniに統合）|
| v0.3 | 辞書602語、新ルール100%適合 |
| v0.4 | 語末子音を持つ機能語に `-u` を付加（pas→pasu, fut→putu, mor→molu, mis→misu, ip→ipu, tante→tanute 等）。辞書の形が正 |
| v0.4 | 再帰代名詞 so→selu、接続詞「だから」so→sonu（数詞6の so と分離）|
| v0.4 | 数詞0〜9・位の単位・mipu・molu・selu を辞書に追加、重複行 komo を削除し617語 |
| v0.4 | 数詞と機能語の同音（tu/li/ka）を許容し、曖昧性規則を §5 に追加 |
