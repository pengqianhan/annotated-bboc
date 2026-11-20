<div align="center">

# Big Blob of Compute: An Annotated Reading

**English** · [简体中文](README.zh-CN.md)

An annotated edition of Dario Amodei's 2017 memo *The Big Blob of Compute*, with a paper timeline and a study roadmap.

</div>

## Features

- **Annotated text**: the memo with cards that explain key terms and claims.
- **Notes**: the memo taken apart for its structure and drawn as a graph of which point builds on which. Click a node for its key points, then zoom in to the full note.
- **Paper timeline**: related papers in date order, before and after the memo, with a main line and a track map.
- **Building AGI**: a study roadmap from the basics up, based on Stanford CS336 and CS329Z.
- **Three reading modes**: English, Chinese, and bilingual.

## Quick start

It is a single static page with no build step. Open it in a browser:

```bash
open docs/index.html
```

Pick a reading mode with `?lang=en`, `?lang=zh` or `?lang=bi`. The default is English.

## Project structure

```
docs/index.html      the page (content, data and code)
scripts/i18n.mjs     keeps the English text in step with the Chinese source
scripts/i18n-style.md  style rules and term table for both languages
.claude/skills/      Claude Code skills: screen-paper-bboc, think-in-bboc
```

## Contributing

Chinese is the source text. After you change Chinese text, check the translations:

```bash
node scripts/i18n.mjs check
```

See [CLAUDE.md](CLAUDE.md) for the full workflow. Issues and pull requests are welcome.

## Acknowledgements

The memo is by Dario Amodei, written at OpenAI in 2017. It was first made public by Kevin Roose in October 2026 ([The Essay That Started the AI Race](https://kevinroose.substack.com/p/the-essay-that-started-the-ai-race)); the text here is transcribed from the scan he published. Annotations, timeline and roadmap are the annotator's own reading and do not represent the original author.

## License

[MIT](LICENSE). This covers the code, annotations, timeline and roadmap; the memo text remains its author's.
