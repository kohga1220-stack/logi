# Logi

**Logi** is a minimalist constructed language designed for logical clarity and cross-linguistic accessibility.

**Logi**（ロジ）は、論理的な明快さと言語的な公平性を目指して設計された人工言語です。

> "logical → logi" — log(1) = 0, the origin point.

---

## Design Principles / 設計原則

- **SVO-fixed word order** — Subject → Verb → Object, no exceptions
- **15-phoneme system** — 5 vowels + 9 consonants (no r/l confusion)
- **(C)V syllable structure** — every syllable ends in a vowel; no consonant clusters
- **Suffix-based part-of-speech** — noun `-a`, verb `-o`, adjective `-e`, adverb `-i`, preposition `-te`
- **No passive voice** — always active SVO
- **No plural suffix** — plurality expressed via `mene` (many)
- **616-word core dictionary** — machine-validated; the only homophones are numerals vs. function words (`tu`, `li`, `ka`)
- **Function words take `-u`**: a final consonant gets `-u` (`pas`→`pasu`), a consonant cluster is split by `u` (`tante`→`tanute`)

---

## Phonology / 音韻論

| | Sounds |
|---|---|
| Vowels（母音）| a, e, i, o, u |
| Consonants（子音）| p, t, k, m, n, s, l, w, j |

Syllable structure: **(C)V only**
No consonant clusters. No word-final consonants.

---

## Quick Grammar / 文法早見表

| Feature | Rule | Example |
|---|---|---|
| Word order | S-V-O | mi toko tu. |
| Past tense | pasu + V | mi pasu toko tu. |
| Future | putu + V | mi putu toko tu. |
| Negation | no + V | mi no toko tu. |
| Question | V … ka? | tu pio kute ka? |
| Wh-question | wh-word stays in place | kua komo ka? / tu iko tote wela ka? |
| Progressive | konu + V | mi konu toko tu. |
| Perfective | pinu + V | mi pinu toko tu. |
| Gerund | V + na | piona（being）, titusona（teaching）|
| Comparative | moli + adj + tanute | mi pio moli kute tanute tu. |
| Superlative | mosi + adj | mi mosi laiko apa. |
| Relative clause | N + ta + clause | mana ta li lano（the person who runs）|

---

## Sample Text / 例文

**Japanese / 日本語**
こんにちは。私は20歳で、大学生です。好きな食べ物はリンゴです。私はあなたと友達になりたいと思います。あなたの名前はなんですか？好きな食べ物はなんですか？いろいろ私に教えてください。

**Logi**
mi toko tu. mi oto tu pulu ila e mi pio sutua. mi mosi laiko apa. mi wonuto piona pulena witute tu. tu nema pio wata ka? tu laiko wata puta ka? tituso mene sina tote mi.

**English gloss**
I greet you. I have 20 years and I am a student. I most like apple. I want the being-friend with you. Your name is what? You like what food? Teach many things to me.

---

## Numbers / 数詞

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|
| ni | pa | tu | te | ka | li | so | se | wa | ja |

Units: `pulu`（×10）, `kupulu`（×100）, `mipulu`（×1000）

Examples: 20 = `tu pulu` / 25 = `tu pulu li` / 2025 = `tu mipulu ni kupulu tu pulu li`

---

## Pronouns / 代名詞

| | Singular | Plural (inclusive) | Plural (exclusive) |
|---|---|---|---|
| 1st | mi | misu | mipu |
| 2nd | tu | tusu | — |
| 3rd | li | lisu | — |
| Reflexive | selu | — | — |

---

## Repository Structure / リポジトリ構成

```
logi/
├── README.md
├── docs/
│   └── grammar.md          Full grammar specification / 文法仕様書（完全版）
├── corpus/
│   └── examples.csv        51 example sentences by grammar feature / 機能別例文51文
├── dictionary/
│   └── final.csv           616-word validated dictionary / 検証済み辞書616語
└── tools/
    ├── make_review.py      Review tables for synonyms and the corpus / 確認表の生成
    ├── synonyms.py         Canonical-word chooser for synonym groups / 同義語の正本選定
    ├── gloss.py            Dictionary-based word gloss for Logi sentences / 辞書ベースの語注生成
    ├── validate.py         Phonology rule checker (default: dictionary/final.csv) / 音韻ルール検証
    ├── regenerate.py       Auto-conversion to new phonology / 自動音韻変換
    └── resolve.py          Homophone collision resolver / 同音衝突解決
```

---

## Version History / 変更履歴

| Version | Changes |
|---|---|
| v0.1 | Initial release as SVO-Logi / NGSL |
| v0.2 | Removed `r`, fixed syllable structure to (C)V |
| v0.3 | Preposition suffix `-de` → `-te`; gerund `-ina` → `-na`; plural `-s` abolished; `ka?` question rule; 602-word dictionary, 100% rule-compliant |
| v0.4 | Added `corpus/examples.csv` (51 sentences) and `tools/gloss.py`; fixed non-dictionary doc examples (`rano`→`lano`, `tikona`→`titusona`) |
| v0.4 | 33 synonyms marked `deprecated` in `final.csv` (`status` / `replaced_by` columns; see `tools/synonyms.py`) |
| v0.4 | Function words with a final consonant take `-u` (`pas`→`pasu`, `fut`→`putu`, `mor`→`moli` (existing adverb), `mis`→`misu`, `tante`→`tanute` …); reflexive `so`→`selu`, conjunction `so`→`sonu` (6 stays `so`); numerals, unit words, `mipu`, `selu` added; duplicate `komo` removed; 616 words |

---

## License

Creative Commons Attribution 4.0 International (CC BY 4.0)

---

*Designed and developed by [@kohga1220-stack](https://github.com/kohga1220-stack)*
