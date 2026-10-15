# 追加語の確認表

`tools/make_review.py` で生成。気になる語は、Logi の語を挙げて「音」「日本語の意味」「英語」のどれを直したいか教えてください。
確認の状況は `dictionary/word_review.csv` の status（draft / ok / fix）と note に書きます。

「手がかり」は、見直しの優先度を決めるための目安です。
- 語幹が同じ: 語尾の1文字だけが違う、別の品詞の語（例: `kuka` 名詞と `kuko` 動詞）。同じ英語の別品詞なら意図した組です。そうでなければ偶然の一致なので、見分けにくくないか見てください
- 同じ英語の語: 同じ英語の訳を持つ、別の語（同義語の候補）

確認済み(ok): 0 / 要修正(fix): 0 / 未確認(draft): 1047

## v0.7 英検3級レベルの語（487語）

### noun（271語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| atupa | 大人 | adult |  |  |
| onupa | おば | aunt |  |  |
| kusina | いとこ | cousin |  |  |
| silupa | 子供 | child |  |  |
| totela | 娘 | daughter |  |  |
| pamipa | 家族 | family |  |  |
| kuluna | 孫 | grandchild |  |  |
| kupana | 祖父 | grandfather |  |  |
| kilana | 祖母 | grandmother |  |  |
| mata | 男性 | man | 語幹が同じ: mato |  |
| palepa | 親 | parent |  |  |
| paluma | 相棒 | partner |  |  |
| sona | 息子 | son |  |  |
| unuka | おじ | uncle |  |  |
| juwa | 若者 | youth |  |  |
| kulepa | 同級生 | classmate |  |  |
| koleka | 単科大学 | college |  |  |
| tikupa | 辞書 | dictionary |  |  |
| etuma | 教育 | education |  |  |
| ekuka | 試験 | exam |  |  |
| kutata | 学年 | grade |  |  |
| jima | 体育館 | gym |  |  |
| omua | 宿題 | homework |  |  |
| lanua | 言語 | language |  |  |
| notepa | ノート | notebook |  |  |
| pupina | 校長 | principal |  |  |
| sumusa | 教科 | subject |  |  |
| unipa | 大学 | university |  |  |
| akuwa | 俳優 | actor |  |  |
| aketa | 女優 | actress |  |  |
| pakela | パン屋 | baker |  |  |
| kupela | 店員 | clerk |  |  |
| kuka | 料理人 | cook | 語幹が同じ: kuke, kuko |  |
| tenuta | 歯医者 | dentist |  |  |
| tulapa | 運転手 | driver |  |  |
| enina | 技術者 | engineer |  |  |
| palita | 農家 | farmer |  |  |
| kuiwa | 案内人 | guide | 同じ英語の語: lito |  |
| manaka | 経営者 | manager |  |  |
| nulusa | 看護師 | nurse |  |  |
| opapa | 役人 | officer |  |  |
| piloka | パイロット | pilot |  |  |
| putesa | 社長 | president |  |  |
| sinela | 歌手 | singer |  |  |
| wolupa | 労働者 | worker |  |  |
| litela | 作家 | writer |  |  |
| papa | 風呂 | bath | 語幹が同じ: pape, papo |  |
| patuta | 浴室 | bathroom |  |  |
| petula | 寝室 | bedroom |  |  |
| tesuka | 机 | desk |  |  |
| pupula | 床 | floor |  |  |
| usa | 家 | house | 語幹が同じ: use |  |
| kisena | 台所 | kitchen |  |  |
| laita | 光 | light | 語幹が同じ: laite |  |
| masina | 機械 | machine |  |  |
| makasa | 雑誌 | magazine |  |  |
| mopa | お金 | money |  |  |
| nusupa | 新聞 | newspaper |  |  |
| lapia | ラジオ | radio |  |  |
| lepula | 冷蔵庫 | refrigerator / fridge |  |  |
| luka | 屋根 | roof |  |  |
| luma | 部屋 | room |  |  |
| topa | タオル | towel | 語幹が同じ: topo |  |
| umuta | 傘 | umbrella |  |  |
| wala | 壁 | wall |  |  |
| pima | 牛肉 | beef | 語幹が同じ: pimo |  |
| putika | 朝食 | breakfast |  |  |
| putola | バター | butter |  |  |
| sikena | 鶏肉 | chicken |  |  |
| tinepa | 夕食 | dinner |  |  |
| lunusa | 昼食 | lunch |  |  |
| olana | オレンジ | orange | 同じ英語の語: olae |  |
| polapa | 豚肉 | pork |  |  |
| potata | じゃがいも | potato |  |  |
| sanupa | サンドイッチ | sandwich |  |  |
| suma | スープ | soup | 語幹が同じ: sumo |  |
| tomata | トマト | tomato |  |  |
| piwa | 熊 | bear | 語幹が同じ: piwo |  |
| kola | 牛 | cow | 語幹が同じ: kole, kolo |  |
| iluna | 地球 | earth |  |  |
| eleka | 象 | elephant |  |  |
| oluwa | 馬 | horse |  |  |
| lika | 葉 | leaf | 語幹が同じ: like, liko |  |
| monuka | 猿 | monkey |  |  |
| natula | 自然 | nature |  |  |
| pija | 豚 | pig | 語幹が同じ: pijo |  |
| putana | 植物 | plant | 語幹が同じ: putano |  |
| lapata | ウサギ | rabbit |  |  |
| sika | 羊 | sheep | 語幹が同じ: sike |  |
| tikela | トラ | tiger |  |  |
| wupa | 木材 | wood |  |  |
| paseta | 野球 | baseball |  |  |
| pasaka | バスケットボール | basketball |  |  |
| pupa | 本 | book | 語幹が同じ: pupe, pupo |  |
| kamuka | キャンプ | camp |  |  |
| komika | 漫画 | comic |  |  |
| konusa | コンサート | concert |  |  |
| juita | ギター | guitar |  |  |
| opa | 趣味 | hobby | 語幹が同じ: opi, opo |  |
| maka | 試合 | match |  |  |
| niana | ピアノ | piano |  |  |
| puma | プール | pool | 語幹が同じ: pumo |  |
| soma | 歌 | song | 語幹が同じ: some, somi |  |
| tenisa | テニス | tennis |  |  |
| tikata | 切符 | ticket |  |  |
| toa | おもちゃ | toy |  |  |
| tupipa | 旅行 | trip |  |  |
| titea | ビデオ | video |  |  |
| pisika | 自転車 | bicycle / bike |  |  |
| pumita | 橋 | bridge |  |  |
| nuila | 建物 | building |  |  |
| puwa | バス | bus | 語幹が同じ: puwo |  |
| sima | 都市 | city | 語幹が同じ: sime, simo |  |
| koluma | 角 | corner |  |  |
| mulita | フライト | flight |  |  |
| pupaka | 場所 | place | 同じ英語の語: puto |  |
| palana | 飛行機 | plane / airplane |  |  |
| loka | 道路 | road | 語幹が同じ: loke, loko |  |
| sutala | 通り | street |  |  |
| takuta | タクシー | taxi |  |  |
| tona | 町 | town |  |  |
| tuloka | トラック | truck |  |  |
| pilama | 村 | village |  |  |
| suna | 動物園 | zoo | 語幹が同じ: suni, suno |  |
| apuja | 午後 | afternoon |  |  |
| senuka | 世紀 | century |  |  |
| otuna | 秋 | autumn / fall | 同じ英語の語: pao |  |
| olima | 休日 | holiday |  |  |
| ula | 時間（60分） | hour | 語幹が同じ: ulo |  |
| monata | 月（暦） | month |  |  |
| sisona | 季節 | season |  |  |
| sekopa | 秒 | second |  |  |
| supila | 春 | spring |  |  |
| sumela | 夏 | summer |  |  |
| pakapa | 休暇 | vacation |  |  |
| wikepa | 週末 | weekend |  |  |
| winapa | 冬 | winter |  |  |
| moputa | 月曜日 | monday |  |  |
| tusuma | 火曜日 | tuesday |  |  |
| wetuna | 水曜日 | wednesday |  |  |
| tupusa | 木曜日 | thursday |  |  |
| pukipa | 金曜日 | friday |  |  |
| satuka | 土曜日 | saturday |  |  |
| sunuta | 日曜日 | sunday |  |  |
| kupota | 群衆 | crowd |  |  |
| mulana | 惑星 | planet |  |  |
| aka | 年齢 | age | 語幹が同じ: aki, ako |  |
| pomuta | 港 | port |  |  |
| selina | 天井 | ceiling |  |  |
| sukita | 技術 | skill |  |  |
| tutasa | ごみ | trash |  |  |
| kalupa | カート | cart |  |  |
| sama | 影 | shadow |  |  |
| kutopa | 押し入れ | closet |  |  |
| pumapa | 枝 | branch |  |  |
| sekusa | 部門 | section |  |  |
| pukama | ホーム | platform |  |  |
| kaka | 洞窟 | cave | 語幹が同じ: kako |  |
| itema | 品目 | item |  |  |
| tutuna | トーナメント | tournament |  |  |
| mitula | 真ん中 | middle |  |  |
| nesuma | 巣 | nest |  |  |
| komuna | くし | comb |  |  |
| satela | 階段 | stair / stairs |  |  |
| ema | 英雄 | hero | 語幹が同じ: eme |  |
| pawa | 眺め | view |  |  |
| kasuma | 城 | castle |  |  |
| sowa | シャワー | shower |  |  |
| kapita | 首都 | capital |  |  |
| sasa | 日陰 | shade | 語幹が同じ: saso |  |
| pesupa | 祭り | festival |  |  |
| pilusa | 野原 | field |  |  |
| latepa | はしご | ladder |  |  |
| anala | アパート | apartment |  |  |
| pelika | 値段 | price |  |  |
| kukuta | 文化 | culture |  |  |
| kelopa | 手袋 | glove |  |  |
| simuta | 象徴 | symbol |  |  |
| polina | ボランティア | volunteer |  |  |
| emoka | 感情 | emotion |  |  |
| enuwa | 入り口 | entrance |  |  |
| akika | 事故 | accident |  |  |
| tuwina | 双子 | twin |  |  |
| kama | かご | cage |  |  |
| siwa | 種 | seed | 語幹が同じ: siwo |  |
| kukaka | 勇気 | courage |  |  |
| itasa | 頭痛 | headache |  |  |
| neta | おい | nephew | 語幹が同じ: nete |  |
| kusuka | 習慣 | custom |  |  |
| punasa | 風味 | flavor |  |  |
| kana | 門 | gate | 語幹が同じ: kani |  |
| inopa | 情報 | information |  |  |
| sonula | 日の出 | sunrise |  |  |
| kesapa | 身ぶり | gesture |  |  |
| soja | 仕事 | job |  |  |
| suwipa | セーター | sweater |  |  |
| kenepa | 世代 | generation |  |  |
| sunisa | 日光 | sunshine |  |  |
| kawa | 場合 | case |  |  |
| pakuka | 事実 | fact |  |  |
| kumipa | 気候 | climate |  |  |
| supata | 像 | statue |  |  |
| pikula | 数字 | figure |  |  |
| kaja | ガス | gas |  |  |
| sisala | はさみ | scissors |  |  |
| lima | リーグ | league | 語幹が同じ: limo |  |
| paja | なべ | pan |  |  |
| sikuka | 看板 | sign | 語幹が同じ: sikuko |  |
| meoka | 市長 | mayor |  |  |
| nopa | メモ | note | 語幹が同じ: nopo |  |
| moteta | 模型 | model |  |  |
| koja | 原因 | cause | 同じ英語の語: koso |  |
| sulika | 神社 | shrine |  |  |
| tusata | ほこり | dust |  |  |
| kosupa | 海岸 | coast |  |  |
| sopusa | はし | chopsticks |  |  |
| tita | ダイエット | diet | 語幹が同じ: tite, tito |  |
| tepala | 部署 | department |  |  |
| iwa | 幹線道路 | highway |  |  |
| talata | 伝統 | tradition |  |  |
| pakota | 工場 | factory |  |  |
| ika | 熱 | heat | 語幹が同じ: iko |  |
| temupa | 温度 | temperature |  |  |
| pema | 痛み | pain |  |  |
| lesuna | 休憩 | rest | 語幹が同じ: lesuno |  |
| pewa | 湾 | bay |  |  |
| setupa | 予定 | schedule |  |  |
| tesela | 砂漠 | desert |  |  |
| kaleta | 生ごみ | garbage |  |  |
| metisa | 薬 | medicine |  |  |
| ekesa | 経験 | experience |  |  |
| awea | 水族館 | aquarium |  |  |
| puja | 子犬 | puppy |  |  |
| mipa | 食事 | meal | 語幹が同じ: mipu |  |
| mimia | 百万 | million |  |  |
| komapa | 会社 | company |  |  |
| kalika | 車庫 | garage |  |  |
| pukusa | 小銭入れ | purse |  |  |
| pejia | 期間 | period |  |  |
| waleka | 財布 | wallet |  |  |
| pepela | 発熱 | fever |  |  |
| pulomisa | 約束 | promise | 語幹が同じ: pulomiso |  |
| nopela | 小説 | novel |  |  |
| puposa | 企画 | project |  |  |
| ola | 穴 | hole | 語幹が同じ: ole, olo |  |
| mesaka | 伝言 | message |  |  |
| potoma | 底 | bottom |  |  |
| sekala | 秘密 | secret |  |  |
| esa | 高さ | height |  |  |
| inata | 面接 | interview |  |  |
| pamula | 戦い | battle |  |  |
| otipa | 観衆 | audience |  |  |
| lesola | リゾート | resort |  |  |
| oala | 賞 | award |  |  |
| lola | 役割 | role | 語幹が同じ: lole, lolo |  |
| atama | 住所 | address |  |  |
| pusisa | 楽しみ | pleasure |  |  |
| koneta | 大陸 | continent |  |  |
| atena | 助言 | advice |  |  |
| lesipa | レシピ | recipe |  |  |
| ijuta | 地震 | earthquake |  |  |
| ipeja | 天国 | heaven |  |  |
| teluma | ターミナル | terminal |  |  |
| lisepa | 免許 | license |  |  |
| wetipa | 結婚式 | wedding |  |  |
| ilapa | 健康 | health |  |  |
| lulisa | 賞品 | prize |  |  |
| tipa | 涙 | tear | 語幹が同じ: tipe, tipo |  |
| kumoka | 作物 | crop |  |  |
| konipa | 便利 | convenience |  |  |
| nika | めい | niece |  |  |

### verb（88語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| puluso | 磨く | brush |  |  |
| kuko | 料理する | cook | 語幹が同じ: kuka, kuke |  |
| pulino | 持ってくる | bring |  |  |
| olako | 保持する | hold |  |  |
| kuleno | 掃除する | clean | 語幹が同じ: kulene |  |
| puo | 買う | buy | 語幹が同じ: pue |  |
| tiwo | 描く | draw |  |  |
| tuluno | 曲がる | turn |  |  |
| liluno | 学ぶ | learn |  |  |
| sutuko | 勉強する | study |  |  |
| putako | 練習する | practice |  |  |
| enuso | 楽しむ | enjoy |  |  |
| nijo | 必要とする | need |  |  |
| wuwo | 心配する | worry |  |  |
| suluto | 驚かせる | surprise |  |  |
| sumilo | 微笑む | smile |  |  |
| anuso | 答える | answer | 語幹が同じ: anusa |  |
| inupo | 招待する | invite |  |  |
| mowo | 見せる | show |  |  |
| tanako | 感謝する | thank |  |  |
| pekomo | 成る | become |  |  |
| puimo | 建てる | build |  |  |
| alimo | 到着する | arrive |  |  |
| mujo | 動く | move |  |  |
| letulo | 戻る | return |  |  |
| sipo | 輝く | shine | 語幹が同じ: sipa, sipe |  |
| konupo | 続ける | continue |  |  |
| esako | 逃げる | escape |  |  |
| masuto | 習得する | master | 語幹が同じ: masuta |  |
| unuto | 狩る | hunt |  |  |
| pupeso | 押しつける | press |  |  |
| tamapo | 損なう | damage |  |  |
| kanuko | 取り消す | cancel |  |  |
| pupo | 吹く | blow | 語幹が同じ: pupa, pupe |  |
| lelako | くつろぐ | relax |  |  |
| opepo | 提供する | offer |  |  |
| kolepo | 集める | collect |  |  |
| ipo | 隠す | hide | 語幹が同じ: ipa, ipe |  |
| tukuso | 信頼する | trust | 語幹が同じ: tukusa |  |
| ekuto | 交換する | exchange |  |  |
| soko | ショックを与える | shock | 語幹が同じ: soka |  |
| ineto | 紹介する | introduce |  |  |
| sutiso | 述べる | state |  |  |
| suko | 煮込む | stew | 語幹が同じ: suka, suke |  |
| atemo | 出席する | attend |  |  |
| amo | 嫌う | hate | 語幹が同じ: ama |  |
| limo | 昇る | rise | 語幹が同じ: lima |  |
| akito | 行動する | act |  |  |
| jawo | 焼く | bake |  |  |
| sumo | 撃つ | shoot | 語幹が同じ: suma |  |
| wasupo | 無駄にする | waste | 語幹が同じ: wasupa |  |
| tupapo | 旅行する | travel |  |  |
| peluto | 演じる | perform |  |  |
| tuwiso | ひねる | twist |  |  |
| polupo | 乗り込む | board | 語幹が同じ: polupa |  |
| kupato | 卒業する | graduate |  |  |
| souno | 聞こえる | sound | 語幹が同じ: souna |  |
| jejo | 確認する | check |  |  |
| putepo | 準備する | prepare |  |  |
| atuno | 助言する | advise |  |  |
| ano | 加える | add | 語幹が同じ: ana, ane |  |
| kulupo | 横切る | cross |  |  |
| maluko | 印をつける | mark | 語幹が同じ: maluka |  |
| soluko | 解決する | solve |  |  |
| leto | 上げる | raise | 語幹が同じ: leta, lete, leti |  |
| miso | 恋しく思う | miss | 語幹が同じ: misa, misu |  |
| sumoko | 喫煙する | smoke | 語幹が同じ: sumoka |  |
| sikuko | 署名する | sign | 語幹が同じ: sikuka |  |
| lenuto | 貸す | lend |  |  |
| pimo | 合う | fit | 語幹が同じ: pima |  |
| selepo | 祝う | celebrate |  |  |
| siwo | 元気づける | cheer | 語幹が同じ: siwa |  |
| pupuno | 燃える | burn |  |  |
| putano | 植える | plant | 語幹が同じ: putana |  |
| kowo | 恐れる | fear | 語幹が同じ: kowa |  |
| popo | 借りる | borrow | 語幹が同じ: popa, pope |  |
| poiwo | 沸かす | boil |  |  |
| kutito | 挨拶する | greet |  |  |
| kosuto | 費用がかかる | cost | 同じ英語の語: kosa |  |
| pikuso | 修理する | fix |  |  |
| polato | 折る | fold |  |  |
| tekolo | 飾る | decorate |  |  |
| leliso | 公開する | release |  |  |
| piso | 食物を与える | feed | 語幹が同じ: pisa |  |
| supulo | 広げる | spread |  |  |
| telipo | 配達する | deliver |  |  |
| satilo | 盗む | steal |  |  |
| losupo | あぶる | roast |  |  |

### adj（77語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| apupe | 怖い | afraid |  |  |
| kalepe | 注意深い | careful | 語幹が同じ: kalepi |  |
| ekuse | 興奮した | excited |  |  |
| pulime | 親しみやすい | friendly |  |  |
| miwe | 元気な | fine |  |  |
| june | おかしい | funny | 同じ英語の語: inime |  |
| kulate | 嬉しい | glad |  |  |
| ape | 幸せな | happy | 語幹が同じ: apa, apo |  |
| unupe | 空腹な | hungry |  |  |
| inape | 興味を持った | interested |  |  |
| lonele | 寂しい | lonely |  |  |
| mume | 幸運な | lucky |  |  |
| sulite | 眠い | sleepy |  |  |
| moke | 申し訳ない | sorry |  |  |
| sulupe | 驚いた | surprised |  |  |
| tiluse | 喉が渇いた | thirsty |  |  |
| tilete | 疲れた | tired |  |  |
| wuje | 忙しい | busy |  |  |
| site | 安い | cheap | 語幹が同じ: sita, sito |  |
| kulene | きれいな | clean | 語幹が同じ: kuleno |  |
| tite | 死んだ | dead | 語幹が同じ: tita, tito |  |
| telise | おいしい | delicious |  |  |
| tipike | 難しい | difficult |  |  |
| ekepe | 高価な | expensive |  |  |
| pamuse | 有名な | famous |  |  |
| pupe | 自由な | free | 語幹が同じ: pupa, pupo |  |
| kulipe | 素晴らしい | great |  |  |
| aluke | 硬い | hard | 語幹が同じ: aluki |  |
| jame | 遅れた | late | 同じ英語の語: leti |  |
| apele | 開いた | open | 語幹が同じ: apelo |  |
| popule | 人気のある | popular |  |  |
| sutape | 奇妙な | strange |  |  |
| sule | 確かな | sure | 語幹が同じ: sula, suli, sulo |  |
| suwike | 甘い | sweet |  |  |
| telape | ひどい | terrible |  |  |
| jowe | 若い | young |  |  |
| time | 深い | deep | 語幹が同じ: tima |  |
| ipe | 重い | heavy | 語幹が同じ: ipa, ipo |  |
| ile | 高い | high | 語幹が同じ: ila, ili |  |
| lote | 長い | long | 語幹が同じ: lota, loto |  |
| loke | 低い | low | 語幹が同じ: loka, loko |  |
| solume | 短い | short |  |  |
| supe | 遅い | slow | 語幹が同じ: supa, supo |  |
| wawe | 背の高い | tall |  |  |
| pulose | 茶色い | brown |  |  |
| kupine | 緑の | green |  |  |
| kewe | 黄色い | yellow |  |  |
| tine | きつい | tight | 語幹が同じ: tina |  |
| kuloke | 混雑した | crowded |  |  |
| totale | 全部の | total | 語幹が同じ: totala |  |
| opipe | 公式の | official |  |  |
| pamile | 見慣れた | familiar |  |  |
| nelupe | 緊張した | nervous |  |  |
| sepele | 数個の | several |  |  |
| alite | 生きた | alive |  |  |
| ineke | 国際的な | international |  |  |
| nipe | 十分な | enough | 語幹が同じ: nipi |  |
| pasike | 基本的な | basic |  |  |
| komate | 快適な | comfortable |  |  |
| poleke | 外国の | foreign |  |  |
| pukese | 新鮮な | fresh |  |  |
| amase | 驚くべき | amazing |  |  |
| kuluse | クレイジーな | crazy |  |  |
| lokale | 地元の | local |  |  |
| ekate | 余分な | extra |  |  |
| kolete | 正しい | correct |  |  |
| apise | 欠席した | absent |  |  |
| masole | 主要な | major |  |  |
| ekike | 優れた | excellent |  |  |
| lape | 怠惰な | lazy | 語幹が同じ: lapa, lapo |  |
| pepe | 公平な | fair | 語幹が同じ: pepa |  |
| eleme | 電気の | electric |  |  |
| elune | 年配の | elderly | 語幹が同じ: eluna |  |
| etupe | 助けになる | helpful |  |  |
| ilupe | 健康的な | healthy |  |  |
| natupe | 自然な | natural | 語幹が同じ: natupi |  |
| pope | 両方の | both | 語幹が同じ: popa, popo |  |

### adv（28語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| ewi | 早く | early | 語幹が同じ: ewa |  |
| isi | 簡単に | easily | 語幹が同じ: isa, ise |  |
| kalepi | 注意深く | carefully | 語幹が同じ: kalepe |  |
| pinali | ついに | finally |  |  |
| usui | たいてい | usually |  |  |
| oi | 離れて | away |  |  |
| leai | 本当に | really | 語幹が同じ: leae |  |
| akupi | 実際に | actually |  |  |
| ekuni | 正確に | exactly |  |  |
| soti | そっと | softly | 語幹が同じ: sota, sote |  |
| opeki | 海外へ | overseas |  |  |
| noki | もう少しで | nearly | 語幹が同じ: noka, noko |  |
| leseni | 最近 | recently |  |  |
| apali | 海外で | abroad |  |  |
| utuli | 屋外で | outdoors |  |  |
| upusi | 上の階へ | upstairs |  |  |
| tonuti | 都心へ | downtown |  |  |
| inuki | その代わりに | instead |  |  |
| aluli | 声を出して | aloud |  |  |
| aniwi | とにかく | anyway |  |  |
| noati | この頃 | nowadays |  |  |
| lateli | かなり | rather |  |  |
| aluki | 一生懸命に | hard | 語幹が同じ: aluke |  |
| sutuli | まっすぐに | straight | 語幹が同じ: sutule |  |
| jali | 遠くに | far | 語幹が同じ: jale |  |
| epepi | これまでに | ever |  |  |
| tapi | その時 | then |  |  |
| anati | いつでも | anytime |  |  |

### prep（17語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| akote | の上方に | above |  |  |
| awate | を横切って | across |  |  |
| amete | に反対して | against |  |  |
| emote | の中で | among |  |  |
| ilate | の周りに | around |  |  |
| peite | の後ろに | behind |  |  |
| petute | の間に | between |  |  |
| tupite | の最中に | during |  |  |
| ipete | の中へ | into |  |  |
| nilute | の近くに | near |  |  |
| otate | から離れて | off |  |  |
| okete | を越えて | over |  |  |
| tutute | を通って | through |  |  |
| unate | の下に | under |  |  |
| wipate | なしで | without |  |  |
| omite | の上へ | onto |  |  |
| pesate | のそばに | beside |  |  |

### pronoun（6語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| ewa | みんな | everyone | 語幹が同じ: ewi |  |
| eja | すべて | everything |  |  |
| sema | 何か | something | 語幹が同じ: seme |  |
| noka | 何もない | nothing | 語幹が同じ: noki, noko |  |
| awa | 誰でも | anyone | 語幹が同じ: awo |  |
| aja | 何でも | anything |  |  |

## v0.8 日本語の基本語彙（549語）

### noun（335語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| leka | 赤 | red | 語幹が同じ: leko; 同じ英語の語: lete |  |
| kolola | 色 | color / colour |  |  |
| lila | 後ろ | rear |  |  |
| emula | 英語 | English |  |  |
| jena | 円 | yen |  |  |
| penusa | 鉛筆 | pencil |  |  |
| peja | おなか | belly |  |  |
| enapa | 終わり | end | 同じ英語の語: pino |  |
| kanapa | 菓子 | candy / sweets |  |  |
| kolata | 風邪 | cold | 同じ英語の語: kole |  |
| suluma | 肩 | shoulder |  |  |
| kanesa | 漢字 | kanji |  |  |
| kotuta | 金 | gold |  |  |
| upa | 髪 | hair | 語幹が同じ: upo |  |
| mula | 毛 | fur |  |  |
| noluna | 北 | north |  |  |
| wesusa | 西 | west |  |  |
| isuwa | 東 | east |  |  |
| susa | 南 | south | 語幹が同じ: suso |  |
| sutima | 切手 | stamp |  |  |
| kimopa | 着物 | kimono |  |  |
| tekuna | 教科書 | textbook |  |  |
| kuwapa | 教室 | classroom |  |  |
| neka | 首 | neck |  |  |
| nulaka | 黒板 | blackboard |  |  |
| sakuma | 桜 | sakura / cherry blossom |  |  |
| tupea | 三角 | triangle |  |  |
| sukua | 四角 | square | 語幹が同じ: sukue |  |
| popa | 写真 | photo / photograph | 語幹が同じ: pope, popo |  |
| salaka | 字 | character |  |  |
| punila | 生徒 | pupil |  |  |
| naka | 背中 | back |  |  |
| supowa | 地下鉄 | subway |  |  |
| elusa | 出口 | exit |  |  |
| toma | 人形 | doll |  |  |
| tupa | 歯 | tooth |  |  |
| taluka | 話 | talk | 同じ英語の語: toko |  |
| alema | 半分 | half |  |  |
| toiwa | トイレ | toilet |  |  |
| penata | 弁当 | bento / lunch box |  |  |
| pukona | 前 | front |  |  |
| ima | 耳 | ear | 語幹が同じ: ime, imo |  |
| sunena | お土産 | souvenir |  |  |
| kumama | 眼鏡 | glasses / spectacles |  |  |
| kinupa | 幼稚園 | kindergarten |  |  |
| sakila | スカート | skirt |  |  |
| anewa | ハンカチ | handkerchief |  |  |
| laka | ページ | page | 語幹が同じ: lako |  |
| polema | 外国人 | foreigner |  |  |
| situna | 合図 | signal |  |  |
| tasupa | 味 | taste | 同じ英語の語: teso |  |
| suweta | 汗 | sweat |  |  |
| nena | 網 | net | 同じ英語の語: netuwa |  |
| lelita | 安心 | relief |  |  |
| sukoma | 胃 | stomach |  |  |
| puwima | 息 | breath |  |  |
| ponuma | 池 | pond |  |  |
| polupa | 板 | board | 語幹が同じ: polupo |  |
| pusala | いたずら | prank |  |  |
| lipeta | 人生 | lifetime |  |  |
| tutita | 糸 | thread |  |  |
| kunuma | 田舎 | countryside |  |  |
| liwa | 命 | life | 語幹が同じ: liwo |  |
| nulina | 印刷 | print |  |  |
| lija | 嘘 | lie | 語幹が同じ: lijo |  |
| alawa | 腕 | arm |  |  |
| lepepa | 裏 | reverse |  |  |
| sakepa | 上着 | jacket |  |  |
| lumola | 噂 | rumor |  |  |
| luna | 運 | luck |  |  |
| ekima | 運動 | exercise |  |  |
| kiputa | 贈り物 | gift / present | 同じ英語の語: naua, naue |  |
| poma | お辞儀 | bow |  |  |
| sujupa | 表 | surface |  |  |
| onesa | 温泉 | onsen / hot spring |  |  |
| mitina | 会 | meeting |  |  |
| sopina | 買い物 | shopping |  |  |
| sawa | 形 | shape |  |  |
| keta | 神 | god | 語幹が同じ: keto |  |
| tunupa | 雷 | thunder |  |  |
| sukana | 皮 | skin |  |  |
| suwuka | 代わり | substitute |  |  |
| imuka | 感想 | impression |  |  |
| patina | 我慢 | patience |  |  |
| nola | 岸 | shore |  |  |
| wununa | 傷 | wound |  |  |
| muta | 気分 | mood |  |  |
| pilipa | 気持ち | feeling |  |  |
| momupa | 競争 | competition |  |  |
| powa | 霧 | fog |  |  |
| lekota | 記録 | record |  |  |
| nepola | 近所 | neighborhood |  |  |
| silata | 銀 | silver |  |  |
| awipa | 癖 | habit |  |  |
| lapa | 唇 | lip | 語幹が同じ: lape, lapo |  |
| tisuna | 区別 | distinction |  |  |
| aloja | 苦労 | hardship |  |  |
| nonuta | 具合 | condition |  |  |
| keluka | 計算 | calculation |  |  |
| inila | 怪我 | injury |  |  |
| seneta | 景色 | scenery |  |  |
| elama | 消しゴム | eraser |  |  |
| tetepa | 決心 | determination |  |  |
| awuka | 欠席 | absence |  |  |
| sumoka | 煙 | smoke | 語幹が同じ: sumoko |  |
| juala | 喧嘩 | quarrel |  |  |
| sitesa | 見物 | sightseeing |  |  |
| nula | 劇 | play | 同じ英語の語: puleo |  |
| lekupa | 後悔 | regret |  |  |
| atowa | 広告 | advertisement / ad |  |  |
| konaka | 工事 | construction |  |  |
| tumaka | 交通 | traffic |  |  |
| poteka | 粉 | powder |  |  |
| pisuta | ごちそう | feast |  |  |
| sulola | 坂 | slope |  |  |
| komota | 作文 | composition |  |  |
| ajuna | 賛成 | agreement |  |  |
| waka | 散歩 | walk | 語幹が同じ: wako |  |
| mateka | 材料 | material |  |  |
| wita | 残念 | pity | 語幹が同じ: wite |  |
| tika | 死 | death | 語幹が同じ: tike, tiko |  |
| poja | 詩 | poem |  |  |
| selema | 式 | ceremony |  |  |
| towa | 舌 | tongue |  |  |
| unama | 下着 | underwear |  |  |
| pupepa | 支度 | preparation |  |  |
| kutusa | 品物 | goods |  |  |
| tupama | 芝居 | drama |  |  |
| masuta | 主人 | master | 語幹が同じ: masuto |  |
| tepopa | 出発 | departure |  |  |
| soa | 醤油 | soy / soy sauce |  |  |
| kapepa | 食堂 | cafeteria |  |  |
| okea | 知り合い | acquaintance |  |  |
| maluka | 印 | mark | 語幹が同じ: maluko |  |
| ejupa | 実験 | experiment |  |  |
| owusa | 邪魔 | obstacle |  |  |
| semuna | 順序 | sequence |  |  |
| sanata | 砂 | sand |  |  |
| lesata | 住まい | residence |  |  |
| tiama | 図 | diagram |  |  |
| lipasa | 生活 | lifestyle |  |  |
| awana | 整理 | arrangement |  |  |
| kuma | 咳 | cough | 語幹が同じ: kumo |  |
| kela | 石炭 | coal | 語幹が同じ: kelo |  |
| lonuna | 洗濯 | laundry |  |  |
| lukuka | 贅沢 | luxury |  |  |
| konoma | 相談 | consultation |  |  |
| utuwa | 外 | outside |  |  |
| loma | 損 | loss | 語幹が同じ: lomo |  |
| nata | 田 | paddy |  |  |
| kimuma | 体操 | gymnastics |  |  |
| tatapa | 畳 | tatami |  |  |
| selula | 棚 | shelf |  |  |
| tala | 谷 | valley | 語幹が同じ: talo |  |
| punuwa | 束 | bundle |  |  |
| liluta | 誕生日 | birthday |  |  |
| tukepa | 箪笥 | dresser |  |  |
| minisa | 大臣 | minister |  |  |
| tipeka | 違い | difference |  |  |
| kosana | 注意 | caution |  |  |
| iwuma | 注射 | injection |  |  |
| sapipa | 貯金 | savings |  |  |
| pikopa | 漬物 | pickles |  |  |
| seija | 土 | soil |  |  |
| kutena | 粒 | grain |  |  |
| nela | 爪 | nail |  |  |
| ituja | 積もり | intention |  |  |
| ilowa | 鉄 | iron |  |  |
| leluwa | 鉄道 | railway |  |  |
| temeta | 寺 | temple |  |  |
| eluna | 年寄り | elderly | 語幹が同じ: elune |  |
| kukola | 戸棚 | cupboard |  |  |
| laneta | 土地 | land |  |  |
| tima | 泥棒 | thief | 語幹が同じ: time |  |
| komema | 仲間 | companion |  |  |
| lenuma | 長さ | length |  |  |
| jiaka | 斜め | diagonal |  |  |
| wapa | 波 | wave | 語幹が同じ: wapo; 同じ英語の語: seko |  |
| seputa | 匂い | scent |  |  |
| tiena | 日記 | diary |  |  |
| lukapa | 荷物 | luggage |  |  |
| amima | 入学 | admission |  |  |
| lusa | 根 | root | 語幹が同じ: luse, luso |  |
| wesa | 願い | wish | 語幹が同じ: weso |  |
| tukota | 喉 | throat |  |  |
| talina | 飲み物 | drink | 同じ英語の語: liko |  |
| kuwa | 糊 | glue |  |  |
| keika | 乗り物 | vehicle |  |  |
| isa | 灰 | ash | 語幹が同じ: ise, isi |  |
| kunala | 墓 | grave |  |  |
| posusa | 葉書 | postcard |  |  |
| ajela | 拍手 | applause |  |  |
| pekina | 初め | beginning |  |  |
| puwawa | 旗 | flag |  |  |
| papupa | 畑 | farm |  |  |
| tisoka | 発見 | discovery |  |  |
| anija | 発表 | announcement |  |  |
| imepa | 発明 | invention |  |  |
| pitepa | 羽 | feather |  |  |
| wipa | 幅 | width | 語幹が同じ: wipo |  |
| wutupa | 林 | woods |  |  |
| nitupa | 針 | needle |  |  |
| wula | 馬鹿 | fool |  |  |
| tumoa | 引き出し | drawer |  |  |
| pilela | 髭 | beard |  |  |
| nila | 膝 | knee |  |  |
| lasula | 暇 | leisure |  |  |
| lutula | 紐 | string |  |  |
| saluna | 一覧表 | chart |  |  |
| kopena | 表紙 | cover | 同じ英語の語: pulo |  |
| letuta | 評判 | reputation |  |  |
| tetima | 昼間 | daytime |  |  |
| popeta | 貧乏 | poverty |  |  |
| enoja | 封筒 | envelope |  |  |
| kupupa | 夫婦 | couple |  |  |
| kilota | 服装 | clothing |  |  |
| saja | 袋 | sack |  |  |
| jita | 蓋 | lid |  |  |
| putuja | 布団 | futon |  |  |
| peneka | 塀 | fence |  |  |
| lepaka | 返事 | reply |  |  |
| punoka | 放送 | broadcast |  |  |
| nuta | 仏 | buddha |  |  |
| setika | 棒 | stick |  |  |
| jila | 枕 | pillow |  |  |
| misupa | 間違い | mistake |  |  |
| tina | 松 | pine | 語幹が同じ: tine |  |
| imina | 真似 | imitation |  |  |
| mina | 豆 | bean | 語幹が同じ: mino |  |
| satita | 満足 | satisfaction |  |  |
| uta | 味方 | ally |  |  |
| lama | 湖 | lake |  |  |
| misa | 味噌 | miso | 語幹が同じ: miso, misu |  |
| wima | 麦 | wheat |  |  |
| wasupa | 無駄 | waste | 語幹が同じ: wasupo |  |
| sesuwa | 胸 | chest |  |  |
| juta | 芽 | bud |  |  |
| nuesa | 迷惑 | nuisance |  |  |
| mulupa | 面倒 | trouble |  |  |
| pujaja | 毛布 | blanket |  |  |
| patema | 模様 | pattern |  |  |
| kunita | 八百屋 | greengrocer |  |  |
| mela | 郵便 | mail |  |  |
| pineta | 指 | finger |  |  |
| tulima | 夢 | dream | 語幹が同じ: tulimo |  |
| ejana | 用事 | errand |  |  |
| ajiwa | 様子 | appearance |  |  |
| mipuna | 夜中 | midnight |  |  |
| papena | 両親 | parents |  |  |
| kolisa | 廊下 | corridor |  |  |
| kotoka | 綿 | cotton |  |  |
| lajea | 割合 | ratio |  |  |
| ijaka | インク | ink |  |  |
| lulama | グラム | gram |  |  |
| lupeka | ゴム | rubber |  |  |
| senipa | センチ | centimeter |  |  |
| topaka | タバコ | tobacco / cigarette |  |  |
| lela | ベル | bell | 語幹が同じ: lelo |  |
| pumoma | ボタン | button |  |  |
| metela | メートル | meter |  |  |
| anuta | 握手 | handshake |  |  |
| posipa | 位置 | position |  |  |
| leseka | 受付 | reception |  |  |
| ijipa | 影響 | influence |  |  |
| nututa | 栄養 | nutrition |  |  |
| kopuka | 会議 | conference |  |  |
| unea | 家庭 | household |  |  |
| kokula | 完成 | completion |  |  |
| memola | 記念 | memorial |  |  |
| oka | 希望 | hope | 語幹が同じ: oko; 同じ英語の語: opo |  |
| kupika | 協力 | cooperation |  |  |
| tiseta | 距離 | distance |  |  |
| ojosa | 逆 | opposite |  |  |
| tesita | 決定 | decision |  |  |
| polosa | 欠点 | fault |  |  |
| ojina | 幸福 | happiness |  |  |
| pujiwa | 故障 | breakdown |  |  |
| totala | 合計 | total | 語幹が同じ: totale |  |
| tuwua | 裁判 | trial |  |  |
| punema | 境 | boundary |  |  |
| otoja | 作者 | author |  |  |
| woka | 作品 | work | 語幹が同じ: woko |  |
| lekela | 参考 | reference |  |  |
| wuluka | 手術 | surgery |  |  |
| okuja | 職業 | occupation |  |  |
| pusowa | 進歩 | progress |  |  |
| tukusa | 信用 | trust | 語幹が同じ: tukuso |  |
| isesa | 事件 | incident |  |  |
| kowuwa | 自信 | confidence |  |  |
| sileka | 事情 | circumstance |  |  |
| uka | 時代 | era |  |  |
| esuja | 実行 | execution |  |  |
| popuna | 人口 | population |  |  |
| suwama | 水泳 | swimming |  |  |
| peluja | 性格 | personality |  |  |
| sumina | 精神 | spirit |  |  |
| lemuka | 責任 | responsibility |  |  |
| petapa | 石油 | petroleum |  |  |
| suewa | 背広 | suit |  |  |
| ewepa | 選挙 | election |  |  |
| imawa | 想像 | imagination |  |  |
| lewusa | 尊敬 | respect |  |  |
| itiwa | 態度 | attitude |  |  |
| tipuma | 台風 | typhoon |  |  |
| susuja | 他人 | stranger |  |  |
| lepima | 代表 | representative |  |  |
| susapa | 中止 | suspension |  |  |
| sija | 罪 | sin | 語幹が同じ: sije, sijo |  |
| tekila | 程度 | degree |  |  |
| pituka | 特徴 | feature |  |  |
| ejola | 努力 | effort |  |  |
| kojuja | 内容 | content |  |  |
| popala | 人気 | popularity |  |  |
| jula | 燃料 | fuel |  |  |
| akula | 農業 | agriculture | 語幹が同じ: akulo |  |
| apila | 能力 | ability |  |  |
| pelala | 刃 | blade |  |  |
| tama | 恥 | shame |  |  |
| tepema | 発達 | development |  |  |
| ujua | 平等 | equality |  |  |
| ameka | 不安 | anxiety |  |  |
| tasa | 変化 | change | 語幹が同じ: taso |  |
| tilema | 方向 | direction |  |  |
| kamana | 命令 | command | 同じ英語の語: olo |  |
| puwupa | 目的 | purpose |  |  |
| ewasa | 予想 | expectation |  |  |
| pasopa | 流行 | fashion |  |  |
| amaja | 量 | amount |  |  |
| manela | 礼儀 | manners |  |  |
| kenuna | 連絡 | contact |  |  |
| lakola | 録音 | recording |  |  |
| nekuta | ネクタイ | necktie |  |  |
| pumuka | 基礎 | foundation |  |  |
| inuta | 興味 | interest | 語幹が同じ: inute |  |
| lana | 範囲 | range | 語幹が同じ: lano |  |

### verb（134語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| poleno | 生まれる | born / be born |  |  |
| topo | する | do | 語幹が同じ: topa |  |
| enato | 入る | enter |  |  |
| lesuno | 休む | rest | 語幹が同じ: lesuna |  |
| womo | 暖める | warm | 語幹が同じ: woma, wome |  |
| amuto | 扱う | handle |  |  |
| katelo | 集まる | gather |  |  |
| apomo | 謝る | apologize |  |  |
| ekaso | 表す | express |  |  |
| komuko | 合わせる | combine |  |  |
| paniko | 慌てる | panic |  |  |
| ulo | 急ぐ | hurry | 語幹が同じ: ula |  |
| aso | 痛む | ache | 語幹が同じ: asa |  |
| inaso | 入れる | insert |  |  |
| pulomo | 浮かぶ | float |  |  |
| kopo | 写す | copy | 語幹が同じ: kopa |  |
| saso | 追う | chase | 語幹が同じ: sasa |  |
| telo | 遅れる | delay | 語幹が同じ: tela, teli |  |
| wapo | 起こす | wake | 語幹が同じ: wapa |  |
| lekalo | 思い出す | recall |  |  |
| teseno | 降りる | descend / get off |  |  |
| awo | 掛ける | hang | 語幹が同じ: awa |  |
| sulono | 囲む | surround |  |  |
| tito | 片付ける | tidy | 語幹が同じ: tita, tite |  |
| lino | 傾く | lean | 語幹が同じ: lina |  |
| piwo | 噛む | bite | 語幹が同じ: piwa |  |
| kometo | 通う | commute |  |  |
| witelo | 枯れる | wither |  |  |
| tulaio | 乾かす | dry | 語幹が同じ: tulaie |  |
| panaso | 消える | vanish |  |  |
| loko | 腐る | rot | 語幹が同じ: loka, loke |  |
| kolamo | 崩れる | collapse |  |  |
| tisuto | 配る | distribute |  |  |
| lepito | 繰り返す | repeat |  |  |
| sukelo | 苦しむ | suffer |  |  |
| elalo | 消す | erase |  |  |
| pukiso | 凍る | freeze |  |  |
| lupo | 擦る | rub | 語幹が同じ: lupa |  |
| lepuso | 断る | refuse |  |  |
| kilo | 殺す | kill | 語幹が同じ: kila, kile, kili |  |
| putumo | 咲く | bloom |  |  |
| suno | 叫ぶ | shout | 語幹が同じ: suna, suni |  |
| lolo | 下げる | lower | 語幹が同じ: lola, lole |  |
| sukapo | 刺す | stab |  |  |
| sukoto | 叱る | scold |  |  |
| sinuto | 沈む | sink |  |  |
| tilo | 縛る | tie | 語幹が同じ: tila |  |
| titeno | 締める | tighten |  |  |
| sato | 喋る | chat | 語幹が同じ: sata, sati |  |
| iniko | 知らせる | inform |  |  |
| okuso | 調べる | examine |  |  |
| inolo | 吸う | inhale |  |  |
| atapo | 進む | advance |  |  |
| lekopo | 勧める | recommend |  |  |
| tisako | 捨てる | discard |  |  |
| sulako | 滑る | slip |  |  |
| nuluko | 育てる | nurture |  |  |
| topulo | 倒す | topple |  |  |
| konato | 確かめる | confirm |  |  |
| noko | 叩く | knock | 語幹が同じ: noka, noki |  |
| akamo | 溜まる | accumulate |  |  |
| supiko | 足りる | suffice |  |  |
| tesapo | 騙す | deceive |  |  |
| apuwo | 近付く | approach |  |  |
| tipelo | 違う | differ |  |  |
| sakato | 散る | scatter |  |  |
| kutapo | 掴む | grab |  |  |
| atoso | 付ける | attach |  |  |
| koneko | 伝える | convey |  |  |
| lato | 包む | wrap | 語幹が同じ: lata |  |
| konimo | 繋ぐ | connect |  |  |
| pijo | 積む | pile | 語幹が同じ: pija |  |
| papo | 詰める | pack | 語幹が同じ: papa, pape |  |
| akojo | 連れる | accompany |  |  |
| ilumo | 照らす | illuminate |  |  |
| liwo | 届く | reach | 語幹が同じ: liwa |  |
| lepelo | 直す | repair |  |  |
| leketo | 直る | recover |  |  |
| pumo | 流す | pour | 語幹が同じ: puma |  |
| kaso | 眺める | gaze | 語幹が同じ: kasa, kase |  |
| puwo | 流れる | flow | 語幹が同じ: puwa |  |
| kuo | 並ぶ | queue | 語幹が同じ: kue |  |
| apano | 並べる | arrange |  |  |
| lijo | 鳴る | ring | 語幹が同じ: lija; 同じ英語の語: lina |  |
| kupipo | 握る | grip |  |  |
| suso | 縫う | sew | 語幹が同じ: susa |  |
| unapo | 脱ぐ | undress |  |  |
| penuko | 塗る | paint |  |  |
| lemeno | 残る | remain |  |  |
| lomo | 乗せる | load | 語幹が同じ: loma |  |
| ekeko | 延ばす | extend |  |  |
| situlo | 延びる | stretch |  |  |
| supamo | 生える | sprout |  |  |
| misulo | 計る | measure |  |  |
| suwepo | 掃く | sweep |  |  |
| lemoto | 外す | remove |  |  |
| sepalo | 離す | separate |  |  |
| lelomo | 引っ越す | relocate |  |  |
| sijo | 冷やす | chill | 語幹が同じ: sija, sije |  |
| ipuko | 増える | increase |  |  |
| wipo | 拭く | wipe | 語幹が同じ: wipa |  |
| pilepo | 防ぐ | prevent |  |  |
| satepo | 踏む | step |  |  |
| tekupo | 減る | decrease |  |  |
| peleso | 褒める | praise |  |  |
| tiko | 掘る | dig | 語幹が同じ: tika, tike |  |
| lono | 巻く | roll | 語幹が同じ: lone |  |
| peneto | 曲げる | bend |  |  |
| mikupo | 混ぜる | mix |  |  |
| sumaso | 纏める | summarize |  |  |
| esiso | 迷う | hesitate |  |  |
| lotato | 回す | rotate |  |  |
| imo | 向かう | head | 語幹が同じ: ima, ime; 同じ英語の語: ita |  |
| weluko | 迎える | welcome |  |  |
| milo | 剥く | peel | 語幹が同じ: mila |  |
| tileko | 向ける | direct |  |  |
| nopo | 結ぶ | knot | 語幹が同じ: nopa |  |
| lako | 漏れる | leak | 語幹が同じ: laka |  |
| emuko | 雇う | employ |  |  |
| tipo | 破る | tear | 語幹が同じ: tipa, tipe |  |
| seso | 止む | cease | 語幹が同じ: sese |  |
| kuino | 辞める | quit |  |  |
| ajio | 避ける | avoid |  |  |
| tuto | 汚す | dirty | 語幹が同じ: tuta, tute |  |
| lemao | 喜ぶ | rejoice |  |  |
| patalo | 別れる | part | 語幹が同じ: patala |  |
| tipito | 分ける | divide |  |  |
| eno | 渡す | hand | 語幹が同じ: ena |  |
| suposo | 割る | split |  |  |
| kumako | 割れる | crack |  |  |
| konono | 行う | conduct |  |  |
| sako | 剃る | shave | 語幹が同じ: saka |  |
| lelo | 頼る | rely | 語幹が同じ: lela |  |
| awumo | 認める | admit |  |  |

### adj（54語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| penupe | 痛い | painful / sore |  |  |
| pakie | いろいろな | various |  |  |
| inime | 面白い | interesting / funny | 同じ英語の語: june |  |
| kupe | かわいい | cute | 語幹が同じ: kupa |  |
| sukile | 上手な | skilled / good at |  |  |
| unise | 下手な | unskilled / poor at |  |  |
| enuke | 楽しい | enjoyable / fun |  |  |
| kulose | 近い | close | 語幹が同じ: kulosa, kuloso |  |
| jale | 遠い | far | 語幹が同じ: jali |  |
| kupape | ありがたい | grateful |  |  |
| piete | 美しい | beautiful |  |  |
| enope | 羨ましい | envious |  |  |
| kenume | おとなしい | gentle / docile |  |  |
| ite | 痒い | itchy | 語幹が同じ: ita, ito |  |
| supipe | 辛い | spicy |  |  |
| pitipe | かわいそうな | pitiful / poor | 同じ英語の語: pue |  |
| sutete | 厳しい | strict |  |  |
| sumepe | 臭い | smelly |  |  |
| pupuse | 悔しい | frustrated |  |  |
| tetele | 詳しい | detailed |  |  |
| pupope | 盛んな | prosperous |  |  |
| sutoke | 丈夫な | sturdy |  |  |
| salute | 鋭い | sharp |  |  |
| sute | ずるい | sly | 語幹が同じ: suta, suti |  |
| palese | 大切な | precious |  |  |
| pupate | 平らな | flat |  |  |
| alose | つらい | harsh |  |  |
| pitele | 苦い | bitter |  |  |
| lipele | 賑やかな | lively |  |  |
| lukie | ぬるい | lukewarm |  |  |
| enite | 熱心な | enthusiastic |  |  |
| inone | 激しい | intense |  |  |
| emuwe | 恥ずかしい | embarrassed |  |  |
| nakete | 裸の | naked |  |  |
| misute | 不思議な | mysterious |  |  |
| pake | 太った | fat | 語幹が同じ: paka, pako |  |
| iwuke | 不便な | inconvenient |  |  |
| kalume | 平気な | calm |  |  |
| umipe | 蒸し暑い | humid |  |  |
| asuse | 夢中な | absorbed |  |  |
| lale | 珍しい | rare | 語幹が同じ: lala |  |
| putise | 愉快な | pleasant |  |  |
| luse | 緩い | loose | 語幹が同じ: lusa, luso |  |
| tupune | 酔った | drunk |  |  |
| lule | 乱暴な | rough | 語幹が同じ: lula |  |
| supute | 立派な | splendid |  |  |
| seluke | わがままな | selfish |  |  |
| suleke | わずかな | slight |  |  |
| elake | 上品な | elegant |  |  |
| akume | 正確な | accurate |  |  |
| senune | 中央の | central |  |  |
| suise | 適当な | suitable |  |  |
| simale | 同時の | simultaneous |  |  |
| sumuke | 滑らかな | smooth |  |  |

### adv（26語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| sumoli | 少し | little / a little | 語幹が同じ: sumole |  |
| kili | はっきり | clearly | 語幹が同じ: kila, kile, kilo |  |
| tiliki | 一生懸命 | diligently |  |  |
| someti | いつか | someday |  |  |
| suli | 必ず | surely | 語幹が同じ: sula, sule, sulo |  |
| nituli | きちんと | neatly |  |  |
| seluti | きっと | certainly |  |  |
| pilumi | しっかり | firmly |  |  |
| komuti | すっかり | completely |  |  |
| puloki | 多分 | probably |  |  |
| luwi | だいたい | roughly |  |  |
| kulapi | だんだん | gradually |  |  |
| pulipi | ちゃんと | properly |  |  |
| mituwi | 途中 | midway |  |  |
| suteni | 突然 | suddenly |  |  |
| lapiti | どんどん | rapidly |  |  |
| pusi | 初めて | first | 語幹が同じ: pusa, puse, puso |  |
| ekisi | 非常に | extremely |  |  |
| pakuli | ぼんやり | vaguely |  |  |
| enuti | 全く | entirely |  |  |
| epani | やがて | eventually |  |  |
| elesi | よそ | elsewhere |  |  |
| teliti | わざわざ | deliberately |  |  |
| apesi | 絶対 | absolutely |  |  |
| tilepi | 直接 | directly |  |  |
| natupi | 当然 | naturally | 語幹が同じ: natupe |  |

## v0.9 現代・IT語彙（11語）

### noun（6語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| alutipa | 人工知能 | ai / artificial intelligence |  |  |
| netuwa | ネットワーク | network / net | 同じ英語の語: nena |  |
| sumawa | スマートフォン | smartphone / smart phone / phone | 同じ英語の語: tela |  |
| pasiwa | パスワード | password |  |  |
| senasa | センサー | sensor |  |  |
| puwoja | プログラム | program | 同じ英語の語: pupoko |  |

### verb（3語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| pupoko | プログラムする | program / code | 同じ英語の語: puwoja |  |
| upujo | アップロードする | upload |  |  |
| tonuko | ダウンロードする | download |  |  |

### adj（1語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| tikite | デジタルの | digital / electronic |  |  |

### adv（1語）

| Logi | 日本語 | 英語 | 手がかり | 状況 |
|---|---|---|---|---|
| onapi | オンラインで | online |  |  |

