---
name: screen-paper-bboc
description: Screens a paper against the Big Blob of Compute hypothesis and gives a verdict for the BBOC paper timeline. Use before adding a paper to the timeline or the main line, when the user asks whether a paper belongs there, or hands over papers to triage.
---

# Screen a paper

A paper earns a place by changing or measuring an **ingredient**: one of the seven things the memo says decide how well a system learns (the page lists them as "The seven BBOC ingredients", 七个要素 in its Chinese source). Everything below asks one question from several sides: does this paper tell someone building AGI something about an ingredient that will still be true at a larger scale?

## The seven BBOC ingredients

1. **Compute**: how much is applied, whether results track it, and whether it flows freely between observation and action.
2. **Parameters**: capacity to store what is learned, persistent and transient.
3. **Quantity of experience**: data or interaction, including experience the system simulates for itself.
4. **Distribution of experience**: breadth and curriculum, so that the simplest way to do well in training also does well on the final task.
5. **Normalization and conditioning**: keeping the numerics flowing (Adam, BatchNorm, residual connections).
6. **Symmetries and shape**: structure that exploits a real regularity of the world or lets information flow without bottlenecks.
7. **Training target**: what the whole training process asymptotically rewards.

The memo's own wording settles a close call: it is in `docs/index.html`, from `<h2 id="s2">` to the footnotes (sections 2 and 3).

## Steps

1. **Read the paper.** Abstract, method, the main results table, the limitations section. Done when you can say in one sentence what was changed, what was measured, and what was held constant.
2. **Find it in the timeline.** `grep` `docs/index.html` for its arXiv id and its title. If it is there, quote the existing entry, its labels in `IG_OF` and its relation, then carry on: the remaining steps check them.
3. **Name the ingredients.** A label means the paper supports that ingredient: its result shows the ingredient mattering, or its argument makes the memo's case for it (The Bitter Lesson has no experiment and is 1). List every such ingredient by number and name, the main one first, each with the result or argument behind it. AlexNet is 1, 2, 6 and 7 at once; most papers are one or two. A paper that supports no ingredient can still qualify in one of three ways. Benchmark: it introduces or reports a benchmark or another measurement of capability or progress, whatever stance its authors take (SWE-bench, ARC, METR's time horizons). Forecast (预测): it forecasts where progress goes (Good's intelligence explosion). Critique (批评): it argues or shows that the hypothesis or one of its ingredients falls short (Sutton arguing that imitation is the wrong training target is Critique, not 7). A paper that is none of these gets no label. It can still enter the timeline unlabelled when a builder needs it (tooling, tutorials, releases, interpretability).
4. **Apply the four tests.** Answer each with evidence from the paper. For a Benchmark, Forecast or Critique paper, read "mechanism" and "gain" as what the paper measures or claims:
   - **Simple.** The mechanism fits in one sentence and is of a kind the memo expects to matter: more scale, a symmetry or sparsity, better conditioning, a smoother shape, a better training target or process.
   - **Blob-controlled.** The gain is shown against a plain baseline of the same compute and parameters, properly tuned. A gain that disappears under that control is a **shell game**: the same computation, rearranged. A tie with the plain baseline is what the memo predicts for a new architecture: the test passes for the tie, not for the gain the authors claim, and the report says so. A measurement or claim passes when the paper names the systems and scales it was checked on and it holds for the strongest of them.
   - **General.** The result holds on a broad task, or keeps holding as scale grows. A result on one narrow benchmark counts only as a **stepping stone**, and only if a broader result later stood on it.
   - **Buildable.** Someone building a system from scratch would either use it or need to know it. Name the stage of the page's Build AGI roadmap (`STAGES`) where it would be read.
5. **Give the verdict**, one of:
   - **Main line**: it passes all four tests, and it is the best evidence for a claim of the memo that the main line does not yet carry. Quote the claim from the memo, then check every paper in the matching track of `TRACKS`: if one already stands for that claim, the verdict is Timeline unless this paper should replace it. The main line holds 40 to 60 papers, so name the track it joins and the paper it would replace or stand beside.
   - **Timeline**: it has a label from step 3 and passes Simple plus at least one other test, or it has no label and passes Buildable.
   - **Leave out**: everything else. Say which test it failed.

   A paper that argues against the memo is screened the same way. Strong evidence that an ingredient is insufficient is as useful to a builder as evidence that it suffices; it gets the relation Challenges memo.

## What to report

For each paper, in the user's language:

- verdict, and the ingredients from step 3
- relation to the memo, the first that applies: Cited in memo (文中提到); Key background (重要背景: published before the memo, uncited); Challenges memo (提出挑战: a Critique, or evidence against a claim of the memo); Supports memo (观点一致: its result or argument bears out a claim the memo makes, a controlled tie included; quote the claim); Related advance (相关进展: everything else)
- one sentence on why, built from the test answers
- Evidence limit (证据边界): what the paper's evidence stops short of showing

The Chinese in brackets is the label the page's Chinese source shows. An entry stores the relation as one letter (`TAG` in `docs/index.html`: m, b, d, a, r, in the order above).

When screening several papers, every paper gets all five steps and its own report. Then list them by verdict.

The verdict is a proposal. The annotator decides, and adding an entry to the page follows "Editing the page" in `CLAUDE.md`.
