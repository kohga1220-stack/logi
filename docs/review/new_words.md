# 追加語の確認表

`tools/make_review.py` で生成。気になる語は、Logi の語を挙げて「音」「日本語の意味」「英語」のどれを直したいか教えてください。
確認の状況は `dictionary/word_review.csv` の status（draft / ok / fix）と note に書きます。

「手がかり」は、見直しの優先度を決めるための目安です。
- 語幹が同じ: 語尾の1文字だけが違う、別の品詞の語（例: `kuka` 名詞と `kuko` 動詞）。同じ英語の別品詞なら意図した組です。そうでなければ偶然の一致なので、見分けにくくないか見てください
- 同じ英語の語: 同じ英語の訳を持つ、別の語（同義語の候補）

確認済み(ok): 1164 / 要修正(fix): 6 / 未確認(draft): 50

## v0.7 英検3級レベルの語（487語）

### noun（271語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| atupa | 大人 | adult |  | ok |
| onupa | おば | aunt |  | ok |
| kusina | いとこ | cousin |  | ok |
| silupa | 子供 | child |  | ok |
| totela | 娘 | daughter |  | ok |
| pamipa | 家族 | family |  | ok |
| kuluna | 孫 | grandchild |  | ok |
| kupana | 祖父 | grandfather |  | ok |
| kilana | 祖母 | grandmother |  | ok |
| mata | 男性 | man | 語幹が同じ: mato | ok |
| palepa | 親 | parent |  | ok |
| paluma | 相棒 | partner |  | ok |
| sona | 息子 | son |  | ok |
| unuka | おじ | uncle |  | ok |
| juwa | 若者 | youth |  | ok |
| kulepa | 同級生 | classmate |  | ok |
| koleka | 単科大学 | college |  | ok |
| tikupa | 辞書 | dictionary |  | ok |
| etuma | 教育 | education |  | ok |
| ekuka | 試験 | exam |  | ok |
| kutata | 学年 | grade |  | ok |
| jima | 体育館 | gym |  | ok |
| omua | 宿題 | homework |  | ok |
| lanua | 言語 | language |  | ok |
| notepa | ノート | notebook |  | ok |
| pupina | 校長 | principal |  | ok |
| sumusa | 教科 | subject |  | ok |
| unipa | 大学 | university |  | ok |
| akuwa | 俳優 | actor |  | ok |
| aketa | 女優 | actress |  | ok |
| pakela | パン屋 | baker |  | ok |
| kupela | 店員 | clerk |  | ok |
| kuka | 料理人 | cook | 語幹が同じ: kuke, kuko | ok |
| tenuta | 歯医者 | dentist |  | ok |
| tulapa | 運転手 | driver |  | ok |
| enina | 技術者 | engineer |  | ok |
| palita | 農家 | farmer |  | ok |
| kuiwa | 案内人 | guide | 同じ英語の語: lito | ok |
| manaka | 経営者 | manager |  | ok |
| nulusa | 看護師 | nurse |  | ok |
| opapa | 役人 | officer |  | ok |
| piloka | パイロット | pilot |  | ok |
| putesa | 社長 | president |  | ok |
| sinela | 歌手 | singer |  | ok |
| wolupa | 労働者 | worker |  | ok |
| litela | 作家 | writer |  | ok |
| papa | 風呂 | bath | 語幹が同じ: pape, papo | ok |
| patuta | 浴室 | bathroom |  | ok |
| petula | 寝室 | bedroom |  | ok |
| tesuka | 机 | desk |  | ok |
| pupula | 床 | floor |  | ok |
| usa | 家 | house | 語幹が同じ: use | ok |
| kisena | 台所 | kitchen |  | ok |
| laita | 光 | light | 語幹が同じ: laite | ok |
| masina | 機械 | machine |  | ok |
| makasa | 雑誌 | magazine |  | ok |
| mopa | お金 | money |  | ok |
| nusupa | 新聞 | newspaper |  | ok |
| lapia | ラジオ | radio |  | ok |
| lepula | 冷蔵庫 | refrigerator / fridge |  | ok |
| luka | 屋根 | roof |  | ok |
| luma | 部屋 | room |  | ok |
| topa | タオル | towel | 語幹が同じ: topo | ok |
| umuta | 傘 | umbrella |  | ok |
| wala | 壁 | wall |  | ok |
| pima | 牛肉 | beef | 語幹が同じ: pimo | ok |
| putika | 朝食 | breakfast |  | ok |
| putola | バター | butter |  | ok |
| sikena | 鶏肉 | chicken |  | ok |
| tinepa | 夕食 | dinner |  | ok |
| lunusa | 昼食 | lunch |  | ok |
| olana | オレンジ | orange | 同じ英語の語: olae | ok |
| polapa | 豚肉 | pork |  | ok |
| potata | じゃがいも | potato |  | ok |
| sanupa | サンドイッチ | sandwich |  | ok |
| suma | スープ | soup | 語幹が同じ: sumo | ok |
| tomata | トマト | tomato |  | ok |
| piwa | 熊 | bear | 語幹が同じ: piwo | ok |
| kola | 牛 | cow | 語幹が同じ: kole, kolo | ok |
| iluna | 地球 | earth |  | ok |
| eleka | 象 | elephant |  | ok |
| oluwa | 馬 | horse |  | ok |
| lika | 葉 | leaf | 語幹が同じ: like, liko | ok |
| monuka | 猿 | monkey |  | ok |
| natula | 自然 | nature |  | ok |
| pija | 豚 | pig | 語幹が同じ: pijo | ok |
| putana | 植物 | plant | 語幹が同じ: putano | ok |
| lapata | ウサギ | rabbit |  | ok |
| sika | 羊 | sheep | 語幹が同じ: sike | ok |
| tikela | トラ | tiger |  | ok |
| wupa | 木材 | wood |  | ok |
| paseta | 野球 | baseball |  | ok |
| pasaka | バスケットボール | basketball |  | ok |
| pupa | 本 | book | 語幹が同じ: pupe, pupo | ok |
| kamuka | キャンプ | camp |  | ok |
| komika | 漫画 | comic |  | ok |
| konusa | コンサート | concert |  | ok |
| juita | ギター | guitar |  | ok |
| opa | 趣味 | hobby | 語幹が同じ: opi, opo | ok |
| maka | 試合 | match |  | ok |
| niana | ピアノ | piano |  | ok |
| puma | プール | pool | 語幹が同じ: pumo | ok |
| soma | 歌 | song | 語幹が同じ: some, somi | ok |
| tenisa | テニス | tennis |  | ok |
| tikata | 切符 | ticket |  | ok |
| toa | おもちゃ | toy |  | ok |
| tupipa | 旅行 | trip |  | ok |
| titea | ビデオ | video |  | ok |
| pisika | 自転車 | bicycle / bike |  | ok |
| pumita | 橋 | bridge |  | ok |
| nuila | 建物 | building |  | ok |
| puwa | バス | bus | 語幹が同じ: puwo | ok |
| sima | 都市 | city | 語幹が同じ: sime, simo | ok |
| koluma | 角 | corner |  | ok |
| mulita | フライト | flight |  | ok |
| pupaka | 場所 | place | 同じ英語の語: puto | ok |
| palana | 飛行機 | plane / airplane |  | ok |
| loka | 道路 | road | 語幹が同じ: loke, loko | ok |
| sutala | 通り | street |  | ok |
| takuta | タクシー | taxi |  | ok |
| tona | 町 | town |  | ok |
| tuloka | トラック | truck |  | ok |
| pilama | 村 | village |  | ok |
| suna | 動物園 | zoo | 語幹が同じ: suni, suno | ok |
| apuja | 午後 | afternoon |  | ok |
| senuka | 世紀 | century |  | ok |
| otuna | 秋 | autumn / fall | 同じ英語の語: pao | ok |
| olima | 休日 | holiday |  | ok |
| ula | 時間（60分） | hour | 語幹が同じ: ulo | ok |
| monata | 月（暦） | month |  | ok |
| sisona | 季節 | season |  | ok |
| sekopa | 秒 | second |  | ok |
| supila | 春 | spring |  | ok |
| sumela | 夏 | summer |  | ok |
| pakapa | 休暇 | vacation |  | ok |
| wikepa | 週末 | weekend |  | ok |
| winapa | 冬 | winter |  | ok |
| moputa | 月曜日 | monday |  | ok |
| tusuma | 火曜日 | tuesday |  | ok |
| wetuna | 水曜日 | wednesday |  | ok |
| tupusa | 木曜日 | thursday |  | ok |
| pukipa | 金曜日 | friday |  | ok |
| satuka | 土曜日 | saturday |  | ok |
| sunuta | 日曜日 | sunday |  | ok |
| kupota | 群衆 | crowd |  | ok |
| mulana | 惑星 | planet |  | ok |
| aka | 年齢 | age | 語幹が同じ: aki, ako | ok |
| pomuta | 港 | port |  | ok |
| selina | 天井 | ceiling |  | ok |
| sukita | 技術 | skill |  | ok |
| tutasa | ごみ | trash |  | ok |
| kalupa | カート | cart |  | ok |
| sama | 影 | shadow |  | ok |
| kutopa | 押し入れ | closet |  | ok |
| pumapa | 枝 | branch |  | ok |
| sekusa | 部門 | section |  | ok |
| pukama | ホーム | platform |  | ok |
| kaka | 洞窟 | cave | 語幹が同じ: kako | ok |
| itema | 品目 | item |  | ok |
| tutuna | トーナメント | tournament |  | ok |
| mitula | 真ん中 | middle |  | ok |
| nesuma | 巣 | nest |  | ok |
| komuna | くし | comb |  | ok |
| satela | 階段 | stair / stairs |  | ok |
| ema | 英雄 | hero | 語幹が同じ: eme | ok |
| pawa | 眺め | view |  | ok |
| kasuma | 城 | castle |  | ok |
| sowa | シャワー | shower |  | ok |
| kapita | 首都 | capital |  | ok |
| sasa | 日陰 | shade | 語幹が同じ: saso | ok |
| pesupa | 祭り | festival |  | ok |
| pilusa | 野原 | field |  | ok |
| latepa | はしご | ladder |  | ok |
| anala | アパート | apartment |  | ok |
| pelika | 値段 | price |  | ok |
| kukuta | 文化 | culture |  | ok |
| kelopa | 手袋 | glove |  | ok |
| simuta | 象徴 | symbol |  | ok |
| polina | ボランティア | volunteer |  | ok |
| emoka | 感情 | emotion |  | ok |
| enuwa | 入り口 | entrance |  | ok |
| akika | 事故 | accident |  | ok |
| tuwina | 双子 | twin |  | ok |
| kama | かご | cage |  | ok |
| siwa | 種 | seed | 語幹が同じ: siwo | ok |
| kukaka | 勇気 | courage |  | ok |
| itasa | 頭痛 | headache |  | ok |
| neta | おい | nephew | 語幹が同じ: nete | ok |
| kusuka | 習慣 | custom |  | ok |
| punasa | 風味 | flavor |  | ok |
| kana | 門 | gate | 語幹が同じ: kani | ok |
| inopa | 情報 | information |  | ok |
| sonula | 日の出 | sunrise |  | ok |
| kesapa | 身ぶり | gesture |  | ok |
| soja | 仕事 | job |  | ok |
| suwipa | セーター | sweater |  | ok |
| kenepa | 世代 | generation |  | ok |
| sunisa | 日光 | sunshine |  | ok |
| kawa | 場合 | case |  | ok |
| pakuka | 事実 | fact |  | ok |
| kumipa | 気候 | climate |  | ok |
| supata | 像 | statue |  | ok |
| pikula | 数字 | figure |  | ok |
| kaja | ガス | gas |  | ok |
| sisala | はさみ | scissors |  | ok |
| lima | リーグ | league | 語幹が同じ: limo | ok |
| paja | なべ | pan |  | ok |
| sikuka | 看板 | sign | 語幹が同じ: sikuko | ok |
| meoka | 市長 | mayor |  | ok |
| nopa | メモ | note | 語幹が同じ: nopo | ok |
| moteta | 模型 | model |  | ok |
| koja | 原因 | cause | 同じ英語の語: koso | ok |
| sulika | 神社 | shrine |  | ok |
| tusata | ほこり | dust |  | ok |
| kosupa | 海岸 | coast |  | ok |
| sopusa | はし | chopsticks |  | ok |
| tita | ダイエット | diet | 語幹が同じ: tite, tito | ok |
| tepala | 部署 | department |  | ok |
| iwa | 幹線道路 | highway |  | ok |
| talata | 伝統 | tradition |  | ok |
| pakota | 工場 | factory |  | ok |
| ika | 熱 | heat | 語幹が同じ: iko | ok |
| temupa | 温度 | temperature |  | ok |
| pema | 痛み | pain |  | ok |
| lesuna | 休憩 | rest | 語幹が同じ: lesuno | ok |
| pewa | 湾 | bay |  | ok |
| setupa | 予定 | schedule |  | ok |
| tesela | 砂漠 | desert |  | ok |
| kaleta | 生ごみ | garbage |  | ok |
| metisa | 薬 | medicine |  | ok |
| ekesa | 経験 | experience |  | ok |
| awea | 水族館 | aquarium |  | ok |
| puja | 子犬 | puppy |  | ok |
| mipa | 食事 | meal | 語幹が同じ: mipu | ok |
| mimia | 百万 | million |  | ok |
| komapa | 会社 | company |  | ok |
| kalika | 車庫 | garage |  | ok |
| pukusa | 小銭入れ | purse |  | ok |
| pejia | 期間 | period |  | ok |
| waleka | 財布 | wallet |  | ok |
| pepela | 発熱 | fever |  | ok |
| pulomisa | 約束 | promise | 語幹が同じ: pulomiso | ok |
| nopela | 小説 | novel |  | ok |
| puposa | 企画 | project |  | ok |
| ola | 穴 | hole | 語幹が同じ: ole, olo | ok |
| mesaka | 伝言 | message |  | ok |
| potoma | 底 | bottom |  | ok |
| sekala | 秘密 | secret |  | ok |
| esa | 高さ | height |  | ok |
| inata | 面接 | interview |  | ok |
| pamula | 戦い | battle |  | ok |
| otipa | 観衆 | audience |  | ok |
| lesola | リゾート | resort |  | ok |
| oala | 賞 | award |  | ok |
| lola | 役割 | role | 語幹が同じ: lole, lolo | ok |
| atama | 住所 | address |  | ok |
| pusisa | 楽しみ | pleasure |  | ok |
| koneta | 大陸 | continent |  | ok |
| atena | 助言 | advice |  | ok |
| lesipa | レシピ | recipe |  | ok |
| ijuta | 地震 | earthquake |  | ok |
| ipeja | 天国 | heaven |  | ok |
| teluma | ターミナル | terminal |  | ok |
| lisepa | 免許 | license |  | ok |
| wetipa | 結婚式 | wedding |  | ok |
| ilapa | 健康 | health |  | ok |
| lulisa | 賞品 | prize |  | ok |
| tipa | 涙 | tear | 語幹が同じ: tipe, tipo | ok |
| kumoka | 作物 | crop |  | ok |
| konipa | 便利 | convenience |  | ok |
| nika | めい | niece |  | ok |

### verb（88語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| puluso | 磨く | brush |  | ok |
| kuko | 料理する | cook | 語幹が同じ: kuka, kuke | ok |
| pulino | 持ってくる | bring |  | ok |
| olako | 保持する | hold |  | ok |
| kuleno | 掃除する | clean | 語幹が同じ: kulene | ok |
| puo | 買う | buy | 語幹が同じ: pue | ok |
| tiwo | 描く | draw |  | ok |
| tuluno | 曲がる | turn |  | ok |
| liluno | 学ぶ | learn |  | ok |
| sutuko | 勉強する | study |  | ok |
| putako | 練習する | practice |  | ok |
| enuso | 楽しむ | enjoy |  | ok |
| nijo | 必要とする | need |  | ok |
| wuwo | 心配する | worry |  | ok |
| suluto | 驚かせる | surprise |  | ok |
| sumilo | 微笑む | smile |  | ok |
| anuso | 答える | answer | 語幹が同じ: anusa | ok |
| inupo | 招待する | invite |  | ok |
| mowo | 見せる | show |  | ok |
| tanako | 感謝する | thank |  | ok |
| pekomo | 成る | become |  | ok |
| puimo | 建てる | build |  | ok |
| alimo | 到着する | arrive |  | ok |
| mujo | 動く | move |  | ok |
| letulo | 戻る | return |  | ok |
| sipo | 輝く | shine | 語幹が同じ: sipa, sipe | ok |
| konupo | 続ける | continue |  | ok |
| esako | 逃げる | escape |  | ok |
| masuto | 習得する | master | 語幹が同じ: masuta | ok |
| unuto | 狩る | hunt |  | ok |
| pupeso | 押しつける | press |  | ok |
| tamapo | 損なう | damage |  | ok |
| kanuko | 取り消す | cancel |  | ok |
| pupo | 吹く | blow | 語幹が同じ: pupa, pupe | ok |
| lelako | くつろぐ | relax |  | ok |
| opepo | 提供する | offer |  | ok |
| kolepo | 集める | collect |  | ok |
| ipo | 隠す | hide | 語幹が同じ: ipa, ipe | ok |
| tukuso | 信頼する | trust | 語幹が同じ: tukusa | ok |
| ekuto | 交換する | exchange |  | ok |
| soko | ショックを与える | shock | 語幹が同じ: soka | ok |
| ineto | 紹介する | introduce |  | ok |
| sutiso | 述べる | state |  | ok |
| suko | 煮込む | stew | 語幹が同じ: suka, suke | ok |
| atemo | 出席する | attend |  | ok |
| amo | 嫌う | hate | 語幹が同じ: ama | ok |
| limo | 昇る | rise | 語幹が同じ: lima | ok |
| akito | 行動する | act |  | ok |
| jawo | 焼く | bake |  | ok |
| sumo | 撃つ | shoot | 語幹が同じ: suma | ok |
| wasupo | 無駄にする | waste | 語幹が同じ: wasupa | ok |
| tupapo | 旅行する | travel |  | ok |
| peluto | 演じる | perform |  | ok |
| tuwiso | ひねる | twist |  | ok |
| polupo | 乗り込む | board | 語幹が同じ: polupa | ok |
| kupato | 卒業する | graduate |  | ok |
| souno | 聞こえる | sound | 語幹が同じ: souna | ok |
| jejo | 確認する | check |  | ok |
| putepo | 準備する | prepare |  | ok |
| atuno | 助言する | advise |  | ok |
| ano | 加える | add | 語幹が同じ: ana, ane | ok |
| kulupo | 横切る | cross |  | ok |
| maluko | 印をつける | mark | 語幹が同じ: maluka | ok |
| soluko | 解決する | solve |  | ok |
| leto | 上げる | raise | 語幹が同じ: leta, lete, leti | ok |
| miso | 恋しく思う | miss | 語幹が同じ: misa, misu | ok |
| sumoko | 喫煙する | smoke | 語幹が同じ: sumoka | ok |
| sikuko | 署名する | sign | 語幹が同じ: sikuka | ok |
| lenuto | 貸す | lend |  | ok |
| pimo | 合う | fit | 語幹が同じ: pima | ok |
| selepo | 祝う | celebrate |  | ok |
| siwo | 元気づける | cheer | 語幹が同じ: siwa | ok |
| pupuno | 燃える | burn |  | ok |
| putano | 植える | plant | 語幹が同じ: putana | ok |
| kowo | 恐れる | fear | 語幹が同じ: kowa | ok |
| popo | 借りる | borrow | 語幹が同じ: popa, pope | ok |
| poiwo | 沸かす | boil |  | ok |
| kutito | 挨拶する | greet |  | ok |
| kosuto | 費用がかかる | cost | 同じ英語の語: kosa | ok |
| pikuso | 修理する | fix |  | ok |
| polato | 折る | fold |  | ok |
| tekolo | 飾る | decorate |  | ok |
| leliso | 公開する | release |  | ok |
| piso | 食物を与える | feed | 語幹が同じ: pisa | ok |
| supulo | 広げる | spread |  | ok |
| telipo | 配達する | deliver |  | ok |
| satilo | 盗む | steal |  | ok |
| losupo | あぶる | roast |  | ok |

### adj（77語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| apupe | 怖い | afraid |  | ok |
| kalepe | 注意深い | careful | 語幹が同じ: kalepi | ok |
| ekuse | 興奮した | excited |  | ok |
| pulime | 親しみやすい | friendly |  | ok |
| miwe | 元気な | fine |  | ok |
| june | おかしい | funny | 同じ英語の語: inime | ok |
| kulate | 嬉しい | glad |  | ok |
| ape | 幸せな | happy | 語幹が同じ: apa, apo | ok |
| unupe | 空腹な | hungry |  | ok |
| inape | 興味を持った | interested |  | ok |
| lonele | 寂しい | lonely |  | ok |
| mume | 幸運な | lucky |  | ok |
| sulite | 眠い | sleepy |  | ok |
| moke | 申し訳ない | sorry |  | ok |
| sulupe | 驚いた | surprised |  | ok |
| tiluse | 喉が渇いた | thirsty |  | ok |
| tilete | 疲れた | tired |  | ok |
| wuje | 忙しい | busy |  | ok |
| site | 安い | cheap | 語幹が同じ: sita, sito | ok |
| kulene | きれいな | clean | 語幹が同じ: kuleno | ok |
| tite | 死んだ | dead | 語幹が同じ: tita, tito | ok |
| telise | おいしい | delicious |  | ok |
| tipike | 難しい | difficult |  | ok |
| ekepe | 高価な | expensive |  | ok |
| pamuse | 有名な | famous |  | ok |
| pupe | 自由な | free | 語幹が同じ: pupa, pupo | ok |
| kulipe | 素晴らしい | great |  | ok |
| aluke | 硬い | hard | 語幹が同じ: aluki | ok |
| jame | 遅れた | late | 同じ英語の語: leti | ok |
| apele | 開いた | open | 語幹が同じ: apelo | ok |
| popule | 人気のある | popular |  | ok |
| sutape | 奇妙な | strange |  | ok |
| sule | 確かな | sure | 語幹が同じ: sula, suli, sulo | ok |
| suwike | 甘い | sweet |  | ok |
| telape | ひどい | terrible |  | ok |
| jowe | 若い | young |  | ok |
| time | 深い | deep | 語幹が同じ: tima | ok |
| ipe | 重い | heavy | 語幹が同じ: ipa, ipo | ok |
| ile | 高い | high | 語幹が同じ: ila, ili | ok |
| lote | 長い | long | 語幹が同じ: lota, loto | ok |
| loke | 低い | low | 語幹が同じ: loka, loko | ok |
| solume | 短い | short |  | ok |
| supe | 遅い | slow | 語幹が同じ: supa, supo | ok |
| wawe | 背の高い | tall |  | ok |
| pulose | 茶色い | brown |  | ok |
| kupine | 緑の | green |  | ok |
| kewe | 黄色い | yellow |  | ok |
| tine | きつい | tight | 語幹が同じ: tina | ok |
| kuloke | 混雑した | crowded |  | ok |
| totale | 全部の | total | 語幹が同じ: totala | ok |
| opipe | 公式の | official |  | ok |
| pamile | 見慣れた | familiar |  | ok |
| nelupe | 緊張した | nervous |  | ok |
| sepele | 数個の | several |  | ok |
| alite | 生きた | alive |  | ok |
| ineke | 国際的な | international |  | ok |
| nipe | 十分な | enough | 語幹が同じ: nipi | ok |
| pasike | 基本的な | basic |  | ok |
| komate | 快適な | comfortable |  | ok |
| poleke | 外国の | foreign |  | ok |
| pukese | 新鮮な | fresh |  | ok |
| amase | 驚くべき | amazing |  | ok |
| kuluse | クレイジーな | crazy |  | ok |
| lokale | 地元の | local |  | ok |
| ekate | 余分な | extra |  | ok |
| kolete | 正しい | correct |  | ok |
| apise | 欠席した | absent |  | ok |
| masole | 主要な | major |  | ok |
| ekike | 優れた | excellent |  | ok |
| lape | 怠惰な | lazy | 語幹が同じ: lapa, lapo | ok |
| pepe | 公平な | fair | 語幹が同じ: pepa | ok |
| eleme | 電気の | electric |  | ok |
| elune | 年配の | elderly | 語幹が同じ: eluna | ok |
| etupe | 助けになる | helpful |  | ok |
| ilupe | 健康的な | healthy |  | ok |
| natupe | 自然な | natural | 語幹が同じ: natupi | ok |
| pope | 両方の | both | 語幹が同じ: popa, popo | ok |

### adv（28語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| ewi | 早く | early | 語幹が同じ: ewa | ok |
| isi | 簡単に | easily | 語幹が同じ: isa, ise | ok |
| kalepi | 注意深く | carefully | 語幹が同じ: kalepe | ok |
| pinali | ついに | finally |  | ok |
| usui | たいてい | usually |  | ok |
| oi | 離れて | away |  | ok |
| leai | 本当に | really | 語幹が同じ: leae | ok |
| akupi | 実際に | actually |  | ok |
| ekuni | 正確に | exactly |  | ok |
| soti | そっと | softly | 語幹が同じ: sota, sote | ok |
| opeki | 海外へ | overseas |  | ok |
| noki | もう少しで | nearly | 語幹が同じ: noka, noko | ok |
| leseni | 最近 | recently |  | ok |
| apali | 海外で | abroad |  | ok |
| utuli | 屋外で | outdoors |  | ok |
| upusi | 上の階へ | upstairs |  | ok |
| tonuti | 都心へ | downtown |  | ok |
| inuki | その代わりに | instead |  | ok |
| aluli | 声を出して | aloud |  | ok |
| aniwi | とにかく | anyway |  | ok |
| noati | この頃 | nowadays |  | ok |
| lateli | かなり | rather |  | ok |
| aluki | 一生懸命に | hard | 語幹が同じ: aluke | ok |
| sutuli | まっすぐに | straight | 語幹が同じ: sutule | ok |
| jali | 遠くに | far | 語幹が同じ: jale | ok |
| epepi | これまでに | ever |  | ok |
| tapi | その時 | then |  | ok |
| anati | いつでも | anytime |  | ok |

### prep（17語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| akote | の上方に | above |  | ok |
| awate | を横切って | across |  | ok |
| amete | に反対して | against |  | ok |
| emote | の中で | among |  | ok |
| ilate | の周りに | around |  | ok |
| peite | の後ろに | behind |  | ok |
| petute | の間に | between |  | ok |
| tupite | の最中に | during |  | ok |
| ipete | の中へ | into |  | ok |
| nilute | の近くに | near |  | ok |
| otate | から離れて | off |  | ok |
| okete | を越えて | over |  | ok |
| tutute | を通って | through |  | ok |
| unate | の下に | under |  | ok |
| wipate | なしで | without |  | ok |
| omite | の上へ | onto |  | ok |
| pesate | のそばに | beside |  | ok |

### pronoun（6語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| ewa | みんな | everyone | 語幹が同じ: ewi | ok |
| eja | すべて | everything |  | ok |
| sema | 何か | something | 語幹が同じ: seme | ok |
| noka | 何もない | nothing | 語幹が同じ: noki, noko | ok |
| awa | 誰でも | anyone | 語幹が同じ: awo | ok |
| aja | 何でも | anything |  | ok |

## v0.8 日本語の基本語彙（549語）

### noun（335語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| leka | 赤 | red | 語幹が同じ: leko; 同じ英語の語: lete | ok |
| kolola | 色 | color / colour |  | ok |
| lila | 後ろ | rear |  | ok |
| emula | 英語 | English |  | ok |
| jena | 円 | yen |  | ok |
| penusa | 鉛筆 | pencil |  | ok |
| peja | おなか | belly |  | ok |
| enapa | 終わり | end | 同じ英語の語: pino | ok |
| kanapa | 菓子 | candy / sweets |  | ok |
| kolata | 風邪 | cold | 同じ英語の語: kole | ok |
| suluma | 肩 | shoulder |  | ok |
| kanesa | 漢字 | kanji |  | ok |
| kotuta | 金 | gold |  | ok |
| upa | 髪 | hair | 語幹が同じ: upo | ok |
| mula | 毛 | fur |  | ok |
| noluna | 北 | north |  | ok |
| wesusa | 西 | west |  | ok |
| isuwa | 東 | east |  | ok |
| susa | 南 | south | 語幹が同じ: suso | ok |
| sutima | 切手 | stamp |  | ok |
| kimopa | 着物 | kimono |  | ok |
| tekuna | 教科書 | textbook |  | ok |
| kuwapa | 教室 | classroom |  | ok |
| neka | 首 | neck |  | ok |
| nulaka | 黒板 | blackboard |  | ok |
| sakuma | 桜 | sakura / cherry blossom |  | ok |
| tupea | 三角 | triangle |  | ok |
| sukua | 四角 | square | 語幹が同じ: sukue | ok |
| popa | 写真 | photo / photograph | 語幹が同じ: pope, popo | ok |
| salaka | 字 | character |  | ok |
| punila | 生徒 | pupil |  | ok |
| naka | 背中 | back |  | ok |
| supowa | 地下鉄 | subway |  | ok |
| elusa | 出口 | exit |  | ok |
| toma | 人形 | doll |  | ok |
| tupa | 歯 | tooth |  | ok |
| taluka | 話 | talk | 同じ英語の語: toko | ok |
| alema | 半分 | half |  | ok |
| toiwa | トイレ | toilet |  | ok |
| penata | 弁当 | bento / lunch box |  | ok |
| pukona | 前 | front |  | ok |
| ima | 耳 | ear | 語幹が同じ: ime, imo | ok |
| sunena | お土産 | souvenir |  | ok |
| kumama | 眼鏡 | glasses / spectacles |  | ok |
| kinupa | 幼稚園 | kindergarten |  | ok |
| sakila | スカート | skirt |  | ok |
| anewa | ハンカチ | handkerchief |  | ok |
| laka | ページ | page | 語幹が同じ: lako | ok |
| polema | 外国人 | foreigner |  | ok |
| situna | 合図 | signal |  | ok |
| tasupa | 味 | taste | 同じ英語の語: teso | ok |
| suweta | 汗 | sweat |  | ok |
| nena | 網 | net | 同じ英語の語: netuwa | ok |
| lelita | 安心 | relief |  | ok |
| sukoma | 胃 | stomach |  | ok |
| puwima | 息 | breath |  | ok |
| ponuma | 池 | pond |  | ok |
| polupa | 板 | board | 語幹が同じ: polupo | ok |
| pusala | いたずら | prank |  | ok |
| lipeta | 人生 | lifetime |  | ok |
| tutita | 糸 | thread |  | ok |
| kunuma | 田舎 | countryside |  | ok |
| liwa | 命 | life | 語幹が同じ: liwo | ok |
| nulina | 印刷 | print |  | ok |
| lija | 嘘 | lie | 語幹が同じ: lijo | ok |
| alawa | 腕 | arm |  | ok |
| lepepa | 裏 | reverse |  | ok |
| sakepa | 上着 | jacket |  | ok |
| lumola | 噂 | rumor |  | ok |
| luna | 運 | luck |  | ok |
| ekima | 運動 | exercise |  | ok |
| kiputa | 贈り物 | gift / present | 同じ英語の語: naua, naue | ok |
| poma | お辞儀 | bow |  | ok |
| sujupa | 表 | surface |  | ok |
| onesa | 温泉 | onsen / hot spring |  | ok |
| mitina | 会 | meeting |  | ok |
| sopina | 買い物 | shopping |  | ok |
| sawa | 形 | shape |  | ok |
| keta | 神 | god | 語幹が同じ: keto | ok |
| tunupa | 雷 | thunder |  | ok |
| sukana | 皮 | skin |  | ok |
| suwuka | 代わり | substitute |  | ok |
| imuka | 感想 | impression |  | ok |
| patina | 我慢 | patience |  | ok |
| nola | 岸 | shore |  | ok |
| wununa | 傷 | wound |  | ok |
| muta | 気分 | mood |  | ok |
| pilipa | 気持ち | feeling |  | ok |
| momupa | 競争 | competition |  | ok |
| powa | 霧 | fog |  | ok |
| lekota | 記録 | record |  | ok |
| nepola | 近所 | neighborhood |  | ok |
| silata | 銀 | silver |  | ok |
| awipa | 癖 | habit |  | ok |
| lapa | 唇 | lip | 語幹が同じ: lape, lapo | ok |
| tisuna | 区別 | distinction |  | ok |
| aloja | 苦労 | hardship |  | ok |
| nonuta | 具合 | condition |  | ok |
| keluka | 計算 | calculation |  | ok |
| inila | 怪我 | injury |  | ok |
| seneta | 景色 | scenery |  | ok |
| elama | 消しゴム | eraser |  | ok |
| tetepa | 決心 | determination |  | ok |
| awuka | 欠席 | absence |  | ok |
| sumoka | 煙 | smoke | 語幹が同じ: sumoko | ok |
| juala | 喧嘩 | quarrel |  | ok |
| sitesa | 見物 | sightseeing |  | ok |
| nula | 劇 | play | 同じ英語の語: puleo | ok |
| lekupa | 後悔 | regret |  | ok |
| atowa | 広告 | advertisement / ad |  | ok |
| konaka | 工事 | construction |  | ok |
| tumaka | 交通 | traffic |  | ok |
| poteka | 粉 | powder |  | ok |
| pisuta | ごちそう | feast |  | ok |
| sulola | 坂 | slope |  | ok |
| komota | 作文 | composition |  | ok |
| ajuna | 賛成 | agreement |  | ok |
| waka | 散歩 | walk | 語幹が同じ: wako | ok |
| mateka | 材料 | material |  | ok |
| wita | 残念 | pity | 語幹が同じ: wite | ok |
| tika | 死 | death | 語幹が同じ: tike, tiko | ok |
| poja | 詩 | poem |  | ok |
| selema | 式 | ceremony |  | ok |
| towa | 舌 | tongue |  | ok |
| unama | 下着 | underwear |  | ok |
| pupepa | 支度 | preparation |  | ok |
| kutusa | 品物 | goods |  | ok |
| tupama | 芝居 | drama |  | ok |
| masuta | 主人 | master | 語幹が同じ: masuto | ok |
| tepopa | 出発 | departure |  | ok |
| soa | 醤油 | soy / soy sauce |  | ok |
| kapepa | 食堂 | cafeteria |  | ok |
| okea | 知り合い | acquaintance |  | ok |
| maluka | 印 | mark | 語幹が同じ: maluko | ok |
| ejupa | 実験 | experiment |  | ok |
| owusa | 邪魔 | obstacle |  | ok |
| semuna | 順序 | sequence |  | ok |
| sanata | 砂 | sand |  | ok |
| lesata | 住まい | residence |  | ok |
| tiama | 図 | diagram |  | ok |
| lipasa | 生活 | lifestyle |  | ok |
| awana | 整理 | arrangement |  | ok |
| kuma | 咳 | cough | 語幹が同じ: kumo | ok |
| kela | 石炭 | coal | 語幹が同じ: kelo | ok |
| lonuna | 洗濯 | laundry |  | ok |
| lukuka | 贅沢 | luxury |  | ok |
| konoma | 相談 | consultation |  | ok |
| utuwa | 外 | outside |  | ok |
| loma | 損 | loss | 語幹が同じ: lomo | ok |
| nata | 田 | paddy |  | ok |
| kimuma | 体操 | gymnastics |  | ok |
| tatapa | 畳 | tatami |  | ok |
| selula | 棚 | shelf |  | ok |
| tala | 谷 | valley | 語幹が同じ: talo | ok |
| punuwa | 束 | bundle |  | ok |
| liluta | 誕生日 | birthday |  | ok |
| tukepa | 箪笥 | dresser |  | ok |
| minisa | 大臣 | minister |  | ok |
| tipeka | 違い | difference |  | ok |
| kosana | 注意 | caution |  | ok |
| iwuma | 注射 | injection |  | ok |
| sapipa | 貯金 | savings |  | ok |
| pikopa | 漬物 | pickles |  | ok |
| seija | 土 | soil |  | ok |
| kutena | 粒 | grain |  | ok |
| nela | 爪 | nail |  | ok |
| ituja | 積もり | intention |  | ok |
| ilowa | 鉄 | iron |  | ok |
| leluwa | 鉄道 | railway |  | ok |
| temeta | 寺 | temple |  | ok |
| eluna | 年寄り | elderly | 語幹が同じ: elune | ok |
| kukola | 戸棚 | cupboard |  | ok |
| laneta | 土地 | land |  | ok |
| tima | 泥棒 | thief | 語幹が同じ: time | ok |
| komema | 仲間 | companion |  | ok |
| lenuma | 長さ | length |  | ok |
| jiaka | 斜め | diagonal |  | ok |
| wapa | 波 | wave | 語幹が同じ: wapo; 同じ英語の語: seko | ok |
| seputa | 匂い | scent |  | ok |
| tiena | 日記 | diary |  | ok |
| lukapa | 荷物 | luggage |  | ok |
| amima | 入学 | admission |  | ok |
| lusa | 根 | root | 語幹が同じ: luse, luso | ok |
| wesa | 願い | wish | 語幹が同じ: weso | ok |
| tukota | 喉 | throat |  | ok |
| talina | 飲み物 | drink | 同じ英語の語: liko | ok |
| kuwa | 糊 | glue |  | ok |
| keika | 乗り物 | vehicle |  | ok |
| isa | 灰 | ash | 語幹が同じ: ise, isi | ok |
| kunala | 墓 | grave |  | ok |
| posusa | 葉書 | postcard |  | ok |
| ajela | 拍手 | applause |  | ok |
| pekina | 初め | beginning |  | ok |
| puwawa | 旗 | flag |  | ok |
| papupa | 畑 | farm |  | ok |
| tisoka | 発見 | discovery |  | ok |
| anija | 発表 | announcement |  | ok |
| imepa | 発明 | invention |  | ok |
| pitepa | 羽 | feather |  | ok |
| wipa | 幅 | width | 語幹が同じ: wipo | ok |
| wutupa | 林 | woods |  | ok |
| nitupa | 針 | needle |  | ok |
| wula | 馬鹿 | fool |  | ok |
| tumoa | 引き出し | drawer |  | ok |
| pilela | 髭 | beard |  | ok |
| nila | 膝 | knee |  | ok |
| lasula | 暇 | leisure |  | ok |
| lutula | 紐 | string |  | ok |
| saluna | 一覧表 | chart |  | ok |
| kopena | 表紙 | cover | 同じ英語の語: pulo | ok |
| letuta | 評判 | reputation |  | ok |
| tetima | 昼間 | daytime |  | ok |
| popeta | 貧乏 | poverty |  | ok |
| enoja | 封筒 | envelope |  | ok |
| kupupa | 夫婦 | couple |  | ok |
| kilota | 服装 | clothing |  | ok |
| saja | 袋 | sack |  | ok |
| jita | 蓋 | lid |  | ok |
| putuja | 布団 | futon |  | ok |
| peneka | 塀 | fence |  | ok |
| lepaka | 返事 | reply |  | ok |
| punoka | 放送 | broadcast |  | ok |
| nuta | 仏 | buddha |  | ok |
| setika | 棒 | stick |  | ok |
| jila | 枕 | pillow |  | ok |
| misupa | 間違い | mistake |  | ok |
| tina | 松 | pine | 語幹が同じ: tine | ok |
| imina | 真似 | imitation |  | ok |
| mina | 豆 | bean | 語幹が同じ: mino | ok |
| satita | 満足 | satisfaction |  | ok |
| uta | 味方 | ally |  | ok |
| lama | 湖 | lake |  | ok |
| misa | 味噌 | miso | 語幹が同じ: miso, misu | ok |
| wima | 麦 | wheat |  | ok |
| wasupa | 無駄 | waste | 語幹が同じ: wasupo | ok |
| sesuwa | 胸 | chest |  | ok |
| juta | 芽 | bud |  | ok |
| nuesa | 迷惑 | nuisance |  | ok |
| mulupa | 面倒 | trouble |  | ok |
| pujaja | 毛布 | blanket |  | ok |
| patema | 模様 | pattern |  | ok |
| kunita | 八百屋 | greengrocer |  | ok |
| mela | 郵便 | mail |  | ok |
| pineta | 指 | finger |  | ok |
| tulima | 夢 | dream | 語幹が同じ: tulimo | ok |
| ejana | 用事 | errand |  | ok |
| ajiwa | 様子 | appearance |  | ok |
| mipuna | 夜中 | midnight |  | ok |
| papena | 両親 | parents |  | ok |
| kolisa | 廊下 | corridor |  | ok |
| kotoka | 綿 | cotton |  | ok |
| lajea | 割合 | ratio |  | ok |
| ijaka | インク | ink |  | ok |
| lulama | グラム | gram |  | ok |
| lupeka | ゴム | rubber |  | ok |
| senipa | センチ | centimeter |  | ok |
| topaka | タバコ | tobacco / cigarette |  | ok |
| lela | ベル | bell | 語幹が同じ: lelo | ok |
| pumoma | ボタン | button |  | ok |
| metela | メートル | meter |  | ok |
| anuta | 握手 | handshake |  | ok |
| posipa | 位置 | position |  | ok |
| leseka | 受付 | reception |  | ok |
| ijipa | 影響 | influence |  | ok |
| nututa | 栄養 | nutrition |  | ok |
| kopuka | 会議 | conference |  | ok |
| unea | 家庭 | household |  | ok |
| kokula | 完成 | completion |  | ok |
| memola | 記念 | memorial |  | ok |
| oka | 希望 | hope | 語幹が同じ: oko; 同じ英語の語: opo | ok |
| kupika | 協力 | cooperation |  | ok |
| tiseta | 距離 | distance |  | ok |
| ojosa | 逆 | opposite |  | ok |
| tesita | 決定 | decision |  | ok |
| polosa | 欠点 | fault |  | ok |
| ojina | 幸福 | happiness |  | ok |
| pujiwa | 故障 | breakdown |  | ok |
| totala | 合計 | total | 語幹が同じ: totale | ok |
| tuwua | 裁判 | trial |  | ok |
| punema | 境 | boundary |  | ok |
| otoja | 作者 | author |  | ok |
| woka | 作品 | work | 語幹が同じ: woko | ok |
| lekela | 参考 | reference |  | ok |
| wuluka | 手術 | surgery |  | ok |
| okuja | 職業 | occupation |  | ok |
| pusowa | 進歩 | progress |  | ok |
| tukusa | 信用 | trust | 語幹が同じ: tukuso | ok |
| isesa | 事件 | incident |  | ok |
| kowuwa | 自信 | confidence |  | ok |
| sileka | 事情 | circumstance |  | ok |
| uka | 時代 | era |  | ok |
| esuja | 実行 | execution |  | ok |
| popuna | 人口 | population |  | ok |
| suwama | 水泳 | swimming |  | ok |
| peluja | 性格 | personality |  | ok |
| sumina | 精神 | spirit |  | ok |
| lemuka | 責任 | responsibility |  | ok |
| petapa | 石油 | petroleum |  | ok |
| suewa | 背広 | suit |  | ok |
| ewepa | 選挙 | election |  | ok |
| imawa | 想像 | imagination |  | ok |
| lewusa | 尊敬 | respect |  | ok |
| itiwa | 態度 | attitude |  | ok |
| tipuma | 台風 | typhoon |  | ok |
| susuja | 他人 | stranger |  | ok |
| lepima | 代表 | representative |  | ok |
| susapa | 中止 | suspension |  | ok |
| sija | 罪 | sin | 語幹が同じ: sije, sijo | ok |
| tekila | 程度 | degree |  | ok |
| pituka | 特徴 | feature |  | ok |
| ejola | 努力 | effort |  | ok |
| kojuja | 内容 | content |  | ok |
| popala | 人気 | popularity |  | ok |
| jula | 燃料 | fuel |  | ok |
| akula | 農業 | agriculture | 語幹が同じ: akulo | ok |
| apila | 能力 | ability |  | ok |
| pelala | 刃 | blade |  | ok |
| tama | 恥 | shame |  | ok |
| tepema | 発達 | development |  | ok |
| ujua | 平等 | equality |  | ok |
| ameka | 不安 | anxiety |  | ok |
| tasa | 変化 | change | 語幹が同じ: taso | ok |
| tilema | 方向 | direction |  | ok |
| kamana | 命令 | command | 同じ英語の語: olo | ok |
| puwupa | 目的 | purpose |  | ok |
| ewasa | 予想 | expectation |  | ok |
| pasopa | 流行 | fashion |  | ok |
| amaja | 量 | amount |  | ok |
| manela | 礼儀 | manners |  | ok |
| kenuna | 連絡 | contact |  | ok |
| lakola | 録音 | recording |  | ok |
| nekuta | ネクタイ | necktie |  | ok |
| pumuka | 基礎 | foundation |  | ok |
| inuta | 興味 | interest | 語幹が同じ: inute | ok |
| lana | 範囲 | range | 語幹が同じ: lano | ok |

### verb（134語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| poleno | 生まれる | born / be born |  | ok |
| topo | する | do | 語幹が同じ: topa | ok |
| enato | 入る | enter |  | ok |
| lesuno | 休む | rest | 語幹が同じ: lesuna | ok |
| womo | 暖める | warm | 語幹が同じ: woma, wome | ok |
| amuto | 扱う | handle |  | ok |
| katelo | 集まる | gather |  | ok |
| apomo | 謝る | apologize |  | ok |
| ekaso | 表す | express |  | ok |
| komuko | 合わせる | combine |  | ok |
| paniko | 慌てる | panic |  | ok |
| ulo | 急ぐ | hurry | 語幹が同じ: ula | ok |
| aso | 痛む | ache | 語幹が同じ: asa | ok |
| inaso | 入れる | insert |  | ok |
| pulomo | 浮かぶ | float |  | ok |
| kopo | 写す | copy | 語幹が同じ: kopa | ok |
| saso | 追う | chase | 語幹が同じ: sasa | ok |
| telo | 遅れる | delay | 語幹が同じ: tela, teli | ok |
| wapo | 起こす | wake | 語幹が同じ: wapa | ok |
| lekalo | 思い出す | recall |  | ok |
| teseno | 降りる | descend / get off |  | ok |
| awo | 掛ける | hang | 語幹が同じ: awa | ok |
| sulono | 囲む | surround |  | ok |
| tito | 片付ける | tidy | 語幹が同じ: tita, tite | ok |
| lino | 傾く | lean | 語幹が同じ: lina | ok |
| piwo | 噛む | bite | 語幹が同じ: piwa | ok |
| kometo | 通う | commute |  | ok |
| witelo | 枯れる | wither |  | ok |
| tulaio | 乾かす | dry | 語幹が同じ: tulaie | ok |
| panaso | 消える | vanish |  | ok |
| loko | 腐る | rot | 語幹が同じ: loka, loke | ok |
| kolamo | 崩れる | collapse |  | ok |
| tisuto | 配る | distribute |  | ok |
| lepito | 繰り返す | repeat |  | ok |
| sukelo | 苦しむ | suffer |  | ok |
| elalo | 消す | erase |  | ok |
| pukiso | 凍る | freeze |  | ok |
| lupo | 擦る | rub | 語幹が同じ: lupa | ok |
| lepuso | 断る | refuse |  | ok |
| kilo | 殺す | kill | 語幹が同じ: kila, kile, kili | ok |
| putumo | 咲く | bloom |  | ok |
| suno | 叫ぶ | shout | 語幹が同じ: suna, suni | ok |
| lolo | 下げる | lower | 語幹が同じ: lola, lole | ok |
| sukapo | 刺す | stab |  | ok |
| sukoto | 叱る | scold |  | ok |
| sinuto | 沈む | sink |  | ok |
| tilo | 縛る | tie | 語幹が同じ: tila | ok |
| titeno | 締める | tighten |  | ok |
| sato | 喋る | chat | 語幹が同じ: sata, sati | ok |
| iniko | 知らせる | inform |  | ok |
| okuso | 調べる | examine |  | ok |
| inolo | 吸う | inhale |  | ok |
| atapo | 進む | advance |  | ok |
| lekopo | 勧める | recommend |  | ok |
| tisako | 捨てる | discard |  | ok |
| sulako | 滑る | slip |  | ok |
| nuluko | 育てる | nurture |  | ok |
| topulo | 倒す | topple |  | ok |
| konato | 確かめる | confirm |  | ok |
| noko | 叩く | knock | 語幹が同じ: noka, noki | ok |
| akamo | 溜まる | accumulate |  | ok |
| supiko | 足りる | suffice |  | ok |
| tesapo | 騙す | deceive |  | ok |
| apuwo | 近付く | approach |  | ok |
| tipelo | 違う | differ |  | ok |
| sakato | 散る | scatter |  | ok |
| kutapo | 掴む | grab |  | ok |
| atoso | 付ける | attach |  | ok |
| koneko | 伝える | convey |  | ok |
| lato | 包む | wrap | 語幹が同じ: lata | ok |
| konimo | 繋ぐ | connect |  | ok |
| pijo | 積む | pile | 語幹が同じ: pija | ok |
| papo | 詰める | pack | 語幹が同じ: papa, pape | ok |
| akojo | 連れる | accompany |  | ok |
| ilumo | 照らす | illuminate |  | ok |
| liwo | 届く | reach | 語幹が同じ: liwa | ok |
| lepelo | 直す | repair |  | ok |
| leketo | 直る | recover |  | ok |
| pumo | 流す | pour | 語幹が同じ: puma | ok |
| kaso | 眺める | gaze | 語幹が同じ: kasa, kase | ok |
| puwo | 流れる | flow | 語幹が同じ: puwa | ok |
| kuo | 並ぶ | queue | 語幹が同じ: kue | ok |
| apano | 並べる | arrange |  | ok |
| lijo | 鳴る | ring | 語幹が同じ: lija; 同じ英語の語: lina | ok |
| kupipo | 握る | grip |  | ok |
| suso | 縫う | sew | 語幹が同じ: susa | ok |
| unapo | 脱ぐ | undress |  | ok |
| penuko | 塗る | paint |  | ok |
| lemeno | 残る | remain |  | ok |
| lomo | 乗せる | load | 語幹が同じ: loma | ok |
| ekeko | 延ばす | extend |  | ok |
| situlo | 延びる | stretch |  | ok |
| supamo | 生える | sprout |  | ok |
| misulo | 計る | measure |  | ok |
| suwepo | 掃く | sweep |  | ok |
| lemoto | 外す | remove |  | ok |
| sepalo | 離す | separate |  | ok |
| lelomo | 引っ越す | relocate |  | ok |
| sijo | 冷やす | chill | 語幹が同じ: sija, sije | ok |
| ipuko | 増える | increase |  | ok |
| wipo | 拭く | wipe | 語幹が同じ: wipa | ok |
| pilepo | 防ぐ | prevent |  | ok |
| satepo | 踏む | step |  | ok |
| tekupo | 減る | decrease |  | ok |
| peleso | 褒める | praise |  | ok |
| tiko | 掘る | dig | 語幹が同じ: tika, tike | ok |
| lono | 巻く | roll | 語幹が同じ: lone | ok |
| peneto | 曲げる | bend |  | ok |
| mikupo | 混ぜる | mix |  | ok |
| sumaso | 纏める | summarize |  | ok |
| esiso | 迷う | hesitate |  | ok |
| lotato | 回す | rotate |  | ok |
| imo | 向かう | head | 語幹が同じ: ima, ime; 同じ英語の語: ita | ok |
| weluko | 迎える | welcome |  | ok |
| milo | 剥く | peel | 語幹が同じ: mila | ok |
| tileko | 向ける | direct |  | ok |
| nopo | 結ぶ | knot | 語幹が同じ: nopa | ok |
| lako | 漏れる | leak | 語幹が同じ: laka | ok |
| emuko | 雇う | employ |  | ok |
| tipo | 破る | tear | 語幹が同じ: tipa, tipe | ok |
| seso | 止む | cease | 語幹が同じ: sese | ok |
| kuino | 辞める | quit |  | ok |
| ajio | 避ける | avoid |  | ok |
| tuto | 汚す | dirty | 語幹が同じ: tuta, tute | ok |
| lemao | 喜ぶ | rejoice |  | ok |
| patalo | 別れる | part | 語幹が同じ: patala | ok |
| tipito | 分ける | divide |  | ok |
| eno | 渡す | hand | 語幹が同じ: ena | ok |
| suposo | 割る | split |  | ok |
| kumako | 割れる | crack |  | ok |
| konono | 行う | conduct |  | ok |
| sako | 剃る | shave | 語幹が同じ: saka | ok |
| lelo | 頼る | rely | 語幹が同じ: lela | ok |
| awumo | 認める | admit |  | ok |

### adj（54語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| penupe | 痛い | painful / sore |  | ok |
| pakie | いろいろな | various |  | ok |
| inime | 面白い | interesting / funny | 同じ英語の語: june | ok |
| kupe | かわいい | cute | 語幹が同じ: kupa | ok |
| sukile | 上手な | skilled / good at |  | ok |
| unise | 下手な | unskilled / poor at |  | ok |
| enuke | 楽しい | enjoyable / fun |  | ok |
| kulose | 近い | close | 語幹が同じ: kulosa, kuloso | ok |
| jale | 遠い | far | 語幹が同じ: jali | ok |
| kupape | ありがたい | grateful |  | ok |
| piete | 美しい | beautiful |  | ok |
| enope | 羨ましい | envious |  | ok |
| kenume | おとなしい | gentle / docile |  | ok |
| ite | 痒い | itchy | 語幹が同じ: ita, ito | ok |
| supipe | 辛い | spicy |  | ok |
| pitipe | かわいそうな | pitiful / poor | 同じ英語の語: pue | ok |
| sutete | 厳しい | strict |  | ok |
| sumepe | 臭い | smelly |  | ok |
| pupuse | 悔しい | frustrated |  | ok |
| tetele | 詳しい | detailed |  | ok |
| pupope | 盛んな | prosperous |  | ok |
| sutoke | 丈夫な | sturdy |  | ok |
| salute | 鋭い | sharp |  | ok |
| sute | ずるい | sly | 語幹が同じ: suta, suti | ok |
| palese | 大切な | precious |  | ok |
| pupate | 平らな | flat |  | ok |
| alose | つらい | harsh |  | ok |
| pitele | 苦い | bitter |  | ok |
| lipele | 賑やかな | lively |  | ok |
| lukie | ぬるい | lukewarm |  | ok |
| enite | 熱心な | enthusiastic |  | ok |
| inone | 激しい | intense |  | ok |
| emuwe | 恥ずかしい | embarrassed |  | ok |
| nakete | 裸の | naked |  | ok |
| misute | 不思議な | mysterious |  | ok |
| pake | 太った | fat | 語幹が同じ: paka, pako | ok |
| iwuke | 不便な | inconvenient |  | ok |
| kalume | 平気な | calm |  | ok |
| umipe | 蒸し暑い | humid |  | ok |
| asuse | 夢中な | absorbed |  | ok |
| lale | 珍しい | rare | 語幹が同じ: lala | ok |
| putise | 愉快な | pleasant |  | ok |
| luse | 緩い | loose | 語幹が同じ: lusa, luso | ok |
| tupune | 酔った | drunk |  | ok |
| lule | 乱暴な | rough | 語幹が同じ: lula | ok |
| supute | 立派な | splendid |  | ok |
| seluke | わがままな | selfish |  | ok |
| suleke | わずかな | slight |  | ok |
| elake | 上品な | elegant |  | ok |
| akume | 正確な | accurate |  | ok |
| senune | 中央の | central |  | ok |
| suise | 適当な | suitable |  | ok |
| simale | 同時の | simultaneous |  | ok |
| sumuke | 滑らかな | smooth |  | ok |

### adv（26語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| sumoli | 少し | little / a little | 語幹が同じ: sumole | ok |
| kili | はっきり | clearly | 語幹が同じ: kila, kile, kilo | ok |
| tiliki | 一生懸命 | diligently |  | ok |
| someti | いつか | someday |  | ok |
| suli | 必ず | surely | 語幹が同じ: sula, sule, sulo | ok |
| nituli | きちんと | neatly |  | ok |
| seluti | きっと | certainly |  | ok |
| pilumi | しっかり | firmly |  | ok |
| komuti | すっかり | completely |  | ok |
| puloki | 多分 | probably |  | ok |
| luwi | だいたい | roughly |  | ok |
| kulapi | だんだん | gradually |  | ok |
| pulipi | ちゃんと | properly |  | ok |
| mituwi | 途中 | midway |  | ok |
| suteni | 突然 | suddenly |  | ok |
| lapiti | どんどん | rapidly |  | ok |
| pusi | 初めて | first | 語幹が同じ: pusa, puse, puso | ok |
| ekisi | 非常に | extremely |  | ok |
| pakuli | ぼんやり | vaguely |  | ok |
| enuti | 全く | entirely |  | ok |
| epani | やがて | eventually |  | ok |
| elesi | よそ | elsewhere |  | ok |
| teliti | わざわざ | deliberately |  | ok |
| apesi | 絶対 | absolutely |  | ok |
| tilepi | 直接 | directly |  | ok |
| natupi | 当然 | naturally | 語幹が同じ: natupe | ok |

## v0.9 現代・IT語彙（11語）

### noun（6語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| alutipa | 人工知能 | ai / artificial intelligence |  | ok |
| netuwa | ネットワーク | network / net | 同じ英語の語: nena | ok |
| sumawa | スマートフォン | smartphone / smart phone / phone | 同じ英語の語: tela | ok |
| pasiwa | パスワード | password |  | ok |
| senasa | センサー | sensor |  | ok |
| puwoja | プログラム | program | 同じ英語の語: pupoko | ok |

### verb（3語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| pupoko | プログラムする | program / code | 同じ英語の語: puwoja | ok |
| upujo | アップロードする | upload |  | ok |
| tonuko | ダウンロードする | download |  | ok |

### adj（1語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| tikite | デジタルの | digital / electronic |  | ok |

### adv（1語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| onapi | オンラインで | online |  | ok |

## Antigravity の追加語（dictionary/anti_additions.csv）（167語）

### noun（93語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| kaloma | 庭 | garden / yard |  | ok |
| puwela | 葬式 | funeral |  | ok |
| tunana | 商売 | trade / commerce |  | ok |
| lekika | 授業 | lecture |  | ok |
| malapa | 玉 | marble / bead |  | ok |
| oleja | 注文 | order | 同じ英語の語: olo | ok |
| kikua | 酒 | liquor / sake |  | ok |
| lokoma | 汽車 | locomotive |  | ok |
| kueja | 案内 | guidance |  | ok |
| telewa | 電報 | telegram |  | ok |
| posota | 格好 | style |  | ok |
| tonuwa | 工夫 | contrivance |  | ok |
| ukena | 勘定 | account |  | ok |
| pewuta | 玄関 | vestibule |  | ok |
| kataka | 片仮名 | katakana |  | ok |
| iwaja | 平仮名 | hiragana |  | ok |
| pipita | 見舞い | visitation |  | ok |
| setata | 身長 | stature |  | ok |
| pikima | 用心 | vigilance |  | ok |
| tesana | 下り | descent |  | ok |
| katewa | 調子 | tone |  | ok |
| tekasa | 文章 | text |  | ok |
| telaka | 跡 | trace |  | ok |
| momeka | 勢い | momentum |  | ok |
| tonita | 今夜 | tonight |  | ok |
| tikika | 茶碗 | teacup |  | ok |
| owopa | 相手 | opponent / rival |  | ok |
| pujuma | 岩 | boulder / crag |  | ok |
| losuta | 遠慮 | restraint / modesty / reserve |  | ok |
| simapa | 気の毒 | sympathy / compassion |  | 要修正 Claude【修正推奨】気の毒は pity/unfortunate に近く sympathy（同情）は違う。pity は wita（残念）が使用中。見出し語の再検討か削除 |
| kusoma | 下駄 | clogs / clog |  | ok Claude【任意】見出し語は単数 clog が自然（clogs は別名に） |
| wonuja | 承知 | consent / assent |  | ok |
| wateta | 水道 | waterworks / plumbing / tap / faucet |  | ok Claude【任意】waterworks はまれ。水道 = tap/water supply。見出し語は tap が自然 |
| tuneta | 性質 | trait / property / quality |  | ok |
| omoma | ついで | opportunity |  | ok Claude【任意】ついで = incidentally/occasion。opportunity は tana（チャンス）と近い |
| monosa | 梅雨 | monsoon |  | ok Claude【任意】梅雨 = rainy season。monsoon はより広い意味 |
| peloma | 得 | profit / gain / benefit / advantage |  | ok |
| aseja | 上り | ascent / uphill |  | ok |
| sulaja | 周り | surroundings / perimeter / circumference |  | ok |
| ejisa | 以外 | exception |  | 要修正 Claude【修正推奨】以外は「〜のほかに・〜を除いて」（except/besides）で、exception（例外）とは違う。前置詞に近く機能語のため、削除か Claude/M1ko の設計に回す |
| powula | 乗車 | boarding |  | ok |
| pawusa | ボールペン | ballpoint |  | 要修正 Claude【修正推奨】既存の pena（ペン）と意味が重なる（ボールペンはペンの一種）。削除して pena で言うのがよい（WORKFLOW §2 の手順1） |
| jikia | 億 | billion |  | 要修正 Claude【修正推奨】億は10の8乗（100 million）。billion は10の9乗で意味が違う。英語に1語がないため、削除して kupulu mimia（100×百万）で言うのがよい |
| kipoma | キロメートル | kilometer / kilometre |  |  |
| milima | ミリメートル | millimeter / millimetre |  |  |
| kikoka | キログラム | kilogram / kilo |  |  |
| litapa | リットル | liter / litre |  |  |
| pepuka | パーセント | percent / percentage |  |  |
| pokuwa | 狐 | fox |  |  |
| sunaka | 蛇 | snake / serpent |  |  |
| muloma | 蛙 | frog / toad |  |  |
| tujuka | 亀 | turtle / tortoise |  |  |
| kusawa | 蟹 | crab |  |  |
| salima | 蝦 | shrimp / prawn / lobster |  |  |
| okiwa | 蛸 | octopus |  |  |
| sujia | 烏賊 | squid / cuttlefish |  |  |
| selapa | 貝 | shellfish / clam / seashell |  |  |
| kapuna | 鯉 | carp |  |  |
| kilula | 金魚 | goldfish |  |  |
| sapala | 雀 | sparrow |  |  |
| jipea | 鳩 | pigeon / dove |  |  |
| wulala | 鶴 | crane |  |  |
| nutela | 蝶 | butterfly |  |  |
| mosuma | 蚊 | mosquito |  |  |
| sotuma | 苺 | strawberry |  |  |
| julawa | 葡萄 | grape / grapes |  |  |
| pekuma | 柿 | persimmon |  |  |
| julula | 梅 | plum / apricot |  |  |
| watila | 西瓜 | watermelon |  |  |
| lemona | レモン | lemon |  |  |
| panama | バナナ | banana |  |  |
| katota | 人参 | carrot |  |  |
| latika | 大根 | radish |  |  |
| kapama | キャベツ | cabbage |  |  |
| tukala | 葱 | scallion / leek / onion |  |  |
| musula | 茸 | mushroom / fungus |  |  |
| umona | 饂飩 | udon / noodle |  |  |
| sokola | チョコレート | chocolate |  |  |
| nisuka | ビスケット | biscuit / cookie / cracker |  |  |
| muima | ジュース | juice |  |  |
| pinaka | 酢 | vinegar |  |  |
| silisa | 菊 | chrysanthemum |  |  |
| pimupa | 竹 | bamboo |  |  |
| susema | 茎 | stem / stalk |  |  |
| tumula | 幹 | trunk |  |  |
| mutuka | 藁 | straw / hay |  |  |
| wapela | 滝 | waterfall / cascade |  |  |
| pukeka | 平野 | plain / prairie |  |  |
| ojuka | 沖 | offshore / offing |  |  |
| lenopa | 虹 | rainbow |  |  |
| lulona | 霜 | frost |  |  |
| tusopa | 雫 | droplet |  |  |
| pipuwa | 泡 | bubble / foam / froth |  |  |

### verb（51語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| sunito | 嗅ぐ | sniff |  | ok |
| komipo | 争う | compete / contend |  | ok |
| simelo | 煮る | simmer |  | ok |
| tumupo | 転ぶ | tumble |  | ok |
| kukamo | 騒ぐ | clamor |  | ok |
| pukulo | 茂る | flourish |  | ok |
| pateno | 太る | fatten |  | ok |
| sulemo | 痩せる | slim |  | ok |
| tisepo | 困る | distress |  | ok |
| oajo | 覚める | awaken |  | ok |
| tisolo | 溶ける | dissolve |  | ok |
| paluno | 乾く | parch |  | ok |
| lulumo | 隠れる | lurk |  | ok |
| emepo | 現れる | appear |  | ok |
| ajato | 諦める | abandon |  | ok |
| enipo | 誘う | entice |  | ok |
| tutulo | 離れる | stray |  | ok |
| omupo | 嵌める | embed |  | ok |
| kupuso | 潰す | crush |  | ok |
| ekino | 抜く | extract |  | ok |
| iwuto | 示す | indicate |  | ok |
| teposo | 預ける | deposit |  | ok |
| limito | 限る | limit |  | ok |
| sunupo | 頑張る | strive |  | ok |
| atijo | 慣れる | adapt |  | ok Claude: 英語の見出し語は get used to に近く adapt は適応するに寄る（任意） |
| otumo | 感心する | admire |  | ok |
| suwuno | 揺れる | swing |  | ok Claude: 英語の見出し語は sway か shake のほうが近い（任意） |
| kunano | 与える | grant / bestow / provide |  | ok Claude【任意】既存の kipo（give/keep。保つ与える）と近い。与える = give/grant の整理は M1ko の判断 |
| tukano | 移す | transfer / shift |  | ok |
| pupito | 飼う | breed |  | 要修正 Claude【修正推奨】飼うは keep/raise の意味。breed は繁殖させる。見出し語は rear が近い（rear は未使用） |
| onelo | 重なる | overlap |  | ok |
| satako | 重ねる | stack / layer |  | ok |
| ejumo | 切れる | expire / snap |  | ok |
| talupo | 暮れる | darken |  | ok |
| ewuno | 越える | exceed / surpass |  | ok |
| sanelo | 壊れる | shatter / crumble / malfunction |  | ok Claude【任意】壊れるに shatter は強すぎる（粉々になる）。break は puleko が使用中。crumble か malfunction を見出し語に |
| temulo | 下がる | decline |  | ok |
| pakako | 空く | vacate |  | 要修正 Claude【修正推奨】空くは become empty/free。vacate は他動詞（空にする）で意味がずれる。見出し語は empty（動詞は未使用）が近い |
| kopumo | 済む | conclude |  | ok |
| amiko | 揃える | align |  | ok |
| kinumo | 焚く | kindle |  | ok |
| tepato | 出掛ける | depart |  | ok |
| piluko | 通す | pierce / penetrate |  | ok Claude【任意】通すの主な意味は let pass/see through。pierce（突き通す）は一部の意味だけ |
| uneko | 解く | untie / unravel / unfasten |  | ok |
| alujo | 止める | halt / detain |  | ok |
| pilito | 晴れる | brighten |  | ok Claude【任意】晴れる = clear up（天気）。brighten より clear（動詞は未使用）が近い |
| tuwako | 引っ張る | drag / tug / haul |  | ok |
| etuwo | 広がる | expand / widen |  | ok |
| minuko | 交じる | mingle / blend |  | ok |
| sukino | 回る | spin / revolve |  | ok |
| suseno | 汚れる | stain |  | ok Claude【任意】汚れる = get dirty。stain は印をつける意味に寄る。soil（動詞は未使用）が近い |

### adj（16語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| tenuse | 濃い | dense |  | ok |
| ipume | 親しい | intimate |  | ok |
| sukate | 少ない | scarce |  | ok |
| akane | 苦しい | agonizing |  | ok |
| asepe | 渋い | astringent |  | ok |
| lunute | 丸い | round |  | ok |
| sulane | 細い | slender |  | ok |
| kumute | 曇った | cloudy |  | ok |
| pelume | 縦の | vertical |  | ok |
| tisape | がっかりした | disappointed |  | ok |
| elie | 勇ましい | heroic / gallant / valiant |  | ok Claude【任意】勇敢な pulepe と意味が近い（勇ましい≒勇敢） |
| atome | 偉い | admirable / noble / distinguished |  | ok |
| lekule | 惜しい | regrettable |  | ok Claude【任意】残念 wita（pity）と意味が近い |
| ateke | 憎い | hateful / odious / detestable |  | ok |
| soiwe | めでたい | joyful / joyous / auspicious |  | ok |
| unele | 無理な | unreasonable / excessive |  | ok |

### adv（7語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| lepipi | たびたび | repeatedly |  | ok |
| initi | ますます | increasingly |  | ok |
| ituti | なるほど | indeed |  | ok |
| kalali | うっかり | carelessly |  | ok |
| pulemi | なるべく | preferably |  | ok |
| puluni | なお | furthermore |  | ok Claude【任意】なお は接続詞に近い（furthermore）。接続詞は機能語のため Claude/M1ko の設計 |
| nameli | つまり | namely / briefly / shortly |  | ok Claude【任意】つまり は接続詞に近い（namely）。接続詞は機能語のため Claude/M1ko の設計 |

## v0.10 機能語（指示詞・はい／いいえ）（3語）

### pronoun（2語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| iliu | これ（この） | this / these |  | ok |
| teliu | あれ（あの・その） | that / those |  | ok |

### interj（1語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| jesu | はい | yes |  | ok |

## v0.11 感動詞（あいさつ）（3語）

### interj（3語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| kelosu | こんにちは | hello / hi |  | ok |
| kupaju | さようなら | goodbye / bye |  | ok |
| pilisu | どうぞ | please |  | ok |

