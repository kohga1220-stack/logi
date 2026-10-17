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
- **2,245-word core dictionary** — machine-validated; zero homophones
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
mi toko tu. mi oto to pulu ila e mi pio sutua. mi mosi laiko apa. mi wonuto piona pulena witute tu. tu nema pio wata ka? tu laiko wata puta ka? tituso mene sina tote mi.

**English gloss**
I greet you. I have 20 years and I am a student. I most like apple. I want the being-friend with you. Your name is what? You like what food? Teach many things to me.

---

## Numbers / 数詞

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|
| ni | pa | to | te | ku | pe | so | se | wa | ja |

Units: `pulu`（×10）, `kupulu`（×100）, `mipulu`（×1000）

Examples: 20 = `to pulu` / 25 = `to pulu pe` / 2025 = `to mipulu ni kupulu to pulu pe`

---

## Pronouns / 代名詞

| | Singular | Plural (inclusive) | Plural (exclusive) |
|---|---|---|---|
| 1st | mi | misu | mipu |
| 2nd | tu | tusu | — |
| 3rd | li | lisu | — |
| Reflexive | selu | — | — |

---

## Translator / 翻訳機

Open `web/index.html` in a browser, type Japanese or English, and the Logi translation appears below. It is a dictionary-and-rules tool for simple sentences, not machine translation; see [`web/README.md`](web/README.md) for what it can and cannot do.

`web/index.html` をブラウザで開き、日本語か英語を入力すると、下に Logi の訳が出ます。辞書と簡単なルールによる簡易版です（詳しくは [`web/README.md`](web/README.md)）。

---

## Repository Structure / リポジトリ構成

```
logi/
├── README.md
├── docs/
│   ├── grammar.md          Full grammar specification / 文法仕様書（完全版）
│   ├── WORKFLOW.md         Roles, scopes and procedures for M1ko / Claude / Antigravity / 3者の分担と進め方
│   └── STATUS.md           Current state, pending decisions, handoff / いまの状態と引き継ぎ
├── web/
│   └── index.html          Translator page (Japanese/English → Logi) / 翻訳機（see web/README.md）
├── corpus/
│   └── examples.csv        114 example sentences by grammar feature / 機能別例文114文
├── dictionary/
│   ├── final.csv           2,245-word validated dictionary / 検証済み辞書2,245語
│   ├── eiken3_additions.csv  Eiken grade-3 level word list added in v0.7 / 英検3級レベルの追加語リスト
│   ├── word_review.csv     Review status of the added words (draft / ok / fix) / 追加語の確認状況
│   ├── core_additions.csv  Everyday Japanese word list added in v0.8 / 日本語の基本語彙の追加語リスト
│   ├── modern_tech_additions.csv Modern tech & digital word list added in v0.9 / 現代・IT語彙の追加語リスト
│   ├── sources/            Source word lists (NINJAL, CC BY 4.0) / 語彙の出典データ
│   └── glossary_en.csv     English meanings for the translator (unreviewed) / 翻訳機用の英語の意味（未確認）
└── tools/
    ├── check_consistency.py  Checks docs vs. dictionary (word counts, version, registered lists) / 文書と辞書の整合性検査
    ├── check_scope.py      Checks that anti/* branches stay in their scope / 担当範囲の検査
    ├── coin_words.py       Coins Logi words for the addition lists / 追加語の造語
    ├── core_candidates.py  Lists basic words missing from the dictionary / 辞書に無い基本語の候補
    ├── build_web.py        Builds web/lexicon.js for the translator / 翻訳機の辞書データ生成
    ├── make_review.py      Review tables for synonyms, the corpus and the added words / 確認表の生成
    ├── synonyms.py         Canonical-word chooser for synonym groups / 同義語の正本選定
    ├── gloss.py            Dictionary-based word gloss for Logi sentences / 辞書ベースの語注生成
    ├── legacy/             Old regenerate/resolve pipeline (needs raw.csv; see legacy/README.md) / 旧パイプライン
    └── validate.py         Phonology rule checker (default: dictionary/final.csv) / 音韻ルール検証
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
| v0.5 | Numerals 2/4/5 changed `tu`/`ka`/`li` → `to`/`ku`/`pe` (no numeral/function-word homophones left); verb `po` → `tulimo` (its gerund no longer collides with `pona`) |
| v0.5 | Added the web translator (`web/`), `tools/build_web.py` and `dictionary/glossary_en.csv` (English meanings, unreviewed) |
| v0.6 | 8 subordinating conjunctions added (`pikosu` because, `wenute` when, `wailu` while, `pipolu` before, `aputi` after, `utilu` until, `ulesu` unless, `oluto` although); they go at the start of their clause, clause order follows the source; 624 words |
| v0.7 | 487 words of Eiken grade-3 level added (nouns, verbs, adjectives, adverbs, prepositions, pronouns; coined by `tools/coin_words.py` from `dictionary/eiken3_additions.csv`); translator reads prepositions and pronouns from the dictionary; 1,111 words |
| v0.8 | 549 everyday Japanese words added (nouns, verbs, adjectives, adverbs such as `tulima` dream, `lipeta` lifetime, `topo` do); chosen from the NINJAL basic-vocabulary lists (CC BY 4.0, see `dictionary/sources/`) with `tools/core_candidates.py`, coined by `tools/coin_words.py` from `dictionary/core_additions.csv`; 1,660 words |
| v0.9 | 10 modern tech & digital words added (`alutipa` AI, `netuwa` network, `sumawa` smartphone, `pupoko` program, etc.); 1,670 words |
| v0.9.1 | Noun `puwoja` (program) added; `modern_tech_additions.csv` registered in `tools/coin_words.py`; shared-stem pairs now keep edit distance 2 from every word except their partner; word counts synced; 1,671 words |
| v0.10 | Demonstratives `iliu` (this) / `teliu` (that), answer `jesu` (yes; `no` is reused for no), `aua mene` (how many / how much), `wata ila` (how old) — decided in `docs/proposals/001`; the translator handles them (also verb nominalization); 1,674 words |
| v0.11 | Greetings `kelosu` (hello) / `kupaju` (goodbye) / `pilisu` (please) as interjections — decided in `docs/proposals/002`; short function words are coined as fixed 3-syllable forms (`dictionary/interjection_additions.csv`); the translator handles them; 1,702 words |
| v0.12 | Imperatives, requests, prohibitions and invitations marked by a final `!` — decided in `docs/proposals/003`: imperative = verb sentence without a subject, request = leading `pilisu,`, prohibition = `no`, invitation = subject `misu`; no new words; the translator handles them; 1,701 words |
| v0.13 | Permission, requests and offers as questions, expressed with the modal adverbs — decided in `docs/proposals/004`: permission and request = `kani`, offer = `sati`, polite request = leading `pilisu,`; fixes the mistranslation of *May I* (`mei` = *might*); no new words; the translator handles them; 1,724 words |
| v0.14 | Everyday greetings built from existing words — decided in `docs/proposals/005`: good morning `kute mola.`, good night `kute naita.`, sorry `mi pio moke.`, thanks `mi tanako tu.`; no new words; the translator handles them; 1,724 words |
| v0.15 | Permission, prohibition and not-necessary as statements — decided in `docs/proposals/006`: `tu kani ito apa.` (may), `tu masi no ito apa.` (must not), `tu kani no ito apa.` (need not); *You may* now maps to `kani` (possibility *may* stays `mei`); no new words; the translator handles them; 1,724 words |
| v0.16 | Purpose, manner and contrast — decided in `docs/proposals/007`: purpose = `pote` + gerund (`mi iko tote sukula pote itona apa.`), manner = new conjunction `kasolu` (*as*), contrast = `patu`; the translator handles them; 1,745 words |
| v0.17 | Dates and times — decided in `docs/proposals/008`: unit + number = calendar/clock (`monata te teia pe` = March 5, `ula te` = 3 o'clock), number + unit = quantity; prepositions by kind (`atute` clock, `onute` weekday/date, `inute` month/year); every/next/last/this + unit = `epule`/`nete`/`sese`/`iliu`; the translator handles them; no new words, 1,745 words |
| v0.18 | Indirect questions and commands — decided in `docs/proposals/009`: clause + `ka` (`li pasu asuko mi pasu ito wata ka.`), commands via `sati` (`li pasu juo mi sati ito apa.`), same-person subject `selu`; the translator handles them; no new words, 1,745 words |
| v0.19 | Honorifics — decided in `docs/proposals/010`: no levels of politeness; honorific verbs map to the plain verb (*おっしゃる* = `juo`), お/ご/さん/様 are dropped, *お待ちください* = `pilisu, mato!`, *いらっしゃいませ* = `weluko!`; the translator handles Japanese honorifics; no new words, 1,745 words |
| v0.20 | Daily phrases — decided in `docs/proposals/011`: *Good evening* = `kute ipa.`, *How are you?* = `tu pio miwe ka?`, *Good luck* = `kute luna!`, *See you tomorrow* = `mi putu sio tu moloa.`; the translator handles them; no new words, 1,745 words |

---

## Contributors / 共同開発

- **M1ko** ([@kohga1220-stack](https://github.com/kohga1220-stack)) — Project Owner & Designer
- **Claude** ([claude.ai](https://claude.ai) / Anthropic) — Grammar design: phonology, grammar specification, corpus, web translator, checking tools (see `docs/WORKFLOW.md`)
- **Antigravity** (Google DeepMind) — Vocabulary expansion: content words (nouns, verbs, adjectives, adverbs) under the rules Claude designs

---

## License / ライセンス

| Part | License |
|---|---|
| Language specification, dictionary and example corpus (`docs/`, `dictionary/`, `corpus/`) | [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) |
| Source code and tests (`tools/`, `tests/`, `ngsl/` and the other code files) | MIT License (see `LICENSE`) |

## Other content in this repository / このリポジトリの他の内容

`ngsl/` and the `*.ngsl` / `run_*.py` / `demo*.py` files at the root belong to **NGSL**, a separate statistical programming language project (documented in `ngsl/README.md`). It is unrelated to the constructed language Logi, although Logi was once called NGSL.

---

*Designed and developed by [@kohga1220-stack](https://github.com/kohga1220-stack) with Claude & Antigravity*
