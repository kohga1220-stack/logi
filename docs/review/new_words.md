# 追加語の確認表

`tools/make_review.py` で生成。気になる語は、Logi の語を挙げて「音」「日本語の意味」「英語」のどれを直したいか教えてください。
確認の状況は `dictionary/word_review.csv` の status（draft / ok / fix）と note に書きます。

「手がかり」は、見直しの優先度を決めるための目安です。
- 語幹が同じ: 語尾の1文字だけが違う、別の品詞の語（例: `kuka` 名詞と `kuko` 動詞）。同じ英語の別品詞なら意図した組です。そうでなければ偶然の一致なので、見分けにくくないか見てください
- 同じ英語の語: 同じ英語の訳を持つ、別の語（同義語の候補）

確認済み(ok): 2444 / 要修正(fix): 0 / 未確認(draft): 1

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
| puposa | 企画 | project | 同じ英語の語: pololo | ok |
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
| ekuse | 興奮した | excited | 語幹が同じ: ekuso | ok |
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
| ile | 高い | high | 語幹が同じ: ila, ili; 同じ英語の語: uji | ok |
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
| lila | 後ろ | rear | 同じ英語の語: pupito | ok |
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
| seneta | 景色/風景 | scenery |  | ok |
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
| talina | 飲み物/飲料 | drink | 同じ英語の語: liko | ok |
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
| katelo | 集まる/集う | gather |  | ok |
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
| okuso | 調べる | examine | 語幹が同じ: okusa | ok |
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
| iwuke | 不便な/不自由な | inconvenient |  | ok |
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

## Antigravity の追加語（dictionary/anti_additions.csv）（1392語）

### noun（879語）

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
| kusoma | 下駄 | clogs / clog |  | ok Claude【任意】見出し語は単数 clog が自然（clogs は別名に） |
| wonuja | 承知 | consent / assent |  | ok |
| wateta | 水道 | waterworks / plumbing / tap / faucet |  | ok Claude【任意】waterworks はまれ。水道 = tap/water supply。見出し語は tap が自然 |
| tuneta | 性質 | trait / property / quality |  | ok |
| omoma | ついで | opportunity |  | ok Claude【任意】ついで = incidentally/occasion。opportunity は tana（チャンス）と近い |
| monosa | 梅雨 | monsoon |  | ok Claude【任意】梅雨 = rainy season。monsoon はより広い意味 |
| peloma | 得 | profit / gain / benefit / advantage |  | ok |
| aseja | 上り | ascent / uphill |  | ok |
| sulaja | 周り | surroundings / perimeter / circumference |  | ok |
| powula | 乗車 | boarding |  | ok |
| kipoma | キロメートル | kilometer / kilometre |  | ok |
| milima | ミリメートル | millimeter / millimetre |  | ok |
| kikoka | キログラム | kilogram / kilo |  | ok |
| litapa | リットル | liter / litre |  | ok |
| pepuka | パーセント | percent / percentage |  | ok |
| pokuwa | 狐 | fox |  | ok |
| sunaka | 蛇 | snake / serpent |  | ok |
| muloma | 蛙 | frog / toad |  | ok |
| tujuka | 亀 | turtle / tortoise |  | ok |
| kusawa | 蟹 | crab |  | ok |
| salima | 蝦 | shrimp / prawn / lobster |  | ok Claude【任意】lobster（伊勢海老）は別の語。別名から外す |
| okiwa | 蛸 | octopus |  | ok |
| sujia | 烏賊 | squid / cuttlefish |  | ok |
| selapa | 貝 | shellfish / clam / seashell |  | ok |
| kapuna | 鯉 | carp |  | ok |
| kilula | 金魚 | goldfish |  | ok |
| sapala | 雀 | sparrow |  | ok |
| jipea | 鳩 | pigeon / dove |  | ok |
| wulala | 鶴 | crane |  | ok |
| nutela | 蝶 | butterfly |  | ok |
| mosuma | 蚊 | mosquito |  | ok |
| sotuma | 苺 | strawberry |  | ok |
| julawa | 葡萄 | grape / grapes |  | ok |
| pekuma | 柿 | persimmon |  | ok |
| julula | 梅 | plum / apricot |  | ok Claude【任意】梅 は ume/Japanese apricot。plum（李）と apricot（杏）は別の果物で、どちらも近似 |
| watila | 西瓜 | watermelon |  | ok |
| lemona | レモン | lemon |  | ok |
| panama | バナナ | banana |  | ok |
| katota | 人参 | carrot |  | ok |
| latika | 大根 | radish |  | ok |
| kapama | キャベツ | cabbage |  | ok |
| tukala | 葱 | scallion / leek / onion |  | ok Claude【任意】onion は 玉ねぎ（別の語）。別名から外す |
| musula | 茸 | mushroom / fungus |  | ok |
| umona | 饂飩 | udon / noodle |  | ok Claude【任意】noodle は 麺 全般。別名から外す |
| sokola | チョコレート | chocolate |  | ok |
| nisuka | ビスケット | biscuit / cookie / cracker |  | ok |
| muima | ジュース | juice |  | ok |
| pinaka | 酢 | vinegar |  | ok |
| silisa | 菊 | chrysanthemum |  | ok |
| pimupa | 竹 | bamboo |  | ok |
| susema | 茎 | stem / stalk |  | ok |
| tumula | 幹 | trunk |  | ok |
| mutuka | 藁 | straw / hay |  | ok |
| wapela | 滝 | waterfall / cascade |  | ok |
| pukeka | 平野 | plain / prairie |  | ok |
| ojuka | 沖 | offshore / offing |  | ok Claude【任意】offshore は形容詞・副詞が主で、名詞の offing はまれ。置き換えるなら open sea（2語）しかなく、現状維持でもよい |
| lenopa | 虹 | rainbow |  | ok |
| lulona | 霜 | frost |  | ok |
| tusopa | 雫 | droplet |  | ok |
| pipuwa | 泡 | bubble / foam / froth |  | ok |
| susiwa | 湯気 | steam / vapor |  | ok |
| jusuna | 津波 | tsunami |  | ok |
| luluja | 洪水 | flood / deluge |  | ok |
| tisasa | 災害 | disaster / calamity / catastrophe |  | ok |
| tolusa | 公害 | pollution / contamination |  | ok |
| kopila | 銅 | copper / bronze |  | ok |
| mineka | 鉱物 | mineral / ore |  | ok |
| jolea | 額 | forehead / brow |  | ok |
| patoka | 尻 | buttocks / hip |  | ok Claude【任意】hip は 腰。別名から外す |
| linuka | 皺 | wrinkle / crease |  | ok |
| salopa | 唾 | saliva / spit |  | ok |
| sinita | 嚔 | sneeze |  | ok |
| ikeka | しゃっくり | hiccup |  | ok |
| tisipa | 目眩 | dizziness / vertigo |  | ok |
| tiuwa | 下痢 | diarrhea |  | ok |
| muwusa | 脈 | pulse |  | ok |
| nelepa | 神経 | nerve |  | ok |
| tikosa | 消化 | digestion |  | ok |
| eseta | 食欲 | appetite |  | ok |
| papika | 疲労 | fatigue / exhaustion / weariness |  | ok |
| ikisa | 衛生 | hygiene / sanitation |  | ok |
| tinina | 消毒 | disinfection / sterilization |  | ok |
| pumewa | 予防 | prevention / precaution |  | ok |
| nulema | 看病 | nursing |  | ok |
| osewa | 入院 | hospitalization |  | ok |
| timala | 退院 | discharge |  | ok Claude【任意】discharge は多義（放電など）。退院 の意味では hospital discharge。現状維持でもよい |
| panuja | 包帯 | bandage / dressing |  | ok |
| peketa | バケツ | bucket / pail |  | ok |
| mupuma | 箒 | broom |  | ok |
| wasata | 洗面器 | washbasin / basin |  | ok |
| totupa | 歯ブラシ | toothbrush |  | ok |
| lasota | 剃刀 | razor |  | ok |
| paweka | 電池 | battery |  | ok |
| sukeja | 螺子 | screw / bolt |  | ok Claude【任意】bolt は ボルト（別の語）。別名から外す |
| siwina | 筒 | cylinder / tube |  | ok |
| sitopa | 栓 | stopper / plug / cork |  | ok |
| sujasa | 秤 | scale / balance |  | ok |
| lulela | 物差し | ruler |  | ok |
| ketuja | 薬缶 | kettle / teapot |  | ok Claude【任意】teapot は 急須（別の語）。別名から外す |
| molula | 釜 | cauldron |  | ok Claude【任意】cauldron はまれ。釜 は pot が近いが使用中の可能性。現状維持でもよい |
| kuseta | 座布団 | cushion |  | ok |
| petosa | シーツ | bedsheet / sheet |  | ok |
| kuwula | カーテン | curtain / drape |  | ok |
| pinuna | 家具 | furniture |  | ok |
| etawa | 垣根 | hedge |  | ok |
| nimuna | 煙突 | chimney / smokestack |  | ok |
| wamea | 倉庫 | warehouse / storehouse |  | ok |
| tolama | 寮 | dormitory / dorm |  | ok |
| pajuwa | 床屋 | barbershop / barber |  | ok |
| muleka | 運動場 | playground |  | ok |
| lalusa | 駐車場 | parking |  | ok |
| papasa | 広場 | plaza / piazza |  | ok |
| setoa | 歩道 | sidewalk / pavement / footpath |  | ok |
| leloka | 線路 | railroad / track |  | ok |
| tunola | トンネル | tunnel |  | ok |
| emena | エレベーター | elevator / lift |  | ok |
| kowala | 襟 | collar / lapel |  | ok |
| solipa | 袖 | sleeve |  | ok |
| sewima | 水着 | swimsuit / swimwear |  | ok |
| wujusa | ブラウス | blouse |  | ok |
| wulipa | スリッパ | slipper / slippers |  | ok |
| mekea | 化粧 | makeup / cosmetics |  | ok |
| kanoka | 蝋燭 | candle |  | ok |
| julija | 煉瓦 | brick |  | ok |
| kuneka | コンクリート | concrete / cement | 同じ英語の語: konune | ok Claude【任意】cement は セメント（別の語）。別名から外す |
| kasosa | ガソリン | gasoline / petrol |  | ok |
| etija | エンジン | engine / motor |  | ok |
| pekaka | ブレーキ | brake / brakes |  | ok |
| lenesa | レンズ | lens |  | ok |
| tenoka | テント | tent |  | ok |
| tiluja | 太鼓 | drum / tambourine |  | ok Claude【任意】tambourine は タンバリン（別の語）。別名から外す |
| luputa | 笛 | flute / whistle / fife |  | ok |
| jiopa | バイオリン | violin / fiddle |  | ok |
| suwosa | 刀 | sword / katana |  | ok |
| wiluma | 意志 | willpower / volition |  | ok |
| mioma | 違反 | violation / infringement / breach |  | ok |
| tipola | 外交 | diplomacy |  | ok |
| utapa | 外出 | outing / excursion |  | ok |
| kokepa | 会話 | conversation / dialogue |  | ok |
| ajapa | 学問 | academics |  | ok Claude【任意】academics（複数形）は学業・学界。学問 は learning か scholarship が近い |
| woleta | 価値 | worth / merit |  | ok |
| solala | 給料 | salary / wage |  | ok |
| nupoa | 禁止 | prohibition / ban |  | ok |
| tenama | 傾向 | tendency / trend / inclination |  | ok |
| letila | 研究 | research / investigation |  | ok |
| iwosa | 検査 | inspection |  | ok |
| ejewa | 効果 | effect / effectiveness / efficacy |  | ok |
| sipula | 郊外 | suburb / suburbs / outskirts |  | ok |
| misana | 誤解 | misunderstanding |  | ok |
| nasusa | 国籍 | nationality / citizenship |  | ok |
| talela | 才能 | talent / aptitude |  | ok |
| sotisa | 刺激 | stimulus / stimulation |  | ok |
| uwema | 失業 | unemployment |  | ok |
| lilika | 宗教 | religion / faith |  | ok |
| tokuka | 主義 | doctrine / principle |  | ok |
| nupuka | 出版 | publishing / publication |  | ok |
| jukupa | 証明 | proof / certification |  | ok |
| lelana | 親戚 | relative / kin / kinsfolk |  | ok |
| lekama | 推薦 | recommendation / endorsement |  | ok |
| nolita | 政治 | politics |  | ok |
| manuna | 製造 | manufacture |  | ok |
| pesila | 設備 | facility / equipment |  | ok |
| sujeka | 専門 | specialty |  | ok |
| oweka | 組織 | organization |  | ok |
| nolesa | 知識 | knowledge |  | ok |
| nulowa | 地方 | province / region / district |  | ok Claude【任意】province は行政区画。地方 は region が近い。見出し語を region に（province は別名） |
| weopa | 地理 | geography |  | ok |
| kotesa | 訂正 | correction / revision |  | ok |
| wuloja | 発音 | pronunciation |  | ok |
| jutuma | 判断 | judgment / judgement |  | ok |
| pajima | 病人 | patient / invalid |  | ok Claude【任意】patient は 患者。病人 は sick person（invalid は古風）。別名 invalid を外す |
| soloka | 不足 | shortage / deficiency / scarcity |  | ok |
| pisapa | 物理 | physics |  | ok |
| kukema | 文法 | grammar / syntax |  | ok Claude【任意】syntax（統語論）は文法の一部。別名から外す |
| pomisa | 方針 | policy / guideline |  | ok |
| mekula | 募集 | recruitment |  | ok |
| puseja | 保存 | preservation / conservation / storage |  | ok Claude【任意】conservation は 保護。別名から外す |
| tujawa | 翻訳 | translation |  | ok |
| salesa | 魅力 | charm / appeal / attraction |  | ok |
| pijina | 友情 | friendship |  | ok |
| imoja | 輸入 | import |  | ok |
| temawa | 要求 | demand / claim |  | ok |
| lutaka | 予算 | budget |  | ok |
| kopasa | 良心 | conscience |  | ok |
| teoja | 理論 | theory |  | ok |
| tesosa | 論文 | thesis / treatise / dissertation |  | ok |
| meluta | 黴 | mold / mildew |  | ok |
| pemuwa | カボチャ | pumpkin / squash |  | ok Claude【任意】squash は ズッキーニ・スポーツ名と衝突しやすい。別名から外す |
| nukuma | 胡瓜 | cucumber |  | ok |
| kewupa | 昆布 | kelp / seaweed |  | ok Claude【任意】seaweed は 海藻 全般。別名から外す（若布・海苔と衝突しやすい） |
| wakama | 若布 | wakame |  | ok |
| sawuta | 鮭 | salmon |  | ok |
| meawa | マヨネーズ | mayonnaise |  | ok |
| kuwisa | クリーム | cream |  | ok |
| nupita | 蜘蛛 | spider |  | ok |
| milepa | 蛍 | firefly / glowworm |  | ok |
| musika | 筋肉 | muscle |  | ok |
| siloma | 絹 | silk |  | ok |
| lipupa | 口紅 | lipstick / rouge |  | ok |
| jelupa | 香水 | perfume / fragrance / cologne |  | ok |
| mupala | マフラー | scarf / muffler |  | ok |
| sipepa | ファスナー | zipper / fastener |  | ok |
| tatuma | バッジ | badge |  | ok |
| masoka | マスク | mask |  | ok |
| walula | 風船 | balloon |  | ok |
| nipua | 花火 | firework / fireworks |  | ok |
| melosa | メロディー | melody / tune |  | ok |
| lituma | リズム | rhythm |  | ok |
| posama | ポスター | poster / placard |  | ok |
| wuisa | クイズ | quiz |  | ok |
| lakeka | ラケット | racket / racquet |  | ok |
| pisema | ピストル | pistol / handgun / revolver |  | ok |
| pomepa | 爆弾 | bomb |  | ok |
| ujika | ヘリコプター | helicopter / chopper |  | ok |
| kosita | 容器 | container / receptacle / vessel |  | ok |
| pikasa | プラスチック | plastic / plastics |  | ok |
| piniwa | ビニール | vinyl |  | ok |
| ulewa | 元素 | element |  | ok |
| pamata | 高原 | plateau / highland |  | ok |
| penima | 半島 | peninsula |  | ok |
| pitila | 麓 | foothill / base |  | ok |
| lanasa | 牧場 | ranch / pasture |  | ok |
| pepisa | 吹雪 | blizzard / snowstorm |  | ok |
| moija | 湿気 | moisture / humidity / dampness |  | ok |
| sipaka | 火花 | spark |  | ok |
| ponika | 摩擦 | friction / chafing |  | ok Claude【任意】chafing は 擦れ。別名から外す |
| penola | 現象 | phenomenon |  | ok |
| kutila | 構造 | structure |  | ok |
| pakisa | 要素 | factor / component |  | ok |
| jesula | 資源 | resource / resources |  | ok |
| nunula | 資金 | fund / funds |  | ok |
| ponopa | ボーナス | bonus |  | ok |
| solewa | 奨学金 | scholarship |  | ok |
| tonasa | 寄付 | donation / contribution |  | ok |
| lejuja | 履歴書 | resume |  | ok Claude【任意】resume（résumé）は動詞 resume と同形。cv を別名に足すと引きやすい |
| mapusa | 原稿 | manuscript / draft |  | ok |
| pemopa | 諺 | proverb / saying / maxim |  | ok |
| onowa | 敬語 | honorific / honorifics |  | ok |
| mupeta | 述語 | predicate |  | ok |
| kimeta | 喜劇 | comedy / farce |  | ok |
| kukija | 批評 | criticism / review / critique |  | ok |
| sapeta | 迷信 | superstition |  | ok |
| panona | 空想 | fantasy / daydream |  | ok |
| somita | 孤独 | solitude / loneliness |  | ok |
| ajoka | 苦しみ | agony / suffering / anguish |  | ok |
| mukuna | 悲鳴 | scream / shriek |  | ok |
| onaja | 婚約 | engagement / betrothal |  | ok |
| luwita | 恋人 | sweetheart / lover |  | ok |
| uwia | 主婦 | housewife / homemaker |  | ok |
| tenena | 子孫 | descendant / offspring / posterity |  | ok |
| pemema | 首相 | premier / chancellor |  | ok Claude【任意】chancellor は ドイツ等の首相に限る。別名から外す |
| nalia | 議会 | parliament / congress |  | ok |
| mupopa | 教授 | professor |  | ok |
| memusa | 商人 | merchant / trader / dealer |  | ok |
| pisola | 漁師 | fisherman / angler |  | ok Claude【任意】angler は 釣り人。別名から外す |
| kenota | 車掌 | conductor |  | ok Claude【任意】conductor は指揮者の意味もあるが、車掌 を指す文脈なら可 |
| kumuwa | 犯人 | culprit / criminal / offender |  | ok |
| wilina | 応援 | cheering / backing |  | ok |
| temoma | 鬼 | demon / ogre / fiend |  | ok |
| tepika | 悪魔 | devil / satan |  | ok Claude【任意】satan は固有名。別名から外す |
| letoma | 回復 | recovery / recuperation |  | ok |
| sotapa | 学者 | scholar |  | ok |
| lilena | 学習 | learning |  | ok |
| leposa | 革命 | revolution |  | ok |
| lumata | 固まり | lump / clump / mass / cluster |  | ok |
| kakata | 空手 | karate |  | ok |
| kenila | 剣道 | kendo |  | ok |
| lapuka | 歌舞伎 | kabuki |  | ok |
| lakuna | 落語 | rakugo |  | ok |
| iwewa | 生け花 | ikebana |  | ok |
| kakena | カレンダー | calendar |  | ok |
| senoma | 感覚 | sensation / sense |  | ok |
| kunona | 冠 | crown / coronet / tiara |  | ok |
| sapuwa | 供給 | supply / provision |  | ok |
| kipapa | グラフ | graph |  | ok |
| tuseka | 訓練 | training / drill |  | ok |
| manipa | 経営 | management / administration |  | ok |
| sonota | 軽蔑 | contempt / scorn / disdain |  | ok |
| kinika | 結論 | conclusion |  | ok |
| kokosa | 憲法 | constitution |  | ok |
| onia | 航空 | aviation / aeronautics |  | ok |
| sokika | 固体 | solid |  | ok Claude【任意】solid は形容詞が主。名詞の固体 の意味では可 |
| tuija | 裁縫 | sewing / needlework |  | ok |
| papola | 座敷 | parlor |  | ok Claude【任意】座敷 は畳の部屋。parlor は洋風の客間で、ずれる。tatami room（2語）は使えず、現状維持でもよい |
| momana | 瞬間 | moment / instant |  | ok |
| kinasa | 消費 | consumption |  | ok |
| pimeka | 消防 | firefighting |  | ok |
| pipana | 振動 | vibration / oscillation |  | ok |
| likusa | 長方形 | rectangle / oblong |  | ok |
| umiwa | 単位 | unit / credit |  | ok |
| sitama | 段階 | stage / phase |  | ok |
| wukuwa | 彫刻 | sculpture / carving |  | ok |
| samika | 頂上 | summit / peak / top |  | ok |
| kumesa | 墜落 | crash |  | ok Claude【任意】crash は広い。墜落 は fall（落下）に近いが、航空機なら可 |
| pimosa | 哲学 | philosophy |  | ok |
| naluwa | パーティー | party / banquet |  | ok |
| ijona | ハイキング | hiking / hike |  | ok |
| wikuna | ピクニック | picnic |  | ok |
| sinuma | 日焼け | sunburn / suntan / tan |  | ok Claude【任意】sunburn（炎症）と suntan（日焼け色）は意味が違う。見出し語は suntan が自然 |
| satana | 標準 | standard / norm / criterion |  | ok |
| wusuta | 襖 | fusuma |  | ok Claude【任意】襖・団扇・刺身・空手などの日本語由来の語は、英語から引きにくいが、固有の文化語として妥当。このまま可 |
| nutisa | 仏教 | buddhism |  | ok |
| jupuwa | 物質 | substance / matter |  | ok |
| joipa | 沸騰 | boiling |  | ok Claude【任意】boiling は形容詞・動名詞が主。名詞 boil は別の意味もあるが、現状維持でもよい |
| kisata | 不満 | dissatisfaction / discontent / displeasure |  | ok |
| wupuja | 付録 | supplement / appendix |  | ok |
| sipima | 文明 | civilization / civilisation |  | ok |
| talosa | 的 | target / bullseye |  | ok |
| sepeka | 目上 | superior / senior / elder |  | ok |
| wupola | 目下 | subordinate / junior / inferior |  | ok Claude【任意】inferior は 劣った。別名から外す |
| susota | 物置 | storeroom / shed |  | ok |
| wopia | 紅葉 | foliage |  | ok Claude【任意】foliage は葉全般。紅葉 は autumn leaves（2語）が近く、現状維持でもよい |
| nomuka | 文句 | complaint / grumble / objection |  | ok |
| munuja | 夕焼け | sunset / afterglow |  | ok |
| petita | 嫁 | bride |  | ok Claude【任意】嫁 は日常では wife / daughter-in-law。bride は婚礼の花嫁に限る |
| towuta | 連続 | continuation / succession / series |  | ok |
| jaluja | 別れ | parting / farewell / separation |  | ok |
| tiwuka | 割引 | discount / rebate |  | ok |
| makupa | 背景 | background / backdrop |  | ok |
| pokesa | 焦点 | focus |  | ok |
| kisusa | 要点 | gist / essentials |  | ok |
| tasisa | 根拠 | basis / grounds |  | ok |
| samuja | 見本 | sample / specimen |  | ok |
| mesena | 仕組み | mechanism |  | ok |
| pajosa | 過程 | process |  | ok |
| mutosa | 手順 | procedure |  | ok |
| mutama | 統計 | statistics |  | ok |
| lokipa | 論理 | logic |  | ok |
| molaka | 道徳 | morality / ethics / morals |  | ok |
| sosuka | 正義 | justice / righteousness |  | ok |
| wujita | 誇り | pride |  | ok |
| umeja | 謙遜 | humility |  | ok |
| newula | 油断 | negligence / carelessness |  | ok Claude【任意】negligence は法的な過失。油断 は carelessness が自然。見出し語を carelessness に |
| lopuma | 反省 | reflection / introspection / remorse |  | ok |
| tiwapa | 失望 | disappointment / despair |  | ok |
| limula | 謎 | riddle / enigma / mystery |  | ok |
| topima | 話題 | topic / theme |  | ok |
| nekoka | 交渉 | negotiation / bargaining |  | ok |
| losela | 予約 | reservation / booking |  | ok |
| munota | 登山 | mountaineering / alpinism |  | ok |
| nisina | 釣り | fishing / angling |  | ok |
| mukia | スキー | skiing / ski |  | ok |
| mukata | スケート | skating / skate |  | ok |
| tepuwa | 夜明け | daybreak / dawn |  | ok |
| tumisa | 小雨 | drizzle / sprinkle |  | ok |
| kilesa | 三日月 | crescent |  | ok |
| pejuna | 肥料 | fertilizer / manure / compost |  | ok |
| misela | 漁業 | fishery |  | ok |
| ponena | 林業 | forestry |  | ok |
| sepiwa | 紡績 | spinning / textiles |  | ok |
| tekeka | 通信 | telecommunication / correspondence |  | ok |
| tuwaja | 輸送 | transportation / transport / transit |  | ok |
| pamesa | 小包 | parcel / package |  | ok |
| nonisa | 領事館 | consulate |  | ok |
| lusuwa | 税関 | customs |  | ok |
| sinana | 財政 | finance / finances |  | ok |
| metana | 少女 | girl |  | ok |
| sujoja | 成績 | scores / marks |  | ok Claude【任意】scores/marks（複数形）。成績 は grade か result が自然 |
| metopa | 都会 | metropolis |  | ok Claude【任意】都会 は city が近いが、使用中なら metropolis で可 |
| kilija | 垢 | grime / filth |  | ok |
| kakusa | 嗽 | gargle / gargling |  | ok |
| uwowa | 団扇 | uchiwa |  | ok Claude【任意】同上（日本語由来の文化語）。このまま可 |
| wosuna | 延期 | postponement / adjournment |  | ok |
| pemana | 雌 | female |  | ok |
| tomuma | 顔色 | complexion |  | ok |
| semesa | 学期 | semester / term / trimester |  | ok |
| tosula | 乾杯 | toast / cheers |  | ok |
| lotema | 籖 | lottery / raffle / lot |  | ok |
| sesisa | クリスマス | christmas / xmas |  | ok |
| litita | 現実 | reality / actuality |  | ok |
| sijeta | サイレン | siren / alarm |  | ok |
| sasija | 刺身 | sashimi |  | ok |
| nosuwa | 姿勢 | posture / stance |  | ok |
| kelena | 地面 | ground |  | ok |
| sesepa | 栗 | chestnut |  | ok |
| tilawa | 蜻蛉 | dragonfly |  | ok |
| sikapa | 蝉 | cicada |  | ok |
| sajusa | 鰯 | sardine |  | ok |
| noima | 大豆 | soybean |  | ok |
| kimaka | 麒麟 | giraffe |  | ok |
| kamisa | 駱駝 | camel |  | ok |
| kasala | カンガルー | kangaroo |  | ok |
| laowa | ライオン | lion |  | ok |
| malota | 鸚鵡 | parrot |  | ok |
| wolika | 狼 | wolf |  | ok |
| tatesa | お玉杓子 | tadpole |  | ok |
| katipa | 青虫 | caterpillar |  | ok |
| lalipa | 雲雀 | lark |  | ok |
| nitika | 鴬 | nightingale |  | ok |
| mepona | メロン | melon |  | ok |
| tunika | チューリップ | tulip |  | ok |
| ketala | 杉 | cedar |  | ok |
| tojuna | 刺 | thorn |  | ok |
| petena | 花びら | petal |  | ok |
| pepota | 胡椒 | pepper |  | ok |
| omija | オムレツ | omelet |  | ok |
| kesoka | ケチャップ | ketchup |  | ok |
| wisula | ウイスキー | whisky |  | ok |
| pitawa | ビタミン | vitamin |  | ok |
| pitota | 蛋白質 | protein |  | ok |
| okusa | 酸素 | oxygen | 語幹が同じ: okuso | ok |
| kajula | 炭素 | carbon |  | ok |
| ujoma | 原子 | atom |  | ok |
| molena | 分子 | molecule |  | ok |
| kepuma | 黴菌 | germ |  | ok |
| sewana | 白鳥 | swan |  | ok |
| nuketa | 花束 | bouquet |  | ok |
| nupasa | 飛蝗 | grasshopper |  | ok |
| sonepa | 向日葵 | sunflower |  | ok |
| juwuta | 瓢箪 | gourd |  | ok |
| tanota | 蒲公英 | dandelion |  | ok |
| osuta | 駝鳥 | ostrich |  | ok |
| ujala | 躑躅 | azalea |  | ok |
| latosa | 天道虫 | ladybug |  | ok |
| kotina | 玉蜀黍 | corn |  | ok |
| lisaka | 蜥蜴 | lizard |  | ok |
| wukea | 栗鼠 | squirrel |  | ok |
| titaka | 竜 | dragon |  | ok |
| toneka | 驢馬 | donkey |  | ok |
| kujowa | 鰐 | crocodile |  | ok |
| kanima | カナリヤ | canary |  | ok |
| nalama | キャラメル | caramel |  | ok |
| tolila | ゴリラ | gorilla |  | ok |
| tawia | ダリア | dahlia |  | ok |
| akola | 団栗 | acorn |  | ok |
| menua | ペンギン | penguin |  | ok |
| mawula | 楓 | maple |  | ok |
| piwuja | 甲虫 | beetle |  | ok |
| mujuta | 芥子 | mustard |  | ok |
| saneka | 鮫 | shark |  | ok |
| kinema | 生薑 | ginger |  | ok |
| kawuja | 鯰 | catfish |  | ok |
| lisuja | 手首 | wrist |  | ok |
| tumema | 親指 | thumb |  | ok |
| pinoma | 小指 | pinky |  | ok Claude【任意】pinky は米国の口語。little finger は2語のため使えず、現状維持でもよい |
| tipaja | 爪先 | tiptoe |  | ok Claude【任意】tiptoe は動詞・副詞が主。爪先 は toe（足の指）に近いが、未使用か要確認 |
| timita | 靨 | dimple |  | ok |
| piwena | 脳 | brain |  | ok |
| lipila | 肝臓 | liver |  | ok |
| joana | 関節 | joint |  | ok |
| kapowa | 虫歯 | cavity |  | ok |
| tujela | 結核 | tuberculosis |  | ok |
| nanuka | 癌 | cancer |  | ok |
| lalala | 麻痺 | paralysis |  | ok |
| kopopa | 死体 | corpse |  | ok |
| limesa | 寿命 | lifespan |  | ok |
| piwisa | 体格 | physique |  | ok |
| nutawa | 体力 | stamina |  | ok |
| tejusa | 入れ歯 | denture |  | ok |
| napeka | 臍 | navel |  | ok |
| mukela | 骸骨 | skeleton |  | ok |
| simipa | 症状 | symptom |  | ok |
| oluka | 内臓 | organ |  | ok Claude【任意】organ は楽器（オルガン）の意味もある。内臓 は viscera/internal organ |
| wutaja | 杭 | stake |  | ok |
| wumuma | ポンプ | pump |  | ok |
| makona | 磁石 | magnet |  | ok |
| ujepa | 制服 | uniform |  | ok |
| leweta | 梃子 | lever |  | ok |
| sanina | サンダル | sandal |  | ok |
| wotula | 担架 | stretcher |  | ok |
| litoka | ライター | lighter |  | ok |
| sapoka | 炭 | charcoal |  | ok |
| tolepa | 罠 | trap |  | ok |
| lipowa | リボン | ribbon |  | ok |
| mikuma | 顕微鏡 | microscope |  | ok |
| kawona | 大砲 | cannon |  | ok |
| sopema | シャベル | shovel |  | ok |
| pepama | ベランダ | veranda |  | ok |
| kakopa | 絨毯 | carpet |  | ok |
| memapa | 膜 | membrane |  | ok |
| pawusa | パスポート | passport |  | ok |
| loketa | ロッカー | locker |  | ok |
| kaseka | 電卓 | calculator |  | ok |
| lajuta | 筏 | raft |  | ok |
| mepupa | 石ころ | pebble |  | ok |
| telota | 体温計 | thermometer |  | ok |
| kepea | クレヨン | crayon |  | ok |
| tetola | 洗剤 | detergent |  | ok |
| nusama | 枠 | frame |  | ok |
| naloka | チョーク | chalk |  | ok |
| wupima | スピーカー | speaker |  | ok |
| jalena | 毛糸 | yarn |  | ok |
| satoma | ストーブ | stove |  | ok |
| pojela | 陶器 | pottery |  | ok |
| powasa | 磁器 | porcelain |  | ok |
| sokasa | 文房具 | stationery |  | ok |
| nilona | ナイロン | nylon |  | ok |
| setewa | ステレオ | stereo |  | ok |
| mikala | マイク | microphone |  | ok |
| toaja | ダイヤル | dial |  | ok |
| nolopa | ゴルフ | golf |  | ok |
| sowupa | サッカー | soccer |  | ok |
| powewa | バレーボール | volleyball |  | ok |
| pajeja | バレエ | ballet |  | ok |
| wipopa | 武器 | weapon |  | ok |
| luteta | 貨物 | freight |  | ok |
| sisewa | 鑿 | chisel |  | ok |
| kesia | 馬車 | carriage |  | ok |
| nenupa | 振り子 | pendulum |  | ok |
| sopawa | 箆 | spatula |  | ok |
| tewesa | 望遠鏡 | telescope |  | ok |
| wupapa | 砂利 | gravel |  | ok |
| janula | 水筒 | canteen |  | ok |
| soseta | 橇 | sled |  | ok |
| jinua | 薪 | firewood |  | ok |
| malewa | 樽 | barrel |  | ok |
| lanoma | 提灯 | lantern |  | ok |
| nunoma | 雪達磨 | snowman |  | ok |
| wakuja | 蝋 | wax |  | ok |
| siwusa | サーカス | circus |  | ok |
| tanema | タンク | tank |  | ok |
| pawaja | パラシュート | parachute |  | ok |
| nukopa | プロペラ | propeller |  | ok |
| jasuka | ヨット | yacht |  | ok |
| lukesa | リュックサック | rucksack |  | ok |
| lakima | 漆 | lacquer |  | ok |
| pesasa | 真鍮 | brass |  | ok |
| mewuka | 水銀 | mercury |  | ok |
| uwuja | 砂時計 | hourglass |  | ok |
| pipesa | 暖炉 | fireplace |  | ok |
| wumopa | 地球儀 | globe |  | ok |
| wetasa | 砥石 | whetstone |  | ok |
| soteja | 雨戸 | shutter |  | ok |
| tewipa | 装置 | device |  | ok |
| monema | 碑 | monument |  | ok |
| wujama | 炎 | flame |  | ok |
| pomaka | 火山 | volcano |  | ok |
| pawoma | 薬局 | pharmacy |  | ok |
| nunata | 泉 | fountain |  | ok Claude【任意】泉 は spring が近いが、spring は 春（supila）が使用中。fountain は噴水（人工）で近似。現状維持でもよい |
| keliwa | 崖 | cliff |  | ok |
| lotusa | 灯台 | lighthouse |  | ok |
| sawapa | 沼 | swamp |  | ok |
| manowa | 屋敷 | mansion |  | ok |
| wiwupa | 渦 | whirlpool |  | ok |
| misita | 霞 | mist |  | ok Claude【任意】霞 は haze が近い（mist は 霧 powa=fog との区別が薄い）。現状維持でもよい |
| sanosa | 砂場 | sandbox |  | ok |
| tetaja | 寄り道 | detour |  | ok |
| nuwuna | 保育園 | nursery |  | ok |
| jupema | スーパー | supermarket |  | ok |
| telija | 領土 | territory |  | ok |
| wowuka | 職場 | workplace |  | ok |
| ojema | 故郷 | homeland |  | ok Claude【任意】故郷 は hometown が自然（未使用）。homeland は 祖国 |
| kawawa | 運河 | canal |  | ok |
| tejeja | 地形 | terrain |  | ok |
| sejita | 霙 | sleet |  | ok |
| mupisa | 微風 | breeze |  | ok |
| walaja | 宮殿 | palace |  | ok |
| jakua | 真空 | vacuum |  | ok |
| womusa | 星座 | constellation |  | ok |
| tolowa | 竜巻 | tornado |  | ok |
| lejema | 貯水池 | reservoir |  | ok |
| mepia | 流れ星 | meteor |  | ok |
| napuma | 農地 | farmland |  | ok |
| waputa | 病室 | ward |  | ok |
| monina | 坊さん | monk |  | ok |
| tapula | 船長 | captain |  | ok |
| kekoa | 天才 | genius |  | ok |
| selowa | 議長 | chairperson |  | ok |
| amata | 素人 | amateur |  | ok |
| pikewa | 掏摸 | pickpocket |  | ok |
| wenula | 画家 | painter |  | ok |
| lopola | 記者 | reporter |  | ok |
| lanila | 家主 | landlord |  | ok |
| mamuma | 人類 | mankind |  | ok |
| popiwa | 政治家 | politician |  | ok |
| kekuwa | 講師 | lecturer |  | ok |
| sejuma | 秘書 | secretary |  | ok |
| memita | メンバー | member |  | ok |
| nupena | 観客 | spectator |  | ok |
| keteka | 刑事 | detective |  | ok |
| wanuwa | 候補 | candidate |  | ok |
| lopesa | 強盗 | robber |  | ok |
| munapa | 職人 | craftsman |  | ok |
| kenawa | 紳士 | gentleman |  | ok |
| kojewa | 知事 | governor |  | ok |
| tiwima | 弟子 | disciple |  | ok |
| totota | 幼児 | toddler |  | ok |
| tasena | 旅客 | passenger |  | ok |
| wetota | ウェートレス | waitress |  | ok |
| wukosa | 検事 | prosecutor |  | ok |
| masama | 仲人 | matchmaker |  | ok |
| kotama | 女神 | goddess |  | ok |
| mojusa | 怪物 | monster |  | ok |
| melipa | 人魚 | mermaid |  | ok |
| pejepa | ベテラン | veteran |  | ok |
| wolasa | 問屋 | wholesaler |  | ok |
| tusila | 宝 | treasure |  | ok |
| wisota | 知恵 | wisdom |  | ok |
| popoka | 群れ | flock |  | ok |
| lupiwa | 速度 | speed |  | ok |
| kitosa | 艶 | gloss |  | ok |
| semila | 化学 | chemistry |  | ok |
| simema | 同情 | sympathy |  | ok |
| somuwa | 合唱 | chorus |  | ok |
| makita | 魔法 | magic |  | ok |
| luawa | 褒美 | reward |  | ok |
| kosowa | 衣装 | costume |  | ok |
| liweka | 家畜 | livestock |  | ok |
| tukiwa | 観光 | tourism |  | ok |
| jopula | 生地 | fabric |  | ok |
| juosa | 月謝 | tuition |  | ok |
| nuapa | 資格 | qualification |  | ok |
| tokema | 書類 | document |  | ok |
| timewa | 時間割り | timetable |  | ok |
| timona | 寸法 | dimension |  | ok |
| pipoja | 繊維 | fiber |  | ok |
| wiasa | 直径 | diameter |  | ok |
| nekena | 伝説 | legend |  | ok |
| kajina | 内閣 | cabinet |  | ok |
| tosesa | ダース | dozen |  | ok |
| tokapa | ドル | dollar |  | ok |
| tijana | 障害 | disability |  | ok Claude【任意】障害 は obstacle/disorder の意味が主。disability は 身体の障害に限る |
| jusipa | 心理 | psychology |  | ok Claude【任意】心理 は mentality/psychological state。psychology は 心理学 |
| munesa | 圧力 | pressure |  | ok |
| temina | 気質 | temperament |  | ok |
| sakawa | 犠牲 | sacrifice |  | ok |
| kipisa | 結晶 | crystal |  | ok |
| jujapa | 工芸 | craft |  | ok |
| samota | 章 | chapter |  | ok |
| tajita | 条約 | treaty |  | ok |
| jutota | 地位 | status |  | ok |
| wusaka | 分数 | fraction |  | ok |
| miaja | 方言 | dialect |  | ok |
| niowa | 暴力 | violence |  | ok |
| kajaja | 目録 | catalog |  | ok |
| lenala | 家賃 | rent |  | ok |
| pesewa | 連合 | federation |  | ok Claude【任意】連合 は union/alliance が近い。federation は 連邦に限る |
| simasa | 音節 | syllable |  | ok |
| tasoma | 課題 | task |  | ok |
| nutoka | 株式 | stock |  | ok |
| mumena | 貨幣 | currency |  | ok |
| nakala | 学部 | faculty |  | ok |
| wusesa | 権威 | prestige |  | ok Claude【任意】権威 は authority が近い（未使用）。prestige は 威信 |
| misosa | 使命 | mission |  | ok |
| motika | 修飾語 | modifier |  | ok |
| namuta | 助詞 | particle |  | ok |
| lewina | 体制 | regime |  | ok |
| pomona | 代名詞 | pronoun |  | ok |
| jikuta | 独裁 | dictatorship |  | ok |
| welata | 福祉 | welfare |  | ok |
| masepa | 傑作 | masterpiece |  | ok |
| wupewa | 光景 | spectacle |  | ok |
| muowa | 定員 | quota |  | ok |
| lawoa | 半径 | radius |  | ok |
| tewona | 分母 | denominator |  | ok |
| losapa | 名簿 | roster |  | ok |
| mopipa | 動機 | motive |  | ok |
| takipa | 関税 | tariff |  | ok |
| jukisa | 危機 | crisis |  | ok |
| pejawa | 刑 | penalty |  | ok |
| kawila | 経歴 | career |  | ok |
| pokana | 語彙 | vocabulary |  | ok |
| numota | 詐欺 | fraud |  | ok |
| pesona | 情熱 | passion |  | ok |
| tinula | 題名 | title |  | ok |
| lutina | 日課 | routine |  | ok |
| wojuta | 文脈 | context |  | ok |
| nuoja | ニュアンス | nuance |  | ok |
| jupia | 官僚 | bureaucrat |  | ok |
| topuja | 海豚 | dolphin |  | ok |
| wiseka | 鼬 | weasel |  | ok |
| mesota | 農薬 | pesticide |  | ok |
| wolona | 花粉 | pollen |  | ok |
| nekapa | 蜜 | nectar |  | ok |
| jetuka | レタス | lettuce |  | ok |
| lotopa | 蓮 | lotus |  | ok |
| wioja | 菫 | violet |  | ok |
| koseja | コスモス | cosmos |  | ok |
| kamoja | 椿 | camellia |  | ok |
| kakiwa | 仙人掌 | cactus |  | ok |
| ponawa | 鰹 | bonito |  | ok |
| nelima | 水母 | jellyfish |  | ok |
| jatuna | 狸 | badger |  | ok |
| leaja | 豹 | leopard |  | ok |
| piwowa | 孔雀 | peacock |  | ok |
| pijala | 雉 | pheasant |  | ok |
| wuteka | 啄木鳥 | woodpecker |  | ok |
| sikota | 鴎 | seagull |  | ok |
| pewiwa | ペリカン | pelican |  | ok |
| sotowa | 鸛 | stork |  | ok |
| nukika | 蟋蟀 | cricket |  | ok |
| matuwa | 蟷螂 | mantis |  | ok |
| sijuwa | 蚕 | silkworm |  | ok |
| jokuna | 繭 | cocoon |  | ok |
| wunela | 蝸牛 | snail |  | ok |
| siposa | スポンジ | sponge |  | ok |
| sinoka | 亜鉛 | zinc |  | ok |
| nitala | 窒素 | nitrogen |  | ok |
| numala | 澱粉 | starch |  | ok |
| nometa | 彗星 | comet |  | ok |
| sawema | 衛星 | satellite |  | ok |
| lomuja | コンパス | compass |  | ok |
| mutepa | 聴診器 | stethoscope |  | ok |
| jusela | パズル | puzzle |  | ok |
| mewala | メダル | medal |  | ok |
| sosila | 槍 | spear |  | ok |
| nekiwa | ネックレス | necklace |  | ok |
| wemuta | チョッキ | vest |  | ok |
| napapa | ナプキン | napkin |  | ok |
| tutoma | 楊枝 | toothpick |  | ok |
| kijuka | 栓抜き | corkscrew |  | ok |
| tewuja | 魔法瓶 | thermos |  | ok |
| sikiwa | 鎌 | sickle |  | ok |
| nukaja | 案山子 | scarecrow |  | ok |
| kisila | 木琴 | xylophone |  | ok |
| mejuwa | メトロノーム | metronome |  | ok |
| matata | マラソン | marathon |  | ok |
| tamama | トランポリン | trampoline |  | ok |
| sepoja | スポットライト | spotlight |  | ok |
| pamowa | パンフレット | pamphlet |  | ok |
| naleja | パレット | palette |  | ok |
| jukewa | スケッチ | sketch |  | ok |
| noseka | モザイク | mosaic |  | ok |
| tamuna | ニス | varnish |  | ok |
| mumasa | 石膏 | plaster |  | ok |
| kiteja | 樋 | gutter |  | ok |
| tejapa | テラス | terrace |  | ok |
| jemuma | テンポ | tempo |  | ok |
| jekuja | レクリエーション | recreation |  | ok |
| kiwuna | カーニバル | carnival |  | ok |
| wawuna | カーネーション | carnation |  | ok |
| kajema | カセット | cassette |  | ok |
| kikita | グライダー | glider |  | ok |
| junopa | クローバー | clover |  | ok |
| jupoka | コロッケ | croquette |  | ok |
| samewa | シャンプー | shampoo |  | ok |
| lukila | スクリーン | screen |  | ok |
| mutiwa | ステーキ | steak |  | ok |
| sijika | ステッカー | sticker |  | ok |
| lutowa | ストップウォッチ | stopwatch |  | ok |
| lumika | スパイク | spike |  | ok Claude【任意】スパイク は spike（釘）と 靴の spikes の2つの意味。文脈で決まる |
| somopa | スモッグ | smog |  | ok |
| tamila | スリル | thrill |  | ok |
| sejela | セルロイド | celluloid |  | ok Claude【任意】celluloid はまれ。セルロイド は日本語でも限られた語（日用品の素材）。現状維持でもよい |
| sewota | セロハン | cellophane |  | ok |
| sosaja | ソーセージ | sausage |  | ok |
| sowesa | ソケット | socket |  | ok |
| minama | ダイナマイト | dynamite |  | ok |
| tijesa | タイプライター | typewriter |  | ok |
| weama | ダイヤモンド | diamond |  | ok |
| tanawa | タンカー | tanker |  | ok |
| sajena | チャンネル | channel |  | ok |
| jamusa | チャンピオン | champion |  | ok |
| simola | チンパンジー | chimpanzee |  | ok |
| jisuma | ディスク | disk |  | ok |
| kesema | デザート | dessert |  | ok |
| nepuna | デフレ | deflation |  | ok |
| tujona | トランジスタ | transistor |  | ok |
| nawupa | バーベキュー | barbecue |  | ok |
| ninipa | パイナップル | pineapple |  | ok |
| jasea | バザー | bazaar |  | ok |
| watusa | バドミントン | badminton |  | ok |
| wanita | バンド | band |  | ok Claude【任意】バンド は band が近いが、英語の band は 楽団・帯・ゴム輪 の複数の意味（ベルト・紐 とも近い）。文脈で決まる |
| miketa | ビーカー | beaker |  | ok |
| ninuwa | ピーナッツ | peanut |  | ok |
| nanepa | ファンファーレ | fanfare |  | ok |
| lusena | ブザー | buzzer |  | ok |
| wumana | プラネタリウム | planetarium |  | ok |
| nenosa | ベンチ | bench |  | ok |
| nopupa | ポップコーン | popcorn |  | ok |
| pimaja | ポマード | pomade |  | ok |
| malisa | マーガリン | margarine |  | ok |
| mamala | マカロニ | macaroni |  | ok |
| majuja | マスコット | mascot |  | ok |
| mapana | マッサージ | massage |  | ok |
| matola | マンホール | manhole |  | ok |
| mamopa | マンモス | mammoth |  | ok |
| motona | モーターボート | motorboat |  | ok |
| mosola | モノレール | monorail |  | ok |
| jokala | ヨーグルト | yogurt |  | ok |
| lasema | レーザー | laser |  | ok |
| latawa | レーダー | radar |  | ok |
| leniwa | レーンコート | raincoat |  | ok |
| lemasa | レモネード | lemonade |  | ok |
| lowua | ロープウェイ | ropeway |  | ok |
| lokaka | ロケット | rocket |  | ok |
| wakoka | ワゴン | wagon |  | ok |
| kojona | 椰子 | coconut |  | ok |
| waliwa | 胡桃 | walnut |  | ok |
| sesama | 胡麻 | sesame |  | ok |
| tinowa | 恐竜 | dinosaur |  | ok |
| mewoa | 隕石 | meteorite |  | ok |
| wumeta | 操り人形 | puppet |  | ok Claude【任意】操り人形 は marionette が近い。puppet は人形全般（toma 人形 と近い） |
| kinola | 銀杏 | ginkgo |  | ok |
| winima | 風車 | windmill |  | ok |
| potija | 粥 | porridge |  | ok |
| lasana | 木苺 | raspberry |  | ok |
| mujipa | 桑 | mulberry |  | ok |
| linosa | 犀 | rhinoceros |  | ok |
| pekowa | 蕎麦 | buckwheat |  | ok Claude【任意】蕎麦 は buckwheat（植物）と soba（麺）の両方。buckwheat は麺の意味を含まない |
| numuja | 団子 | dumpling |  | ok Claude【任意】団子 は dango。dumpling は餃子や小麦の団子も指し、意味が広い |
| jeoma | 牡丹 | peony |  | ok |
| kiwipa | めだか | killifish |  | ok |
| wamapa | 山葵 | wasabi |  | ok |
| muwaka | 蕨 | bracken |  | ok |
| owama | アルミニウム | aluminum |  | ok |
| ojawa | オーケストラ | orchestra |  | ok |
| juteja | スタジオ | studio |  | ok |
| jekata | 浴衣 | yukata |  | ok |
| tamepa | テンプラ | tempura |  | ok |
| wukina | すき焼き | sukiyaki |  | ok |
| ijea | 赤道 | equator |  | ok |
| wajuka | 皮肉 | sarcasm |  | ok |
| semaka | 脚本 | script / screenplay |  | ok |
| wawasa | 軍艦 | warship |  | ok |
| kekana | 乞食 | beggar |  | ok |
| kokima | 子音 | consonant |  | ok |
| pewoka | 動詞 | verb |  | ok |
| kokawa | 接続詞 | conjunction |  | ok |
| junina | ほうれんそう | spinach |  | ok |
| jajupa | 大工 | carpenter |  | ok |
| tawuwa | 短歌 | tanka |  | ok |
| jalila | カーディガン | cardigan |  | ok |
| sonama | ジャングル | jungle |  | ok |
| sewea | スパゲッティー | spaghetti |  | ok |
| tuwewa | ドーナツ | doughnut |  | ok |
| jasita | カスタネット | castanet |  | ok |
| kisoja | カステラ | castella |  | ok |
| jalowa | カルタ | karuta |  | ok |
| nikuja | ジグザグ | zigzag |  | ok |
| naniwa | タラップ | gangway |  | ok |
| wipusa | ビフテキ | beefsteak |  | ok |
| jeleta | ベレー | beret |  | ok |
| janika | ホットケーキ | pancake |  | ok |
| musona | マージャン | mahjong |  | ok |
| mukoka | マント | cloak |  | ok |
| lamena | ラーメン | ramen |  | ok |
| sasola | ランドセル | satchel |  | ok |
| limota | リンパ | lymph |  | ok |
| tonona | 稲妻 | lightning / thunderbolt |  | ok |
| pojowa | 桐 | paulownia |  | ok |
| notaka | 炬燵 | kotatsu |  | ok |
| piwata | 勝利 | victory |  | ok Claude【任意】削除済みの語形 piwata（peasant）の再利用（別の意味） |
| melaja | 商品 | merchandise |  | ok Claude【任意】商品 は既存の kutusa（品物 / goods）・paloa（製品 / product）と近い |
| kewita | 生物 | creature |  | ok |
| sosoma | 腹痛 | stomachache |  | ok |
| tajasa | 歯痛 | toothache |  | ok |
| mojala | 君主 | monarch |  | ok Claude【任意】君主 は既存の kina（王 / king）と近い |
| lujuna | 足音 | footstep |  | ok Claude【任意】削除済みの語形 lujuna（journalist）の再利用（別の意味） |
| netesa | 歩行者 | pedestrian |  | ok |
| wemepa | 墓地 | cemetery |  | ok |
| lusasa | 氷河 | glacier |  | ok |
| nanaja | 渓谷 | canyon |  | ok Claude【任意】渓谷 は既存の tala（谷 / valley）と近い |
| lupoma | 潜水艦 | submarine |  | ok |
| mapoma | 気圧計 | barometer |  | ok |
| kieka | 伝記 | biography |  | ok |
| lapopa | 寓話 | fable |  | ok |
| mimuwa | 交響曲 | symphony |  | ok |
| lolota | 肖像画 | portrait |  | ok |
| kewela | 画廊 | gallery |  | ok |

### verb（335語）

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
| pupito | 飼う | rear | 同じ英語の語: lila | ok |
| onelo | 重なる | overlap |  | ok |
| satako | 重ねる | stack / layer |  | ok |
| ejumo | 切れる | expire / snap |  | ok |
| talupo | 暮れる | darken |  | ok |
| ewuno | 越える | exceed / surpass |  | ok |
| sanelo | 壊れる | shatter / crumble / malfunction |  | ok Claude【任意】壊れるに shatter は強すぎる（粉々になる）。break は puleko が使用中。crumble か malfunction を見出し語に |
| temulo | 下がる | decline |  | ok |
| pakako | 空く | empty | 同じ英語の語: eme | ok |
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
| unilo | 降ろす | unload |  | ok Claude【任意】降ろす は lower/take down が広い。unload は荷を降ろす意味に限る |
| pekano | 招く | beckon / summon |  | ok Claude【任意】招く は invite と重なる（inupo 招待する が invite を持つ）。beckon は手招き |
| lapiso | 改める | revise / reform / amend |  | ok |
| sukumo | 掻く | scratch / scrape |  | ok |
| pumamo | 責める | blame / condemn / reproach |  | ok |
| ejapo | 経つ | elapse |  | ok Claude【任意】elapse はまれ（時が経つ）。pass が自然だが使用中かもしれない。現状維持でもよい |
| pusuko | 弾く | pluck / strum |  | ok Claude【任意】弾く は楽器を弾く（play）が主。strum/pluck は弦楽器に限る |
| jilupo | 憧れる | yearn / aspire |  | ok |
| opato | 溢れる | overflow / brim |  | ok |
| lesepo | 恨む | resent / grudge |  | ok |
| ukupo | 追い出す | expel / oust / evict |  | ok |
| setuto | 落ち着く | settle |  | ok |
| tupono | 溺れる | drown |  | ok |
| alowo | 固まる | harden / solidify / congeal |  | ok |
| minapo | 刻む | mince / chop / carve |  | ok |
| temopo | 崩す | demolish |  | ok |
| sumuwo | 砕く | smash / pulverize |  | ok |
| aseto | 組み立てる | assemble |  | ok |
| sakupo | 汲む | scoop / ladle / dip |  | ok |
| sunolo | 焦げる | scorch / char |  | ok Claude【任意】焦げる（自動詞）に対し scorch は他動詞が主。burn が自然だが使用中の可能性 |
| sipilo | 零す | spill / slop |  | ok |
| lusuto | 錆びる | rust / corrode / tarnish |  | ok |
| sujuo | 絞る | squeeze / wring |  | ok |
| pelamo | 染みる | permeate / seep |  | ok |
| tamuko | 湿る | dampen / moisten |  | ok Claude【任意】湿る（自動詞）に対し dampen/moisten は他動詞。自動詞の damp が近い |
| ikuno | 優れる | excel |  | ok |
| imuso | 迫る | impend / loom |  | ok Claude【任意】impend はまれ。迫る は approach/loom が近い |
| epeo | 備える | equip / furnish |  | ok |
| kuwuto | 耕す | cultivate / plow / till |  | ok |
| salino | 縮む | shrink |  | ok |
| komano | 通じる | communicate |  | ok Claude【任意】通じる は「意味が伝わる・つながる」。communicate は他動詞でもあり、ずれる |
| tetoto | 尽くす | devote / dedicate |  | ok |
| sususo | 躓く | stumble |  | ok |
| anepo | 釣る | angle |  | ok Claude【任意】見出し語 angle は幾何の角度と混同しやすい。fish（動詞）が自然だが tosa（魚）が使用中のため、現状維持でもよい |
| pinato | 綴じる | bind / staple |  | ok |
| koluso | 慰める | console / comfort / soothe |  | ok |
| susalo | 怠ける | slack / shirk / laze |  | ok |
| kupolo | 這う | crawl / creep |  | ok |
| pomito | 吐く | vomit / exhale |  | ok |
| enomo | 励ます | encourage |  | ok |
| sewelo | 膨れる | swell / bulge / inflate |  | ok |
| paloko | 塞ぐ | block / obstruct |  | ok |
| mululo | 殖やす | multiply |  | ok |
| tuleto | 震える | tremble / shiver / shudder / quiver |  | ok |
| eneno | 任せる | entrust / delegate |  | ok |
| imipo | 真似る | imitate / mimic |  | ok |
| lipeno | 実る | ripen / fructify |  | ok |
| waluto | 歪む | warp / distort |  | ok |
| jilato | 譲る | yield / cede |  | ok |
| luseko | 緩む | loosen / slacken |  | ok |
| lamumo | 暴れる | rampage |  | ok Claude【任意】rampage はまれ。暴れる は run wild/rage が近い |
| tetaso | 荒らす | devastate / ravage |  | ok |
| putilo | 炒める | stirfry / saute |  | ok Claude【任意】stirfry は英語の綴りでは stir-fry（ハイフン）。saute を見出し語にするほうが自然 |
| posumo | 威張る | boast / brag / swagger |  | ok Claude【任意】威張る は swagger が近い。boast は 自慢する。見出し語を swagger に（boast, brag は別名） |
| kutono | 唸る | groan / moan / growl / roar |  | ok |
| opono | 追い越す | overtake / outstrip |  | ok |
| kopelo | 治める | govern / reign |  | ok |
| pekuwo | 惜しむ | begrudge |  | ok Claude【任意】惜しむ は regret/spare/cherish に近い。begrudge は「出し渋る」 |
| asolo | 襲う | assault / raid / ambush |  | ok |
| sujiwo | 掻き回す | stir / churn |  | ok |
| siluso | 囀る | chirp / tweet / warble |  | ok |
| numuto | 痺れる | numb / tingle |  | ok |
| kukuko | しゃがむ | crouch / squat |  | ok |
| menupo | 保つ | maintain / preserve |  | ok |
| sujeto | 千切る | shred |  | ok |
| pikalo | 漬ける | pickle / marinate |  | ok |
| mulamo | 呟く | murmur / mutter |  | ok |
| sotupo | 強める | strengthen / intensify / reinforce |  | ok |
| salumo | 研ぐ | sharpen / whet / grind / polish |  | ok |
| pumolo | 長引く | prolong / linger |  | ok Claude【任意】prolong は他動詞。長引く（自動詞）は linger が近い |
| mutupo | 撫でる | stroke / pat / caress |  | ok |
| pujupo | 滲む | blur / ooze / smudge |  | ok Claude【任意】滲む は seep/blur の2つの意味。blur は他動詞が主 |
| kuwalo | 睨む | glare / scowl |  | ok |
| suwawo | 飲み込む | swallow / gulp |  | ok |
| papuko | 吠える | bark / howl |  | ok |
| onuno | 祭る | enshrine / deify |  | ok |
| wututo | 跨ぐ | straddle |  | ok |
| sotalo | 見詰める | stare |  | ok |
| seluno | 見渡す | survey / overlook / scan |  | ok Claude【任意】overlook は「見落とす」の意味もあり逆。別名から外す |
| pumipo | 捲る | flip |  | ok |
| ileno | 儲ける | earn / profiteer |  | ok Claude【任意】儲ける は make a profit。profiteer は不当な利益で否定的。別名から外す |
| wikeno | 弱める | weaken / attenuate |  | ok |
| sileto | 庇う | shield / defend |  | ok |
| okapo | 占める | occupy |  | ok |
| lepano | 弾む | rebound |  | ok Claude【任意】弾む は bounce が近い。rebound は跳ね返る |
| omimo | 省く | omit / exclude / abbreviate |  | ok |
| unono | 引き受ける | undertake |  | ok |
| pelilo | 滅びる | perish |  | ok |
| tipupo | 乱す | disturb / disrupt |  | ok |
| awalo | 申し込む | apply / subscribe |  | ok |
| talano | 訳す | translate |  | ok |
| wolumo | 拝む | worship |  | ok Claude【任意】拝む は pray/worship。worship は 崇拝する の含み |
| solito | 縮める | shorten |  | ok |
| punujo | 跳ねる | bounce |  | ok Claude【任意】跳ねる は bounce と jump の両方に近い。bounce は 弾む と重なる可能性がある（弾む = lepano、見出し語 rebound） |
| leteko | 減らす | reduce |  | ok |
| nesuto | 戻す | restore |  | ok Claude【任意】戻す は put back/return が近い。restore は 復元する |
| ejeto | 堪える | endure |  | ok |
| tilulo | 傾ける | tilt |  | ok |
| punoso | 殴る | punch |  | ok |
| nutuno | もがく | struggle |  | ok |
| tutipo | 漂う | drift |  | ok |
| sowilo | 誓う | swear |  | ok Claude【任意】誓う の swear は「ののしる」の意味もある。vow が近い（未使用なら） |
| amopo | 廃止する | abolish |  | ok |
| ameso | 慎む | abstain |  | ok Claude【任意】慎む は refrain/be careful が近い。abstain は 断つ・棄権する |
| sopio | 甘やかす | spoil |  | ok |
| kotuno | 打ち明ける | confess |  | ok |
| nalato | 物語る | narrate |  | ok |
| iwelo | 受け継ぐ | inherit |  | ok |
| niolo | 犯す | violate |  | ok |
| ponuso | 集中する | concentrate |  | ok |
| wuluwo | 生存する | survive |  | ok |
| titopo | 背く | disobey |  | ok |
| pelono | 属する | belong |  | ok |
| kowulo | 対立する | confront |  | ok Claude【任意】対立する は oppose/conflict が近い。confront は 立ち向かう |
| paliso | 説く | preach |  | ok |
| malaso | 行進する | march |  | ok |
| imoto | 向上する | improve |  | ok |
| kamupo | 作曲する | compose |  | ok |
| ijulo | 視察する | inspect |  | ok |
| pisupo | 処分する | dispose |  | ok |
| epamo | 蒸発する | evaporate |  | ok |
| lesiko | 制限する | restrict |  | ok |
| isujo | 遮る | interrupt |  | ok |
| piloso | 栄える | prosper |  | ok |
| teloko | 仕立てる | tailor |  | ok |
| tesimo | 指定する | designate |  | ok |
| nulito | 出血する | bleed |  | ok |
| emoso | 探検する | explore |  | ok |
| uwito | 団結する | unite |  | ok |
| uwuso | 陳列する | exhibit |  | ok |
| notipo | 告げる | notify |  | ok |
| akeno | 遂げる | accomplish |  | ok |
| ewiko | 同封する | enclose |  | ok |
| tukito | 繁盛する | thrive |  | ok |
| kokuwo | 反する | contradict |  | ok |
| peawo | 振舞う | behave |  | ok |
| puwuwo | 満たす | fulfill |  | ok |
| osuwo | 催す | host |  | ok |
| poseto | 養成する | foster |  | ok Claude【任意】養成する は train が近い（未使用なら）。foster は 育む・助長する |
| letipo | 蘇る | revive |  | ok |
| owuko | 圧迫する | oppress |  | ok Claude【任意】圧迫する は press/compress が近い。oppress は 抑圧する（政治的） |
| asawo | 暗殺する | assassinate |  | ok |
| ijito | 暗示する | hint |  | ok |
| kuojo | 引用する | quote |  | ok |
| sekujo | 確保する | secure |  | ok |
| kenulo | 換算する | convert |  | ok |
| umulo | 鑑賞する | appreciate |  | ok Claude【任意】鑑賞する の appreciate は 感謝する・評価する の意味もある。見出し語は enjoy/view に近い |
| tutamo | 脚色する | dramatize |  | ok |
| emawo | 強調する | emphasize |  | ok |
| talito | 脅迫する | threaten |  | ok |
| peseko | 拒否する | reject |  | ok |
| waleno | 警告する | warn |  | ok |
| putoto | 抗議する | protest |  | ok |
| ekuso | 誇張する | exaggerate | 語幹が同じ: ekuse | ok |
| awoto | 採用する | adopt |  | ok |
| ajono | 収容する | accommodate |  | ok |
| ikepo | 侵略する | invade |  | ok |
| ewopo | 実施する | enforce |  | ok Claude【任意】実施する は implement/carry out が近い。enforce は 法を執行する |
| tetuko | 推理する | deduce |  | ok |
| tekiko | 設計する | design |  | ok |
| ipeso | 設置する | install |  | ok |
| esoto | 設立する | establish |  | ok |
| nekulo | 宣言する | declare |  | ok |
| isopo | 捜査する | investigate |  | ok |
| pukopo | 促進する | promote |  | ok |
| pusono | 提案する | propose |  | ok |
| tisino | 派遣する | dispatch |  | ok |
| lapulo | 反映する | reflect |  | ok |
| letamo | 反撃する | retaliate |  | ok Claude【任意】反撃する は counterattack が近い。retaliate は 報復する |
| kelito | 非難する | criticize |  | ok |
| epowo | 評価する | evaluate |  | ok |
| tepino | 描写する | depict |  | ok |
| anajo | 分析する | analyze |  | ok |
| anino | 予期する | anticipate |  | ok |
| ososo | 連想する | associate |  | ok |
| tumiko | 垂れる | drip |  | ok Claude【任意】垂れる は hang down/drip の2つの意味。drip は しずくが落ちる のみ |
| linuso | 濯ぐ | rinse |  | ok |
| tikumo | 擽る | tickle |  | ok |
| kilino | しがみつく | cling |  | ok |
| pukato | 靡く | flutter |  | ok Claude【任意】靡く は sway/bend が近い。flutter は ひらひらする |
| pusaso | 弾ける | burst |  | ok |
| sunajo | よろける | stagger |  | ok |
| sepupo | 挫く | sprain |  | ok |
| telelo | 脱線する | derail |  | ok |
| tanilo | 縺れる | tangle |  | ok |
| komomo | 弁償する | compensate |  | ok |
| wisuko | 囁く | whisper |  | ok |
| tiloto | 薄める | dilute |  | ok |
| petupo | 裏切る | betray |  | ok |
| lulato | 煽てる | flatter |  | ok |
| wilujo | 萎びる | wilt |  | ok |
| tijuko | 蒸留する | distill |  | ok |
| tiajo | 診断する | diagnose |  | ok |
| etono | 節約する | economize |  | ok |
| kemuto | 妥協する | compromise |  | ok |
| ipawo | 冬眠する | hibernate |  | ok |
| elewo | 噴火する | erupt |  | ok |
| tipoko | 離婚する | divorce |  | ok |
| piputo | 濾す | filter |  | ok |
| siwalo | 群がる | swarm |  | ok |
| ejoko | 爆発する | explode |  | ok |
| esemo | 輸出する | export |  | ok |
| timuno | 貶す | disparage |  | ok |
| likeko | 譬える | liken |  | ok |
| pepulo | 控える | refrain |  | ok |
| lesaso | 響く | resound |  | ok |
| siliko | めぐる | circulate |  | ok |
| onito | 持て成す | entertain |  | ok |
| tinuwo | 装う | disguise |  | ok |
| tepepo | 因る | result / depend | 同じ英語の語: leta | ok |
| tepumo | 奪う | seize / deprive / snatch |  | ok |
| tetemo | 衰える | deteriorate |  | ok |
| imako | 解釈する | interpret |  | ok |
| tiono | 開拓する | pioneer |  | ok |
| oewo | 掲げる | hoist |  | ok |
| lunuko | 区切る | segment / punctuate |  | ok |
| toluwo | 苦しめる | torment |  | ok |
| napiko | 航海する | sail / navigate / voyage |  | ok |
| ijeko | 交差する | intersect |  | ok |
| sinepo | 合成する | synthesize |  | ok |
| awewo | 交替する | alternate |  | ok |
| ejilo | 肯定する | affirm |  | ok |
| ujuko | 催促する | urge |  | ok |
| itamo | 総合する | integrate |  | ok |
| okemo | 操作する | operate |  | ok |
| upemo | 添える | append |  | ok |
| seseto | 脱退する | withdraw / secede |  | ok |
| omaso | 蓄積する | amass |  | ok |
| lipalo | 解放する | liberate |  | ok |
| taseko | 解剖する | dissect |  | ok |
| ojujo | 観測する | observe |  | ok |
| itiso | 指導する | instruct |  | ok |
| iwimo | 干渉する | interfere |  | ok |
| neupo | 中和する | neutralize |  | ok |
| silano | 中傷する | slander |  | ok |
| ototo | 調節する/調整する | adjust |  | ok |
| ulawo | 調和する | harmonize |  | ok |
| peniso | 追放する | banish |  | ok |
| lisiso | 抵抗する | resist |  | ok |
| sipumo | 提出する | submit |  | ok |
| ujipo | 統一する | unify |  | ok |
| ijomo | 投資する | invest |  | ok |
| lekimo | 登録する | register |  | ok |
| mupelo | 取り締まる | regulate / supervise |  | ok |
| oteno | 乗り越える | overcome |  | ok |
| tewuto | 配置する | deploy |  | ok |
| temano | 発揮する | exert / display / demonstrate |  | ok |
| kujaso | 分類する | classify |  | ok |
| etimo | 編集する | edit |  | ok |
| kuawo | 保証する | guarantee |  | ok |
| ikiwo | 無視する | ignore |  | ok |
| lekuko | 見なす | regard |  | ok |
| sapono | 産む | spawn |  | ok Claude【任意】産む に対し spawn は魚・蛙の産卵が主。bear（動詞）は未使用。削除済みの語形 sapono の再利用 |
| tuwelo | 暮らす | dwell |  | ok Claude【任意】暮らす は既存の lipo（住む / live）と近い。dwell は文語的 |
| lotuko | 泊まる | lodge |  | ok |
| isewo | 上る | ascend |  | ok Claude【任意】上る は既存の kimo（登る / climb）と近い（上る は上へ行く一般の語） |
| kunuwo | 潤す | quench |  | ok |
| matulo | 育つ | mature |  | ok Claude【任意】育つ は既存の kulo（成長する / grow）と近い。mature は「成熟する」 |
| saputo | 抑える | suppress |  | ok Claude【任意】抑える に対し suppress は「抑圧する・鎮圧する」で強い |
| pujowo | 動かす | propel |  | ok Claude【任意】propel は「推進する」で、動かす（mujo = 動く の他動詞）とずれる |
| pololo | 映す | project | 同じ英語の語: puposa | ok Claude【任意】映す（姿・映像を映す）は reflect か project。既存の lapulo（反映する / reflect）と近い |
| mumuno | 悲しむ | mourn |  | ok Claude【任意】悲しむ に対し mourn は「死を悼む」で狭い。grieve は未使用 |
| kumimo | 煌めく | glimmer |  | ok Claude【任意】煌めく は既存の sipo（輝く / shine）と近い（煌めく は sparkle / twinkle） |
| wanumo | 彷徨う | wander |  | ok |
| lutuso | 散策する | stroll |  | ok |
| puwiko | 瞬く | blink |  | ok |
| kusajo | 擦り下ろす | grate |  | ok |
| kalulo | 計算する | calculate |  | ok |
| pujio | 禁じる | prohibit |  | ok |
| kopapo | 協力する | collaborate |  | ok |
| potuto | 延期する | postpone |  | ok |
| tolemo | 我慢する | tolerate |  | ok Claude【任意】我慢する は既存の ejeto（堪える / endure）と近い |
| sitimo | 刺激する | stimulate |  | ok |
| etajo | 消火する | extinguish |  | ok |
| lenoko | 改修する | renovate |  | ok |
| nulaso | 養う | nourish |  | ok Claude【任意】養う（扶養する・育てる）に対し nourish は「栄養を与える」で少しずれる |
| pasipo | 魅了する | fascinate |  | ok |
| lewono | 和解する | reconcile |  | ok |
| sepoko | 窒息する | suffocate |  | ok |
| lepojo | 反響する | reverberate |  | ok |
| tiwujo | 散開する | disperse |  | ok Claude【任意】散開する は既存の sakato（散る / scatter）と近い（散開 は群れが散らばる） |
| nupumo | 水没する | submerge |  | ok |
| siniso | 同調する | synchronize |  | ok |
| kotemo | 記念する | commemorate |  | ok |

### adj（155語）

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
| ateke | 憎い/憎らしい | hateful / odious / detestable |  | ok |
| soiwe | めでたい | joyful / joyous / auspicious |  | ok |
| unele | 無理な | unreasonable / excessive |  | ok |
| nosute | 懐かしい | nostalgic |  | ok |
| pumase | 派手な | flashy / gaudy / showy |  | ok |
| sopepe | 地味な | sober / subdued |  | ok Claude【任意】地味な は plain が自然（使用中の可能性）。sober も可 |
| tikule | くすぐったい | ticklish |  | ok |
| opeme | 素直な | obedient |  | ok Claude【任意】素直な は honest/docile。obedient は「従順」で近い |
| pukane | 率直な | frank / candid / straightforward |  | ok |
| kalote | 暢気な | carefree / easygoing |  | ok |
| silune | 朗らかな | cheerful / merry / sunny |  | ok |
| tasule | 眩しい | dazzling / glaring |  | ok |
| ukune | 醜い | ugly / unsightly / hideous |  | ok |
| wasuke | 勿体ない | wasteful |  | ok Claude【任意】勿体ない は「無駄で惜しい」。wasteful は無駄遣いをする性質を指し、ずれる |
| pukite | 脆い | brittle / fragile / frail |  | ok |
| apone | 豊かな | abundant / plentiful / affluent |  | ok |
| susume | 怪しい | suspicious / dubious / fishy |  | ok |
| ewute | 慌ただしい | hectic / hurried |  | ok |
| unoke | 意外な | unexpected / surprising |  | ok |
| amune | 異常な | abnormal / unusual |  | ok |
| koake | 臆病な | cowardly / timid |  | ok |
| penote | 幽かな | faint / dim / vague |  | ok |
| lopete | 可愛らしい | lovely / adorable |  | ok |
| katue | 気軽な | casual / lighthearted |  | ok |
| kutame | 窮屈な | cramped |  | ok |
| putuke | 下品な | vulgar / coarse / indecent |  | ok |
| samoke | 煙い | smoky |  | ok |
| sutine | 険しい | steep / rugged / grim |  | ok |
| salape | 塩辛い | salty / briny |  | ok |
| pelase | しつこい | persistent / insistent / tenacious |  | ok |
| lenone | 名高い | renowned / celebrated |  | ok |
| tutane | 長閑な | tranquil / idyllic / peaceful |  | ok |
| imule | 待ち遠しい | impatient |  | ok Claude【任意】待ち遠しい は eagerly awaited。impatient は「いらいらして待てない」で、否定的な響き |
| tuleme | 物凄い | tremendous / terrific / horrendous |  | ok |
| ekoe | 等しい | equal |  | ok |
| akipe | 素早い | agile |  | ok Claude【任意】素早い は、既存の pasute（速い、fast|quick）と近い。agile は 敏捷。現状維持でもよい |
| sameme | みっともない | shameful |  | ok Claude【任意】みっともない は unseemly/unsightly が近い。shameful は 恥ずべき |
| tilipe | 勤勉な | diligent |  | ok |
| polute | 正式な | formal |  | ok |
| kalile | そそっかしい | careless |  | ok Claude【任意】そそっかしい は hasty/rash が近い。careless は 不注意な |
| ikose | 無邪気な | innocent |  | ok |
| tukupe | 面倒臭い | troublesome |  | ok |
| pilule | 猛烈な | fierce |  | ok |
| alame | 有害な | harmful |  | ok |
| isune | 有力な | influential |  | ok |
| silote | 幼稚な | childish |  | ok |
| lasune | 合理的な | rational |  | ok Claude【任意】合理的な と lokike（論理的な、logical）は近い。rational と logical は区別が薄い |
| pasape | 消極的な | passive |  | ok Claude【任意】消極的な は negative/reluctant が近い。passive は 受け身の |
| puwute | 慎重な | prudent |  | ok |
| sinuse | 誠実な | sincere |  | ok |
| sulome | だらしない | sloppy |  | ok |
| senese | 敏感な | sensitive |  | ok |
| palipe | 有効な | valid |  | ok |
| atale | 有利な | advantageous |  | ok |
| lemale | 著しい | remarkable |  | ok |
| esume | 甚だしい | extreme |  | ok |
| misepe | 惨めな | miserable |  | ok |
| tokuse | 有毒な | toxic |  | ok |
| tupase | 急激な | drastic |  | ok |
| kukule | 残酷な | cruel |  | ok |
| pekuke | 独特な | peculiar |  | ok Claude【任意】独特な は unique が近い。peculiar は「変な」の含み |
| kutupe | 頑固な | stubborn |  | ok |
| opuke | 客観的な | objective |  | ok |
| wolese | 健全な | wholesome |  | ok |
| kukase | 淑やかな | graceful |  | ok Claude【任意】淑やかな は demure が近い。graceful は 優雅な |
| suwuse | 主観的な | subjective |  | ok |
| polope | 大胆な | bold |  | ok |
| petepe | 忠実な | faithful |  | ok |
| kupume | 無器用な | clumsy |  | ok |
| metie | 平凡な | mediocre |  | ok Claude【任意】平凡な は ordinary（nome が使用中）。mediocre は「並以下」の含み |
| peneme | 有益な | beneficial |  | ok |
| ulume | 緊急な | urgent |  | ok |
| polise | 軽快な | brisk |  | ok Claude【任意】軽快な は light/nimble が近い。brisk は「きびきびした・活発な」 |
| ikene | 巧妙な | ingenious |  | ok |
| lukuse | 豪華な | luxurious |  | ok |
| supale | しなやかな | supple |  | ok |
| ikake | 先天的な | innate |  | ok |
| monote | 単調な | monotonous |  | ok |
| anule | 適切な | appropriate |  | ok |
| tulike | 悲惨な | tragic |  | ok Claude【任意】悲惨な は、misepe（惨めな、miserable）と意味が近い。tragic は 悲劇的な |
| supone | 微妙な | subtle |  | ok |
| okie | 明白な | obvious |  | ok |
| komeke | 有能な | competent |  | ok |
| ikuwe | 冷淡な | indifferent |  | ok |
| lokike | 論理的な | logical |  | ok |
| komime | 滑稽な | comical |  | ok |
| muluke | だるい | sluggish |  | ok |
| ilele | 不規則な | irregular |  | ok |
| nimuke | すばしっこい | nimble |  | ok Claude【任意】すばしっこい は、akipe（素早い）と意味が近い。nimble と agile の差は小さい |
| solene | 厳かな | solemn |  | ok |
| sumime | けちな | stingy |  | ok |
| anake | 古代の | ancient |  | ok |
| oline | 水平な | horizontal |  | ok |
| metape | 中世の | medieval |  | ok |
| pakupe | 照れ臭い | bashful |  | ok Claude【任意】照れ臭い は embarrassed/shy が近い。bashful は「恥ずかしがりの」性質 |
| motele | 近代の | modern |  | ok |
| temute | 臨時の | temporary |  | ok |
| pelete | 永久の | permanent |  | ok |
| malike | 意地悪な | nasty / malicious |  | ok |
| nekume | 疎かな | negligent |  | ok |
| koluke | 強引な | forceful / pushy / coercive |  | ok |
| tesile | 好ましい | desirable |  | ok |
| kelute | 粗末な | shabby |  | ok |
| imope | 図図しい | impudent |  | ok |
| lekite | 正当な | legitimate |  | ok |
| lelue | 頼もしい | reliable |  | ok |
| komone | 当たり前の | commonplace |  | ok Claude【任意】commonplace は「ありふれた」で、既存の nome（普通の / ordinary）に近い。当たり前の（当然の）とはずれる |
| tolite | 恐ろしい | dreadful |  | ok |
| ijuje | 間接的な | indirect |  | ok |
| sukene | 急な | sudden |  | ok Claude【任意】急な は既存の ulume（緊急な）と近い（急な = sudden、緊急 = urgent） |
| ujute | 不幸な | unfortunate |  | ok |
| pipime | 鮮やかな | vivid |  | ok |
| kunuke | 鬱陶しい | gloomy |  | ok |
| sanite | 衛生的な | sanitary |  | ok |
| itepe | 幼い | infantile |  | ok Claude【任意】infantile は「幼稚な」で、既存の silote（幼稚な / childish）と近い。幼い は young・little |
| manupe | 男らしい | manly |  | ok |
| womane | 女らしい | womanly |  | ok Claude【任意】womanly は古風。feminine（未使用）が自然 |
| pikole | 活発な | vigorous |  | ok |
| sukope | 器用な | skillful |  | ok Claude【任意】削除済みの語形 sukope（skillful 巧みな）の再利用。器用な は既存の sukile（上手な / skilled）とも近い |
| konune | 具体的な | concrete | 同じ英語の語: kuneka | ok |
| esone | 経済的な | economic |  | ok Claude【任意】経済的な は「安上がりな」の意味が主（economical）。economic は「経済の」 |
| papote | 好調な | favorable |  | ok Claude【任意】favorable は「好意的な・好都合な」で、好調な（調子がよい）とずれる |
| elowe | 心細い | uneasy / forlorn |  |  |
| polame | 幸いな | fortunate |  | ok |
| pumupe | 質素な | frugal |  | ok Claude【任意】質素な は simple / modest。frugal は「倹約な」 |
| tamupe | 湿っぽい | damp |  | ok |
| akese | 積極的な | active |  | ok |
| iwote | 知的な | intellectual |  | ok |
| apawe | 抽象的な | abstract |  | ok |
| aneme | 手軽な | handy |  | ok |
| alene | 和やかな | harmonious |  | ok |
| kopute | 情け深い | compassionate |  | ok |
| punune | 鈍い | blunt |  | ok Claude【任意】blunt は「刃が鈍い・ぶっきらぼうな」で、鈍い（動きが鈍い）とは一部だけ合う |
| awuwe | 馬鹿げた | absurd |  | ok |
| umuse | 不公平な | unfair |  | ok |
| isase | 不十分な | insufficient |  | ok |
| utuje | 不親切な | unkind |  | ok |
| uwape | 不愉快な | unpleasant |  | ok |
| minine | 無意味な | meaningless |  | ok |
| iwipe | 無限の | infinite |  | ok |
| lekape | 無茶な | reckless |  | ok |
| jutune | 若々しい | youthful |  | ok |

### adv（23語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| lepipi | たびたび | repeatedly |  | ok |
| initi | ますます | increasingly |  | ok |
| ituti | なるほど | indeed |  | ok |
| kalali | うっかり | carelessly |  | ok |
| pulemi | なるべく | preferably |  | ok |
| puluni | なお | furthermore |  | ok Claude【任意】なお は接続詞に近い（furthermore）。接続詞は機能語のため Claude/M1ko の設計 |
| nameli | つまり | namely / briefly / shortly |  | ok Claude【任意】つまり は接続詞に近い（namely）。接続詞は機能語のため Claude/M1ko の設計 |
| menuli | 主に | mainly / chiefly / primarily / mostly |  | ok |
| pupomi | 早速 | promptly / forthwith |  | ok |
| oiti | 暫く | awhile / temporarily |  | ok Claude【任意】暫く は for a while。temporarily（一時的に）は別の語。別名から外す |
| akasi | 偶然 | accidentally / coincidentally |  | ok |
| sekuli | こっそり | secretly / stealthily / sneakily |  | ok |
| inesi | 忽ち | instantly |  | ok |
| konuki | 絶えず | constantly / continually / ceaselessly |  | ok |
| otomi | 独りでに | automatically / spontaneously |  | ok |
| laleti | 滅多に | rarely / seldom |  | ok |
| sulili | ずる賢く | slyly |  | ok |
| uji | 高く | high / highly | 同じ英語の語: ile | ok |
| tonesi | 階下で | downstairs |  | ok |
| inami | 屋内で | indoors |  | ok |
| asiti | 脇に | aside |  | ok |
| polepi | 永遠に | forever |  | ok |
| sopei | 何とかして | somehow |  | ok |

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

