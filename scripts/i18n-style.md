### 1. Style Guide

* **Voice and register:** Write as a plain-spoken, careful technical writer for ML practitioners and informed general readers. Use direct verbs and concrete nouns; avoid translationese and academic throat-clearing.
* **Fidelity and hedging:** Preserve every fact, judgment, and caveat. Match the source's exact epistemic weight (*may*, *roughly*, *does not prove*); never upgrade a conjecture to a claim or drop a limitation.
* **Referring to the memo and its author:** Refer to the 2017 document as *the memo* (or *BBOC* when naming the hypothesis) and its author as *Amodei*. Reserve *the paper*, *the report*, or *the post* for timeline entries so they are never confused with the memo.
* **Separating annotator judgment from the memo:** Attribute memo claims explicitly (*Amodei argues*, *Section 2 lists*, *the memo predicts*). Keep analytical commentary inside labeled fields (*Relation to this memo*, *Evidence limit*, *What to watch*), and refer to Pengqian Han in site disclaimers as *the annotator*.
* **Tense:** Use past tense for historical events and what a study did (*Amodei wrote*, *trained a 175B model*), and present tense for timeless technical explanations, what a work argues, and current capabilities (*Model-free RL learns a policy directly*, *challenges BBOC*).
* **Sentence length:** Aim for 15–25 words per sentence. Break Chinese multi-clause topic-comment chains into separate sentences or join them with a colon or semicolon.
* **Telegraphic field style:** In compact timeline fields (*Target of improvement*, *Depth of recursion*, *Evidence limit*, *What to watch*), use concise noun phrases or single-sentence statements without filler.
* **Punctuation:** Replace fullwidth punctuation (`，。；：（）“”`) and enumeration commas (`、`) with standard English punctuation and the Oxford comma. Use spaced en dashes (` – `) for date ranges and unspaced en dashes (`1–3`) for numeric spans.
* **Titles of works:** Replace `《》` with italics for books (*Reinforcement Learning: An Introduction*) and quotation marks for papers, essays, and blog posts in prose ("The Bitter Lesson"). Leave titles unquoted in standalone link labels.
* **Numbers and units:** Convert Chinese myriad units (`万`, `亿`) to standard English scales (`175 billion` in prose, `175B` in compact cards; `1,000`). Keep percentages numerical (`41.3%`).
* **Dates:** Format full dates as `November 9, 2026`, month-year references as `October 2026` (`Oct 2026` in filters/badges), and spans as `2017 – Oct 2023`.
* **Bilingual parenthetical glosses:** Drop Chinese glosses added only to help Chinese readers (`Computational graph（计算图）` → `Computational graph`). Keep parentheses that expand an acronym (`HRAD (Highly Reliable Agent Design)`) or quote the memo's own phrasing (`enough raw material → compute`).
* **Idiom and vocabulary annotations:** When a Chinese annotation exists mainly to gloss an English word or idiom (`bullish`/`bearish`, `shell game`), do not write a dictionary definition. Reframe the card around its analytical role in the memo (what short vs. long AI timelines mean; why Amodei views competing RL algorithms as shifting the same compute around).

---

### 2. Term Table

| Chinese | English |
| :--- | :--- |
| 注解版 · Annotated reading | Annotated Edition |
| 注解者 | Annotator |
| 本文 / 原文 | This memo / Original memo |
| 原文脚注 | Original footnote |
| 页面 | Sections |
| 正文注解 | Annotated Memo |
| 拆解笔记 | Breakdown Notes |
| 笔记（拆解笔记里的一条） | Note |
| 背景 / 主张 / 七要素 / 例外 / 证据与预测 / 推论（笔记的类别） | Background / Claim / Seven ingredients / Exceptions / Evidence & predictions / Implications |
| 依据： / 引出： | Based on: / Leads to: |
| 论证结构图 | Argument graph |
| 段（论证结构图里的一组行，不是“行”） | Band (never "row") |
| 问题与假说 / 七个要素 / 一句话概括 / 延伸与例外（段的名字） | Question & hypothesis / Seven ingredients / In one sentence / Extensions & exceptions |
| 放大：全文 / 缩小：要点 | Zoom in: full note / Zoom out: key points |
| 论文时间线 | Paper Timeline |
| 构建 AGI | Build AGI |
| 主线 / 主线 {0} 篇 | Main line / Main line: {0} papers |
| 全部 {0} 篇 | All {0} papers |
| 另有 {0} 篇 | {0} more |
| 路线图（时间线的第二种视图） | Track map (never "Roadmap": that word belongs to Build AGI) |
| 研究路线 | Research track |
| 概念 / 概念注解 | Concept / Concept note |
| 论文 / 论文卡片 | Paper / Paper card |
| 阅读设置 | Reading settings |
| 中英对照 | Bilingual view |
| 缩小正文字号 / 放大正文字号 | Decrease font size / Increase font size |
| 原文出处 ↗ | Original source ↗ |
| 关于这篇文章的背景 / 这篇文章的背景 | Background on this memo |
| 注解中引用的论文与资料 | Papers and sources cited in annotations |
| 在论文时间线中： | In the paper timeline: |
| 在“构建 AGI”中： | In "Build AGI": |
| 阅读正文 | Read memo |
| 打开原文 ↗ / 打开原文： | Open source ↗ / Source: |
| ← 上一篇 / 下一篇 → | ← Previous / Next → |
| 关闭 | Close |
| 关系 / 关系：全部 | Relation / Relation: All |
| 文中提到 | Cited in memo |
| 重要背景 | Key background |
| 观点一致 | Supports memo |
| 提出挑战 | Challenges memo |
| 相关进展 | Related advance |
| 前沿模型 | Frontier model |
| 预测与起飞 / 时间线预测与起飞 | Forecasts & takeoff |
| 主题 / 主题：全部 | Topic / Topic: All |
| ★ 里程碑 / 里程碑 | ★ Milestone / Milestone |
| Harness / RSI 里程碑 / ★ Harness / RSI 里程碑 | Harness / RSI milestone |
| Harness（全部相关） | Harness (all related) |
| RSI 与 AI 做研究（全部相关） | RSI & AI for AI research (all related) |
| 前沿模型：BBOC → Fable 5.2 | Frontier models: BBOC → Fable 5.2 |
| 开源 / 开源与公开资料 | Open-source / Open-source & public resources |
| 类型 / 类型：全部 | Type / Type: All |
| 论文与技术报告 | Papers & technical reports |
| 博客、随笔与发布页 | Blog posts, essays & releases |
| 时期 / 时期：全部 | Period / Period: All |
| BBOC 之前（2016 及更早） | Before BBOC (2016 & earlier) |
| 2017 – 2023 年 10 月 | 2017 – Oct 2023 |
| 近三年（2023 年 11 月起） / 近三年 · 2023 年 11 月起 | Last 3 years (since Nov 2023) |
| 搜索时间线 | Search timeline |
| 搜索缩写、标题、作者或 arXiv 编号（按 / 聚焦） | Search abbreviation, title, author, or arXiv ID (press / to focus) |
| 清除筛选 | Clear filters |
| 也搜索简介 | Search summaries too |
| 导出 JSON | Export JSON |
| 按年份跳转 | Jump to year |
| 显示 {0} / {1} 条 / 共 {0} 条 | Showing {0} of {1} / {0} entries |
| 没有匹配的条目。试试更短的关键词，或点“清除”。 | No matching entries. Try a shorter keyword or click "Clear". |
| 与本文的关系： | Relation to this memo: |
| 被改进的对象 | Target of improvement |
| 递归到哪一层 | Depth of recursion |
| 证据边界： | Evidence limit: |
| 继续观察： | What to watch: |
| BBOC 的七个要素 / 七个要素在今天分别指什么 | The seven BBOC ingredients / What the seven ingredients mean today |
| 算力 | Compute |
| 参数 | Parameters |
| 经验的数量 / 经验数量 | Quantity of experience |
| 经验的分布 / 经验分布 | Distribution of experience |
| 归一化与条件数 / 归一化与条件化 | Normalization and conditioning |
| 对称性与形状 | Symmetries and shape |
| 训练目标 | Training target |
| 预测（要素图例的第八类） | Forecast |
| 批评（要素图例的第九类） | Critique |
| 要素 | ingredient |
| 原文之外：harness | Beyond the memo: Harness |
| 原文之外：理解与安全 | Beyond the memo: Interpretability & safety |
| 雪花类比 / 雪花类比： | Snowflake analogy / Snowflake analogy: |
| 原料 / 足够的原料 | Enough raw material |
| 足够大的容器 / 足够大的腔室 | A large enough chamber |
| 等待足够久 / 等得足够久 | Wait for long enough |
| 原文没有给出对应 / 无对应项 | No counterpart in the memo |
| 温度、压力、湿度 / 把温度、压力和湿度调对 | Set the temperature, pressure, and humidity correctly |
| 物理定律 | The laws of physics |
| 在哪个阶段学 | Covered in |
| 公开程度 | Public availability |
| 路线总览 | Roadmap overview |
| 阶段 / 阶段 {0} | Stage / Stage {0} |
| 先修： | Prerequisites: |
| 清空进度 | Reset progress |
| 进度只保存在这台设备的浏览器里。 | Progress is saved only in this browser on this device. |
| 已完成 {0} / {1} 个阶段，勾选了 {2} / {3} 条验收标准。 | Completed {0} / {1} stages; checked {2} / {3} pass criteria. |
| 两门骨架课程 | Two backbone courses |
| 自学： | Self-study: |
| 讲次主题（{0}） | Lecture topics ({0}) |
| 作业与项目（{0}） | Assignments & projects ({0}) |
| 实验规模： | Compute scale: |
| 学什么 | What you learn |
| 课程与教材 | Courses & textbooks |
| 要读的论文和文章 | Papers & readings |
| 动手做 | Hands-on work |
| 验收标准 / 验收： | Pass criteria / Pass criteria: |
| 物理学教材类比： | Physics textbook analogy: |
| 公开资料的边界： | Boundary of public knowledge: |
| 毕业项目 | Capstone projects |
| 项目 {0}： | Project {0}: |
| 用到的阶段： | Stages used: |
| 资料库 | Resource library |
| 模型与训练 | Models & training |
| 系统、数据与评估 | Systems, data & evaluation |
| 智能体、安全与前沿 | Agents, safety & frontier |
| 预备：数学、编程与深度学习基础 | Prerequisites: Math, programming, and deep learning basics |
| 从零写一个语言模型 | Build a language model from scratch |
| 系统：让算力流得动 | Systems: Keeping compute flowing |
| 规模规律：预测更大的模型会怎样 | Scaling laws: Predicting what larger models will do |
| 数据：经验的分布 | Data: Distribution of experience |
| 后训练：从基础模型到助手，再到推理模型 | Post-training: From base model to assistant to reasoning model |
| 评估：知道模型到底会什么 | Evaluation: Knowing what a model can actually do |
| 智能体与 harness | Agents and harnesses |
| 优化 harness 与自我改进 | Optimizing harnesses and self-improvement |
| 读懂模型内部，以及安全 | Mechanistic interpretability and safety |
| 前沿与未解决的问题 | The frontier and open problems |

<!-- zh-edition -->

---

### 3. Chinese Edition

The Chinese edition is the source text and the annotator's own reading edition. The sections above govern Chinese → English; this one governs edits to the Chinese.

* **Memo text stays English.** Annotations, timeline and roadmap are Chinese; the memo's Chinese translation exists only for 中文 mode and for the 对照 toggle.
* **Technical terms stay in English** (`harness`, `model-free`, `Batch Normalization`), with a Chinese gloss in fullwidth parentheses on first use where it helps: `Computational graph（计算图）`.
* **Paper, model and person names stay in their original form**: `Deep Speech 2`, `Claude Fable 5.2`, `Paul Christiano`.
* **Spacing and punctuation:** one space between Chinese and Latin letters or digits (`2017 年在 OpenAI`); fullwidth punctuation; `、` in lists; `“”` for quotations.
* **The term table reads both ways.** A label that has a fixed English wording has one fixed Chinese wording: `Evidence limit` ↔ `证据边界`, `What to watch` ↔ `继续观察`.
* **Annotator judgments keep their labels** (`与本文的关系`, `证据边界`, `继续观察`), so they are never read as the memo's claims.
