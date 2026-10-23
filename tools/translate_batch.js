// 文の一覧（1行に1文）を翻訳機にかけて、結果を JSON で出す。tools/coverage_check.py から使う。
//   node tools/translate_batch.js sentences.txt [ja|en|auto]
const fs = require('node:fs');
const path = require('node:path');
const lexicon = require(path.join(__dirname, '..', 'web', 'lexicon.js'));
const { createTranslator } = require(path.join(__dirname, '..', 'web', 'translator.js'));

const translator = createTranslator(lexicon);
const lang = process.argv[3] || 'auto';
const lines = fs.readFileSync(process.argv[2], 'utf8').split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
const out = lines.map((text) => {
  const r = translator.translate(text, lang);
  return { text: text, lang: r.lang, logi: r.logi, unknown: (r.unknown || []).map((u) => (typeof u === 'string' ? u : u.text || u.w || String(u))), notes: r.notes || [] };
});
process.stdout.write(JSON.stringify(out));
