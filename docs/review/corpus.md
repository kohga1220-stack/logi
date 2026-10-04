# 例文コーパスの確認表

`tools/make_review.py` で生成。不自然な文や訳は、id を挙げて教えてください。
確認した文は `corpus/review_status.csv` の status を reviewed に書き換えます。

| id | 機能 | Logi | 日本語訳 |
|---|---|---|---|
| 1 | basic | mi ito pana. | 私はパンを食べる。 |
| 2 | basic | tuka liko jeta. | 犬は水を飲む。 |
| 3 | adjective | mi sio lase kata. | 私は大きい猫を見る。 |
| 4 | past | mi pasu ito apa. | 私はリンゴを食べた。 |
| 5 | future | li putu iko tote sukula. | 彼は学校へ行くだろう。 |
| 6 | progressive | tuka konu lano. | 犬は走っている。 |
| 7 | perfective | li pinu ito apa. | 彼はリンゴを食べてしまった。 |
| 8 | negation | mi no ito pana. | 私はパンを食べない。 |
| 9 | past-negation | li pasu no komo. | 彼は来なかった。 |
| 10 | past-progressive | mi pasu konu loto. | 私は読んでいた。 |
| 11 | future-perfective | mi putu pinu ito apa. | 私はリンゴを食べてしまうだろう。 |
| 12 | question-yesno | tu ito apa ka? | あなたはリンゴを食べますか？ |
| 13 | question-what | tu laiko wata puta ka? | あなたはどんな食べ物が好きですか？ |
| 14 | question-who | kua komo ka? | 誰が来ますか？ |
| 15 | comparative | mi pio moli kute tanute tu. | 私はあなたより良い。 |
| 16 | superlative | mi mosi laiko apa. | 私はリンゴが最も好きだ。 |
| 17 | equality | li pio seme tote mi. | 彼は私と同じだ。 |
| 18 | relative-clause | mi sio mana ta li lano. | 私は走っている人を見る。 |
| 19 | relative-clause | mi sio mana ta li kipo apa tote mi. | 私は私にリンゴをくれた人を見る。 |
| 20 | gerund | mi laiko lotona. | 私は読むことが好きだ。 |
| 21 | gerund | mi wonuto komona. | 私は来ることを欲する。 |
| 22 | causative | mi koso li tote komona. | 私は彼を来させる。 |
| 23 | subjunctive | ipu mi wutu pio pata, mi wutu pulaio. | もし私が鳥なら、飛ぶだろうに。 |
| 24 | coordination-and | mi ito pana e apa. | 私はパンとリンゴを食べる。 |
| 25 | coordination-or | tu laiko tuka o kata ka? | あなたは犬または猫が好きですか？ |
| 26 | contrast | mi laiko tuka, patu mi no laiko kata. | 私は犬が好きだが、猫は好きではない。 |
| 27 | consequence | li pio kute titusa, sonu mi laiko li. | 彼は良い先生だ、だから私は彼が好きだ。 |
| 28 | numeral | mi oto to pulu ila. | 私は20歳だ。 |
| 29 | numeral | mi oto to pulu pe ila. | 私は25歳だ。 |
| 30 | preposition-in | tuka alo inute sukula. | 犬は学校の中にいる。 |
| 31 | preposition-on | kata alo onute kala. | 猫は車の上にいる。 |
| 32 | preposition-for | mi ito pana pote tu. | 私はあなたのためにパンを食べる。 |
| 33 | preposition-from | li komo pulomute sukula. | 彼は学校から来る。 |
| 34 | preposition-with | mi iko witute tu. | 私はあなたと行く。 |
| 35 | dative | mi pasu kipo apa tote tu. | 私はあなたにリンゴをあげた。 |
| 36 | adverb | li pasuti lano. | 彼は速く走る。 |
| 37 | adverb | li peli pasuti lano. | 彼はとても速く走る。 |
| 38 | modal | mi kani lano. | 私は走れる。 |
| 39 | plural | mene tuka alo inute sukula. | 多くの犬が学校の中にいる。 |
| 40 | possession | tu tuka pio lase. | あなたの犬は大きい。 |
| 41 | reflexive | li sio selu. | 彼は自分を見る。 |
| 42 | unspecified-agent | somena ito apa. | 誰かがリンゴを食べる。 |
| 43 | pronoun-inclusive | misu iko tote sukula. | 私たち（聞き手を含む）は学校へ行く。 |
| 44 | pronoun-exclusive | mipu iko tote sukula. | 私たち（聞き手を含まない）は学校へ行く。 |
| 45 | question-where | tuka alo atute wela ka? | 犬はどこにいますか？ |
| 46 | question-where-to | tu iko tote wela ka? | あなたはどこへ行きますか？ |
| 47 | question-when | tu putu komo atute wena ka? | あなたはいつ来るでしょうか？ |
| 48 | question-why | tu waia no ito apa ka? | なぜあなたはリンゴを食べないのですか？ |
| 49 | question-how | tu aua pasu komo ka? | あなたはどうやって来たのですか？ |
| 50 | modal-negation | mi kani no lano. | 私は走れない。 |
| 51 | modal-tense | mi masi pasu ito apa. | 私はリンゴを食べなければならなかった。 |
| 52 | conj-because | pikosu li pio titusa, mi laiko li. | 彼が先生だから、私は彼が好きだ。 |
| 53 | conj-when | wenute li komo, mi iko. | 彼が来るとき、私は行く。 |
| 54 | conj-while | wailu li loto, mi ito. | 彼が読む間、私は食べる。 |
| 55 | conj-before | pipolu li komo, mi ito. | 彼が来る前に、私は食べる。 |
| 56 | conj-after | aputi li pasu komo, mi ito. | 彼が来た後で、私は食べる。 |
| 57 | conj-until | utilu li komo, mi mato. | 彼が来るまで、私は待つ。 |
| 58 | conj-although | oluto li pasu komo, mi pasu no iko. | 彼が来たのに、私は行かなかった。 |

## 語注（辞書から機械的に生成）

- **1** `mi ito pana.`  
  mi=私(pronoun) ito=食べる(verb) pana=パン(noun)
- **2** `tuka liko jeta.`  
  tuka=犬(noun) liko=飲む(verb) jeta=水(noun)
- **3** `mi sio lase kata.`  
  mi=私(pronoun) sio=見る(verb) lase=大きい(adj) kata=猫(noun)
- **4** `mi pasu ito apa.`  
  mi=私(pronoun) pasu=過去(marker) ito=食べる(verb) apa=リンゴ(noun)
- **5** `li putu iko tote sukula.`  
  li=彼/彼女/それ(pronoun) putu=未来(marker) iko=行く(verb) tote=へ(prep) sukula=学校(noun)
- **6** `tuka konu lano.`  
  tuka=犬(noun) konu=進行(marker) lano=走る(verb)
- **7** `li pinu ito apa.`  
  li=彼/彼女/それ(pronoun) pinu=完了(marker) ito=食べる(verb) apa=リンゴ(noun)
- **8** `mi no ito pana.`  
  mi=私(pronoun) no=否定(marker) ito=食べる(verb) pana=パン(noun)
- **9** `li pasu no komo.`  
  li=彼/彼女/それ(pronoun) pasu=過去(marker) no=否定(marker) komo=来る(verb)
- **10** `mi pasu konu loto.`  
  mi=私(pronoun) pasu=過去(marker) konu=進行(marker) loto=読む(verb)
- **11** `mi putu pinu ito apa.`  
  mi=私(pronoun) putu=未来(marker) pinu=完了(marker) ito=食べる(verb) apa=リンゴ(noun)
- **12** `tu ito apa ka?`  
  tu=あなた(pronoun) ito=食べる(verb) apa=リンゴ(noun) ka=疑問(marker)
- **13** `tu laiko wata puta ka?`  
  tu=あなた(pronoun) laiko=好む(verb) wata=何(wh) puta=食べ物(noun) ka=疑問(marker)
- **14** `kua komo ka?`  
  kua=誰(wh) komo=来る(verb) ka=疑問(marker)
- **15** `mi pio moli kute tanute tu.`  
  mi=私(pronoun) pio=です(verb) moli=もっと(adv) kute=良い(adj) tanute=より(conj) tu=あなた(pronoun)
- **16** `mi mosi laiko apa.`  
  mi=私(pronoun) mosi=最も(adv) laiko=好む(verb) apa=リンゴ(noun)
- **17** `li pio seme tote mi.`  
  li=彼/彼女/それ(pronoun) pio=です(verb) seme=同じ(adj) tote=へ(prep) mi=私(pronoun)
- **18** `mi sio mana ta li lano.`  
  mi=私(pronoun) sio=見る(verb) mana=人(noun) ta=関係(marker) li=彼/彼女/それ(pronoun) lano=走る(verb)
- **19** `mi sio mana ta li kipo apa tote mi.`  
  mi=私(pronoun) sio=見る(verb) mana=人(noun) ta=関係(marker) li=彼/彼女/それ(pronoun) kipo=保つ与える(verb) apa=リンゴ(noun) tote=へ(prep) mi=私(pronoun)
- **20** `mi laiko lotona.`  
  mi=私(pronoun) laiko=好む(verb) lotona=読む(verb)+na(動名詞)
- **21** `mi wonuto komona.`  
  mi=私(pronoun) wonuto=欲する(verb) komona=来る(verb)+na(動名詞)
- **22** `mi koso li tote komona.`  
  mi=私(pronoun) koso=させる(verb) li=彼/彼女/それ(pronoun) tote=へ(prep) komona=来る(verb)+na(動名詞)
- **23** `ipu mi wutu pio pata, mi wutu pulaio.`  
  ipu=もし(conj) mi=私(pronoun) wutu=仮定(marker) pio=です(verb) pata=鳥(noun) mi=私(pronoun) wutu=仮定(marker) pulaio=飛ぶ(verb)
- **24** `mi ito pana e apa.`  
  mi=私(pronoun) ito=食べる(verb) pana=パン(noun) e=と(conj) apa=リンゴ(noun)
- **25** `tu laiko tuka o kata ka?`  
  tu=あなた(pronoun) laiko=好む(verb) tuka=犬(noun) o=または(conj) kata=猫(noun) ka=疑問(marker)
- **26** `mi laiko tuka, patu mi no laiko kata.`  
  mi=私(pronoun) laiko=好む(verb) tuka=犬(noun) patu=しかし(conj) mi=私(pronoun) no=否定(marker) laiko=好む(verb) kata=猫(noun)
- **27** `li pio kute titusa, sonu mi laiko li.`  
  li=彼/彼女/それ(pronoun) pio=です(verb) kute=良い(adj) titusa=先生(noun) sonu=だから(conj) mi=私(pronoun) laiko=好む(verb) li=彼/彼女/それ(pronoun)
- **28** `mi oto to pulu ila.`  
  mi=私(pronoun) oto=持つ(verb) to=2(num) pulu=十（位の単位）(num) ila=年(noun)
- **29** `mi oto to pulu pe ila.`  
  mi=私(pronoun) oto=持つ(verb) to=2(num) pulu=十（位の単位）(num) pe=5(num) ila=年(noun)
- **30** `tuka alo inute sukula.`  
  tuka=犬(noun) alo=ある(verb) inute=の中に(prep) sukula=学校(noun)
- **31** `kata alo onute kala.`  
  kata=猫(noun) alo=ある(verb) onute=の上に(prep) kala=車(noun)
- **32** `mi ito pana pote tu.`  
  mi=私(pronoun) ito=食べる(verb) pana=パン(noun) pote=のために(prep) tu=あなた(pronoun)
- **33** `li komo pulomute sukula.`  
  li=彼/彼女/それ(pronoun) komo=来る(verb) pulomute=から(prep) sukula=学校(noun)
- **34** `mi iko witute tu.`  
  mi=私(pronoun) iko=行く(verb) witute=と(prep) tu=あなた(pronoun)
- **35** `mi pasu kipo apa tote tu.`  
  mi=私(pronoun) pasu=過去(marker) kipo=保つ与える(verb) apa=リンゴ(noun) tote=へ(prep) tu=あなた(pronoun)
- **36** `li pasuti lano.`  
  li=彼/彼女/それ(pronoun) pasuti=速く(adv) lano=走る(verb)
- **37** `li peli pasuti lano.`  
  li=彼/彼女/それ(pronoun) peli=とても(adv) pasuti=速く(adv) lano=走る(verb)
- **38** `mi kani lano.`  
  mi=私(pronoun) kani=できる(adv) lano=走る(verb)
- **39** `mene tuka alo inute sukula.`  
  mene=多くの(adj) tuka=犬(noun) alo=ある(verb) inute=の中に(prep) sukula=学校(noun)
- **40** `tu tuka pio lase.`  
  tu=あなた(pronoun) tuka=犬(noun) pio=です(verb) lase=大きい(adj)
- **41** `li sio selu.`  
  li=彼/彼女/それ(pronoun) sio=見る(verb) selu=自分（再帰）(pronoun)
- **42** `somena ito apa.`  
  somena=誰か(pronoun) ito=食べる(verb) apa=リンゴ(noun)
- **43** `misu iko tote sukula.`  
  misu=私たち（包括）(pronoun) iko=行く(verb) tote=へ(prep) sukula=学校(noun)
- **44** `mipu iko tote sukula.`  
  mipu=私たち（排他）(pronoun) iko=行く(verb) tote=へ(prep) sukula=学校(noun)
- **45** `tuka alo atute wela ka?`  
  tuka=犬(noun) alo=ある(verb) atute=で(prep) wela=どこ(wh) ka=疑問(marker)
- **46** `tu iko tote wela ka?`  
  tu=あなた(pronoun) iko=行く(verb) tote=へ(prep) wela=どこ(wh) ka=疑問(marker)
- **47** `tu putu komo atute wena ka?`  
  tu=あなた(pronoun) putu=未来(marker) komo=来る(verb) atute=で(prep) wena=いつ(wh) ka=疑問(marker)
- **48** `tu waia no ito apa ka?`  
  tu=あなた(pronoun) waia=なぜ(wh) no=否定(marker) ito=食べる(verb) apa=リンゴ(noun) ka=疑問(marker)
- **49** `tu aua pasu komo ka?`  
  tu=あなた(pronoun) aua=どうやって(wh) pasu=過去(marker) komo=来る(verb) ka=疑問(marker)
- **50** `mi kani no lano.`  
  mi=私(pronoun) kani=できる(adv) no=否定(marker) lano=走る(verb)
- **51** `mi masi pasu ito apa.`  
  mi=私(pronoun) masi=ねばならない(adv) pasu=過去(marker) ito=食べる(verb) apa=リンゴ(noun)
- **52** `pikosu li pio titusa, mi laiko li.`  
  pikosu=なぜなら(conj) li=彼/彼女/それ(pronoun) pio=です(verb) titusa=先生(noun) mi=私(pronoun) laiko=好む(verb) li=彼/彼女/それ(pronoun)
- **53** `wenute li komo, mi iko.`  
  wenute=とき(conj) li=彼/彼女/それ(pronoun) komo=来る(verb) mi=私(pronoun) iko=行く(verb)
- **54** `wailu li loto, mi ito.`  
  wailu=間(conj) li=彼/彼女/それ(pronoun) loto=読む(verb) mi=私(pronoun) ito=食べる(verb)
- **55** `pipolu li komo, mi ito.`  
  pipolu=前に(conj) li=彼/彼女/それ(pronoun) komo=来る(verb) mi=私(pronoun) ito=食べる(verb)
- **56** `aputi li pasu komo, mi ito.`  
  aputi=後で(conj) li=彼/彼女/それ(pronoun) pasu=過去(marker) komo=来る(verb) mi=私(pronoun) ito=食べる(verb)
- **57** `utilu li komo, mi mato.`  
  utilu=まで(conj) li=彼/彼女/それ(pronoun) komo=来る(verb) mi=私(pronoun) mato=待つ(verb)
- **58** `oluto li pasu komo, mi pasu no iko.`  
  oluto=のに(conj) li=彼/彼女/それ(pronoun) pasu=過去(marker) komo=来る(verb) mi=私(pronoun) pasu=過去(marker) no=否定(marker) iko=行く(verb)
