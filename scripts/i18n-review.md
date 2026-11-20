# English edition: items for the annotator to review

Generated after the full translation pass on 2026-11-15. English text was written by Gemini 4 Argon from the Chinese source.

## 1. Cards Gemini suggests leaving out of the English edition

None are omitted yet. To omit one: `node scripts/i18n.mjs omit <key>` (the term stays in the text but is no longer clickable in EN mode).

### `timelines`

- Reason given: only glosses the terms AGI timelines, bullish and bearish
- 中文: 指对“通用人工智能大约何时出现”的预测。认为时间短的人叫 bullish（乐观/激进），认为还很远的叫 bearish。
- English: Forecasts for when artificial general intelligence (AGI) will arrive. In the memo, being "bullish" means expecting short timelines (AGI arriving relatively soon), while being "bearish" means expecting long timelines (AGI remaining far off).

### `shell-game`

- Reason given: only glosses the idiom shell game, which the sentence already explains
- 中文: 街头“三个杯子猜小球”的把戏。这里比喻：不同算法看似在做不同的事，其实只是把同一份计算换了个位置或换了个名字。
- English: Amodei's metaphor for why many competing algorithms are less different than they look: rather than changing the underlying computation, they shift the same processing to a different part of the system or relabel it under a new name.

### `calibrated`

- Reason given: Standard ML definition of calibration that an English-speaking ML reader already knows.
- 中文: 模型报告的置信度和实际正确率是否一致。如果模型在所有它说“90% 把握”的预测中，确实大约有 90% 是对的，它就是校准良好的。
- English: Whether a model's reported confidence matches its actual accuracy. If a model is right roughly 90% of the time across all predictions where it claims 90% confidence, it is well calibrated.

### `dropout`

- Reason given: Textbook explanation of dropout that an English-speaking ML reader does not need.
- 中文: 训练时每一步随机把一部分神经元的输出置零（比如一半），测试时用全部神经元。这样网络不能依赖任何单个神经元，相当于同时训练了大量共享权重的子网络并取平均，能明显减轻过拟合。方法极其简单。
- English: During each training step, randomly zero out the outputs of a fraction of neurons (say, half), then use all neurons at test time. Because the network cannot rely on any single neuron, this is roughly equivalent to training a large ensemble of weight-sharing subnetworks and averaging their predictions, which substantially reduces overfitting. The technique is remarkably simple.

### `fermat`

- Reason given: General-knowledge mathematical reference that needs no gloss for English readers.
- 中文: 当整数 n 大于 2 时，方程 a n + b n = c n 没有正整数解。费马 1637 年提出，Andrew Wiles 于 1994 年完成证明，用到了大量 20 世纪的现代数学。这里用作人类抽象思维能力的象征。
- English: The theorem that for any integer n greater than 2, the equation a n + b n = c n has no positive integer solutions. Conjectured by Fermat in 1637 and finally proved by Andrew Wiles in 1994 using extensive 20th-century mathematics, it serves here as an emblem of human abstract reasoning.

## 2. Quotations translated back from Chinese

The Chinese puts these words in quotation marks as something a person or document said. The English is a back-translation and may not match the original wording. Check each against its source, or remove the quotation marks.

### `N.seven.b`

- 中文: “想学会一个任务需要操心的事” · “把 1–6 做对，你大概就能学到 7 所规定的行为。” · “构建 AGI”
- English: "Build AGI"

### `T.p-Towards-Monosemanticity-2023-10.r`

- 中文: “看上去就是在持有信念和权衡证据，只是没有贴标签”
- English: (no quotation marks in the English; paraphrased)

### `T.p-2311.16867.lim`

- 中文: “世界上最好的三个模型之一”
- English: (no quotation marks in the English; paraphrased)

### `T.p-2402.01817.b`

- 中文: “近似的知识来源”
- English: "approximate knowledge sources"

### `T.p-Compound-AI-Systems-2024-02.r`

- 中文: “靠巧妙的工程，而不只是扩大训练”
- English: "through clever engineering, not just scaling training."

### `T.p-2212.12794.r`

- 中文: “推导出或表示出物理定律”
- English: (no quotation marks in the English; paraphrased)

### `T.p-2301.07608.r`

- 中文: “在很多任务上做 meta-RL”
- English: (no quotation marks in the English; paraphrased)

### `T.p-2303.08774.r`

- 中文: “算力与结果之间的简单关系”
- English: (no quotation marks in the English; paraphrased)

### `T.p-2304.02643.r`

- 中文: “手工设计的分割系统”
- English: (no quotation marks in the English; paraphrased)

### `T.p-2304.15004.r`

- 中文: “规模带来质变” · “算力与结果之间的简单关系”
- English: (no quotation marks in the English; paraphrased)

### `T.p-2305.18654.r`

- 中文: “足够大的网络会收敛到实现简单程序的参数”
- English: (no quotation marks in the English; paraphrased)

### `T.p-2305.10601.r`

- 中文: “学出来的会取代手工设计的”
- English: (no quotation marks in the English; paraphrased)

### `T.p-2307.15818.r`

- 中文: “很快轮到机器人”
- English: (no quotation marks in the English; paraphrased)

### `T.p-Dwarkesh-Amodei-一-2023-08.b`

- 中文: “把大团算力扔向足够宽的数据分布，它就会变得智能”
- English: (no quotation marks in the English; paraphrased)

### `T.p-2501.12948.r`

- 中文: “让策略在行动前多迭代几步”
- English: (no quotation marks in the English; paraphrased)

### `T.p-2501.08313.r`

- 中文: “执行期间临时保存的信息”
- English: (no quotation marks in the English; paraphrased)

### `T.p-2503.20020.r`

- 中文: “很快轮到机器人”
- English: (no quotation marks in the English; paraphrased)

### `T.p-When-AI-Builds-Itself-2026-06.b`

- 中文: “并非不可避免”
- English: (no quotation marks in the English; paraphrased)

### `T.p-Dwarkesh-下一个范式-2026-06.r`

- 中文: “执行期间保存的信息”
- English: (no quotation marks in the English; paraphrased)

### `T.p-2607.24653.r`

- 中文: “算法不太重要”
- English: "Symmetries and shape"

### `T.p-GPT-6-Astra-与-ARC-AGI-3-2026-09.b`

- 中文: “不等于宣称它是 AGI”
- English: (no quotation marks in the English; paraphrased)

### `T.p-形式化费马大定理-2026-09.r`

- 中文: “证明费马大定理”
- English: (no quotation marks in the English; paraphrased)

### `T.p-Claude-Fable-5.1-Mythos-5.1-2026-09.b`

- 中文: “这只是模拟”
- English: (no quotation marks in the English; paraphrased)

### `T.p-Claude-Opus-5.5-2026-09.b`

- 中文: “给前沿定速”
- English: (no quotation marks in the English; paraphrased)

### `T.p-2610.06805.r`

- 中文: “坍缩成一个更深的网络”
- English: (no quotation marks in the English; paraphrased)

### `ST.8.open`

- 中文: “加速 AI 研发”
- English: (no quotation marks in the English; paraphrased)

