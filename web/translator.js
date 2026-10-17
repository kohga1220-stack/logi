/*
 * Logi 翻訳機（辞書ベースの簡易翻訳）
 *
 * 日本語・英語の単純な文を Logi に訳す。辞書は web/lexicon.js（tools/build_web.py が生成）。
 * 機械翻訳ではなく、決まった文型を辞書とルールで変換するだけ。対応外の語や構文は
 * [語?] として残し、notes に理由を書く。
 *
 * ブラウザでは <script> で読み込むと window.LogiTranslator ができる。Node では require できる。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.LogiTranslator = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var DIGITS = ['ni', 'pa', 'to', 'te', 'ku', 'pe', 'so', 'se', 'wa', 'ja'];
  var PLACES = ['', 'pulu', 'kupulu', 'mipulu'];

  // 数字 → Logi の数詞列（docs/grammar.md §5）。9999 まで。
  function numberToLogi(n) {
    if (n === 0) return ['ni'];
    var digits = String(n).split('').map(Number);
    var out = [];
    var len = digits.length;
    for (var i = 0; i < len; i++) {
      var place = len - 1 - i;
      var d = digits[i];
      var laterNonZero = digits.slice(i + 1).some(function (x) { return x !== 0; });
      if (d === 0) {
        if (laterNonZero) { out.push('ni'); if (place > 0) out.push(PLACES[place]); }
      } else {
        out.push(DIGITS[d]);
        if (place > 0) out.push(PLACES[place]);
      }
    }
    return out;
  }

  function item(w, extra) {
    var o = { w: w };
    if (extra) for (var k in extra) o[k] = extra[k];
    return o;
  }
  function unknown(text) { return { w: '[' + text + '?]', unknown: text }; }
  function words(list) { return list.map(function (w) { return item(w); }); }

  function createTranslator(lexicon) {
    var byW = {};
    lexicon.forEach(function (e) { byW[e.w] = e; });

    // ---------------------------------------------------------------- 日本語の辞書
    var jaMap = {};
    var jaMax = 1;
    function addJa(surface, tok) {
      if (!surface) return;
      if (!jaMap[surface]) jaMap[surface] = tok;
      if (surface.length > jaMax) jaMax = surface.length;
    }

    var ICHIDAN_KANJI = { '見': 1, '着': 1, '寝': 1 };
    var GODAN = {
      'う': { i: 'い', a: 'わ', ta: 'っ' }, 'く': { i: 'き', a: 'か', ta: 'い' },
      'ぐ': { i: 'ぎ', a: 'が', ta: 'い', voiced: true }, 'す': { i: 'し', a: 'さ', ta: 'し', plainTa: true },
      'つ': { i: 'ち', a: 'た', ta: 'っ' }, 'ぬ': { i: 'に', a: 'な', ta: 'ん', nasal: true },
      'ぶ': { i: 'び', a: 'ば', ta: 'ん', nasal: true }, 'む': { i: 'み', a: 'ま', ta: 'ん', nasal: true },
      'る': { i: 'り', a: 'ら', ta: 'っ' }
    };

    // 五段動詞の「お段」（意向形 行こう の こ）
    var O_ROW = { 'う': 'お', 'く': 'こ', 'ぐ': 'ご', 'す': 'そ', 'つ': 'と', 'ぬ': 'の', 'ぶ': 'ぼ', 'む': 'も', 'る': 'ろ' };

    // 動詞の活用形（表層形 → タグ）を作る
    function verbForms(ja) {
      var forms = [];
      var stemI, stemA, stemTa, stemTe, vol = null, plain = ja;
      var last = ja.slice(-1);
      var base = ja.slice(0, -1);
      if (ja === 'ある') {
        stemI = 'あり'; stemA = null; stemTa = 'あっ'; stemTe = 'あって';
        forms.push([ja, {}]);
      } else if (ja === '来る') {
        stemI = '来'; stemA = '来'; stemTa = '来た'; stemTe = '来て'; vol = '来よう';
      } else if (/する$/.test(ja)) {
        var sb = ja.slice(0, -2);
        stemI = sb + 'し'; stemA = sb + 'し'; stemTa = sb + 'した'; stemTe = sb + 'して'; vol = sb + 'しよう';
        forms.push([ja, {}], [sb + 'しない', { neg: true }], [sb + 'しなかった', { neg: true, past: true }]);
      } else if (last === 'る' && (/[いきぎしじちぢにひびぴみりえけげせぜてでねへべぺめれ]る$/.test(ja) || ICHIDAN_KANJI[ja.charAt(ja.length - 2)])) {
        stemI = base; stemA = base; stemTa = base + 'た'; stemTe = base + 'て'; vol = base + 'よう';
        forms.push([ja, {}], [base + 'ない', { neg: true }], [base + 'なかった', { neg: true, past: true }]);
      } else if (GODAN[last]) {
        var g = GODAN[last];
        stemI = base + g.i;
        stemA = base + g.a;
        vol = base + O_ROW[last] + 'う';
        if (ja === '行く') { stemTa = '行っ'; stemTe = '行って'; stemTa = '行った'; }
        else if (g.plainTa) { stemTa = base + 'した'; stemTe = base + 'して'; }
        else if (g.nasal) { stemTa = base + 'んだ'; stemTe = base + 'んで'; }
        else if (last === 'ぐ') { stemTa = base + 'いだ'; stemTe = base + 'いで'; }
        else if (last === 'く') { stemTa = base + 'いた'; stemTe = base + 'いて'; }
        else { stemTa = base + g.ta + 'た'; stemTe = base + g.ta + 'て'; }
        forms.push([ja, {}], [stemA + 'ない', { neg: true }], [stemA + 'なかった', { neg: true, past: true }]);
      } else {
        return [[ja, {}]];
      }
      if (ja === 'ある') {
        forms.push(['あった', { past: true }]);
      } else {
        forms.push([stemTa, { past: true }]);
      }
      if (stemI) forms.push([stemI + 'ながら', { sub: 'wailu' }]);
      if (stemTe) forms.push([stemTe + 'から', { sub: 'aputi' }]);
      forms.push([stemI + 'ます', {}], [stemI + 'ました', { past: true }],
        [stemI + 'ません', { neg: true }], [stemI + 'ませんでした', { neg: true, past: true }]);
      // 命令・依頼・禁止・勧誘（docs/proposals/003）。文末だけで使う（endOnly）
      forms.push([stemI + 'なさい', { imp: true, endOnly: true }], [stemI + 'ましょう', { hort: true, endOnly: true }],
        [ja + 'な', { imp: true, neg: true, endOnly: true }]);
      if (vol) forms.push([vol, { hort: true, endOnly: true }]);
      if (stemTe) forms.push([stemTe + 'ください', { imp: true, polite: true, endOnly: true }],
        [stemTe + 'いただけます', { req: true, pol: true, endOnly: true }], [stemTe + 'いただけません', { req: true, pol: true, endOnly: true }]);
      if (stemA) forms.push([stemA + 'ないでください', { imp: true, polite: true, neg: true, endOnly: true }]);
      if (stemTe) {
        forms.push([stemTe, { te: true }]);
        var te = stemTe;
        forms.push([te + 'いる', { prog: true }], [te + 'います', { prog: true }],
          [te + 'いた', { prog: true, past: true }], [te + 'いました', { prog: true, past: true }],
          [te + 'いない', { prog: true, neg: true }], [te + 'いません', { prog: true, neg: true }],
          [te + 'しまう', { perf: true }], [te + 'しまった', { perf: true }],
          [te + 'しまいました', { perf: true }], [te + 'しまいます', { perf: true }]);
      }
      // 来る・する・ある は上の分岐で作った表層形が揃っていないものを補う
      if (ja === '来る') {
        forms.push([ja, {}], ['来ない', { neg: true }], ['来なかった', { neg: true, past: true }],
          ['来た', { past: true }], ['来ます', {}], ['来ました', { past: true }],
          ['来ません', { neg: true }], ['来ませんでした', { neg: true, past: true }]);
      }
      if (ja === 'ある') {
        forms.push(['あります', {}], ['ありました', { past: true }], ['ありません', { neg: true }]);
      }
      // ～なければならない（masi）・可能形（kani）
      if (stemA) {
        // 〜なくてもいい（docs/proposals/006）の「〜なくて」
        forms.push([stemA + 'なくて', { te: true, neg: true }]);
        forms.push([stemA + 'なければならない', { modal: 'masi' }], [stemA + 'なければならなかった', { modal: 'masi', past: true }],
          [stemA + 'なくてはならない', { modal: 'masi' }]);
      }
      var potential = null;
      var E_ROW = { 'う': 'え', 'く': 'け', 'ぐ': 'げ', 'す': 'せ', 'つ': 'て', 'ぬ': 'ね', 'ぶ': 'べ', 'む': 'め', 'る': 'れ' };
      if (ja === '来る') potential = '来られ';
      else if (/する$/.test(ja)) potential = null;
      else if (forms.length && last === 'る' && stemI === base && stemTa === base + 'た') potential = base + 'られ';
      else if (E_ROW[last] && stemA) potential = base + E_ROW[last];
      var ba = null;
      if (ja === '来る') ba = '来れば';
      else if (ja === 'ある') ba = 'あれば';
      else if (/する$/.test(ja)) ba = ja.slice(0, -2) + 'すれば';
      else if (forms.length && last === 'る' && stemI === base && stemTa === base + 'た') ba = base + 'れば';
      else if (E_ROW[last] && stemA) ba = base + E_ROW[last] + 'ば';
      if (ba) {
        forms.push([ba, { cond: true }], [(ja === 'ある' ? 'あった' : stemTa) + 'ら', { cond: true }]);
      }
      if (potential) {
        forms.push([potential + 'る', { modal: 'kani' }], [potential + 'ない', { modal: 'kani', neg: true }],
          [potential + 'た', { modal: 'kani', past: true }], [potential + 'なかった', { modal: 'kani', neg: true, past: true }],
          [potential + 'ます', { modal: 'kani' }], [potential + 'ません', { modal: 'kani', neg: true }]);
      }
      return forms;
    }

    lexicon.forEach(function (e) {
      var pos = e.pos;
      if (pos === 'noun') {
        e.ja.forEach(function (s) { addJa(s, { k: 'N', e: e }); });
      } else if (pos === 'pronoun') {
        e.ja.forEach(function (s) { addJa(s, { k: 'PRON', e: e }); });
      } else if (pos === 'wh') {
        e.ja.forEach(function (s) { addJa(s, { k: 'WH', e: e }); });
      } else if (pos === 'adv') {
        e.ja.forEach(function (s) { addJa(s, { k: 'ADV', e: e }); });
      } else if (pos === 'adj') {
        e.ja.forEach(function (s) {
          if (/い$/.test(s)) {
            var stem = s.slice(0, -1);
            addJa(s, { k: 'ADJ', e: e, tags: {} });
            addJa(stem + 'かった', { k: 'ADJ', e: e, tags: { past: true } });
            addJa(stem + 'くない', { k: 'ADJ', e: e, tags: { neg: true } });
            addJa(stem + 'くなかった', { k: 'ADJ', e: e, tags: { neg: true, past: true } });
            addJa(stem + 'ければ', { k: 'ADJ', e: e, tags: { cond: true } });
            addJa(stem + 'かったら', { k: 'ADJ', e: e, tags: { cond: true } });
            if (s === '良い') {
              addJa('いい', { k: 'ADJ', e: e, tags: {} });
              addJa('よい', { k: 'ADJ', e: e, tags: {} });
              addJa('よかった', { k: 'ADJ', e: e, tags: { past: true } });
              addJa('よくない', { k: 'ADJ', e: e, tags: { neg: true } });
            }
          } else if (/な$/.test(s)) {
            addJa(s, { k: 'ADJ', e: e, tags: {}, attr: true });
            addJa(s.slice(0, -1), { k: 'ANA', e: e });
          } else if (/の$/.test(s)) {
            addJa(s, { k: 'ADJ', e: e, tags: {}, attr: true });
          } else {
            addJa(s, { k: 'ANA', e: e });
          }
        });
      } else if (pos === 'verb') {
        if (e.w === 'pio') return; // です・だ は COP として扱う
        e.ja.forEach(function (s) {
          verbForms(s).forEach(function (f) { addJa(f[0], { k: 'V', e: e, tags: f[1] }); });
        });
      }
    });
    // いる（存在）は ある と同じ alo に対応させる
    verbForms('いる').forEach(function (f) { addJa(f[0], { k: 'V', e: byW.alo, tags: f[1] }); });

    addJa('私たち（聞き手を含む）', { k: 'PRON', e: byW.misu });
    // 指示詞・場所・はい／いいえ・いくつ（docs/proposals/001）。これ・あれ は辞書の代名詞（iliu・teliu）から入る。それ は前の文を受ける li のまま
    if (byW.iliu && byW.teliu) {
      addJa('この', { k: 'DET', e: byW.iliu });
      ['その', 'あの'].forEach(function (s) { addJa(s, { k: 'DET', e: byW.teliu }); });
    }
    if (byW.ili && byW.teli) {
      addJa('ここ', { k: 'N', e: byW.ili });
      ['そこ', 'あそこ'].forEach(function (s) { addJa(s, { k: 'N', e: byW.teli }); });
    }
    if (byW.jesu) addJa('はい', { k: 'YESNO', w: 'jesu' });
    addJa('いいえ', { k: 'YESNO', w: 'no' });
    // 疑問での依頼（docs/proposals/004）。〜てくれませんか など。文末だけ。pol: 文頭に pilisu を置く
    [['くれません', false], ['くれます', false], ['くれない', false], ['もらえません', true], ['もらえます', true], ['もらえない', true],
      ['くださいません', true], ['くださいます', true], ['いただけません', true], ['いただけます', true]].forEach(function (r) {
      addJa(r[0], { k: 'REQ', pol: r[1] });
    });
    // 禁止の言い方（〜てはいけない・〜てはならない。docs/proposals/006）。「て＋は」のあとだけ拾う
    ['いけない', 'いけません', 'ならない', 'なりません'].forEach(function (x) { addJa(x, { k: 'PROHIB' }); });
    // あいさつ（docs/proposals/002）。文頭の「はい」と同じく、文頭か句読点のあとだけ拾う
    if (byW.kelosu) addJa('こんにちは', { k: 'YESNO', w: 'kelosu' });
    if (byW.kupaju) addJa('さようなら', { k: 'YESNO', w: 'kupaju' });
    if (byW.pilisu) addJa('どうぞ', { k: 'YESNO', w: 'pilisu' });
    ['いくつ', 'いくら'].forEach(function (s) { addJa(s, { k: 'QTY' }); });
    addJa('私たち（聞き手を含まない）', { k: 'PRON', e: byW.mipu });
    var COPULAS = {
      'です': {}, 'だ': {}, 'でした': { past: true }, 'だった': { past: true },
      'ではない': { neg: true }, 'じゃない': { neg: true }, 'ではありません': { neg: true },
      'ではなかった': { neg: true, past: true }, 'じゃなかった': { neg: true, past: true },
      'ではありませんでした': { neg: true, past: true }
    };
    Object.keys(COPULAS).forEach(function (s) { addJa(s, { k: 'COP', tags: COPULAS[s] }); });
    addJa('のです', { k: 'COP', tags: {}, expl: true });
    addJa('のだ', { k: 'COP', tags: {}, expl: true });
    addJa('のでした', { k: 'COP', tags: { past: true }, expl: true });
    addJa('んです', { k: 'COP', tags: {}, expl: true });
    ['だろう', 'でしょう'].forEach(function (s) { addJa(s, { k: 'FUT' }); });
    addJa('こと', { k: 'KOTO' });
    addJa('どんな', { k: 'DONNA' });
    ['は', 'が', 'を', 'へ', 'に', 'で', 'と', 'の', 'も', 'から', 'より', 'の中に', 'の上に', 'について', 'のために']
      .forEach(function (s) { addJa(s, { k: 'P', p: s }); });
    // 辞書の前置詞のうち、助詞で始まる形（の上方に・なしで など）も助詞として扱う
    var DICT_PARTICLE_PREP = {};
    lexicon.forEach(function (e) {
      if (e.pos !== 'prep') return;
      e.ja.forEach(function (s) {
        if (/^(の|に|を|から|なし)/.test(s) && !DICT_PARTICLE_PREP[s]) {
          DICT_PARTICLE_PREP[s] = e.w;
          addJa(s, { k: 'P', p: s });
        }
      });
    });
    addJa('しかし', { k: 'CONJ', w: 'patu' });
    addJa('だが', { k: 'CONJ', w: 'patu' });
    addJa('でも', { k: 'CONJ', w: 'patu' });
    addJa('だから', { k: 'CONJ', w: 'sonu', daka: true });
    addJa('ですから', { k: 'CONJ', w: 'sonu', daka: true });
    ['そのため', 'それで', 'したがって'].forEach(function (c) { addJa(c, { k: 'CONJ', w: 'sonu' }); });
    ['そして', 'それから', 'また'].forEach(function (c) { addJa(c, { k: 'CONJ', w: 'e' }); });
    ['けれども', 'けれど', 'けど'].forEach(function (c) { addJa(c, { k: 'CLC', w: 'patu' }); });
    // 従属接続語: 直前の節（述語で終わる）にかかり、その節の頭に付く
    addJa('ので', { k: 'SUBC', w: 'pikosu' });
    ['とき', '時'].forEach(function (c) { addJa(c, { k: 'SUBC', w: 'wenute' }); });
    ['間', 'あいだ'].forEach(function (c) { addJa(c, { k: 'SUBC', w: 'wailu' }); });
    addJa('前に', { k: 'SUBC', w: 'pipolu' });
    ['後で', 'あとで', '後に', 'あとに'].forEach(function (c) { addJa(c, { k: 'SUBC', w: 'aputi' }); });
    addJa('まで', { k: 'SUBC', w: 'utilu' });
    addJa('のに', { k: 'SUBC', w: 'oluto' });
    // 様態（〜ように）・目的（〜ために）・対比（〜一方）（docs/proposals/007）
    if (byW.kasolu) addJa('ように', { k: 'SUBC', w: 'kasolu' });
    addJa('ために', { k: 'TAMENI' });
    ['一方で', '一方'].forEach(function (c) { addJa(c, { k: 'CLC', w: 'patu' }); });
    addJa('もし', { k: 'IF' });
    ['なら', 'ならば'].forEach(function (c) { addJa(c, { k: 'COND' }); });
    ['だろうに', 'でしょうに'].forEach(function (c) { addJa(c, { k: 'HYP' }); });
    addJa('または', { k: 'OR' });
    addJa('あるいは', { k: 'OR' });
    addJa('か', { k: 'KA' });
    addJa('、', { k: 'COMMA' });
    addJa(',', { k: 'COMMA' });
    ['。', '.', '！', '!', '？', '?'].forEach(function (s) {
      addJa(s, { k: 'END', q: s === '？' || s === '?' });
    });
    var COUNTERS = { '歳': 'ila', '年': 'ila', '日': 'teia', '分': 'minuta', '週': 'wika' };
    Object.keys(COUNTERS).forEach(function (s) {
      if (!jaMap[s]) addJa(s, { k: 'CTR', w: COUNTERS[s] });
    });

    function toHalfWidth(s) {
      return s.replace(/[０-９]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0xFEE0); });
    }

    function tokenizeJa(text) {
      text = toHalfWidth(text.replace(/\s+/g, ''));
      var tokens = [];
      var i = 0;
      var unk = '';
      function flush() { if (unk) { tokens.push({ k: 'UNK', text: unk }); unk = ''; } }
      while (i < text.length) {
        var m = /^[0-9]+/.exec(text.slice(i));
        if (m) { flush(); tokens.push({ k: 'NUM', n: parseInt(m[0], 10) }); i += m[0].length; continue; }
        var found = null;
        for (var len = Math.min(jaMax, text.length - i); len >= 1; len--) {
          var cand = jaMap[text.substr(i, len)];
          // 「はい」「いいえ」は文頭か句読点のあとだけ（「これはいくら」の「はい」を拾わない）
          if (cand && cand.k === 'YESNO' && i > 0 && !/[、，,。．.！？!?\s]/.test(text.charAt(i - 1))) cand = null;
          // 命令・勧誘の形（食べなさい・食べるな・食べましょう など）は文末だけ（「食べるなら」「食べようと」を壊さない）
          if (cand && cand.k === 'V' && cand.tags && cand.tags.endOnly) {
            var nx = text.charAt(i + len);
            // 勧誘の形のあとの「か」は、申し出（食べましょうか）
            if (nx && !/[、，,。．.！？!?\s]/.test(nx) && !((cand.tags.hort || cand.tags.req) && nx === 'か')) cand = null;
          }
          if (cand && cand.k === 'PROHIB') {
            var lastTok = tokens[tokens.length - 1];
            if (unk || !lastTok || lastTok.k !== 'P' || lastTok.p !== 'は') cand = null;
          }
          if (cand && cand.k === 'REQ') {
            var nr = text.charAt(i + len);
            if (nr && !/[、，,。．.！？!?\sか]/.test(nr)) cand = null;
          }
          if (cand) { found = { tok: cand, len: len }; break; }
        }
        if (found) { flush(); tokens.push(found.tok); i += found.len; }
        else { unk += text.charAt(i); i++; }
      }
      flush();
      return tokens;
    }

    // ---------------------------------------------------------------- 日本語の構文
    function isNpStart(t) {
      return !!t && (t.k === 'N' || t.k === 'PRON' || t.k === 'WH' || t.k === 'NUM' || t.k === 'UNK' ||
        t.k === 'DONNA' || t.k === 'DET' || (t.k === 'ADJ' && t.attr) || t.k === 'ANA' || (t.k === 'ADJ' && !t.tags.past && !t.tags.neg));
    }

    function verbItems(t) {
      var out = [];
      if (t.tags && t.tags.past) out.push(item('pasu'));
      if (t.tags && t.tags.neg) out.push(item('no'));
      out.push(item(t.e.w));
      return out;
    }

    function chunkJa(tokens, advs, notes) {
      var chunks = [];
      var prefix = [];
      var mods = [];
      var i = 0;
      var n = tokens.length;
      function finish(headItems, extra) {
        var items = prefix.concat(mods, headItems);
        prefix = [];
        mods = [];
        var particle = null;
        if (i < n && tokens[i].k === 'P' && tokens[i].p !== 'の') { particle = tokens[i].p; i++; }
        var c = { items: items, particle: particle };
        if (extra) for (var k in extra) c[k] = extra[k];
        chunks.push(c);
      }
      // 動名詞句に取り込む直前の文節: を（目的語）と、前置詞になる助詞（に・で・へ など）の文節
      function takeClauseChunks() {
        var obj = [];
        var pps = [];
        while (chunks.length) {
          var last = chunks[chunks.length - 1];
          if (last.particle === 'を') obj = last.items.concat(obj);
          else if (last.particle && last.particle !== 'は' && last.particle !== 'が' && last.particle !== 'も' &&
            !last.counter && PARTICLE_PREP[last.particle]) pps = [item(PARTICLE_PREP[last.particle])].concat(last.items, pps);
          else break;
          chunks.pop();
        }
        return obj.concat(pps);
      }
      while (i < n) {
        var t = tokens[i];
        if (t.k === 'ADV') { advs.push(item(t.e.w)); i++; continue; }
        if (t.k === 'WH' && (t.e.w === 'waia' || t.e.w === 'aua')) { advs.push(item(t.e.w)); i++; continue; }
        if (t.k === 'NUM') {
          var nums = words(numberToLogi(t.n));
          if (tokens[i + 1] && tokens[i + 1].k === 'CTR') {
            var ctr = tokens[i + 1];
            i += 2;
            finish(nums.concat(item(ctr.w)), { counter: true });
          } else { mods = mods.concat(nums); i++; }
          continue;
        }
        if (t.k === 'DONNA') { mods.push(item('wata')); i++; continue; }
        if (t.k === 'DET') { mods.push(item(t.e.w)); i++; continue; }
        // 「何歳」: 年齢の疑問（tu oto wata ila ka?）
        if (t.k === 'WH' && t.e.w === 'wata' && tokens[i + 1] && tokens[i + 1].k === 'CTR') {
          var wctr = tokens[i + 1];
          i += 2;
          finish([item('wata'), item(wctr.w)], { counter: true });
          continue;
        }
        // 「いくつ」「いくら」: aua mene。「リンゴをいくつ」は直前の名詞句の前に置く（aua mene apa）
        if (t.k === 'QTY') {
          var qty = [item('aua'), item('mene')];
          var prevChunk = chunks[chunks.length - 1];
          var after = tokens[i + 1];
          if (after && after.k === 'P' && after.p === 'の' && isNpStart(tokens[i + 2])) { mods = mods.concat(qty); i += 2; continue; }
          if (prevChunk && (prevChunk.particle === 'を' || prevChunk.particle === 'が') && !prevChunk.counter) {
            prevChunk.items = qty.concat(prevChunk.items);
            i++;
            continue;
          }
          i++;
          finish(qty);
          continue;
        }
        if (t.k === 'ADJ' && (t.attr || isNpStart(tokens[i + 1])) && isNpStart(tokens[i + 1])) { mods.push(item(t.e.w)); i++; continue; }
        if (t.k === 'ANA' && isNpStart(tokens[i + 1])) { mods.push(item(t.e.w)); i++; continue; }
        if (t.k === 'V') {
          // 「Vこと」「Vのが／のは／のを」: 動詞を動名詞（V + na）にして、直前の目的語・前置詞句を取り込む
          var nominal = 0;
          if (tokens[i + 1] && tokens[i + 1].k === 'KOTO') nominal = 2;
          else if (tokens[i + 1] && tokens[i + 1].k === 'P' && tokens[i + 1].p === 'の' &&
            tokens[i + 2] && tokens[i + 2].k === 'P' && NOMINAL_PARTICLES[tokens[i + 2].p]) nominal = 2;
          // 「Vために」（目的）: pote + 動名詞（docs/proposals/007）。目的語・前置詞句を取り込み、文の最後に置く
          if (tokens[i + 1] && tokens[i + 1].k === 'TAMENI') {
            if (t.tags && (t.tags.neg || t.tags.past || t.tags.te)) notes.push('「' + t.e.jaNote + '」を名詞にするときの否定・過去は表せないため、省略しました。');
            var pgerund = item(t.e.w + 'na', { gerund: t.e.w });
            i += 2;
            finish([pgerund].concat(takeClauseChunks()), { particle: 'のために', purpose: true });
            continue;
          }
          if (nominal) {
            if (t.tags && (t.tags.neg || t.tags.past)) notes.push('「' + t.e.jaNote + '」を名詞にするときの否定・過去は表せないため、省略しました。');
            var gerund = item(t.e.w + 'na', { gerund: t.e.w });
            i += nominal;
            finish([gerund].concat(takeClauseChunks()));
            continue;
          }
          if (isNpStart(tokens[i + 1])) {
            var rc = [item('ta'), item('li')].concat(verbItems(t));
            if (t.tags.prog) notes.push('「' + t.e.jaNote + '」の進行形は関係節の中では表せないため、省略しました。');
            var save = tokens[i + 1];
            i++;
            // 関係節は直後の名詞にかかる: 名詞を読んだあとに rc を差し込む
            var headTok = save;
            var headItems = headItemsOf(headTok);
            i++;
            mods = mods.concat([]);
            finish(headItems.concat(rc));
            continue;
          }
          i++; continue;
        }
        if (t.k === 'N' || t.k === 'PRON' || t.k === 'WH' || t.k === 'UNK') {
          var head = headItemsOf(t);
          i++;
          var nxt = tokens[i];
          if (nxt && nxt.k === 'P' && nxt.p === 'の' && isNpStart(tokens[i + 1])) {
            prefix = prefix.concat(mods, head); mods = []; i++; continue;
          }
          if (nxt && nxt.k === 'P' && nxt.p === 'と' && isNpStart(tokens[i + 1])) {
            prefix = prefix.concat(mods, head, [item('e')]); mods = []; i++; continue;
          }
          if (nxt && nxt.k === 'OR' && isNpStart(tokens[i + 1])) {
            prefix = prefix.concat(mods, head, [item('o')]); mods = []; i++; continue;
          }
          finish(head);
          continue;
        }
        i++;
      }
      return chunks;
    }

    function headItemsOf(t) {
      if (t.k === 'UNK') return [unknown(t.text)];
      if (t.k === 'ADJ' || t.k === 'ANA') return [item(t.e.w)];
      return [item(t.e.w)];
    }

    var PARTICLE_PREP = {
      'へ': 'tote', 'に': 'tote', 'で': 'atute', 'と': 'witute', 'から': 'pulomute',
      'の中に': 'inute', 'の上に': 'onute', 'について': 'paute', 'のために': 'pote'
    };
    Object.keys(DICT_PARTICLE_PREP).forEach(function (s) { if (!PARTICLE_PREP[s]) PARTICLE_PREP[s] = DICT_PARTICLE_PREP[s]; });

    var NOMINAL_PARTICLES = { 'が': 1, 'は': 1, 'を': 1, 'も': 1 };
    var PRED_KINDS = { V: 1, COP: 1, ADJ: 1, ANA: 1, FUT: 1 };
    function isPredLike(t) { return !!t && !!PRED_KINDS[t.k] && !(t.k === 'ADJ' && t.attr); }
    var COMPLEMENT_VERBS = { omo: 1, juo: 1, pipo: 1, mo: 1, kanao: 1, keso: 1, opo: 1, noto: 1 };

    // 「AはBがCと思う」: 思う・言う などの前にある節を、目的語（節）にする
    function splitComplement(toks, question, notes) {
      var k = -1;
      for (var j = 1; j < toks.length - 1; j++) {
        if (toks[j].k === 'P' && toks[j].p === 'と' && isPredLike(toks[j - 1]) && toks[j + 1].k === 'V' && COMPLEMENT_VERBS[toks[j + 1].e.w]) { k = j; break; }
      }
      if (k < 1) return null;
      var embedded = toks.slice(0, k);
      var tail = toks.slice(k + 1);
      var mainSubj = null;
      for (var s = 0; s < embedded.length; s++) {
        if (embedded[s].k === 'P' && (embedded[s].p === 'は' || embedded[s].p === 'が')) {
          var later = embedded.slice(s + 1).some(function (t) { return t.k === 'P' && (t.p === 'は' || t.p === 'が'); });
          if (later) { mainSubj = embedded.slice(0, s + 1); embedded = embedded.slice(s + 1); }
          break;
        }
      }
      var sub = parseJaClause(embedded, false, notes);
      var main = parseJaClause(tail, question, notes);
      main.object = generate(sub);
      if (mainSubj) {
        var ch = chunkJa(mainSubj, [], notes);
        if (ch.length) main.subject = ch[0].items;
      }
      return main;
    }

    function parseJaClause(tokens, question, notes) {
      var advs = [];
      var tense = null, aspect = null, neg = false;
      var toks = tokens.filter(function (t) { return t.k !== 'COMMA'; });
      var comp = splitComplement(toks, question, notes);
      if (comp) return comp;
      var pred = null;
      var last = toks[toks.length - 1];
      if (last && last.k === 'FUT') { tense = 'future'; toks.pop(); last = toks[toks.length - 1]; }
      var copTags = null;
      var explFlag = false;
      if (last && last.k === 'COP') { copTags = last.tags; explFlag = !!last.expl; toks.pop(); last = toks[toks.length - 1]; }
      if (copTags && last && ((last.k === 'P' && last.p === 'の') || explFlag)) {
        // 「食べないのです」の「の」は説明の「の」。述語は直前の語。
        if (!explFlag) { toks.pop(); last = toks[toks.length - 1]; }
        if (last && (last.k === 'V' || last.k === 'ADJ')) {
          if (copTags.past && last.k === 'V') last = { k: 'V', e: last.e, tags: Object.assign({}, last.tags, { past: true }) };
          if (last.k === 'V') toks.push(last);
          copTags = null;
        }
      }
      if (last && last.k === 'V' && !copTags) {
        pred = { kind: 'verb', e: last.e, imp: !!last.tags.imp, polite: !!last.tags.polite, hort: !!last.tags.hort };
        if (last.tags.past) tense = 'past';
        if (last.tags.neg) neg = true;
        if (last.tags.prog) aspect = 'prog';
        if (last.tags.perf) aspect = 'perf';
        if (last.tags.modal) advs.unshift(item(last.tags.modal === 'kani' ? 'kani' : 'masi'));
        toks.pop();
      } else if (last && (last.k === 'ADJ' || last.k === 'ANA') && !last.attr) {
        pred = { kind: 'adj', e: last.e };
        var tg = last.tags || {};
        if (tg.past || (copTags && copTags.past)) tense = 'past';
        if (tg.neg || (copTags && copTags.neg)) neg = true;
        toks.pop();
      } else if (copTags) {
        pred = { kind: 'cop' };
        if (copTags.past) tense = 'past';
        if (copTags.neg) neg = true;
      }
      var chunks = chunkJa(toks, advs, notes);
      var subjectChunk = null;
      var rest = [];
      chunks.forEach(function (c) {
        if (!subjectChunk && (c.particle === 'は' || c.particle === 'が' || c.particle === 'も')) {
          subjectChunk = c;
          if (c.particle === 'も') advs.push(item('olusi'));
        } else rest.push(c);
      });
      var ir = { subject: subjectChunk ? subjectChunk.items : null, advs: advs, tense: tense, aspect: aspect,
        neg: neg, question: question, object: null, pps: [], notes: notes };
      var bare = rest.filter(function (c) { return !c.particle; });
      var withP = rest.filter(function (c) { return c.particle; });

      if (pred && pred.kind === 'verb') {
        ir.verb = pred.e.w;
        if (pred.imp || pred.hort) ir.imperative = true;
        if (pred.polite) ir.polite = true;
        if (pred.hort && !ir.subject) ir.subject = [item('misu')];
        // 食べましょうか（申し出）: mi sati … ka?（docs/proposals/004）。命令の ! にはしない
        if (pred.hort && question) {
          ir.imperative = false;
          if (!subjectChunk) ir.subject = [item('mi')];
          ir.advs.unshift(item('sati'));
        }
        var isExist = pred.e.w === 'alo' || pred.e.w === 'lipo';
        var purposePps = [];
        withP.forEach(function (c) {
          if (c.purpose) purposePps.push([item('pote')].concat(c.items));
          else if (c.particle === 'を' || (c.particle === 'が' && !ir.object)) ir.object = c.items;
          else if (c.particle === 'に' && isExist) ir.pps.push([item('atute')].concat(c.items));
          else if (PARTICLE_PREP[c.particle]) ir.pps.push([item(PARTICLE_PREP[c.particle])].concat(c.items));
          else notes.push('助詞「' + c.particle + '」は未対応です。');
        });
        ir.pps = ir.pps.concat(purposePps);
        var bareLeft = [];
        bare.forEach(function (c) {
          var w0 = c.items.length === 1 ? c.items[0].w : null;
          if (w0 === 'wela' || w0 === 'wena') ir.pps.push([item('atute')].concat(c.items));
          else if (!ir.object) ir.object = c.items;
          else bareLeft.push(c);
        });
        leftover(ir, bareLeft, notes);
        return ir;
      }
      if (pred && pred.kind === 'adj') {
        var adjW = pred.e.w;
        var ga = withP.filter(function (c) { return c.particle === 'が'; })[0];
        if (adjW === 'suke' && ga && ir.subject) {
          ir.verb = 'laiko';
          ir.object = ga.items;
          return ir;
        }
        var comp = [];
        var yori = withP.filter(function (c) { return c.particle === 'より'; })[0];
        var to = withP.filter(function (c) { return c.particle === 'と'; })[0];
        if (adjW === 'seme' && to) {
          comp = [item('seme'), item('tote')].concat(to.items);
        } else if (yori) {
          comp = [item('moli'), item(adjW), item('tanute')].concat(yori.items);
        } else {
          comp = [item(adjW)];
        }
        ir.verb = 'pio';
        ir.complement = comp;
        withP.filter(function (c) { return c !== yori && c !== to && c !== ga; }).forEach(function (c) {
          if (PARTICLE_PREP[c.particle]) ir.pps.push([item(PARTICLE_PREP[c.particle])].concat(c.items));
        });
        return ir;
      }
      if (pred && pred.kind === 'cop') {
        var compChunk = bare.length ? bare[bare.length - 1] : null;
        if (!compChunk && withP.length) {
          // 「私は20歳」のように最後の語に助詞が付かない場合は subject を除いた最後の chunk
          compChunk = null;
        }
        if (compChunk && compChunk.counter) {
          ir.verb = 'oto';
          ir.object = compChunk.items;
          return ir;
        }
        ir.verb = 'pio';
        ir.complement = compChunk ? compChunk.items : null;
        if (!compChunk && subjectChunk) { ir.complement = subjectChunk.items; ir.subject = null; }
        return ir;
      }
      // 述語がない: 名詞句だけを返す
      if (chunks.length) {
        ir.fragment = chunks.map(function (c) { return c.items; }).reduce(function (a, b) { return a.concat(b); }, []);
      }
      return ir;
    }

    function leftover(ir, chunks, notes) {
      if (!chunks.length) return;
      ir.extra = (ir.extra || []);
      chunks.forEach(function (c) { ir.extra = ir.extra.concat(c.items); });
      notes.push('文の構造を解析できなかった語は、そのまま末尾に並べています。');
    }

    function splitJa(text) {
      var tokens = tokenizeJa(text);
      var sentences = [];
      var cur = [];
      tokens.forEach(function (t) {
        if (t.k === 'END') { sentences.push({ tokens: cur, q: t.q }); cur = []; }
        else cur.push(t);
      });
      if (cur.length) sentences.push({ tokens: cur, q: false });
      return sentences;
    }

    // 文を節に分け、節どうしをつなぐ語（patu・sonu・e）と、節の頭に付く従属接続語（ipu・pikosu・wenute など）を決める
    function segmentJa(tokens) {
      var segs = [];
      var cur = [];
      var connBefore = null;
      var ifFlag = false;
      var hyp = false;
      function push(sub) {
        if (cur.length) {
          segs.push({ tokens: cur, conn: connBefore, sub: sub || (ifFlag ? 'ipu' : null) });
          connBefore = null; ifFlag = false;
        }
        cur = [];
      }
      for (var i = 0; i < tokens.length; i++) {
        var t = tokens[i];
        if (t.k === 'COMMA') continue;
        if (t.k === 'HYP') { hyp = true; continue; }
        if (t.k === 'IF') { push(null); ifFlag = true; continue; }
        if (t.k === 'CONJ') {
          // 「先生だから」のように、述語の直後の だから・ですから は理由（pikosu）。文頭や「〜だ、だから」は結果（sonu）。
          var prevTok = cur[cur.length - 1];
          if (t.daka && prevTok && (prevTok.k === 'N' || prevTok.k === 'PRON' || prevTok.k === 'ANA' || prevTok.k === 'UNK')) {
            cur.push({ k: 'COP', tags: {} });
            push('pikosu');
            continue;
          }
          push(null); connBefore = t.w; continue;
        }
        if (t.k === 'COND') {
          if (!isPredLike(cur[cur.length - 1])) cur.push({ k: 'COP', tags: {} });
          push('ipu'); continue;
        }
        if ((t.k === 'ADJ' || t.k === 'V') && t.tags && t.tags.cond) { cur.push(t); push('ipu'); continue; }
        if (t.k === 'V' && t.tags && t.tags.sub) { cur.push(t); push(t.tags.sub); continue; }
        if (t.k === 'V' && t.tags && t.tags.te && i < tokens.length - 1) { cur.push(t); push(null); connBefore = 'e'; continue; }
        if (t.k === 'SUBC' && isPredLike(cur[cur.length - 1])) { push(t.w); continue; }
        if (t.k === 'SUBC') { cur.push({ k: 'UNK', text: SUBC_TEXT[t.w] || t.w }); continue; }
        if (t.k === 'P' && t.p === 'から' && isPredLike(cur[cur.length - 1])) { push('pikosu'); continue; }
        if (t.k === 'CLC' || (t.k === 'P' && t.p === 'が' && isPredLike(cur[cur.length - 1]))) {
          var w = t.k === 'CLC' ? t.w : 'patu';
          push(null); connBefore = w; continue;
        }
        cur.push(t);
      }
      push(null);
      return { segs: segs, hyp: hyp };
    }
    var SUBC_TEXT = { kasolu: 'ように', pikosu: 'ので', wenute: 'とき', wailu: '間', pipolu: '前に', aputi: '後で', utilu: 'まで', oluto: 'のに' };

    // 日常のあいさつ（docs/proposals/005）。文の全体がこの言い方のときだけ、決まった語列にする
    var GREETINGS = [
      { ja: ['おはよう', 'おはようございます'], en: ['good morning'], w: ['kute', 'mola'] },
      { ja: ['おやすみ', 'おやすみなさい'], en: ['good night'], w: ['kute', 'naita'] },
      { ja: ['すみません', 'すいません', 'ごめん', 'ごめんなさい'], en: ['sorry', 'excuse me'], w: ['mi', 'pio', 'moke'] },
      { ja: ['ありがとう', 'ありがとうございます', 'ありがとうございました'], en: ['thanks'], w: ['mi', 'tanako', 'tu'] }
    ];
    var JA_GREETING = {}, EN_GREETING = {};
    GREETINGS.forEach(function (g) {
      if (!g.w.every(function (w) { return byW[w]; })) return;
      g.ja.forEach(function (k) { JA_GREETING[k] = g.w; });
      g.en.forEach(function (k) { EN_GREETING[k] = g.w; });
    });

    function translateJa(text) {
      var notes = [];
      var parts = [];
      // 文の全体があいさつなら、決まった語列にする（疑問の「？」が付く文は対象外）
      var sentenceList = [];
      (text.match(/[^。！？!?]+[。！？!?]*|[。！？!?]+/g) || [text]).forEach(function (piece) {
        piece = piece.replace(/((?:いい|よい|いけない|いけません|ならない|なりません)(?:です|だ)?)[よね]+(?=[。！!]*$)/, '$1');
        var key = piece.replace(/[。！!、，,\s]/g, '');
        if (JA_GREETING[key] && !/[？?]/.test(piece)) sentenceList.push({ greeting: JA_GREETING[key] });
        else splitJa(piece).forEach(function (sg) { sentenceList.push(sg); });
      });
      sentenceList.forEach(function (s) {
        if (s.greeting) { parts.push([{ fragment: s.greeting.map(function (w) { return item(w); }), notes: notes }]); return; }
        var toks = s.tokens.slice();
        var q = s.q;
        // 文頭の「はい」「いいえ」: jesu / no を先頭に置く（コンマで区切る）
        var answer = null;
        if (toks.length && toks[0].k === 'YESNO') {
          answer = toks.shift().w;
          while (toks.length && toks[0].k === 'COMMA') toks.shift();
          if (!toks.length) { parts.push([{ fragment: [item(answer)], notes: notes }]); return; }
        }
        if (toks.length && toks[toks.length - 1].k === 'KA') { q = true; toks.pop(); }
        // 許可・禁止・不要（docs/proposals/004・006）
        //   食べてもいい → kani、食べてはいけない → masi no、食べなくてもいい → kani no。主語がなければ、疑問は mi、平叙は tu を補う
        //   食べてくれませんか → tu kani …
        var defaultSubj = null, politeReq = false;
        var n = toks.length;
        // 文末の「だ・です」を除いた末尾
        var m = n;
        if (m && toks[m - 1].k === 'COP') m--;
        var okTok = m >= 3 && toks[m - 1].k === 'ADJ' && toks[m - 1].e && toks[m - 1].e.w === 'kute' && !(toks[m - 1].tags && (toks[m - 1].tags.neg || toks[m - 1].tags.past));
        var moTok = okTok && toks[m - 2].k === 'P' && toks[m - 2].p === 'も';
        var teTok = moTok && toks[m - 3].k === 'V' && toks[m - 3].tags && toks[m - 3].tags.te && !toks[m - 3].tags.past;
        var prohib = n >= 3 && toks[n - 1].k === 'PROHIB' && toks[n - 2].k === 'P' && toks[n - 2].p === 'は' &&
          toks[n - 3].k === 'V' && toks[n - 3].tags && toks[n - 3].tags.te && !toks[n - 3].tags.neg;
        if (teTok) {
          var permTags = { modal: 'kani' };
          if (toks[m - 3].tags.neg) permTags.neg = true;
          toks = toks.slice(0, m - 3).concat([{ k: 'V', e: toks[m - 3].e, tags: permTags }]);
          defaultSubj = q ? 'mi' : 'tu';
        } else if (prohib) {
          toks = toks.slice(0, n - 3).concat([{ k: 'V', e: toks[n - 3].e, tags: { modal: 'masi', neg: true } }]);
          defaultSubj = 'tu';
        } else if (q) {
          if (n >= 1 && toks[n - 1].k === 'V' && toks[n - 1].tags && toks[n - 1].tags.req) {
            politeReq = !!toks[n - 1].tags.pol;
            toks = toks.slice(0, n - 1).concat([{ k: 'V', e: toks[n - 1].e, tags: { modal: 'kani' } }]);
            defaultSubj = 'tu';
          } else if (n >= 2 && toks[n - 1].k === 'REQ' && toks[n - 2].k === 'V' && toks[n - 2].tags && toks[n - 2].tags.te) {
            politeReq = !!toks[n - 1].pol;
            toks = toks.slice(0, n - 2).concat([{ k: 'V', e: toks[n - 2].e, tags: { modal: 'kani' } }]);
            defaultSubj = 'tu';
          }
        }
        var seg = segmentJa(toks);
        var irs = seg.segs.map(function (c, idx, arr) {
          var ir = parseJaClause(c.tokens, q && idx === arr.length - 1, notes);
          ir.conn = c.conn;
          ir.sub = c.sub;
          if (seg.hyp) ir.hyp = true;
          return ir;
        });
        // 主語のない節は、前の節の主語を引き継ぐ
        irs.forEach(function (ir, idx) {
          if (idx > 0 && !ir.subject && ir.verb && irs[idx - 1].subject) {
            ir.subject = irs[idx - 1].subject;
            notes.push('主語のない節は、前の節の主語を引き継ぎました。');
          }
        });
        if (irs.length && defaultSubj) {
          var lastIr = irs[irs.length - 1];
          if (!lastIr.subject) lastIr.subject = [item(defaultSubj)];
          if (politeReq && !answer && byW.pilisu) answer = 'pilisu';
        }
        if (irs.length) {
          // 文末の「食べて」も依頼（命令）。命令の文は、文末が ! になる
          var finalTok = toks[toks.length - 1];
          if (finalTok && finalTok.k === 'V' && finalTok.tags && finalTok.tags.te) irs[irs.length - 1].imperative = true;
          if (irs.some(function (x) { return x.imperative; })) irs[irs.length - 1].imperative = true;
          // 「〜てください」「〜ないでください」は、文頭に pilisu を置く
          if (!answer && irs.some(function (x) { return x.polite; }) && byW.pilisu) answer = 'pilisu';
        }
        if (answer && irs.length) irs[0].answer = answer;
        if (irs.length) parts.push(irs);
      });
      return finalize(parts, notes, 'ja');
    }

    // ---------------------------------------------------------------- Logi の生成
    function generate(ir) {
      var out = [];
      if (ir.fragment) return ir.fragment;
      if (ir.subject) out = out.concat(ir.subject);
      out = out.concat(ir.advs || []);
      if (ir.hyp) out.push(item('wutu'));
      else {
        if (ir.tense === 'past') out.push(item('pasu'));
        if (ir.tense === 'future') out.push(item('putu'));
      }
      if (ir.aspect === 'prog') out.push(item('konu'));
      if (ir.aspect === 'perf') out.push(item('pinu'));
      if (ir.neg) out.push(item('no'));
      if (ir.neg && ir.aspect) ir.notes.push('否定と進行・完了を同時に使う語順は仕様が未確定です（時制・相・no の順にしています）。');
      if (ir.verb) out.push(item(ir.verb));
      if (ir.complement) out = out.concat(ir.complement);
      if (ir.object) out = out.concat(ir.object);
      (ir.pps || []).forEach(function (pp) { out = out.concat(pp); });
      if (ir.extra) out = out.concat(ir.extra);
      return out;
    }

    var GLOSS_SPECIAL = {
      pasu: '過去 / past', putu: '未来 / future', konu: '進行 / progressive', pinu: '完了 / perfective',
      no: '否定 / not', ka: '疑問 / question', ta: '関係 / relative marker', wutu: '仮定 / subjunctive',
      ni: '0', pa: '1', to: '2', te: '3', ku: '4', pe: '5', so: '6', se: '7', wa: '8', ja: '9',
      pulu: '十 / ten', kupulu: '百 / hundred', mipulu: '千 / thousand'
    };

    function glossOf(it) {
      if (it.unknown) return '未登録語 / unknown';
      if (it.gerund) {
        var g = byW[it.gerund];
        return (g ? g.jaNote + ' / ' + (g.en[0] || '') : '') + ' +na（動名詞 / gerund）';
      }
      if (GLOSS_SPECIAL[it.w]) return GLOSS_SPECIAL[it.w];
      var e = byW[it.w];
      if (!e) return '';
      var en = e.en.length ? e.en.join(', ') : '';
      return e.jaNote + (en ? ' / ' + en : '');
    }

    function finalize(parts, notes, lang) {
      var allItems = [];
      var sentenceStrings = [];
      var unknownList = [];
      parts.forEach(function (irs) {
        var text = '';
        irs.forEach(function (ir, idx) {
          var items = generate(ir);
          var isLast = idx === irs.length - 1;
          if (ir.answer) { allItems.push(item(ir.answer)); text += ir.answer + ', '; }
          if (ir.sub) items = [item(ir.sub)].concat(items);
          if (ir.question && isLast) items = items.concat([item('ka')]);
          if (ir.conn) {
            var um = /^\[(.*)\?\]$/.exec(ir.conn);
            if (um) { allItems.push(unknown(um[1])); unknownList.push(um[1]); }
            else allItems.push(item(ir.conn));
          }
          allItems = allItems.concat(items);
          var clause = items.map(function (it) { return it.w; }).join(' ');
          if (idx > 0) text += ', ' + (ir.conn ? ir.conn + ' ' : '');
          else if (ir.conn) text += ir.conn + ' ';
          text += clause;
          items.forEach(function (it) { if (it.unknown) unknownList.push(it.unknown); });
        });
        var last = irs[irs.length - 1];
        sentenceStrings.push(text.trim() + (last.question ? '?' : last.imperative ? '!' : '.'));
      });
      var seen = {};
      var uniqueItems = [];
      allItems.forEach(function (it) {
        var key = it.w;
        if (seen[key]) return;
        seen[key] = true;
        uniqueItems.push({ w: it.w, gloss: glossOf(it), unknown: !!it.unknown });
      });
      var uniqueUnknown = unknownList.filter(function (x, i) { return unknownList.indexOf(x) === i; });
      if (uniqueUnknown.length) notes.push('辞書にない語は [語?] のまま残しています: ' + uniqueUnknown.join('、'));
      return { lang: lang, logi: sentenceStrings.join(' '), items: uniqueItems, notes: dedupe(notes), unknown: uniqueUnknown };
    }

    function dedupe(list) { return list.filter(function (x, i) { return list.indexOf(x) === i; }); }

    // ---------------------------------------------------------------- 英語
    var enIndex = {};
    lexicon.forEach(function (e) {
      e.en.forEach(function (g) {
        var key = g.toLowerCase();
        (enIndex[key] = enIndex[key] || []).push(e);
      });
    });

    var PRONOUNS = {
      i: 'mi', me: 'mi', you: 'tu', he: 'li', she: 'li', it: 'li', him: 'li', her: 'li', we: 'misu', us: 'misu',
      they: 'lisu', them: 'lisu', myself: 'selu', yourself: 'selu', himself: 'selu', herself: 'selu',
      itself: 'selu', themselves: 'selu', oneself: 'selu', someone: 'somena', somebody: 'somena'
    };
    var DEMONSTRATIVES = { this: 'iliu', these: 'iliu', that: 'teliu', those: 'teliu' };
    // 文頭に置く感動詞（返事・あいさつ）
    var EN_INTERJ = { yes: 'jesu', no: 'no', hello: 'kelosu', hi: 'kelosu', goodbye: 'kupaju', bye: 'kupaju', please: 'pilisu' };
    var POSSESSIVES = { my: 'mi', your: 'tu', his: 'li', her: 'li', its: 'li', our: 'misu', their: 'lisu' };
    var DETERMINERS = { a: 1, an: 1, the: 1, this: 1, that: 1, these: 1, those: 1 };
    var WH = { what: 'wata', who: 'kua', whom: 'kua', where: 'wela', when: 'wena', why: 'waia', how: 'aua' };
    var PREPS = { to: 'tote', from: 'pulomute', with: 'witute', in: 'inute', inside: 'inute', on: 'onute',
      about: 'paute', for: 'pote', at: 'atute', by: 'atute' };
    // 辞書の代名詞・前置詞（英語1語の訳）も使えるようにする
    lexicon.forEach(function (e) {
      if (e.pos !== 'pronoun' && e.pos !== 'prep') return;
      var table = e.pos === 'pronoun' ? PRONOUNS : PREPS;
      e.en.forEach(function (g) {
        var key = g.toLowerCase();
        if (/^[a-z]+$/.test(key) && !table[key]) table[key] = e.w;
      });
    });
    var MODALS = { can: 'kani', must: 'masi', may: 'mei', might: 'mei', should: 'sati' };
    var BE = { be: 1, am: 1, is: 1, are: 1, was: 1, were: 1, been: 1, being: 1 };
    var NUMWORDS = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
      ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17,
      eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70,
      eighty: 80, ninety: 90 };
    var IRREGULAR_VERBS = {
      ate: 'eat', eaten: 'eat', went: 'go', gone: 'go', came: 'come', saw: 'see', seen: 'see', took: 'take',
      taken: 'take', gave: 'give', given: 'give', made: 'make', wrote: 'write', written: 'write', ran: 'run',
      drank: 'drink', drunk: 'drink', sang: 'sing', sung: 'sing', swam: 'swim', swum: 'swim', flew: 'fly',
      flown: 'fly', fell: 'fall', fallen: 'fall', slept: 'sleep', sat: 'sit', stood: 'stand', thought: 'think',
      knew: 'know', known: 'know', felt: 'feel', found: 'find', lost: 'lose', sold: 'sell', sent: 'send',
      spent: 'spend', paid: 'pay', met: 'meet', said: 'say', told: 'tell', heard: 'hear', had: 'have',
      began: 'begin', begun: 'begin', taught: 'teach', caught: 'catch', chose: 'choose', chosen: 'choose',
      broke: 'break', broken: 'break', drove: 'drive', driven: 'drive', forgot: 'forget', forgotten: 'forget',
      wore: 'wear', worn: 'wear', won: 'win', left: 'leave', led: 'lead', threw: 'throw', thrown: 'throw',
      shook: 'shake', held: 'hold', understood: 'understand', stood_: 'stand'
    };
    var IRREGULAR_PAST = {};
    ['ate', 'went', 'came', 'saw', 'took', 'gave', 'made', 'wrote', 'ran', 'drank', 'sang', 'swam', 'flew', 'fell',
      'slept', 'sat', 'stood', 'thought', 'knew', 'felt', 'found', 'lost', 'sold', 'sent', 'spent', 'paid', 'met',
      'said', 'told', 'heard', 'had', 'began', 'taught', 'caught', 'chose', 'broke', 'drove', 'forgot', 'wore',
      'won', 'left', 'led', 'threw', 'shook', 'held', 'understood'].forEach(function (w) { IRREGULAR_PAST[w] = 1; });
    var IRREGULAR_ADJ = { better: 'good', best: 'good', worse: 'bad', worst: 'bad' };
    var IRREGULAR_NOUN = { people: 'person', children: 'child', men: 'man', women: 'woman', feet: 'foot' };
    // to + 動詞が目的ではなく補語になる動詞（need to eat・ask him to go など）と、目的語がなくても目的を取る移動の動詞
    var TO_COMPLEMENT = { need: 1, have: 1, decide: 1, plan: 1, learn: 1, promise: 1, expect: 1, agree: 1, refuse: 1, manage: 1,
      offer: 1, prepare: 1, continue: 1, forget: 1, remember: 1, seem: 1, ask: 1, tell: 1, allow: 1, help: 1, advise: 1, order: 1,
      force: 1, teach: 1, invite: 1, encourage: 1, enable: 1, persuade: 1, remind: 1, require: 1, ought: 1, use: 1 };
    var MOTION_VERB = { go: 1, come: 1, leave: 1, return: 1, run: 1, walk: 1, travel: 1, hurry: 1, stop: 1 };
    var VERB_WANTS_GERUND = { want: 1, like: 1, love: 1, hope: 1, wish: 1, try: 1, start: 1, begin: 1,
      enjoy: 1, stop: 1, finish: 1, keep: 1, avoid: 1, practice: 1, quit: 1, continue: 1, hate: 1 };

    // 英語の表層形 → [{lemma, form}] の候補
    function verbCandidates(tok) {
      var out = [];
      if (IRREGULAR_VERBS[tok]) out.push({ lemma: IRREGULAR_VERBS[tok], form: IRREGULAR_PAST[tok] ? 'past' : 'pp' });
      out.push({ lemma: tok, form: 'base' });
      if (/ing$/.test(tok) && tok.length > 4) {
        var s = tok.slice(0, -3);
        out.push({ lemma: s, form: 'ing' }, { lemma: s + 'e', form: 'ing' });
        if (/(.)\1$/.test(s)) out.push({ lemma: s.slice(0, -1), form: 'ing' });
      }
      if (/ed$/.test(tok) && tok.length > 3) {
        var d = tok.slice(0, -2);
        out.push({ lemma: d, form: 'past' }, { lemma: d + 'e', form: 'past' }, { lemma: tok.slice(0, -1), form: 'past' });
        if (/(.)\1$/.test(d)) out.push({ lemma: d.slice(0, -1), form: 'past' });
        if (/i$/.test(d)) out.push({ lemma: d.slice(0, -1) + 'y', form: 'past' });
      }
      if (/ies$/.test(tok)) out.push({ lemma: tok.slice(0, -3) + 'y', form: 's' });
      if (/es$/.test(tok)) out.push({ lemma: tok.slice(0, -2), form: 's' });
      if (/s$/.test(tok)) out.push({ lemma: tok.slice(0, -1), form: 's' });
      return out;
    }

    function findVerb(tok) {
      var cands = verbCandidates(tok);
      for (var i = 0; i < cands.length; i++) {
        var es = (enIndex[cands[i].lemma] || []).filter(function (e) { return e.pos === 'verb'; });
        if (es.length) return { e: es[0], form: cands[i].form, lemma: cands[i].lemma };
      }
      return null;
    }
    function findNoun(tok) {
      var cands = [{ lemma: tok, plural: false }];
      if (IRREGULAR_NOUN[tok]) cands.unshift({ lemma: IRREGULAR_NOUN[tok], plural: true });
      if (/ies$/.test(tok)) cands.push({ lemma: tok.slice(0, -3) + 'y', plural: true });
      if (/es$/.test(tok)) cands.push({ lemma: tok.slice(0, -2), plural: true });
      if (/s$/.test(tok)) cands.push({ lemma: tok.slice(0, -1), plural: true });
      for (var i = 0; i < cands.length; i++) {
        var es = (enIndex[cands[i].lemma] || []).filter(function (e) { return e.pos === 'noun'; });
        if (es.length) return { e: es[0], plural: cands[i].plural };
      }
      return null;
    }
    function findAdj(tok) {
      var base = IRREGULAR_ADJ[tok];
      var cands = [{ lemma: base || tok, deg: base ? (tok === 'better' || tok === 'worse' ? 'comp' : 'sup') : null }];
      if (/est$/.test(tok)) { var s = tok.slice(0, -3); cands.push({ lemma: s, deg: 'sup' }, { lemma: s + 'e', deg: 'sup' }, { lemma: s.slice(0, -1), deg: 'sup' }); if (/i$/.test(s)) cands.push({ lemma: s.slice(0, -1) + 'y', deg: 'sup' }); }
      if (/er$/.test(tok)) { var c = tok.slice(0, -2); cands.push({ lemma: c, deg: 'comp' }, { lemma: c + 'e', deg: 'comp' }, { lemma: c.slice(0, -1), deg: 'comp' }); if (/i$/.test(c)) cands.push({ lemma: c.slice(0, -1) + 'y', deg: 'comp' }); }
      for (var i = 0; i < cands.length; i++) {
        var es = (enIndex[cands[i].lemma] || []).filter(function (e) { return e.pos === 'adj'; });
        if (es.length) return { e: es[0], deg: cands[i].deg };
      }
      return null;
    }
    function findAdv(tok) {
      var es = (enIndex[tok] || []).filter(function (e) { return e.pos === 'adv'; });
      return es.length ? es[0] : null;
    }

    function expandContractions(text) {
      return text
        .replace(/\bcan't\b/gi, 'can not').replace(/\bcannot\b/gi, 'can not').replace(/\bwon't\b/gi, 'will not')
        .replace(/\b(\w+)n't\b/gi, '$1 not')
        .replace(/\bI'm\b/gi, 'I am').replace(/\b(\w+)'re\b/gi, '$1 are').replace(/\b(\w+)'ll\b/gi, '$1 will')
        .replace(/\b(\w+)'ve\b/gi, '$1 have').replace(/\b(he|she|it|that|there)'s\b/gi, '$1 is')
        .replace(/\bdo not\b/gi, 'do not');
    }

    function Cursor(tokens) { this.t = tokens; this.i = 0; }
    Cursor.prototype.peek = function (o) { return this.t[this.i + (o || 0)]; };
    Cursor.prototype.next = function () { return this.t[this.i++]; };
    Cursor.prototype.more = function () { return this.i < this.t.length; };

    function numberFrom(cur) {
      var tok = cur.peek();
      if (tok === undefined) return null;
      if (/^[0-9]+$/.test(tok)) { cur.next(); return parseInt(tok, 10); }
      if (NUMWORDS[tok] !== undefined) {
        var v = NUMWORDS[tok]; cur.next();
        var nx = cur.peek();
        if (v >= 20 && NUMWORDS[nx] !== undefined && NUMWORDS[nx] < 10 && NUMWORDS[nx] > 0) { v += NUMWORDS[nx]; cur.next(); }
        return v;
      }
      return null;
    }

    function startsNP(tok) {
      if (!tok) return false;
      return !!(DETERMINERS[tok] || PRONOUNS[tok] || POSSESSIVES[tok] || /^[0-9]+$/.test(tok) || NUMWORDS[tok] !== undefined ||
        WH[tok] === 'wata' || tok === 'many' || tok === 'some' || findNoun(tok) || findAdj(tok) || tok === 'most');
    }

    // 名詞句。返り値 { items, plain } か null
    function parseNP(cur, ctx) {
      var start = cur.i;
      var items = [];
      var sawHead = false;
      var plural = false;
      var hasQuant = false;
      var sawDet = false;
      while (cur.more()) {
        var tok = cur.peek();
        // this / that / these / those: 名詞や形容詞が続けば限定詞、続かなければ代名詞（iliu・teliu）
        if (DEMONSTRATIVES[tok] && byW[DEMONSTRATIVES[tok]]) {
          var dn = cur.peek(1);
          var isDet = !!(dn && !BE[dn] && !AUX_START[dn] && (findNoun(dn) || findAdj(dn) || NUMWORDS[dn] !== undefined || /^[0-9]+$/.test(dn)));
          items.push(item(DEMONSTRATIVES[tok]));
          cur.next();
          if (isDet) { sawDet = true; continue; }
          sawHead = true;
          break;
        }
        // 前置詞のあとの here / there（to here → tote ili）
        if ((tok === 'here' || tok === 'there') && cur.i > 0 && PREPS[cur.t[cur.i - 1]] && byW[tok === 'here' ? 'ili' : 'teli']) {
          items.push(item(tok === 'here' ? 'ili' : 'teli'));
          cur.next();
          sawHead = true;
          break;
        }
        // 「how much」を一つの名詞句にまとめた語（aua mene）。translateEnTokens が作る
        if (tok === 'howmuch__') { items.push(item('aua'), item('mene')); cur.next(); sawHead = true; break; }
        if (DETERMINERS[tok]) { cur.next(); sawDet = true; continue; }
        if (POSSESSIVES[tok]) { items.push(item(POSSESSIVES[tok])); cur.next(); continue; }
        var num = numberFrom(cur);
        if (num !== null) {
          // 「20 years old」は copula 側で扱う
          items = items.concat(words(numberToLogi(num)));
          hasQuant = true;
          continue;
        }
        if (PRONOUNS[tok]) { items.push(item(PRONOUNS[tok])); cur.next(); sawHead = true; break; }
        if (tok === 'what' && cur.peek(1) && !BE[cur.peek(1)] && findNoun(cur.peek(1))) { items.push(item('wata')); cur.next(); continue; }
        if (tok === 'many' || tok === 'some') { items.push(item(tok === 'many' ? 'mene' : 'some')); hasQuant = true; cur.next(); continue; }
        if (tok === 'most' && cur.peek(1) && findAdj(cur.peek(1))) { items.push(item('mosi')); cur.next(); continue; }
        var adj = findAdj(tok);
        var noun = findNoun(tok);
        var nextTok = cur.peek(1);
        if (adj && !(noun && !(nextTok && (findNoun(nextTok) || findAdj(nextTok))) )) {
          if (adj.deg === 'sup') items.push(item('mosi'));
          items.push(item(adj.e.w)); cur.next(); continue;
        }
        if (noun) {
          cur.next();
          items.push(item(noun.e.w));
          plural = noun.plural;
          sawHead = true;
          break;
        }
        var adv = findAdv(tok);
        if (adv && (tok === 'very' || tok === 'too') && cur.peek(1) && findAdj(cur.peek(1))) { items.push(item(adv.w)); cur.next(); continue; }
        // 冠詞のあとの未登録語は名詞として残す（例: a pencil → [pencil?]）
        if (sawDet && !AUX_START[tok] && !BE[tok] && !PREPS[tok] && !findVerb(tok) && !WH[tok]) {
          items.push(unknown(tok)); cur.next(); sawHead = true; break;
        }
        break;
      }
      if (!sawHead && !items.length) { cur.i = start; return null; }
      if (!sawHead) { cur.i = start; return null; }
      if (plural && !hasQuant) { items.unshift(item('mene')); ctx.notes.push('複数形は mene（多くの）で表しています。'); }
      // 関係節（主語の関係節のみ）
      var rel = cur.peek();
      if ((rel === 'who' || rel === 'that' || rel === 'which') && cur.peek(1)) {
        var vv = findVerb(cur.peek(1));
        if (vv) {
          cur.next(); cur.next();
          var relItems = [item('ta'), item('li')];
          if (vv.form === 'past') relItems.push(item('pasu'));
          relItems.push(item(vv.e.w));
          items = items.concat(relItems);
        }
      }
      // and / or
      var conj = cur.peek();
      if ((conj === 'and' || conj === 'or') && startsNP(cur.peek(1)) && !findVerbOnly(cur.peek(1), cur.peek(2))) {
        var save = cur.i;
        cur.next();
        var more = parseNP(cur, ctx);
        if (more) { items = items.concat([item(conj === 'and' ? 'e' : 'o')], more.items); }
        else cur.i = save;
      }
      return { items: items };
    }

    var OBJECT_PRONOUNS = { me: 1, you: 1, him: 1, her: 1, it: 1, us: 1, them: 1 };
    function findVerbOnly(tok, next) {
      if (!findVerb(tok) || PRONOUNS[tok]) return false;
      if (!findNoun(tok) && !findAdj(tok)) return true;
      // drink・rest・play など名詞でもある語: 次が限定詞・目的語の代名詞・前置詞なら動詞とみなす
      return !!(next && (DETERMINERS[next] || POSSESSIVES[next] || OBJECT_PRONOUNS[next] || PREPS[next]) && !findAdj(tok));
    }

    // 「Reading books is fun.」: 動名詞（-ing）で始まる主語。あとに be 動詞か助動詞が続くときだけ主語にする
    function parseGerundSubject(cur, ctx) {
      var first = cur.peek();
      var gv = first ? findVerb(first) : null;
      // 名詞でもある語（swimming など）は、あとに前置詞句が続くときだけ動名詞として読む
      if (!gv || gv.form !== 'ing' || (findNoun(first) && !PREPS[cur.peek(1)])) return null;
      var save = cur.i;
      cur.next();
      var items = [item(gv.e.w + 'na', { gerund: gv.e.w })];
      var next = cur.peek();
      if (next && startsNP(next) && !BE[next] && !AUX_START[next]) {
        var objNP = parseNP(cur, ctx);
        if (objNP) items = items.concat(objNP.items);
      }
      while (cur.more() && PREPS[cur.peek()]) {
        var prep = PREPS[cur.next()];
        var pnp = parseNP(cur, ctx);
        if (!pnp) break;
        items = items.concat([item(prep)], pnp.items);
      }
      if (cur.peek() && (BE[cur.peek()] || AUX_START[cur.peek()])) return { items: items };
      cur.i = save;
      return null;
    }

    function translateEnSentence(raw, question, notes, opts) {
      var text = expandContractions(raw).toLowerCase();
      return translateEnTokens(text.match(/[a-z]+|[0-9]+/g) || [], question, notes, opts);
    }

    function translateEnTokens(tokens, question, notes, opts) {
      opts = opts || {};
      if (!tokens.length) return null;
      var ir = { subject: null, advs: [], tense: null, aspect: null, neg: false, question: question,
        object: null, pps: [], notes: notes };
      var ctx = { notes: notes };

      var whWord = null;
      var whMod = false;
      var whPrefix = [item('wata')];
      if (question && tokens[0] === 'how') {
        // how old are you? → what year do you have（tu oto wata ila ka?）
        if (tokens[1] === 'old' && BE[tokens[2]] && tokens.length > 3) {
          var oldAux = (tokens[2] === 'was' || tokens[2] === 'were') ? 'did' : (tokens[2] === 'is' ? 'does' : 'do');
          tokens = ['what', 'year', oldAux].concat(tokens.slice(3), ['have']);
        // how many apples do you have? → aua mene apa
        } else if ((tokens[1] === 'many' || tokens[1] === 'much') && tokens[2] && AUX_START[tokens[3]] && findNoun(tokens[2]) && tokens.length > 4) {
          tokens = ['what'].concat(tokens.slice(2));
          whPrefix = [item('aua'), item('mene')];
        // how much is it? → it is (aua mene)
        } else if (tokens[1] === 'much' && BE[tokens[2]] && tokens.length > 3) {
          tokens = tokens.slice(3).concat([tokens[2], 'howmuch__']);
        }
      }
      if (question && WH[tokens[0]]) {
        whWord = tokens[0];
        tokens = tokens.slice(1);
        if (whWord === 'what' && tokens[0] && !AUX_START[tokens[0]] && !BE[tokens[0]] && findNoun(tokens[0])) {
          whMod = true;
          var cur0 = new Cursor(tokens);
          var hasQty = whPrefix.length === 2;
          var np0 = parseNP(cur0, hasQty ? { notes: [] } : ctx);
          if (np0) {
            // how many のあとの名詞は、複数の mene を重ねない
            var npItems = hasQty ? np0.items.filter(function (it) { return it.w !== 'mene'; }) : np0.items;
            whMod = whPrefix.concat(npItems);
            tokens = tokens.slice(cur0.i);
          }
        }
      }
      // 倒置を戻す: aux/be + 主語 + 残り → 主語 + aux + 残り
      var wasInverted = false;
      if (question && AUX_START[tokens[0]] && tokens.length > 1) {
        var skip = tokens[1] === 'not' ? 2 : 1;
        var cur1 = new Cursor(tokens.slice(skip));
        var subj = parseNP(cur1, ctx);
        if (subj) {
          var restTok = tokens.slice(skip + cur1.i);
          var subjTok = tokens.slice(skip, skip + cur1.i);
          tokens = subjTok.concat(tokens.slice(0, skip), restTok);
          wasInverted = true;
        }
      }

      var cur = new Cursor(tokens);
      var subjNP = null;
      if (whWord === 'who' || (whWord === 'what' && !wasInverted && !whMod)) {
        subjNP = { items: [item(WH[whWord])] };
        whWord = null;
      } else {
        subjNP = parseGerundSubject(cur, ctx) || parseNP(cur, ctx);
      }
      if (!subjNP && !(cur.peek() && (AUX_START[cur.peek()] || findVerb(cur.peek())))) {
        return null;
      }
      if (!subjNP && !opts.inheritSubject && !question) notes.push('主語が見つからない文です。');
      ir.subject = subjNP ? subjNP.items : (opts.inheritSubject || null);

      // 助動詞・否定・副詞
      var verbTok = null;
      var beForm = null;
      var perfect = false;
      var progressive = false;
      var modal = null;
      while (cur.more()) {
        var tk = cur.peek();
        if (tk === 'do' || tk === 'does') { cur.next(); continue; }
        if (tk === 'did') { ir.tense = 'past'; cur.next(); continue; }
        if (tk === 'will') { ir.tense = 'future'; cur.next(); continue; }
        if (tk === 'would') { ir.hyp = true; cur.next(); continue; }
        if (MODALS[tk]) { modal = MODALS[tk]; cur.next(); continue; }
        if (tk === 'not') { ir.neg = true; cur.next(); continue; }
        if (tk === 'never') { ir.advs.push(item('nepi')); cur.next(); continue; }
        if ((tk === 'have' || tk === 'has' || tk === 'had') && cur.peek(1)) {
          var nv = findVerb(cur.peek(1));
          var isPP = nv && (nv.form === 'pp' || nv.form === 'past');
          var afterNot = cur.peek(1) === 'not' && cur.peek(2) && findVerb(cur.peek(2));
          if (isPP || afterNot) { perfect = true; if (tk === 'had') ir.tense = 'past'; cur.next(); continue; }
        }
        if (BE[tk]) { beForm = tk; cur.next(); continue; }
        var adv = findAdv(tk);
        if (adv && !findVerb(tk) && !findNoun(tk) && !findAdj(tk)) {
          cur.next();
          ir.advs.push(item(adv.w));
          continue;
        }
        break;
      }
      if (modal) ir.advs.unshift(item(modal));
      if (beForm === 'was' || beForm === 'were') ir.tense = 'past';

      // 年齢: I am 20 years old
      if (beForm && cur.peek() && (/^[0-9]+$/.test(cur.peek()) || NUMWORDS[cur.peek()] !== undefined)) {
        var save = cur.i;
        var age = numberFrom(cur);
        if (age !== null && (cur.peek() === 'years' || cur.peek() === 'year')) {
          cur.next(); if (cur.peek() === 'old') cur.next();
          ir.verb = 'oto';
          ir.object = words(numberToLogi(age)).concat([item('ila')]);
          return ir;
        }
        cur.i = save;
      }

      if (beForm && !(cur.peek() && findVerb(cur.peek()) && findVerb(cur.peek()).form === 'ing' && !findAdj(cur.peek()))) {
        // be + 補語 / 場所
        ir.verb = 'pio';
        var prepTok = cur.peek();
        if (PREPS[prepTok] && cur.peek(1)) {
          // 場所: alo + 前置詞句
          ir.verb = 'alo';
          cur.next();
          var locNP = parseNP(cur, ctx);
          var pw = PREPS[prepTok];
          if (locNP) ir.pps.push([item(pw)].concat(locNP.items));
          else if (whWord) { ir.pps.push([item(pw), item(WH[whWord])]); whWord = null; }
          else ir.pps.push([item(pw)]);
          return finishEn(ir, whWord, whMod);
        }
        if (whWord === 'where' || whWord === 'when') {
          ir.verb = 'alo';
          ir.pps.push([item('atute'), item(WH[whWord])]);
          whWord = null;
          return finishEn(ir, whWord, whMod);
        }
        if (whWord === 'what') {
          ir.complement = [item('wata')];
          whWord = null;
          return finishEn(ir, whWord, whMod);
        }
        // 補語
        var comp = [];
        var save2 = cur.i;
        var degAdv = cur.peek();
        if (degAdv === 'very' || degAdv === 'too' || degAdv === 'more' || degAdv === 'most') {
          cur.next();
          if (degAdv === 'more') comp.push(item('moli'));
          else if (degAdv === 'most') comp.push(item('mosi'));
          else comp.push(item(degAdv === 'very' ? 'peli' : 'tui'));
        }
        if (cur.peek() === 'the' && cur.peek(1) === 'same' && cur.peek(2) === 'as') {
          cur.next(); cur.next(); cur.next();
          var refSame = parseNP(cur, ctx);
          ir.complement = [item('seme'), item('tote')].concat(refSame ? refSame.items : []);
          return finishEn(ir, whWord, whMod);
        }
        if (cur.peek() === 'as' && cur.peek(1) && findAdj(cur.peek(1))) {
          notes.push('「as ~ as」は未対応です。');
        }
        var adjTok = cur.peek();
        var adj = adjTok ? findAdj(adjTok) : null;
        var nounAlso = adjTok ? findNoun(adjTok) : null;
        var adjFollowedByNoun = !!(cur.peek(1) && startsNP(cur.peek(1)) && cur.peek(1) !== 'than');
        if (adj && (!nounAlso || !adjFollowedByNoun)) {
          cur.next();
          if (adj.deg === 'comp' && !comp.length) comp.push(item('moli'));
          if (adj.deg === 'sup') comp.push(item('mosi'));
          comp.push(item(adj.e.w));
          if (cur.peek() === 'than') {
            cur.next();
            var ref = parseNP(cur, ctx);
            comp.push(item('tanute'));
            if (ref) comp = comp.concat(ref.items);
          }
          ir.complement = comp;
          return finishEn(ir, whWord, whMod);
        }
        cur.i = save2;
        var npc = parseNP(cur, ctx);
        if (npc) {
          ir.complement = comp.concat(npc.items);
          while (cur.more() && PREPS[cur.peek()]) {
            var p1 = cur.next();
            var pn = parseNP(cur, ctx);
            if (pn) ir.pps.push([item(PREPS[p1])].concat(pn.items));
          }
          return finishEn(ir, whWord, whMod);
        }
        if (cur.more()) ir.complement = [unknown(cur.peek())];
        return finishEn(ir, whWord, whMod);
      }

      // 一般動詞
      var vtok = cur.peek();
      if (!vtok) return null;
      var verb = findVerb(vtok);
      if (!verb) {
        ir.verb = null;
        return null;
      }
      cur.next();
      if (beForm && verb.form === 'ing') progressive = true;
      if (progressive) ir.aspect = 'prog';
      if (perfect) ir.aspect = 'perf';
      if (verb.form === 'past' && !ir.tense && !perfect) ir.tense = 'past';
      ir.verb = verb.e.w;
      var lemma = verb.lemma;
      if (COMPLEMENT_EN[lemma]) {
        var restTok = cur.t.slice(cur.i);
        var hasThat = restTok[0] === 'that';
        var clauseTok = hasThat ? restTok.slice(1) : restTok;
        if (hasThat || clauseStartsAt(clauseTok, 0)) {
          var subIr = translateEnTokens(clauseTok, false, notes, {});
          if (subIr) {
            ir.object = generate(subIr);
            cur.i = cur.t.length;
            return finishEn(ir, whWord, whMod);
          }
        }
      }
      // 目的語・前置詞句・副詞
      var guard = 0;
      while (cur.more() && guard++ < 20) {
        var t2 = cur.peek();
        // 目的 in order to V / so as to V / to V（docs/proposals/007）: pote + 動名詞（目的語・前置詞句つき）
        var purposeSkip = 0;
        if (t2 === 'in' && cur.peek(1) === 'order' && cur.peek(2) === 'to') purposeSkip = 3;
        else if (t2 === 'so' && cur.peek(1) === 'as' && cur.peek(2) === 'to') purposeSkip = 3;
        else if (t2 === 'to' && !VERB_WANTS_GERUND[lemma] && !TO_COMPLEMENT[lemma] && (ir.object || ir.pps.length > 0 || MOTION_VERB[lemma])) purposeSkip = 1;
        if (purposeSkip && byW.pote) {
          var pv = cur.peek(purposeSkip) ? findVerb(cur.peek(purposeSkip)) : null;
          var plain = !!pv && pv.form === 'base' && (purposeSkip === 3 || !findNoun(cur.peek(purposeSkip)) || ir.pps.length > 0 || !!ir.object);
          if (plain) {
            for (var sk = 0; sk < purposeSkip; sk++) cur.next();
            cur.next();
            var pitems = [item('pote'), item(pv.e.w + 'na', { gerund: pv.e.w })];
            if (cur.peek() && startsNP(cur.peek()) && !PREPS[cur.peek()]) {
              var pobj = parseNP(cur, ctx);
              if (pobj) pitems = pitems.concat(pobj.items);
            }
            while (cur.more() && PREPS[cur.peek()]) {
              var pprep = PREPS[cur.next()];
              var ppnp = parseNP(cur, ctx);
              if (!ppnp) break;
              pitems = pitems.concat([item(pprep)], ppnp.items);
            }
            ir.pps.push(pitems);
            continue;
          }
        }
        if (t2 === 'to' && VERB_WANTS_GERUND[lemma] && cur.peek(1) && findVerb(cur.peek(1))) {
          cur.next();
          var gv = findVerb(cur.next());
          ir.object = [item(gv.e.w + 'na', { gerund: gv.e.w })];
          continue;
        }
        if (PREPS[t2]) {
          cur.next();
          var pnp = parseNP(cur, ctx);
          if (pnp) ir.pps.push([item(PREPS[t2])].concat(pnp.items));
          else if (whWord && (whWord === 'where' || whWord === 'when')) { ir.pps.push([item(PREPS[t2]), item(WH[whWord])]); whWord = null; }
          continue;
        }
        var gv2 = findVerb(t2);
        if (gv2 && gv2.form === 'ing' && VERB_WANTS_GERUND[lemma] && !ir.object) {
          cur.next();
          ir.object = [item(gv2.e.w + 'na', { gerund: gv2.e.w })];
          continue;
        }
        var adv2 = findAdv(t2);
        if (adv2 && !findNoun(t2) && (!findAdj(t2) || !cur.peek(1) || !startsNP(cur.peek(1)))) {
          cur.next();
          if (adv2.w === 'mosi' || adv2.w === 'moli' || adv2.w === 'peli') {
            // very / most などは後ろの副詞・形容詞にかかる
            var after = cur.peek();
            if (after && findAdv(after)) { ir.advs.push(item(adv2.w)); continue; }
            ir.advs.push(item(adv2.w));
            continue;
          }
          ir.advs.push(item(adv2.w));
          continue;
        }
        if (startsNP(t2)) {
          var np = parseNP(cur, ctx);
          if (np) {
            if (!ir.object) {
              ir.object = np.items;
              // 授与動詞: V 受け手 物 → V 物 tote 受け手
              if (cur.more() && startsNP(cur.peek()) && np.items.length === 1 && byW[np.items[0].w] && byW[np.items[0].w].pos === 'pronoun') {
                var np2 = parseNP(cur, ctx);
                if (np2) { ir.pps.push([item('tote')].concat(np.items)); ir.object = np2.items; }
              }
            } else ir.pps.push(np.items);
            continue;
          }
        }
        // 未登録語
        ir.object = (ir.object || []).concat([unknown(cur.next())]);
      }
      return finishEn(ir, whWord, whMod);
    }

    function finishEn(ir, whWord, whMod) {
      var wh = whWord;
      if (whMod && whMod.length) {
        if (ir.verb && ir.verb !== 'pio') ir.object = whMod;
        else ir.complement = whMod;
      } else if (wh) {
        if (wh === 'why' || wh === 'how') {
          ir.advs.unshift(item(WH[wh]));
        } else if (wh === 'where' || wh === 'when') {
          var motion = ir.verb === 'iko' || ir.verb === 'komo';
          ir.pps.push([item(wh === 'where' && motion ? 'tote' : 'atute'), item(WH[wh])]);
        } else if (wh === 'what' || wh === 'whom') {
          if (ir.verb && ir.verb !== 'pio') ir.object = [item(WH[wh])];
          else ir.complement = [item(WH[wh])];
        }
      }
      return ir;
    }

    var AUX_START = { do: 1, does: 1, did: 1, is: 1, are: 1, am: 1, was: 1, were: 1, will: 1, can: 1, must: 1,
      may: 1, might: 1, should: 1, have: 1, has: 1, had: 1, would: 1 };

    var COMPLEMENT_EN = { think: 1, know: 1, believe: 1, say: 1, hope: 1, guess: 1, notice: 1 };
    // 従属接続語: その節の頭に付く（節の順序は原文のまま）
    var SUB_EN = { if: 'ipu', because: 'pikosu', since: 'pikosu', when: 'wenute', while: 'wailu', before: 'pipolu',
      after: 'aputi', until: 'utilu', unless: 'ulesu', although: 'oluto', though: 'oluto' };

    // tokens[i] から主語つきの節（名詞句 + 動詞・助動詞）が始まるか
    function clauseStartsAt(tokens, i) {
      var cur = new Cursor(tokens.slice(i));
      var np = parseNP(cur, { notes: [] });
      if (!np) return false;
      var nx = cur.peek();
      if (!nx) return false;
      if (AUX_START[nx] || MODALS[nx] || BE[nx] || nx === 'not') return true;
      var v = findVerb(nx);
      var pronounSubject = cur.i === 1 && !!PRONOUNS[tokens[i]];
      return !!(v && (v.form === 'past' || v.form === 's' || v.form === 'base') && (!findNoun(nx) || pronounSubject));
    }

    // 文を節に分け、つなぐ語（patu・sonu・e・o）と従属接続語（ipu・pikosu など）を決める
    function splitEn(tokens, question) {
      var segs = [];
      var cur = [];
      var conn = null;
      var sub = null;
      function push() {
        if (cur.length) segs.push({ tokens: cur, conn: conn, sub: sub });
        cur = []; conn = null; sub = null;
      }
      for (var i = 0; i < tokens.length; i++) {
        var t = tokens[i];
        var startsClause = clauseStartsAt(tokens, i + 1);
        if (t === ',') {
          var nx = tokens[i + 1];
          if (nx === 'but' || nx === 'so' || nx === 'and' || nx === 'or' || SUB_EN[nx] || startsClause || sub) push();
          else if (nx && startsNP(nx)) cur.push('and'); // 「A, B and C」の並べ方
          continue;
        }
        if (t === 'but' || t === 'whereas') { push(); conn = 'patu'; continue; }
        // 対比 on the other hand（docs/proposals/007）。あとのコンマは読み飛ばす
        if (t === 'on' && tokens[i + 1] === 'the' && tokens[i + 2] === 'other' && tokens[i + 3] === 'hand') {
          push(); conn = 'patu'; i += (tokens[i + 4] === ',' ? 4 : 3); continue;
        }
        // 様態 as（docs/proposals/007）: あとに節が続くときだけ
        if (t === 'as' && startsClause && byW.kasolu) { push(); sub = 'kasolu'; continue; }
        if (t === 'so' && startsClause) { push(); conn = 'sonu'; continue; }
        if (SUB_EN[t] && !(question && i === 0 && t === 'when')) { push(); sub = SUB_EN[t]; continue; }
        if ((t === 'and' || t === 'or') && (startsClause || (tokens[i + 1] && findVerbOnly(tokens[i + 1], tokens[i + 2])))) {
          push(); conn = t === 'and' ? 'e' : 'o'; continue;
        }
        cur.push(t);
      }
      push();
      return segs.map(function (sg) {
        return { tokens: sg.tokens, conn: sg.conn, sub: sg.sub,
          hyp: sg.sub === 'ipu' && sg.tokens.indexOf('were') >= 0 };
      });
    }

    function translateEn(text) {
      var notes = [];
      var parts = [];
      var sentences = text.replace(/\s+/g, ' ').match(/[^.!?]+[.!?]?/g) || [];
      sentences.forEach(function (s) {
        var trimmed = s.trim();
        if (!trimmed) return;
        var question = /\?$/.test(trimmed);
        var body = trimmed.replace(/[.!?]+$/, '');
        var tokens = expandContractions(body).toLowerCase().match(/[a-z]+|[0-9]+|,/g) || [];
        // 日常のあいさつ（docs/proposals/005）: Good morning / Good night / Sorry / Excuse me / Thanks
        var greet = !question && EN_GREETING[tokens.join(' ')];
        if (greet) { parts.push([{ fragment: greet.map(function (w) { return item(w); }), notes: notes }]); return; }
        // 文頭の Yes / No / Hello / Goodbye / Please: jesu / no / kelosu / kupaju / pilisu を先頭に置く
        var answer = null;
        var lead = EN_INTERJ[tokens[0]];
        if (lead && (tokens.length === 1 || tokens[1] === ',' || tokens[0] === 'please')) {
          answer = lead;
          tokens = tokens.slice(tokens[1] === ',' ? 2 : 1);
        } else if (tokens.length > 2 && tokens[tokens.length - 1] === 'please' && tokens[tokens.length - 2] === ',') {
          answer = EN_INTERJ.please;   // 文末の ", please" も文頭に置く
          tokens = tokens.slice(0, -2);
        }
        if (answer && !tokens.length) { parts.push([{ fragment: [item(answer)], notes: notes }]); return; }
        // 平叙文の許可・禁止・不要（docs/proposals/006）: You may → can、You may not → must not、do not have to / need not → can not
        if (!question) {
          var enOut = [];
          for (var ti = 0; ti < tokens.length; ti++) {
            var w0 = tokens[ti], w1 = tokens[ti + 1], w2 = tokens[ti + 2], w3 = tokens[ti + 3];
            if (w0 === 'you' && w1 === 'may' && w2 === 'not') { enOut.push('you', 'must', 'not'); ti += 2; }
            else if (w0 === 'you' && w1 === 'may') { enOut.push('you', 'can'); ti += 1; }
            else if ((w0 === 'do' || w0 === 'does') && w1 === 'not' && w2 === 'have' && w3 === 'to') { enOut.push('can', 'not'); ti += 3; }
            else if ((w0 === 'do' || w0 === 'does') && w1 === 'not' && w2 === 'need' && w3 === 'to') { enOut.push('can', 'not'); ti += 3; }
            else if (w0 === 'need' && w1 === 'not') { enOut.push('can', 'not'); ti += 1; }
            else enOut.push(w0);
          }
          tokens = enOut;
        }
        // 疑問での許可・依頼・申し出（docs/proposals/004）: May I / Could I / Could you / Shall I
        if (question) {
          var t0 = tokens[0], t1 = tokens[1];
          if (t0 === 'may' && (t1 === 'i' || t1 === 'we')) tokens = ['can'].concat(tokens.slice(1));
          else if (t0 === 'could' && (t1 === 'i' || t1 === 'you' || t1 === 'we')) tokens = ['can'].concat(tokens.slice(1));
          else if (t0 === 'would' && t1 === 'you' && tokens[2] === 'please') tokens = ['can'].concat(tokens.slice(1));
          else if (t0 === 'shall' && (t1 === 'i' || t1 === 'we')) tokens = ['should'].concat(tokens.slice(1));
          // Can you please … / Could you please … は、文頭に pilisu
          if (tokens[0] === 'can' && tokens[1] === 'you' && tokens[2] === 'please') {
            tokens = tokens.slice(0, 2).concat(tokens.slice(3));
            if (!answer) answer = EN_INTERJ.please;
          }
        }
        // 勧誘 Let's … / Let us … は、we を主語にした命令の形。Thank you は I thank you（命令ではない）
        var hort = false;
        var notesBefore = notes.length;
        if (tokens[0] === 'let' && (tokens[1] === 'us' || tokens[1] === 's')) { hort = true; tokens = ['we'].concat(tokens.slice(2)); }
        else if (tokens[0] === 'thank' && tokens[1] === 'you') tokens = ['i'].concat(tokens);
        var segs = splitEn(tokens, question);
        var multi = segs.length > 1;
        if (multi && question) notes.push('接続語を含む疑問文は、語順を倒置せずにそのまま訳しています。');
        var hyp = segs.some(function (sg) { return sg.hyp || sg.tokens.indexOf('would') >= 0; });
        var irs = [];
        var prevSubject = null;
        var failed = false;
        segs.forEach(function (sg, idx) {
          var ir = translateEnTokens(sg.tokens, question && !multi, notes, { inheritSubject: prevSubject });
          if (!ir) { failed = true; return; }
          ir.conn = sg.conn;
          ir.sub = sg.sub;
          if (hyp) ir.hyp = true;
          if (multi && question && idx === segs.length - 1) ir.question = true;
          if (ir.subject) prevSubject = ir.subject;
          irs.push(ir);
        });
        if (failed || !irs.length) {
          notes.push('「' + trimmed + '」は未対応の文型のため訳せませんでした。');
          return;
        }
        // 主語のない動詞文は命令（docs/proposals/003）。文末は ! にする
        var NO_SUBJECT = '主語が見つからない文です。';
        if (hort || (!question && irs[0].verb && !irs[0].subject)) {
          irs[irs.length - 1].imperative = true;
          for (var ni = notes.length - 1; ni >= notesBefore; ni--) if (notes[ni] === NO_SUBJECT) notes.splice(ni, 1);
        }
        if (answer) irs[0].answer = answer;
        parts.push(irs);
      });
      return finalize(parts, notes, 'en');
    }

    function detectLanguage(text) {
      if (/[぀-ヿ㐀-鿿]/.test(text)) return 'ja';
      if (/[A-Za-z]/.test(text)) return 'en';
      return 'ja';
    }

    function translate(text, lang) {
      text = String(text || '').trim();
      if (!text) return { lang: lang || 'ja', logi: '', items: [], notes: [], unknown: [] };
      var l = (!lang || lang === 'auto') ? detectLanguage(text) : lang;
      return l === 'en' ? translateEn(text) : translateJa(text);
    }

    return { translate: translate, detectLanguage: detectLanguage, numberToLogi: numberToLogi };
  }

  return { createTranslator: createTranslator, numberToLogi: numberToLogi };
});
