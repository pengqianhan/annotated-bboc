# BBOC annotated page

One page, `docs/index.html`: Dario Amodei's 2017 memo with annotation cards, a notes tab that takes the memo apart into a graph, a paper timeline and a study roadmap, in three reading modes (`?lang=en`, `zh`, `bi`).

**Chinese is the source.** English lives in the page's `#i18n-en` block, looked up by key. `node scripts/i18n.mjs` with no arguments lists the commands.

## Syncing the two languages

1. Run `node scripts/i18n.mjs check`.
2. **MISSING or STALE**: the Chinese is ahead. Run `translate`. Gemini 4 Argon writes all English prose, by the annotator's choice. Relay the omissions and back-translated quotations it reports to the user.
3. **EDITED**: the English was changed by hand. For each unit, show the user its English beside its Chinese and propose the matching Chinese. The user makes the Chinese edit: 双语 is their own reading edition. Then `accept <key>`.
4. Done when `check` exits 0 and you have read every STRUCTURE line against both texts.

## Wording

`scripts/i18n-style.md` holds the style rules and the term table for both editions. After changing a term there, retranslate the units that use it.

## Editing the page

- Interface text goes through `tr('中文')` with a literal string; static HTML takes `data-i18n="name"`. `check` finds text only through these two.
- A timeline entry's `e.a` is the Chinese-side key that the topic lists and the roadmap match on. Display `e.A`.
- `TRACKS` holds the main-line papers by research track (the folded timeline and the rows of the track map) and `LINKS` the curves between tracks, both by `e.a`. `esMiss` lists names that match no entry.
- `IG_OF` holds each paper's ingredients by `e.a`, as characters main one first (1–7 as in section 2, 8 = 预测, 9 = 批评, b = Benchmark; step 3 of `.claude/skills/screen-paper-bboc/SKILL.md`); `IG` names them, `igMiss` lists names that match no entry.
- `DG` holds the notes tab, which is for understanding the memo's structure, not for restating it: one note per unit of the argument. `src` lists the memo blocks it carries. The whole tab is one graph: `p` lists the notes a note builds on (the arrows), `r`/`x` its row and column. `BANDS` groups the rows into bands; an arrow that skips a band shows only while one of its ends is pointed at or selected, and the knobs' arrows from `setup` and into `one-line` are drawn as one arrow to and from their frame. A note's knob ids in `p` show as numbered chips on it. The top node carries section 1 (the question and the hypothesis, condensed); the rest are sections 2 and 3. Each note reads at three zoom levels: `s` the label in the graph, then `t` one sentence with `m` key points, then `b` the full note. Notes add nothing to the memo: a change to `b` is checked against its `src` blocks, and `t` and `m` against `b`. Below the top node, `b` carries everything its blocks say. Gemini 4 Argon writes the note text in both languages. `dgMiss` lists names in `p` that match no note.
- 双语 mode is the annotator's own reading edition: a change made for the other two modes leaves its rendering as it was. Compare against `git show` output after any change to rendering code.
- Data lines run to tens of kilobytes. Read them with `grep -o` or `cut -c`.
- Verify in a browser (launch config `bboc`): in EN mode `i18nReport()` reports zero Chinese text nodes, checked again after opening every card and each empty-state message.
