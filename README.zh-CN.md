<div align="center">

# Big Blob of Compute 注解版

[English](README.md) · **简体中文**

Dario Amodei 2017 年备忘录 *The Big Blob of Compute* 的注解版，附论文时间线和学习路线图。

</div>

## 功能

- **正文注解**：原文配注解卡片，解释关键术语和论点。
- **拆解笔记**：为理解结构而拆解原文，画成一张有向无环图，看每个论点建立在哪些论点之上。点节点看要点，再放大看全文。
- **论文时间线**：按时间排列文章前后的相关论文，含主线和路线图。
- **构建 AGI**：一条从基础出发的学习路线，骨架来自 Stanford CS336 和 CS329Z。
- **三种阅读模式**：英文、中文、双语。

## 快速开始

这是一个单文件静态页面，无需构建，直接用浏览器打开：

```bash
open docs/index.html
```

用 `?lang=en`、`?lang=zh` 或 `?lang=bi` 选择阅读模式，默认英文。

## 目录结构

```
docs/index.html        页面（内容、数据和代码）
scripts/i18n.mjs       让英文与中文源文本保持同步
scripts/i18n-style.md  中英两版的文风规则和术语表
.claude/skills/        Claude Code 技能：screen-paper-bboc、think-in-bboc
```

## 参与贡献

中文是源文本。修改中文后请检查翻译：

```bash
node scripts/i18n.mjs check
```

完整流程见 [CLAUDE.md](CLAUDE.md)。欢迎提交 Issue 和 Pull Request。

## 致谢

原文作者为 Dario Amodei，2017 年写于 OpenAI；由 Kevin Roose 于 2026 年 10 月首次公开（[The Essay That Started the AI Race](https://kevinroose.substack.com/p/the-essay-that-started-the-ai-race)），本页正文据其公开的扫描件转录。注解、时间线和路线图是注解者自己的解读，不代表原作者观点。

## 许可证

[MIT](LICENSE)。适用于代码、注解、时间线和路线图；备忘录原文的权利归原作者所有。
