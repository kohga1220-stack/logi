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

// 日本語の入力として未対応の構文（使役・目的語の対比の「は」・くれる/あげる）
const UNSUPPORTED_JA = new Set([19, 22, 26, 35]);

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
  ['彼が来るから、私は行く。', 'li komo, sonu mi iko.'],
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
  ['I like him because he is a teacher.', 'li pio titusa, sonu mi laiko li.'],
  ['Because he is a teacher, I like him.', 'li pio titusa, sonu mi laiko li.'],
  ['If he comes, I go.', 'ipu li komo, mi iko.'],
  ['I go if he comes.', 'ipu li komo, mi iko.'],
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

test('辞書にない接続語（when など）は [語?] で残し、注意書きを出す', () => {
  const r = translator.translate('I eat when you come.', 'en');
  assert.ok(r.logi.includes('[when?]'));
  assert.deepStrictEqual(r.unknown, ['when']);
  assert.ok(r.items.some((i) => i.unknown && i.w === '[when?]'));
});

test('数字は docs/grammar.md §5 の数詞になる', () => {
  const cases = { 0: 'ni', 1: 'pa', 10: 'pa pulu', 20: 'to pulu', 25: 'to pulu pe', 100: 'pa kupulu', 105: 'pa kupulu ni pulu pe', 2025: 'to mipulu ni kupulu to pulu pe' };
  Object.keys(cases).forEach((n) => assert.strictEqual(numberToLogi(Number(n)).join(' '), cases[n], n));
});

test('辞書にない語は [語?] で残し、notes と unknown に出す', () => {
  const ja = translator.translate('私は鉛筆を食べる。', 'ja');
  assert.ok(ja.logi.includes('[鉛筆?]'));
  assert.deepStrictEqual(ja.unknown, ['鉛筆']);
  assert.ok(ja.notes.length > 0);
  const en = translator.translate('I eat a pencil.', 'en');
  assert.ok(en.logi.includes('[pencil?]'));
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
