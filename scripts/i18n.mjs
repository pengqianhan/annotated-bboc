#!/usr/bin/env node
// Keeps the English text of docs/index.html in step with its Chinese source.
//
//   node scripts/i18n.mjs check                      what is missing, stale, hand-edited, orphaned or structurally off
//   node scripts/i18n.mjs translate [prefix…]        write English for every missing or stale unit with Gemini 4 Argon (agy), then merge
//   node scripts/i18n.mjs accept <key…|--all>        after the Chinese has been reviewed against hand-edited English, mark those units in step
//   node scripts/i18n.mjs export [--todo] [prefix…]  Chinese source units as JSON
//                                                    (--todo: only missing or stale; prefix: e.g. N. T. ST. BX. ui. s. NOW)
//   node scripts/i18n.mjs merge <file.json>          write units {key: english} into the page
//   node scripts/i18n.mjs prune                      drop English units whose Chinese source no longer exists
//   node scripts/i18n.mjs omit <noteKey…>            mark notes as deliberately absent from the English version
//   node scripts/i18n.mjs zha-export [from] [to]     body blocks (English with anchors + plain Chinese) for anchoring
//   node scripts/i18n.mjs zha-merge <file.json>      write anchored Chinese blocks {index: html} into the page
//
// Chinese is the source. Every English unit remembers a hash of the Chinese it was written from and a hash of itself
// (EN.h[key] = "<chinese>.<english>"). Editing the Chinese makes the unit "stale" until it is translated again.
// Editing the English by hand makes it "edited": translate leaves it alone until the Chinese has been reviewed and the unit accepted.
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'index.html');
const CJK = /[㐀-鿿]/;
const hash = s => crypto.createHash('sha1').update(s).digest('hex').slice(0, 8);

let html = fs.readFileSync(FILE, 'utf8');
const block = id => {
  const m = new RegExp(`(<script type="application/json" id="${id}">)([\\s\\S]*?)(</script>)`).exec(html);
  if (!m) throw new Error('missing #' + id);
  return { json: JSON.parse(m[2]), write(v) { html = html.replace(m[0], () => m[1] + JSON.stringify(v, null, 1).replace(/</g, '\\u003c') + m[3]); } };
};
const EN = block('i18n-en').json, ZHA = block('i18n-zha').json;
EN.s ||= {}; EN.h ||= {}; EN.omit ||= [];
const save = () => { block('i18n-en').write(EN); block('i18n-zha').write(ZHA); fs.writeFileSync(FILE, html); };

// ---- collect every Chinese source unit: {key: chinese} ----
function sources() {
  const src = {};
  // 1. data: run the page script against a do-nothing DOM and record what it asks to translate
  const code = /\n<script>\n([\s\S]*?)\n<\/script>/.exec(html)[1];
  const stub = new Proxy(function () {}, {
    get: (t, k) => k === Symbol.iterator ? function* () {} : k === Symbol.toPrimitive ? () => '' : k === 'length' ? 0 : k === 'then' ? undefined : stub,
    apply: () => stub, construct: () => stub, set: () => true, has: () => true,
  });
  const el = id => id === 'i18n-en' ? { textContent: '{"s":{},"h":{},"omit":[]}' } : id === 'i18n-zha' ? { textContent: '{}' } : stub;
  const ctx = vm.createContext({
    __i18nSrc: src, console: { warn() {}, log() {} }, setTimeout() {}, clearTimeout() {}, URL, Blob, Event: function () {},
    location: { hash: '', search: '', href: 'http://x/' }, history: stub, localStorage: { getItem: () => null, setItem() {} }, sessionStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    NodeFilter: {},
    document: { documentElement: { dataset: { mode: 'en' }, clientWidth: 0 }, getElementById: el, querySelector: () => stub, querySelectorAll: () => [], addEventListener() {}, createElement: () => stub, createTreeWalker: () => stub, body: stub, contains: () => false },
  });
  ctx.window = ctx; ctx.globalThis = ctx;
  ctx.window.addEventListener = () => {}; ctx.window.matchMedia = () => ({ matches: false }); ctx.window.scrollTo = () => {}; ctx.window.innerWidth = 0;
  vm.runInContext(code, ctx, { filename: 'page-script' });
  const pure = vm.runInContext('({ N: Object.keys(N), ZH, T: T.map(e => ({ id: e.id, a: e.a })) })', ctx);
  // 2. interface strings: tr('…') literals (branches that did not run still count)
  for (const m of code.matchAll(/\btr\('((?:[^'\\]|\\.)*)'/g)) src['ui.' + m[1]] = m[1];
  for (const k in src) if (k.startsWith('ui.') && !CJK.test(k) && !/[、：（）]/.test(k)) delete src[k];
  // 3. static HTML: elements marked data-i18n
  for (const m of html.matchAll(/<([a-z0-9]+)\b([^>]*?\sdata-i18n="([^"]+)"[^>]*)>/g)) {
    const [open, tag, attrs, name] = m, key = 's.' + name;
    let inner = '';
    if (!['input', 'img', 'br'].includes(tag)) {   // inner HTML up to the matching close tag
      const re = new RegExp(`<${tag}\\b|</${tag}>`, 'g'); re.lastIndex = m.index + open.length;
      for (let depth = 1, x; (x = re.exec(html));) { depth += x[0][1] === '/' ? -1 : 1; if (!depth) { inner = html.slice(m.index + open.length, x.index); break; } }
    }
    const only = /data-i18n-attr="([^"]*)"/.exec(attrs);
    // a container that only carries translated attributes keeps its children as they are (same rule as the page)
    if (CJK.test(inner) && !(only && /<[a-z]/.test(inner))) src[key] = inner;
    for (const a of (only ? only[1].split(',') : [])) { const v = new RegExp(`\\s${a}="([^"]*)"`).exec(attrs); if (v && CJK.test(v[1])) src[key + '@' + a] = v[1]; }
  }
  return { src, pure };
}

const { src, pure } = sources();
const omitted = k => EN.omit.some(o => k.startsWith('N.' + o + '.'));
const need = Object.keys(src).filter(k => !omitted(k));
const missing = need.filter(k => EN.s[k] == null);
const zhH = k => (EN.h[k] || '').split('.')[0], enH = k => (EN.h[k] || '').split('.')[1];
const stale = need.filter(k => EN.s[k] != null && !k.startsWith('ui.') && zhH(k) !== hash(src[k]));
const edited = need.filter(k => EN.s[k] != null && enH(k) !== undefined && enH(k) !== hash(EN.s[k]));
const record = (k, en) => { EN.s[k] = en; EN.h[k] = (k.startsWith('ui.') ? '' : hash(src[k])) + '.' + hash(en); };
const todo = pre => need.filter(k => (missing.includes(k) || stale.includes(k)) && !edited.includes(k) && (!pre.length || pre.some(p => k.startsWith(p))));
function sortAndSave() {   // keep the block in source order so diffs stay readable
  const order = new Map(Object.keys(src).map((k, i) => [k, i])), rank = k => order.get(k) ?? 1e9;
  for (const f of ['s', 'h']) EN[f] = Object.fromEntries(Object.entries(EN[f]).sort((x, y) => rank(x[0]) - rank(y[0])));
  save();
}

// ---- body blocks, in the same order the page uses ----
function bodyBlocks() {
  const a = html.slice(html.indexOf('<article id="memo"'), html.indexOf('</article>'));
  return [...a.matchAll(/<(p|li)\b[^>]*>([\s\S]*?)<\/\1>/g)].map(m => m[2].trim());
}
const anchors = h => [...h.matchAll(/<(?:span|sup) class="(n [cpf][^"]*)" data-n="([^"]+)"/g)].map(m => m[2]).sort();
const stripTags = h => h.replace(/<sup class="n [^>]*>([^<]*)<\/sup>/g, '$1').replace(/<span class="n [^>]*>|<\/span>/g, '');

const [cmd, ...args] = process.argv.slice(2);

if (cmd === 'export') {
  const pre = args.filter(a => !a.startsWith('--'));
  const out = {};
  for (const k of args.includes('--todo') ? todo(pre) : need.filter(k => !pre.length || pre.some(p => k.startsWith(p)))) out[k] = src[k];
  process.stdout.write(JSON.stringify(out, null, 1) + '\n');
} else if (cmd === 'merge') {
  const inp = JSON.parse(fs.readFileSync(args[0], 'utf8'));
  let n = 0; const unknown = [];
  for (const [k, v] of Object.entries(inp)) {
    if (!(k in src)) { unknown.push(k); continue; }
    if (typeof v !== 'string' || !v.trim()) continue;
    record(k, v); n++;
  }
  sortAndSave();
  console.log(`merged ${n} units` + (unknown.length ? `; ignored ${unknown.length} unknown keys: ${unknown.slice(0, 8).join(', ')}` : ''));
} else if (cmd === 'accept') {
  const keys = args.includes('--all') ? need.filter(k => EN.s[k] != null) : args;
  for (const k of keys) { if (EN.s[k] == null || !(k in src)) { console.error('no such unit: ' + k); process.exit(1); } record(k, EN.s[k]); }
  sortAndSave(); console.log(`accepted ${keys.length} units as in step`);
} else if (cmd === 'translate') {
  await translate(args.filter(a => !a.startsWith('--')));
} else if (cmd === 'prune') {
  const gone = Object.keys(EN.s).filter(k => !(k in src));
  for (const k of gone) { delete EN.s[k]; delete EN.h[k]; }
  save(); console.log(`removed ${gone.length} English units whose Chinese source is gone` + (gone.length ? ': ' + gone.join(', ') : ''));
} else if (cmd === 'omit') {
  for (const k of args) { if (!pure.N.includes(k)) { console.error('no such note: ' + k); process.exit(1); } if (!EN.omit.includes(k)) EN.omit.push(k); }
  save(); console.log('omitted in English: ' + EN.omit.join(', '));
} else if (cmd === 'zha-export') {
  const blocks = bodyBlocks(), from = +(args[0] ?? 0), to = +(args[1] ?? blocks.length - 1);
  const out = {};
  for (let i = from; i <= to; i++) if (anchors(blocks[i]).length) out[i] = { en: blocks[i], zh: pure.ZH[i] };
  process.stdout.write(JSON.stringify(out, null, 1) + '\n');
} else if (cmd === 'zha-merge') {
  const inp = JSON.parse(fs.readFileSync(args[0], 'utf8')), blocks = bodyBlocks();
  let n = 0;
  for (const [i, h] of Object.entries(inp)) {
    const problems = zhaProblems(+i, h, blocks);
    if (problems.length) { console.error(`block ${i} rejected: ${problems.join('; ')}`); continue; }
    ZHA[i] = h; n++;
  }
  save(); console.log(`merged ${n} anchored blocks`);
} else if (cmd === 'check') {
  const blocks = bodyBlocks();
  const orphan = Object.keys(EN.s).filter(k => !(k in src));
  const struct = [];
  for (const k of need) {
    const en = EN.s[k], zh = src[k]; if (en == null) continue;
    const hrefs = s => [...s.matchAll(/href="([^"]+)"/g)].map(m => m[1]).sort().join(' ');
    const tags = s => [...s.matchAll(/<\/?([a-z0-9]+)/g)].map(m => m[1]).sort().join(' ');
    const ph = s => [...s.matchAll(/\{\d\}/g)].map(m => m[0]).sort().join('');
    // compare numbers by value: months become words in English, 1,000 loses its comma, and 万/亿 become thousand/million/billion
    const ZU = { '千': 1e3, '万': 1e4, '百万': 1e6, '千万': 1e7, '亿': 1e8, '万亿': 1e12 };
    const EU = { k: 1e3, thousand: 1e3, m: 1e6, million: 1e6, b: 1e9, billion: 1e9, t: 1e12, trillion: 1e12 };
    const nums = s => [...s.replace(/<[^>]+>/g, ' ').replace(/\d+ ?月/g, ' ').replace(/(\d),(?=\d{3})/g, '$1')
      .matchAll(/(\d+(?:\.\d+)?)(?:\s*多?\s*(万亿|千万|百万|亿|万|千)|[\s-]*(trillion|billion|million|thousand)\b|([KMBT])\b)?/gi)]
      .map(m => String(+(+m[1] * (m[2] ? ZU[m[2]] : m[3] ? EU[m[3].toLowerCase()] : m[4] ? EU[m[4].toLowerCase()] : 1)).toPrecision(10))).sort().join(' ');
    if (hrefs(en) !== hrefs(zh)) struct.push(`${k}: links differ`);
    if (tags(en) !== tags(zh)) struct.push(`${k}: HTML tags differ`);
    if (ph(en) !== ph(zh)) struct.push(`${k}: placeholders differ`);
    if (CJK.test(en)) struct.push(`${k}: English text still contains Chinese characters`);
    if (nums(en) !== nums(zh)) struct.push(`${k}: numbers differ (zh: ${nums(zh)} | en: ${nums(en)})`);
  }
  const zha = [];
  blocks.forEach((b, i) => {
    if (!anchors(b).length) return;
    if (ZHA[i] == null) zha.push(`block ${i}: no anchored Chinese yet (${anchors(b).length} anchors)`);
    else zhaProblems(i, ZHA[i], blocks).forEach(p => zha.push(`block ${i}: ${p}`));
  });
  if (pure.ZH.length !== blocks.length) zha.push(`body has ${blocks.length} blocks but ZH has ${pure.ZH.length} translations`);
  const list = (title, xs, max = 15) => { console.log(`\n${title}: ${xs.length}`); xs.slice(0, max).forEach(x => console.log('  ' + x)); if (xs.length > max) console.log(`  … ${xs.length - max} more`); };
  const by = xs => { const c = {}; xs.forEach(k => { const p = k.split('.')[0]; c[p] = (c[p] || 0) + 1; }); return Object.entries(c).map(([p, n]) => `${p} ${n}`).join(', '); };
  console.log(`Chinese source units: ${need.length} (${by(need)})`);
  console.log(`English written: ${need.length - missing.length}`);
  list(`MISSING in English [${by(missing)}]`, missing);
  list('STALE (Chinese changed since it was translated)', stale);
  list('EDITED English (changed by hand; review the Chinese, then `accept`)', edited);
  list('ORPHANED English (its Chinese source is gone)', orphan);
  list('STRUCTURE (links, tags, placeholders, numbers)', struct, 200);
  list('OMITTED on purpose in English', EN.omit);
  list('CHINESE BODY ANCHORS', zha, 50);
  process.exitCode = missing.length || stale.length || edited.length || orphan.length || zha.length ? 1 : 0;
} else {
  console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 17).join('\n'));
}

function zhaProblems(i, h, blocks) {
  const p = [];
  if (stripTags(h) !== pure.ZH[i]) p.push('text differs from the plain translation once anchors are removed');
  const want = anchors(blocks[i]).join(','), got = anchors(h).join(',');
  if (want !== got) p.push(`anchors differ (want ${want} | got ${got})`);
  if ((h.match(/<span class="n /g) || []).length !== (h.match(/<\/span>/g) || []).length - (pure.ZH[i].match(/<\/span>/g) || []).length) p.push('unbalanced span tags');
  return p;
}

// ---- translate: Gemini 4 Argon writes the English, this script only batches, checks the shape and merges ----
async function translate(pre) {
  const { spawn } = await import('node:child_process');
  const keys = todo(pre), held = need.filter(k => stale.includes(k) && edited.includes(k));
  if (held.length) console.log(`held back (hand-edited English whose Chinese also changed): ${held.join(', ')}`);
  if (!keys.length) { console.log('nothing to translate'); return; }
  // the style file's Chinese-edition section is for whoever edits the Chinese, not for the translator
  const style = fs.readFileSync(path.join(path.dirname(FILE), '..', 'scripts', 'i18n-style.md'), 'utf8').split('<!-- zh-edition -->')[0];
  const memo = bodyBlocks().map(b => b.replace(/<(?:span|sup) class="n [^"]*" data-n="([^"]+)">([\s\S]*?)<\/(?:span|sup)>/g, '[[$2|$1]]').replace(/<[^>]+>/g, '')).join('\n\n');
  // a card or timeline entry is never split across batches
  const groupOf = k => k.startsWith('N.') ? k.replace(/\.[a-z]+\d*$/, '') : k.startsWith('T.') ? k.replace(/\.[a-z]+$/, '') : k.split('.').slice(0, 2).join('.');
  const batches = []; let cur = {}, size = 0, last = '';
  for (const k of keys) {
    const g = groupOf(k);
    if (size && g !== last && (g.split('.')[0] !== last.split('.')[0] || size > 7000)) { batches.push(cur); cur = {}; size = 0; }
    cur[k] = src[k]; size += src[k].length; last = g;
  }
  batches.push(cur);
  console.log(`${keys.length} units in ${batches.length} batches`);
  const prompt = units => `You are writing the English edition of an annotated web page. Do not use any tools and do not read or write files. Reply with ONE JSON object and nothing else (no Markdown fence, no commentary).

BACKGROUND
The page presents "The Big Blob of Compute Hypothesis", an internal memo Dario Amodei wrote at OpenAI in 2017 (first made public by Kevin Roose in October 2026). Around the memo's English text, an annotator (Pengqian Han) wrote, in Chinese: click-to-open annotation cards, a timeline of related papers, and a "Build AGI" study roadmap. You are given Chinese source units as JSON (key -> Chinese) and must return English for every key.

This is not a literal translation. It must read as if written in English by a careful, plain-spoken technical writer, while keeping the same facts, judgments, hedging and caveats. Follow the style guide and use the term table wording exactly.

HARD RULES (checked mechanically)
1. Return exactly the same keys as the input, each mapped to an English string. No Chinese characters anywhere in a value (write Chinese institution names in English).
2. Keep every HTML tag, in the same number and kind. Keep every href exactly.
3. Keep placeholders {0} {1} exactly.
4. Keep every number, year, arXiv id, model name and proper name. Do not add facts that are not in the Chinese. Convert 万/亿 carefully (1750 亿 = 175 billion; 2.8 万亿 = 2.8 trillion).
5. Key kinds: "N.<note>.t" card title, ".b" card body, ".m<i>" the small source line under a link, ".lt<i>" a link label. "T.<id>.a" short display name of a timeline entry, ".m" source line, ".t" title, ".b" summary, ".r" relation to the memo, ".lim" evidence limit, ".watch" what to watch, ".tgt" target of improvement, ".rec" depth of recursion. "D.<id>.s" the label inside a small box of the argument graph (at most 3 words or 24 characters), ".t" the one-sentence title of that note, ".m" its key points (short sentences, one per list item; keep them short), ".b" its full body: the notes restate the memo piece by piece and add nothing, so for D units take the wording from the memo itself (given below) wherever the Chinese restates it, drop the English glosses in parentheses that would now repeat the word before them, and refer to the writer as Amodei. "ST.*" and "BX.*" are the study roadmap. "NOW" is the timeline's closing panel. "s.*" is static page text; "ui.*" are interface strings keyed by their Chinese wording.
6. Interface strings: "ui.、" is the list separator and must be ", "; "ui.：" must be ": "; "ui.（{0}）" must be " ({0})". A label ending in a fullwidth colon "：" is followed directly by its content, so its English ends with ": " (colon, then one space).
7. Timeline summaries are telegraphic in Chinese. In English write complete but compact sentences.
8. A card that exists mainly to explain an English word to Chinese readers: reframe it around what the term does in the memo. If it would still tell an English-speaking ML reader nothing they need, translate it anyway and list it under the extra top-level key "_omit" (an object: note key -> one-line reason).
9. Where the Chinese quotes a named person or document and your English is a back-translation rather than wording you are sure is the original, list that unit's key under the extra top-level key "_quotes" (an array). A paraphrase without quotation marks is preferred when unsure.
"_omit" and "_quotes" are the only extra keys allowed.

STYLE GUIDE AND TERM TABLE
${style}
${Object.keys(units).some(k => /^[ND]\./.test(k)) ? `\nTHE MEMO (context for the cards and the notes; [[term|noteKey]] marks where each card is anchored)\n${memo}\n` : ''}
INPUT UNITS
${JSON.stringify(units, null, 1)}
`;
  const ask = (units, attempt = 1) => new Promise(res => {
    const p = spawn('agy', ['-p', prompt(units), '--model', 'gemini-4-argon-high', '--print-timeout', '900s'], { cwd: (process.env.TMPDIR || '/tmp') });
    let out = ''; p.stdout.on('data', d => out += d); p.stderr.on('data', () => {});
    p.on('error', e => { console.error('cannot run agy: ' + e.message); res(null); });
    p.on('close', () => {
      let j = null; try { j = JSON.parse(out.slice(out.indexOf('{'), out.lastIndexOf('}') + 1)); } catch (e) {}
      const ok = j && Object.keys(units).every(k => typeof j[k] === 'string' && j[k].trim() && !CJK.test(j[k]));
      res(ok ? j : attempt < 3 ? ask(units, attempt + 1) : null);
    });
  });
  const omit = {}, quotes = []; let next = 0, failed = 0;
  await Promise.all(Array.from({ length: Math.min(5, batches.length) }, async () => {
    while (next < batches.length) {
      const i = next++, j = await ask(batches[i]);
      if (!j) { failed++; console.log(`batch ${i + 1}: no usable answer after 3 attempts`); continue; }
      Object.assign(omit, j._omit || {}); quotes.push(...(j._quotes || []));
      for (const k in batches[i]) record(k, j[k]);
      console.log(`batch ${i + 1}/${batches.length} done`);
    }
  }));
  sortAndSave();
  console.log(`${batches.length - failed} of ${batches.length} batches merged`);
  if (Object.keys(omit).length) console.log('suggested omissions (annotator decides): ' + JSON.stringify(omit, null, 1));
  if (quotes.length) console.log('back-translated quotations to verify against the source: ' + quotes.join(', '));
  if (failed) process.exitCode = 1;
}
