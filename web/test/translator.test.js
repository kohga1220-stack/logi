// 実行: node --test web/test/
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const lexicon = require('../lexicon.js');
const { createTranslator, numberToLogi } = require('../translator.js');
const translator = createTranslator(lexicon);

// corpus/examples.csv（引用符つきの行を含む）を読む
function readCorpus() {
  const text = fs.readFileSync(path.join(__dirname, '..', '..', 'corpus', 'examples.csv'), 'utf8');
  return text.trim().split('\n').slice(1).map((line) => {
    const m = /^(\d+),([^,]+),(?:"([^"]*)"|([^,]*)),(.*)$/.exec(line.trim());
    return { id: Number(m[1]), feature: m[2], logi: m[3] !== undefined ? m[3] : m[4], ja: m[5] };
  });
}

// 英語から入れる願いの言葉（112〜114）は、日本語からは入れない
const UNSUPPORTED_JA = new Set([112, 113, 114]);

test('corpus: 対応する日本語の例文は例文集の Logi と一致する', () => {
  const failures = [];
  readCorpus().forEach((row) => {
    if (UNSUPPORTED_JA.has(row.id)) return;
    const got = translator.translate(row.ja, 'ja').logi;
    if (got !== row.logi) failures.push(`${row.id}: ${row.ja} => ${got} (期待: ${row.logi})`);
  });
  assert.deepStrictEqual(failures, []);
});

test('corpus: 未対応とした例文は、辞書にない語を [語?] で示す', () => {
  readCorpus().forEach((row) => {
    if (!UNSUPPORTED_JA.has(row.id)) return;
    const r = translator.translate(row.ja, 'ja');
    assert.notStrictEqual(r.logi, row.logi, `${row.id} が対応済みになったので UNSUPPORTED_JA から外してください`);
  });
});

const EN_CASES = [
  ['I eat bread.', 'mi ito pana.'],
  ['The dog drinks water.', 'tuka liko jeta.'],
  ['I see a big cat.', 'mi sio lase kata.'],
  ['I ate an apple.', 'mi pasu ito apa.'],
  ['He will go to school.', 'li putu iko tote sukula.'],
  ['The dog is running.', 'tuka konu lano.'],
  ['He has eaten the apple.', 'li pinu ito apa.'],
  ['I do not eat bread.', 'mi no ito pana.'],
  ["I don't eat bread.", 'mi no ito pana.'],
  ['He did not come.', 'li pasu no komo.'],
  ['I was reading.', 'mi pasu konu loto.'],
  ['Do you eat an apple?', 'tu ito apa ka?'],
  ['What food do you like?', 'tu laiko wata puta ka?'],
  ['What do you like?', 'tu laiko wata ka?'],
  ['Who comes?', 'kua komo ka?'],
  ['I am better than you.', 'mi pio moli kute tanute tu.'],
  ['I like the apple most.', 'mi mosi laiko apa.'],
  ['He is the same as me.', 'li pio seme tote mi.'],
  ['I see the person who runs.', 'mi sio mana ta li lano.'],
  ['I like reading.', 'mi laiko lotona.'],
  ['I want to come.', 'mi wonuto komona.'],
  ['I eat bread and an apple.', 'mi ito pana e apa.'],
  ['I am 20 years old.', 'mi oto to pulu ila.'],
  ['The dog is in the school.', 'tuka alo inute sukula.'],
  ['The cat is on the car.', 'kata alo onute kala.'],
  ['I eat bread for you.', 'mi ito pana pote tu.'],
  ['He comes from the school.', 'li komo pulomute sukula.'],
  ['I go with you.', 'mi iko witute tu.'],
  ['I gave you an apple.', 'mi pasu kipo apa tote tu.'],
  ['He runs fast.', 'li pasuti lano.'],
  ['He runs very fast.', 'li peli pasuti lano.'],
  ['I can run.', 'mi kani lano.'],
  ['I can not run.', 'mi kani no lano.'],
  ['Your dog is big.', 'tu tuka pio lase.'],
  ['He sees himself.', 'li sio selu.'],
  ['Someone eats the apple.', 'somena ito apa.'],
  ['We go to school.', 'misu iko tote sukula.'],
  ['Where is the dog?', 'tuka alo atute wela ka?'],
  ['Where do you go?', 'tu iko tote wela ka?'],
  ['When will you come?', 'tu putu komo atute wena ka?'],
  ["Why don't you eat the apple?", 'tu waia no ito apa ka?'],
  ['How did you come?', 'tu aua pasu komo ka?'],
  ['What is your name?', 'tu nema pio wata ka?'],
  ['Are you a student?', 'tu pio sutua ka?'],
  ['I must eat the apple.', 'mi masi ito apa.'],
  ['I am a student.', 'mi pio sutua.'],
  ['The apple is red.', 'apa pio lete.'],
  ['I see two dogs.', 'mi sio to tuka.'],
  ['I eat apples.', 'mi ito mene apa.']
];

test('英語の例文', () => {
  const failures = [];
  EN_CASES.forEach(([en, want]) => {
    const got = translator.translate(en, 'en').logi;
    if (got !== want) failures.push(`${en} => ${got} (期待: ${want})`);
  });
  assert.deepStrictEqual(failures, []);
});

const JA_CONJ_CASES = [
  ['もし私が鳥なら、飛ぶだろうに。', 'ipu mi wutu pio pata, mi wutu pulaio.'],
  ['もし彼が来れば、私は行く。', 'ipu li komo, mi iko.'],
  ['彼は良い先生だ、だから私は彼が好きだ。', 'li pio kute titusa, sonu mi laiko li.'],
  ['しかし私は食べない。', 'patu mi no ito.'],
  ['彼が来るから、私は行く。', 'pikosu li komo, mi iko.'],
  ['彼が先生だから、私は彼が好きだ。', 'pikosu li pio titusa, mi laiko li.'],
  ['彼が来るとき、私は行く。', 'wenute li komo, mi iko.'],
  ['彼が読む間、私は食べる。', 'wailu li loto, mi ito.'],
  ['彼が来る前に、私は食べる。', 'pipolu li komo, mi ito.'],
  ['彼が来た後で、私は食べる。', 'aputi li pasu komo, mi ito.'],
  ['彼が来るまで、私は待つ。', 'utilu li komo, mi mato.'],
  ['彼が来たのに、私は行かなかった。', 'oluto li pasu komo, mi pasu no iko.'],
  ['彼が来てから、私は食べる。', 'aputi li komo, mi ito.'],
  ['私は食べるが、あなたは飲む。', 'mi ito, patu tu liko.'],
  ['私は食べて、そして寝る。', 'mi ito, e mi neo.'],
  ['私はあなたが良いと思う。', 'mi omo tu pio kute.'],
  ['彼は私が来たと言った。', 'li pasu juo mi pasu komo.'],
  ['なぜあなたはリンゴを食べないのですか？', 'tu waia no ito apa ka?']
];

test('日本語の接続（しかし・だから・から・が・て・もし〜なら・と思う）', () => {
  const failures = [];
  JA_CONJ_CASES.forEach(([ja, want]) => {
    const got = translator.translate(ja, 'ja').logi;
    if (got !== want) failures.push(`${ja} => ${got} (期待: ${want})`);
  });
  assert.deepStrictEqual(failures, []);
});

const EN_CONJ_CASES = [
  ['I eat bread, but you drink water.', 'mi ito pana, patu tu liko jeta.'],
  ['I eat bread but you drink water.', 'mi ito pana, patu tu liko jeta.'],
  ['I eat bread and you drink water.', 'mi ito pana, e tu liko jeta.'],
  ['I eat bread or you drink water.', 'mi ito pana, o tu liko jeta.'],
  ['I eat and sleep.', 'mi ito, e mi neo.'],
  ['He is a teacher, so I like him.', 'li pio titusa, sonu mi laiko li.'],
  ['I like him because he is a teacher.', 'mi laiko li, pikosu li pio titusa.'],
  ['Because he is a teacher, I like him.', 'pikosu li pio titusa, mi laiko li.'],
  ['When he comes, I go.', 'wenute li komo, mi iko.'],
  ['I eat when he comes.', 'mi ito, wenute li komo.'],
  ['I read while he eats.', 'mi loto, wailu li ito.'],
  ['I eat before he comes.', 'mi ito, pipolu li komo.'],
  ['I eat after he comes.', 'mi ito, aputi li komo.'],
  ['I wait until he comes.', 'mi mato, utilu li komo.'],
  ['I do not go unless he comes.', 'mi no iko, ulesu li komo.'],
  ['Although he came, I did not go.', 'oluto li pasu komo, mi pasu no iko.'],
  ['If he comes, I go.', 'ipu li komo, mi iko.'],
  ['I go if he comes.', 'mi iko, ipu li komo.'],
  ['When do you come?', 'tu komo atute wena ka?'],
  ['If I were a bird, I would fly.', 'ipu mi wutu pio pata, mi wutu pulaio.'],
  ['I think you are good.', 'mi omo tu pio kute.'],
  ['I think that you are good.', 'mi omo tu pio kute.'],
  ['He said that I came.', 'li pasu juo mi pasu komo.'],
  ['I know he is a student.', 'mi mo li pio sutua.'],
  ['But I do not eat.', 'patu mi no ito.'],
  ['I like apples, bread and fish.', 'mi laiko mene apa e pana e tosa.']
];

test('英語の接続（but・so・and・or・because・if・that）', () => {
  const failures = [];
  EN_CONJ_CASES.forEach(([en, want]) => {
    const got = translator.translate(en, 'en').logi;
    if (got !== want) failures.push(`${en} => ${got} (期待: ${want})`);
  });
  assert.deepStrictEqual(failures, []);
});

test('数字は docs/grammar.md §5 の数詞になる', () => {
  const cases = { 0: 'ni', 1: 'pa', 10: 'pa pulu', 20: 'to pulu', 25: 'to pulu pe', 100: 'pa kupulu', 105: 'pa kupulu ni pulu pe', 2025: 'to mipulu ni kupulu to pulu pe' };
  Object.keys(cases).forEach((n) => assert.strictEqual(numberToLogi(Number(n)).join(' '), cases[n], n));
});

test('辞書にない語は [語?] で残し、notes と unknown に出す', () => {
  const ja = translator.translate('私はシマウマを食べる。', 'ja');
  assert.ok(ja.logi.includes('[シマウマ?]'));
  assert.deepStrictEqual(ja.unknown, ['シマウマ']);
  assert.ok(ja.notes.length > 0);
  const en = translator.translate('I eat a zebra.', 'en');
  assert.ok(en.logi.includes('[zebra?]'));
});

test('言語の自動判定と空入力', () => {
  assert.strictEqual(translator.detectLanguage('こんにちは'), 'ja');
  assert.strictEqual(translator.detectLanguage('hello'), 'en');
  assert.strictEqual(translator.translate('', 'auto').logi, '');
  assert.strictEqual(translator.translate('I eat bread.', 'auto').lang, 'en');
});

test('出力の語はすべて辞書の語か、翻訳機が使う機能語・数詞', () => {
  const known = new Set(lexicon.map((e) => e.w));
  ['I eat the apple.', 'He did not come.', 'What is your name?', '私はリンゴを食べた。', 'あなたは学生ですか？']
    .forEach((s) => {
      translator.translate(s, 'auto').logi.replace(/[.?,]/g, ' ').split(/\s+/).filter(Boolean).forEach((w) => {
        assert.ok(known.has(w), `${s}: ${w} は辞書にない`);
      });
    });
});

test('英検3級レベルの追加語（v0.7）: 動詞・副詞・前置詞・代名詞が訳せる', () => {
  const cases = [
    ['I buy a house.', 'mi puo usa.'],
    ['I carefully cook an egg.', 'mi kalepi kuko eka.'],
    ['He is under the table.', 'li alo unate tepa.'],
    ['I go without him.', 'mi iko wipate li.'],
    ['Everyone is happy.', 'ewa pio ape.'],
    ['私は家の下に猫を見る。', 'mi sio kata unate usa.'],
    ['猫は机の後ろにいる。', 'kata alo peite tesuka.'],
    ['みんなは幸せだ。', 'ewa pio ape.'],
  ];
  cases.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'auto').logi, logi, src);
  });
});

test('英検3級レベルの追加語: 別名（aliases）でも引ける', () => {
  assert.ok(!translator.translate('I like a fridge.', 'en').logi.includes('?'));
  assert.ok(!translator.translate('I like a refrigerator.', 'en').logi.includes('?'));
});

test('日本語の基本語彙（v0.8）: 夢・赤・する などが訳せる', () => {
  const cases = [
    ['私は夢を見る。', 'mi sio tulima.'],
    ['I have a dream.', 'mi oto tulima.'],
    ['人生は夢だ。', 'lipeta pio tulima.'],
    ['私はテニスをする。', 'mi topo tenisa.'],
    ['The apple is red.', 'apa pio lete.'],
    ['I eat bread and you drink water.', 'mi ito pana, e tu liko jeta.'],
  ];
  cases.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'auto').logi, logi, src);
  });
});

test('現代・IT語彙（v0.9）: プログラム（名詞）とプログラムする（動詞）を区別する', () => {
  const cases = [
    ['私はプログラムを書く。', 'mi kako puwoja.'],
    ['I write a program.', 'mi kako puwoja.'],
    ['彼は人工知能を使う。', 'li juso alutipa.'],
    ['I upload a password.', 'mi upujo pasiwa.'],
  ];
  cases.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'auto').logi, logi, src);
  });
});

test('動詞の名詞化: 日本語の「Vのが」「Vこと」と英語の動名詞の主語', () => {
  const cases = [
    ['私は食べるのが好きです。', 'mi laiko itona.'],
    ['私は食べることが好きです。', 'mi laiko itona.'],
    ['私はリンゴを食べることが好きです。', 'mi laiko itona apa.'],
    ['私は本を読むのが好きです。', 'mi laiko lotona pupa.'],
    ['私は公園で走るのが好きです。', 'mi laiko lanona atute paka.'],
    ['食べるのは楽しい。', 'itona pio enuke.'],
    ['私は泳ぐのを見る。', 'mi sio suwimona.'],
    ['Running is fun.', 'lanona pio enuke.'],
    ['Eating apples is good.', 'itona mene apa pio kute.'],
    ['Swimming in the sea is fun.', 'suwimona inute sia pio enuke.'],
    ['I enjoy running.', 'mi enuso lanona.'],
    ['I like eating apples.', 'mi laiko itona mene apa.'],
    ['He is running.', 'li konu lano.'],
  ];
  cases.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'auto').logi, logi, src);
  });
});

test('動詞の名詞化: 否定・過去は省略して注意書きを出す', () => {
  const r = translator.translate('私は食べないのが好きです。', 'ja');
  assert.strictEqual(r.logi, 'mi laiko itona.');
  assert.ok(r.notes.some((n) => n.includes('否定・過去は表せない')));
});

test('提案001: 指示詞・ここ／そこ・はい／いいえ・いくつ／いくら', () => {
  const cases = [
    // 指示詞（日本語）
    ['これは良い。', 'iliu pio kute.'],
    ['このリンゴは赤い。', 'iliu apa pio lete.'],
    ['あの人は先生です。', 'teliu mana pio titusa.'],
    ['あれが好きです。', 'teliu pio suke.'],
    // 場所
    ['私はここへ行く。', 'mi iko tote ili.'],
    ['彼はそこから来る。', 'li komo pulomute teli.'],
    ['ここにリンゴがあります。', 'apa alo atute ili.'],
    // はい／いいえ
    ['はい。', 'jesu.'],
    ['いいえ。', 'no.'],
    ['はい、私はリンゴが好きです。', 'jesu, mi laiko apa.'],
    ['いいえ、私はリンゴが好きではありません。', 'no, mi no laiko apa.'],
    ['これはいくらですか？', 'iliu pio aua mene ka?'],
    // いくつ・何歳
    ['あなたはリンゴをいくつ食べましたか？', 'tu pasu ito aua mene apa ka?'],
    ['あなたは何歳ですか？', 'tu oto wata ila ka?'],
    // 英語
    ['This is good.', 'iliu pio kute.'],
    ['I like that apple.', 'mi laiko teliu apa.'],
    ['What is that?', 'teliu pio wata ka?'],
    ['I go to here.', 'mi iko tote ili.'],
    ['He comes from there.', 'li komo pulomute teli.'],
    ['Yes.', 'jesu.'],
    ['No, I do not like apples.', 'no, mi no laiko mene apa.'],
    ['How old are you?', 'tu oto wata ila ka?'],
    ['How many apples do you have?', 'tu oto aua mene apa ka?'],
    ['How much is it?', 'li pio aua mene ka?'],
    ['Where is he?', 'li alo atute wela ka?'],
  ];
  cases.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'auto').logi, logi, src);
  });
});

test('提案001: 「これはいくら」の「はい」を、答えの「はい」と取り違えない', () => {
  assert.ok(!translator.translate('これはいくらですか？', 'ja').logi.includes('jesu'));
});

test('提案002: あいさつ（こんにちは・さようなら・どうぞ）を文頭に置く', () => {
  const cases = [
    ['こんにちは。', 'kelosu.'],
    ['こんにちは、私はリンゴが好きです。', 'kelosu, mi laiko apa.'],
    ['さようなら。', 'kupaju.'],
    ['どうぞ、これは良いです。', 'pilisu, iliu pio kute.'],
    ['Hello.', 'kelosu.'],
    ['Hi, I like apples.', 'kelosu, mi laiko mene apa.'],
    ['Goodbye.', 'kupaju.'],
    ['Please.', 'pilisu.'],
    ['This is good, please.', 'pilisu, iliu pio kute.'],
  ];
  cases.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'auto').logi, logi, src);
  });
});

test('提案002: 文の途中の「どうぞ」は、あいさつと取り違えない', () => {
  assert.ok(!translator.translate('私はどうぞを知らない。', 'ja').logi.includes('pilisu'));
});

test('提案003: 命令・依頼・禁止・勧誘は、文末を ! にする', () => {
  const cases = [
    ['リンゴを食べなさい。', 'ito apa!'],
    ['リンゴを食べてください。', 'pilisu, ito apa!'],
    ['リンゴを食べて。', 'ito apa!'],
    ['ここへ行きなさい。', 'iko tote ili!'],
    ['リンゴを食べるな。', 'no ito apa!'],
    ['リンゴを食べないでください。', 'pilisu, no ito apa!'],
    ['リンゴを食べましょう。', 'misu ito apa!'],
    ['リンゴを食べよう。', 'misu ito apa!'],
    ['ここへ行きましょう。', 'misu iko tote ili!'],
    ['どうぞ、リンゴを食べなさい。', 'pilisu, ito apa!'],
    ['Eat an apple.', 'ito apa!'],
    ['Eat an apple!', 'ito apa!'],
    ['Do not eat the apple.', 'no ito apa!'],
    ['Please eat an apple.', 'pilisu, ito apa!'],
    ['Eat an apple, please.', 'pilisu, ito apa!'],
    ['Let us eat an apple.', 'misu ito apa!'],
    ["Let's go to here.", 'misu iko tote ili!'],
  ];
  cases.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'auto').logi, logi, src);
  });
});

test('提案003: 命令の文は、「主語が見つからない」という注意を出さない', () => {
  assert.ok(!translator.translate('Eat an apple.', 'en').notes.some((n) => n.includes('主語が見つかりません') || n.includes('主語が見つからない')));
});

test('提案003: 主語のある平叙文や、Thank you は、命令にしない', () => {
  assert.strictEqual(translator.translate('I eat an apple.', 'en').logi, 'mi ito apa.');
  assert.strictEqual(translator.translate('Thank you.', 'en').logi, 'mi tanako tu.');
  // 文の途中の「食べるなら」「食べようと」は、命令・勧誘の形にしない
  assert.ok(!translator.translate('私はリンゴを食べるなら行く。', 'ja').logi.includes('!'));
  assert.ok(!translator.translate('私はリンゴを食べようと思う。', 'ja').logi.includes('misu'));
});

test('提案004: 疑問での許可・依頼・申し出は、kani・sati を使う', () => {
  const cases = [
    ['リンゴを食べてもいいですか？', 'mi kani ito apa ka?'],
    ['ここへ行ってもいいですか？', 'mi kani iko tote ili ka?'],
    ['リンゴを食べてくれませんか？', 'tu kani ito apa ka?'],
    ['リンゴを食べてもらえませんか？', 'pilisu, tu kani ito apa ka?'],
    ['リンゴを食べていただけますか？', 'pilisu, tu kani ito apa ka?'],
    ['リンゴを食べてくださいませんか？', 'pilisu, tu kani ito apa ka?'],
    ['リンゴを食べましょうか？', 'mi sati ito apa ka?'],
    ['May I eat an apple?', 'mi kani ito apa ka?'],
    ['Could I eat an apple?', 'mi kani ito apa ka?'],
    ['Could you eat an apple?', 'tu kani ito apa ka?'],
    ['Could you please eat an apple?', 'pilisu, tu kani ito apa ka?'],
    ['Shall I eat an apple?', 'mi sati ito apa ka?'],
  ];
  cases.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'auto').logi, logi, src);
  });
});

test('提案004: 可能性の may・平叙文の勧誘・Would you は、変えない', () => {
  assert.strictEqual(translator.translate('He may come.', 'en').logi, 'li mei komo.');
  assert.strictEqual(translator.translate('リンゴを食べましょう。', 'ja').logi, 'misu ito apa!');
  assert.strictEqual(translator.translate('Would you eat an apple?', 'en').logi, 'tu wutu ito apa ka?');
});

test('提案005: 日常のあいさつは、既存の語で言う', () => {
  const cases = [
    ['おはよう', 'kute mola.'],
    ['おはようございます。', 'kute mola.'],
    ['おやすみなさい！', 'kute naita.'],
    ['すみません。', 'mi pio moke.'],
    ['ごめんなさい', 'mi pio moke.'],
    ['ありがとうございました。', 'mi tanako tu.'],
    ['Good morning.', 'kute mola.'],
    ['Good night!', 'kute naita.'],
    ['Sorry.', 'mi pio moke.'],
    ['Excuse me.', 'mi pio moke.'],
    ['Thanks.', 'mi tanako tu.'],
    ['Thank you.', 'mi tanako tu.'],
  ];
  cases.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'auto').logi, logi, src);
  });
  assert.strictEqual(translator.translate('おはよう。ありがとう。', 'ja').logi, 'kute mola. mi tanako tu.');
});

test('提案005: 文の一部のあいさつ語や、疑問文は、あいさつにしない', () => {
  assert.notStrictEqual(translator.translate('すみませんか？', 'ja').logi, 'mi pio moke.');
  assert.strictEqual(translator.translate('リンゴを食べる。', 'ja').logi, 'ito apa.');
});

test('提案006: 平叙文の許可・禁止・不要は、kani・masi no・kani no を使う', () => {
  const cases = [
    ['リンゴを食べてもいい。', 'tu kani ito apa.'],
    ['リンゴを食べてもいいよ。', 'tu kani ito apa.'],
    ['リンゴを食べてもよい。', 'tu kani ito apa.'],
    ['私はリンゴを食べてもいい。', 'mi kani ito apa.'],
    ['リンゴを食べてはいけない。', 'tu masi no ito apa.'],
    ['リンゴを食べてはならない。', 'tu masi no ito apa.'],
    ['リンゴを食べなくてもいい。', 'tu kani no ito apa.'],
    ['リンゴを食べなくてもよいです。', 'tu kani no ito apa.'],
    ['You may eat an apple.', 'tu kani ito apa.'],
    ['You may not eat an apple.', 'tu masi no ito apa.'],
    ['You do not have to eat an apple.', 'tu kani no ito apa.'],
    ['You need not eat an apple.', 'tu kani no ito apa.'],
    ['He does not have to eat an apple.', 'li kani no ito apa.'],
  ];
  cases.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'auto').logi, logi, src);
  });
});

test('提案006: 可能性の may・疑問の許可・義務は、変えない', () => {
  assert.strictEqual(translator.translate('He may come.', 'en').logi, 'li mei komo.');
  assert.strictEqual(translator.translate('I may go.', 'en').logi, 'mi mei iko.');
  assert.strictEqual(translator.translate('リンゴを食べてもいいですか？', 'ja').logi, 'mi kani ito apa ka?');
  assert.strictEqual(translator.translate('リンゴを食べなければならない。', 'ja').logi, 'masi ito apa.');
});

test('提案007: 目的・様態・対比の接続は、pote + 動名詞・kasolu・patu で言う', () => {
  const cases = [
    ['私はリンゴを食べるために学校へ行く。', 'mi iko tote sukula pote itona apa.'],
    ['リンゴを食べるために学校へ行く。', 'iko tote sukula pote itona apa.'],
    ['彼が言うように、私は行く。', 'kasolu li juo, mi iko.'],
    ['私は食べる一方で、彼は寝る。', 'mi ito, patu li neo.'],
    ['私は食べるが、彼は寝る。', 'mi ito, patu li neo.'],
    ['I go to school to eat an apple.', 'mi iko tote sukula pote itona apa.'],
    ['I go to school in order to eat an apple.', 'mi iko tote sukula pote itona apa.'],
    ['I go to the park to run.', 'mi iko tote paka pote lanona.'],
    ['He left as I said.', 'li pasu lepo, kasolu mi pasu juo.'],
    ['He eats whereas she sleeps.', 'li ito, patu li neo.'],
    ['He eats; on the other hand, she sleeps.', 'li ito, patu li neo.'],
  ];
  cases.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'auto').logi, logi, src);
  });
});

test('提案007: 補語の to + 動詞・名詞の「ために」・場所の to は、目的にしない', () => {
  assert.strictEqual(translator.translate('I want to eat an apple.', 'en').logi, 'mi wonuto itona apa.');
  assert.strictEqual(translator.translate('I go to school.', 'en').logi, 'mi iko tote sukula.');
  assert.strictEqual(translator.translate('本のために行く。', 'ja').logi, 'iko pote pupa.');
});

test('間接命令の「〜ように言った」は、様態の kasolu にしない', () => {
  ['彼は私にリンゴを食べるように言った。', '彼は私にリンゴを食べるように頼んだ。'].forEach((src) => {
    assert.ok(!/kasolu/.test(translator.translate(src, 'ja').logi), src);
  });
  assert.strictEqual(translator.translate('彼が言うように、私は行く。', 'ja').logi, 'kasolu li juo, mi iko.');
});

test('提案008: 暦と時刻（日本語）', () => {
  const cases = [
    ['3月5日です。', 'li pio monata te teia pe.'],
    ['私は3時に起きる。', 'mi oko atute ula te.'],
    ['午後2時30分に会う。', 'mito atute apuja ula to minuta te pulu.'],
    ['水曜日に会う。', 'mito onute wetuna.'],
    ['3月に行く。', 'iko inute monata te.'],
    ['2026年3月5日に生まれた。', 'pasu poleno onute ila to mipulu ni kupulu to pulu so monata te teia pe.'],
    ['私は毎週走る。', 'mi lano epule wika.'],
    ['私は来年行く。', 'mi iko nete ila.'],
    ['先週リンゴを食べた。', 'pasu ito apa sese wika.'],
    ['毎週リンゴを食べる。', 'ito apa epule wika.'],
  ];
  cases.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'ja').logi, logi, src);
  });
});

test('提案008: 数 + 単位は数量のまま（3か月・3時間・5日・2年）', () => {
  assert.strictEqual(translator.translate('3か月走る。', 'ja').logi, 'lano te muna.');
  assert.strictEqual(translator.translate('3時間走る。', 'ja').logi, 'lano te taima.');
  assert.strictEqual(translator.translate('2年走る。', 'ja').logi, 'lano to ila.');
  assert.strictEqual(translator.translate('私は20歳です。', 'ja').logi, 'mi oto to pulu ila.');
});

test('提案008: 暦と時刻（英語）', () => {
  const cases = [
    ['I go in March.', 'mi iko inute monata te.'],
    ["It is 3 o'clock.", 'li pio ula te.'],
    ['It is March 5.', 'li pio monata te teia pe.'],
    ['We meet on Wednesday.', 'misu mito onute wetuna.'],
    ['I run every week.', 'mi lano epule wika.'],
    ['I will go next year.', 'mi putu iko nete ila.'],
    ['You may eat an apple.', 'tu kani ito apa.'],
  ];
  cases.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'en').logi, logi, src);
  });
});

test('提案009: 間接疑問（節 + ka）', () => {
  const cases = [
    ['彼は私が何を食べたか聞いた。', 'ja', 'li pasu asuko mi pasu ito wata ka.'],
    ['私は彼が来るかどうか知らない。', 'ja', 'mi no mo li komo ka.'],
    ['何を食べたか覚えていない。', 'ja', 'mi no upo pasu ito wata ka.'],
    ['He asked what I ate.', 'en', 'li pasu asuko mi pasu ito wata ka.'],
    ['I do not know whether he comes.', 'en', 'mi no mo li komo ka.'],
    ['I know who ate an apple.', 'en', 'mi mo kua pasu ito apa ka.'],
  ];
  cases.forEach(([src, lang, logi]) => {
    assert.strictEqual(translator.translate(src, lang).logi, logi, src);
  });
  // 「聞く」は、か の節がないときは聞こえる・聞く（oo）のまま
  assert.strictEqual(translator.translate('先生に聞く。', 'ja').logi, 'oo tote titusa.');
});

test('提案009: 間接命令（sati）と引用の主語（selu）', () => {
  const cases = [
    ['彼は私にリンゴを食べるように言った。', 'ja', 'li pasu juo mi sati ito apa.'],
    ['彼は私にリンゴを食べるように頼んだ。', 'ja', 'li pasu tano mi sati ito apa.'],
    ['彼は私に行くなと言った。', 'ja', 'li pasu juo mi sati no iko.'],
    ['彼は私に行かないように命じた。', 'ja', 'li pasu olo mi sati no iko.'],
    ['彼は来ると言った。', 'ja', 'li pasu juo selu komo.'],
    ['彼は私が来ると言った。', 'ja', 'li pasu juo mi komo.'],
    ['He told me to eat an apple.', 'en', 'li pasu juo mi sati ito apa.'],
    ['He told me not to go.', 'en', 'li pasu juo mi sati no iko.'],
    ['He asked me to eat an apple.', 'en', 'li pasu tano mi sati ito apa.'],
  ];
  cases.forEach(([src, lang, logi]) => {
    assert.strictEqual(translator.translate(src, lang).logi, logi, src);
  });
  // 様態の「ように」は kasolu のまま
  assert.strictEqual(translator.translate('彼が言うように、私は行く。', 'ja').logi, 'kasolu li juo, mi iko.');
});

test('提案010: 敬語は意味だけ訳す', () => {
  const cases = [
    ['先生がおっしゃった。', 'titusa pasu juo.'],
    ['お客様がいらっしゃいます。', 'kesuta alo.'],
    ['召し上がってください。', 'pilisu, ito!'],
    ['ご覧ください。', 'pilisu, sio!'],
    ['お待ちください。', 'pilisu, mato!'],
    ['ご確認ください。', 'pilisu, jejo!'],
    ['私が参ります。', 'mi iko.'],
    ['学校へいらっしゃいます。', 'iko tote sukula.'],
    ['拝見しました。', 'pasu sio.'],
    ['先生がなさった。', 'titusa pasu topo.'],
    ['いらっしゃいませ。', 'weluko!'],
    ['ごちそうさまでした。', 'mi tanako tu.'],
    ['お願いします。', 'pilisu.'],
    ['ジョンさんが来ます。', '[ジョン?] komo.'],
  ];
  cases.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'ja').logi, logi, src);
  });
  // 食事のあいさつは訳さない（提案005 Q3）
  assert.strictEqual(translator.translate('いただきます。', 'ja').logi, '[いただきます?].');
});

test('提案011: 日常のあいさつの続きと願いの言葉', () => {
  const ja = [
    ['こんばんは。', 'kute ipa.'],
    ['お元気ですか？', 'tu pio miwe ka?'],
    ['元気です。', 'mi pio miwe.'],
  ];
  ja.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'ja').logi, logi, src);
  });
  const en = [
    ['Good evening.', 'kute ipa.'],
    ['Good afternoon.', 'kute apuja.'],
    ['How are you?', 'tu pio miwe ka?'],
    ['I am fine.', 'mi pio miwe.'],
    ['Good luck.', 'kute luna!'],
    ['Have a nice day.', 'kute teia!'],
    ['See you tomorrow.', 'mi putu sio tu moloa.'],
  ];
  en.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'en').logi, logi, src);
  });
  // 一般の形容詞だけの文には主語を補わない
  assert.strictEqual(translator.translate('寒いです。', 'ja').logi, 'pio kole.');
});

test('提案013: 助数詞は落とし、順序数は semuna、回数は taima、単位は数 + 単位の語', () => {
  const ja = [
    ['私はリンゴを3個食べる。', 'mi ito te apa.'],
    ['犬が2匹いる。', 'to tuka alo.'],
    ['私は本を3冊読む。', 'mi loto te pupa.'],
    ['鉛筆が5本ある。', 'pe penusa alo.'],
    ['3個のリンゴを食べる。', 'ito te apa.'],
    ['家は3番目です。', 'usa pio semuna te.'],
    ['第3章。', 'samota semuna te.'],
    ['私は3回行った。', 'mi pasu iko te taima.'],
    ['私は水を2リットル飲む。', 'mi liko to litapa jeta.'],
    ['私は10キロメートル走る。', 'mi lano pa pulu kipoma.'],
  ];
  ja.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'ja').logi, logi, src);
  });
  const en = [
    ['I live in the third house.', 'mi lipo inute usa semuna te.'],
    ['I eat the first apple.', 'mi ito apa semuna pa.'],
    ['I drink two liters of water.', 'mi liko to litapa jeta.'],
    ['I ran 10 kilometers.', 'mi pasu lano pa pulu kipoma.'],
  ];
  en.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'en').logi, logi, src);
  });
  // 本・頭は、助詞のあとの数のときだけ助数詞（名詞の「本」を壊さない）
  assert.strictEqual(translator.translate('私は本を読む。', 'ja').logi, 'mi loto pupa.');
});

test('提案014: 同じくらい・動詞の比較・最上級の範囲', () => {
  const ja = [
    ['私は彼と同じくらい忙しい。', 'mi pio seme wuje tote li.'],
    ['彼は私ほど速くない。', 'li no pio seme pasute tote mi.'],
    ['彼女は私より上手に歌う。', 'li sino moli poni tanute mi.'],
    ['彼は私よりもっと食べる。', 'li ito moli tanute mi.'],
    ['彼女は私たちの中で一番若い。', 'li pio mosi jowe inute misu.'],
    ['これは一番大きい。', 'iliu pio mosi lase.'],
  ];
  ja.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'ja').logi, logi, src);
  });
  const en = [
    ['I am as tall as him.', 'mi pio seme wawe tote li.'],
    ['He is not as fast as me.', 'li no pio seme pasute tote mi.'],
    ['She sings better than me.', 'li sino moli poni tanute mi.'],
    ['This is the biggest.', 'iliu pio mosi lase.'],
    ['She is the youngest of us.', 'li pio mosi jowe inute misu.'],
    ['I am better than you.', 'mi pio moli kute tanute tu.'],
  ];
  en.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'en').logi, logi, src);
  });
});

test('提案015: 変化（〜になる・だんだん・ますます・〜にする）', () => {
  const ja = [
    ['寒くなる。', 'li pekomo kole.'],
    ['彼は先生になった。', 'li pasu pekomo titusa.'],
    ['水が氷になる。', 'jeta pekomo aisa.'],
    ['だんだん寒くなる。', 'li kulapi pekomo kole.'],
    ['ますます忙しくなる。', 'li initi pekomo wuje.'],
    ['もっと寒くなる。', 'li pekomo moli kole.'],
    ['暗くなってきた。', 'li pasu pekomo take.'],
    ['彼女は静かになった。', 'li pasu pekomo kue.'],
    ['寒くならない。', 'li no pekomo kole.'],
    ['寒くなると思う。', 'omo li pekomo kole.'],
    ['私は部屋を大きくする。', 'mi koso luma lase.'],
    ['私は彼を先生にする。', 'mi koso li titusa.'],
    ['彼は私を幸せにした。', 'li pasu koso mi ape.'],
    ['コーヒーにする。', 'tuso kupa.'],
  ];
  ja.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'ja').logi, logi, src);
  });
  const en = [
    ['It becomes cold.', 'li pekomo kole.'],
    ['He became a teacher.', 'li pasu pekomo titusa.'],
    ['It is getting colder.', 'li konu pekomo moli kole.'],
    ['It got dark.', 'li pasu pekomo take.'],
    ['It gradually becomes cold.', 'li kulapi pekomo kole.'],
    ['It is getting colder and colder.', 'li initi konu pekomo kole.'],
    ['Make the room big.', 'koso luma lase!'],
    ['He made me happy.', 'li pasu koso mi ape.'],
    ['I get cold water.', 'mi leso kole jeta.'],
    ['Turn left.', 'tuluno [left?]!'],
  ];
  en.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'en').logi, logi, src);
  });
});

test('提案016: 形容詞から作る副詞（-e → -i）', () => {
  const ja = [
    ['彼女は美しく歌う。', 'li pieti sino.'],
    ['彼女は幸せに笑った。', 'li api pasu lapo.'],
    ['彼は礼儀正しく話す。', 'li poli toko.'],
    ['彼は速く走る。', 'li pasuti lano.'],   // 辞書の副詞が先
    ['静かに歩く。', 'sili wako.'],
  ];
  ja.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'ja').logi, logi, src);
  });
  const en = [
    ['She smiled happily.', 'li api pasu sumilo.'],
    ['He speaks politely.', 'li poli toko.'],
    ['She sings beautifully.', 'li pieti sino.'],
    ['He runs quickly.', 'li pasuti lano.'],
    ['He speaks clearly.', 'li kili toko.'],
  ];
  en.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'en').logi, logi, src);
  });
  // 辞書にその形の語がある形容詞（lete 赤い の leti = 遅く）は、派生しない
  assert.ok(translator.translate('赤く光る。', 'ja').unknown.indexOf('く') >= 0);
  // ile（高い）の副詞は、派生ではなく辞書の別の語 uji（第26弾で追加）
  assert.strictEqual(translator.translate('高く飛ぶ。', 'ja').logi, 'uji pulaio.');
});

test('提案017: 倍・半分・分数・割合', () => {
  const ja = [
    ['これはあれの2倍大きい。', 'iliu pio to taima seme lase tote teliu.'],
    ['彼は私の3倍速い。', 'li pio te taima seme pasute tote mi.'],
    ['リンゴを半分食べる。', 'ito alema apa.'],
    ['リンゴの3分の1を食べる。', 'ito pa semuna te apa.'],
    ['3分の2のリンゴを食べる。', 'ito to semuna te apa.'],
    ['リンゴを20パーセント食べた。', 'pasu ito to pulu pepuka apa.'],
    ['3分待つ。', 'mato te minuta.'],   // 3分（3 minutes）は分数ではない
  ];
  ja.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'ja').logi, logi, src);
  });
  const en = [
    ['It is twice as big as that.', 'li pio to taima seme lase tote teliu.'],
    ['It is three times as big as that.', 'li pio te taima seme lase tote teliu.'],
    ['I ate half of the apple.', 'mi pasu ito alema apa.'],
    ['I ate two thirds of the apple.', 'mi pasu ito to semuna te apa.'],
    ['I ate a third of the apple.', 'mi pasu ito pa semuna te apa.'],
    ['I ate 20% of the apples.', 'mi pasu ito to pulu pepuka mene apa.'],
    ['I waited half an hour.', 'mi pasu mato alema ula.'],
  ];
  en.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'en').logi, logi, src);
  });
});

test('提案018: 動詞に続く表現（〜たい・〜始める・〜終わる・〜続ける・〜すぎる・〜やすい・〜にくい）', () => {
  const ja = [
    ['私は食べたい。', 'mi wonuto itona.'],
    ['私は食べたくない。', 'mi no wonuto itona.'],
    ['私は行きたかった。', 'mi pasu wonuto ikona.'],
    ['私は本を読みたいです。', 'mi wonuto lotona pupa.'],
    ['彼は食べ始めた。', 'li pasu sutato itona.'],
    ['私は本を読み終わった。', 'mi pasu pino lotona pupa.'],
    ['彼は水を飲み続けた。', 'li pasu konupo likona jeta.'],
    ['私は食べすぎた。', 'mi tui pasu ito.'],
    ['彼は走りすぎた。', 'li tui pasu lano.'],
    ['これは大きすぎる。', 'iliu tui pio lase.'],
    ['この本は読みやすい。', 'iliu pupa pio ise lotona.'],
    ['この本は読みにくい。', 'iliu pupa pio tipike lotona.'],
    ['読みやすい本が好きだ。', 'pupa ta li pio ise lotona pio suke.'],
    ['食べたい人が来た。', 'mana ta li wonuto itona pasu komo.'],
  ];
  ja.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'ja').logi, logi, src);
  });
  const en = [
    ['I want to eat.', 'mi wonuto itona.'],
    ['I don\'t want to eat.', 'mi no wonuto itona.'],
    ['He started to eat.', 'li pasu sutato itona.'],
    ['I finished eating.', 'mi pasu pino itona.'],
    ['He kept eating.', 'li pasu konupo itona.'],
    ['I keep a book.', 'mi kipo pupa.'],          // keep + 名詞 は kipo のまま
    ['I ate too much.', 'mi tui pasu ito.'],
    ['It is too hot.', 'li tui pio ote.'],
    ['I want it too.', 'mi olusi wonuto li.'],      // 文末の too（〜も）は olusi のまま
    ['It is easy to eat.', 'li pio ise itona.'],
    ['This book is difficult to read.', 'iliu pupa pio tipike lotona.'],
    ['It is hard to read.', 'li pio tipike lotona.'],
    ['The bed is hard.', 'pita pio aluke.'],       // to + 動詞が続かない hard は「硬い」のまま
  ];
  en.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'en').logi, logi, src);
  });
});

test('提案019: 授受（あげる・くれる・もらう・〜てあげる・〜てくれる・〜てもらう）', () => {
  const ja = [
    ['彼は私に本をくれた。', 'li pasu kipo pupa tote mi.'],
    ['私は彼に本をあげた。', 'mi pasu kipo pupa tote li.'],
    ['私は彼から本をもらった。', 'mi pasu leso pupa pulomute li.'],
    ['私は彼に本をもらった。', 'mi pasu leso pupa pulomute li.'],   // もらう の「に」は与えた人
    ['母が私に服を買ってくれた。', 'mama pasu puo kulosa pote mi.'],
    ['彼は私に服を買ってくれなかった。', 'li pasu no puo kulosa pote mi.'],
    ['私は友達に助けてもらった。', 'pulena pasu elupo mi.'],            // 助ける は受け手が目的語
    ['私は友達に本を読んでもらった。', 'pulena pasu loto pupa pote mi.'],
    ['私は彼を助けてあげた。', 'mi pasu elupo li.'],
    ['私は友達に本を読んであげた。', 'mi pasu loto pupa pote pulena.'],
  ];
  ja.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'ja').logi, logi, src);
  });
  // 〜てくれませんか は依頼のまま（授受の くれる にしない）
  assert.ok(/ka\?$/.test(translator.translate('買ってくれませんか。', 'ja').logi));
  const en = [
    ['She bought me a book.', 'li pasu puo pupa pote mi.'],
    ['She bought a book for me.', 'li pasu puo pupa pote mi.'],
    ['He gave me a book.', 'li pasu kipo pupa tote mi.'],            // give・show・send などは tote のまま
    ['She lent me a book.', 'li pasu lenuto pupa tote mi.'],
    ['I received a book from him.', 'mi pasu leso pupa pulomute li.'],
  ];
  en.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'en').logi, logi, src);
  });
});

test('提案020: 経験・予定・決心・〜たばかり', () => {
  const ja = [
    ['私は本を読んだことがある。', 'mi pinu loto pupa.'],
    ['私は魚を食べたことがない。', 'mi nepi pinu ito tosa.'],
    ['私は魚を食べたことがありません。', 'mi nepi pinu ito tosa.'],
    ['あなたは本を読んだことがありますか。', 'tu epepi pinu loto pupa ka?'],
    ['私は本を読むつもりだ。', 'mi pulao lotona pupa.'],
    ['私は本を読むつもりはない。', 'mi no pulao lotona pupa.'],
    ['私は行くつもりでした。', 'mi pasu pulao ikona.'],
    ['私は毎日本を読むことにした。', 'mi pasu poso lotona pupa epule teia.'],
    ['私は本を読んだばかりだ。', 'mi onuli pasu loto pupa.'],
    ['私は本を読んだ。', 'mi pasu loto pupa.'],            // ふつうの過去は変わらない
    ['食べることが好きだ。', 'itona pio suke.'],            // 名詞の「こと」は変わらない
  ];
  ja.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'ja').logi, logi, src);
  });
  const en = [
    ['I have read a book.', 'mi pinu loto pupa.'],            // read は原形と同じ形の過去分詞
    ['I have never read a book.', 'mi nepi pinu loto pupa.'],
    ['Have you ever read a book?', 'tu epepi pinu loto pupa ka?'],
    ['I have been to school.', 'mi pinu iko tote sukula.'],
    ['I have just read a book.', 'mi onuli pasu loto pupa.'],
    ['I decided to read a book.', 'mi pasu poso lotona pupa.'],
    ['I plan to read a book.', 'mi pulao lotona pupa.'],
    ['I intend to read a book.', 'mi pulao lotona pupa.'],
    ['I have eaten.', 'mi pinu ito.'],
  ];
  en.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'en').logi, logi, src);
  });
});

test('提案022: 〜ている（状態と進行）・〜ようになる・〜ことになる・〜ところだ', () => {
  const ja = [
    ['彼は結婚している。', 'li malo.'],                       // 状態の動詞は konu を付けない
    ['私は彼を知っている。', 'mi mo li.'],
    ['彼は結婚していた。', 'li pasu malo.'],
    ['彼は食べている。', 'li konu ito.'],                    // 動作は進行のまま
    ['彼は本を読むようになった。', 'li pasu pekomo lotona pupa.'],
    ['彼は本を読むようにならない。', 'li no pekomo lotona pupa.'],
    ['来月結婚することになった。', 'somena pasu poso malona nete monata.'],
    ['私は来月結婚することになった。', 'somena pasu poso mi malona nete monata.'],
    ['私は本を読むことにした。', 'mi pasu poso lotona pupa.'],   // 自分で決めた ことにする は変わらない
    ['私は食べるところだ。', 'mi suni ito.'],
    ['私は食べるところでした。', 'mi suni pasu ito.'],
    ['私は食べているところだ。', 'mi konu ito.'],
    ['私は食べたところだ。', 'mi onuli pasu ito.'],
  ];
  ja.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'ja').logi, logi, src);
  });
  const en = [
    ['I am about to eat.', 'mi suni ito.'],
    ['She was about to leave.', 'li suni pasu lepo.'],
    ['I am eating.', 'mi konu ito.'],
    ['I came to like it.', 'mi pasu pekomo laikona li.'],
    ['I come to see you.', 'mi komo pote siona tu.'],       // 目的の to は変わらない
  ];
  en.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'en').logi, logi, src);
  });
});

test('提案023: 可能形 + ようになる・結果の状態の〜ている・make + 目的語 + 名詞', () => {
  const ja = [
    ['私は泳げるようになった。', 'mi pasu pekomo kani suwimo.'],
    ['私は走れるようにならなかった。', 'mi pasu no pekomo kani lano.'],
    ['窓が開いている。', 'winuta pio apele.'],
    ['窓が開いていた。', 'winuta pasu pio apele.'],
    ['床が乾いている。', 'pupula pio tulaie.'],
    ['彼は走っている。', 'li konu lano.'],                 // 動作の〜ている は進行のまま
    ['私は彼を先生にした。', 'mi pasu koso li titusa.'],
    ['彼は私に昼食を作ってくれた。', 'li pasu meko lunusa pote mi.'],
  ];
  ja.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'ja').logi, logi, src);
  });
  const en = [
    ['They made him a teacher.', 'lisu pasu koso li titusa.'],
    ['He made me lunch.', 'li pasu meko lunusa pote mi.'],
    ['She made me a cup.', 'li pasu meko kapa pote mi.'],
    ['The news made her happy.', 'nota pasu koso li ape.'],
    ['I made tea.', 'mi pasu meko tia.'],
    ['I made him come.', 'mi pasu koso li [come?].'],       // 代名詞が続く make は、これまでどおり
  ];
  en.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'en').logi, logi, src);
  });
});

test('提案024: 数量・程度の言い方', () => {
  const ja = [
    ['私はたくさん食べた。', 'mi meni pasu ito.'],
    ['私はそれを全部食べた。', 'mi epuli pasu ito li.'],
    ['ほとんどの人が来た。', 'elumi epule mana pasu komo.'],
    ['ほとんど食べなかった。', 'elumi pasu no ito.'],     // 動詞のほとんどは、これまでどおり
    ['私はあまり食べない。', 'mi meni no ito.'],
    ['これはあまり高くない。', 'iliu peli no pio ile.'],
    ['私は少し疲れている。', 'mi sumoli pio tilete.'],
    ['とても大きい家がある。', 'peli lase usa alo.'],
    ['たくさんの本を読んだ。', 'pasu loto mene pupa.'],
  ];
  ja.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'ja').logi, logi, src);
  });
  const en = [
    ['I ate a lot.', 'mi meni pasu ito.'],
    ['I do not eat much.', 'mi meni no ito.'],
    ['I eat a little.', 'mi sumoli ito.'],
    ['I am a little tired.', 'mi sumoli pio tilete.'],
    ['Most people came.', 'elumi epule mana pasu komo.'],
    ['Most of the people came.', 'elumi epule mana pasu komo.'],
    ['Few students came.', 'piue sutua pasu komo.'],
    ['All the students came.', 'epule sutua pasu komo.'],
    ['Many people came.', 'mene mana pasu komo.'],
    ['I ate all of it.', 'mi epuli pasu ito li.'],
    ['He is not very tall.', 'li peli no pio wawe.'],
    ['I read a lot of books.', 'mi loto mene pupa.'],
    ['Students came.', 'mene sutua pasu komo.'],          // 数量の語がない複数形は、これまでどおり
  ];
  en.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'en').logi, logi, src);
  });
});

test('日本語の入力の取りこぼし: 関係節の中の目的語・使役・目的語の対比の「は」', () => {
  const ja = [
    ['私は私にリンゴをくれた人を見る。', 'mi sio mana ta li pasu kipo apa tote mi.'],
    ['私は本を読んだ人を見る。', 'mi sio mana ta li pasu loto pupa.'],
    ['私は彼を来させる。', 'mi koso li tote komona.'],
    ['私は彼に食べさせる。', 'mi koso li tote itona.'],
    ['私は彼に本を読ませた。', 'mi pasu koso li tote lotona pupa.'],
    ['私は彼を走らせなかった。', 'mi pasu no koso li tote lanona.'],
    ['私は犬が好きだが、猫は好きではない。', 'mi laiko tuka, patu mi no laiko kata.'],
    ['猫は好きではない。', 'kata no pio suke.'],          // 前の節がなければ、猫が主語のまま
    ['私は彼に本を見せた。', 'mi pasu mowo pupa tote li.'],  // 辞書の 見せる が先（使役の 見させる ではない）
  ];
  ja.forEach(([src, logi]) => {
    assert.strictEqual(translator.translate(src, 'ja').logi, logi, src);
  });
});
