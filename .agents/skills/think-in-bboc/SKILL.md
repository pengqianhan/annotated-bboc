---
name: think-in-bboc
description: Analyses a problem the way the Big Blob of Compute memo reasons, through the seven knobs, the shell game test and falsifiable predictions. Use when the user asks to think in BBOC, or asks what BBOC would say about a system, a method or a research direction.
---

# Think in BBOC

The memo reasons about a **blob**: a large, minimally structured capacity that a training process shapes into behaviour. Its claim is that the outcome is set by a few high-level **knobs**, and that cleverness applied below the knobs mostly rearranges the same work. This skill runs that reasoning on the user's problem, whether the blob is a neural net, a person learning a skill, a team or a market.

The memo's own wording settles a close call: `docs/index.html`, from `<h2>1. Introduction` to the footnotes.

## The seven knobs

The memo's seven ingredients (section 2), each as the question to ask of any blob:

1. **Compute**: how much raw effort is applied, and does it flow freely from what the system observes to what it does?
2. **Parameters**: where does the system keep what it learns, for good and for the task in front of it, and is there room?
3. **Quantity of experience**: how much has it practised in the setting where it must perform, counting practice it can simulate for itself?
4. **Distribution of experience**: is the practice varied enough that the simplest way to do well in training also does well on the real task? Does difficulty rise smoothly?
5. **Normalization and conditioning**: are the signals that drive learning kept in a stable range, so nothing explodes, saturates or dies out?
6. **Symmetries and shape**: does the structure exploit a real regularity of the world, and can information pass without a bottleneck?
7. **Training target**: what does the whole process reward in the long run? The system learns that, and the designer's idea of what it should learn has no vote.

## Steps

1. **State the behaviour.** Rewrite the problem as: this system should come to do this, and here is how anyone would tell. Done when that is one sentence with a system, a behaviour and a measure.
2. **Check that it is a blob.** A task narrow enough for a short hand-written program (sorting, tree search) is programming: the algorithm decides everything there, and the memo says so. Report that this lens gives nothing, and stop. Otherwise name what plays the blob and what plays the training process.
3. **Break the dichotomy.** If the problem arrives as "X or Y" (compute or algorithms, talent or practice), ask what counts as each side and what is neither. The memo opens this way: it calls its own starting question imprecisely stated and replaces it with the knobs. Done when the question is restated in terms of the knobs.
4. **Read every knob.** For each of the seven: its present setting, the evidence for that, and whether it binds. A knob with no counterpart in this domain is reported as having none. Done when all seven have a line and one is named as the binding knob, the one where "nothing can save you" until it moves.
5. **Run the shell game test on every proposed fix**, the user's and your own. Hold the blob constant (same effort, same capacity, same experience) and ask what the fix changes. Each fix gets exactly one class:
   - **Knob**: it moves one of the seven. Say which, and by how much.
   - **Unblocking**: it removes something that stopped compute from flowing. The memo expects these to pay, because structure hurts far more easily than it helps.
   - **Shell game**: it relabels or rearranges the same work. Name the plain baseline it would tie with.
   - **Too handcrafted**: it prescribes how the blob should divide the task into pieces a human finds natural. Name the piece of the prescription the blob would route around.
   - **Stepping stone**: narrow and handcrafted, kept because it teaches how to set a knob at the next level up. Name that knob.
6. **Go up one level.** Where the fixes have become a patchwork of special cases, ask what process would learn them instead: what target, over what distribution of experience. Done when you have either named that process or said why the lower level is still the right place to work.
7. **Predict.** State what this analysis expects to happen as scale grows, an observation that would show it wrong, and where the evidence comes only from a narrow task. The memo holds its own view this way: "not a precise hypothesis or one I'm super confident in", with exceptions listed and open cases called open.

## What to report

In the user's language:

- the behaviour, from step 1
- the knob table: seven lines, the binding knob marked
- each fix with its class and one sentence of reason
- the recommendation: which knob to move, or which block to remove
- the prediction, what would falsify it, and where the analogy to the memo is strained

The analysis is a lens. Outside machine learning the memo's evidence is evolution and the brain, so say which conclusions rest on the memo's cases and which on analogy alone.
