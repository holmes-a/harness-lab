---
name: to-brief
description: Turn the current conversation into a brief for a knowledge-work deliverable and save it to the project's _ai/task-prds/. No interview — synthesis only, of what has already been discussed. Use after a planning or grilling session, before decomposing work into units.
---

# To Brief

Takes what the conversation has already established and writes it down as a brief a cold agent could work from. **Do not interview the user** — synthesise what you already know.

This is the knowledge-work counterpart of `/to-spec`. Where a spec describes a change to a codebase, a brief describes a deliverable: a set of pages, a campaign, a report.

## Prerequisites

The conversation should already contain the thinking — typically from `/grill-me-as`, which writes decisions to `_ai/decisions.md` as it goes. If the conversation has *not* established enough, say what is missing and stop. Do not fill gaps by inventing, and do not fill them by interviewing — go back and grill.

## Process

1. **Read the project context** — `CLAUDE.md`, `_ai/decisions.md`, `_ai/findings.md`, and `_ai/acceptance.md` if it exists. Use the project's own vocabulary throughout; respect settled decisions rather than re-deriving them.

2. **Write the brief** to `_ai/task-prds/brief-[slug].md` using the template below.

3. **Show the user what you wrote** and where. Offer `/to-work-units` as the next step.

<brief-template>

# Brief — [Name]

## Problem
What is wrong or missing today, from the point of view of the person affected — a customer, an agent, the business. Not "we don't have X" but why the absence of X costs something.

## Outcome
What is true when this is done. Concrete enough to tell whether it happened.

## Audience and voice
Who reads the output, and the register it must be written in. Point at the project or function `CLAUDE.md` rather than restating tone guidance — one source of truth.

## Deliverables
A list of the discrete artifacts to be produced. Each should be nameable and separately finishable. This list becomes the work units, so if two items always move together, they are one deliverable.

## Constraints
Split into **Must** and **Never**, in checkable form. Prefer "no page references dry cleaning" over "be careful about services we don't offer". Anything genuinely unreducible goes under Human gate below, not here.

## Acceptance checks
How anyone tells a finished deliverable from an unfinished one. If the project has an `_ai/acceptance.md`, reference it rather than duplicating; add only what is specific to this brief.

## Human gate
Judgements that cannot be checked and stay with the user — publishing, sign-off on tone, anything with an external audience. State these plainly; a brief that pretends everything is checkable produces false confidence.

## Out of scope
What this deliberately does not cover, especially adjacent work that might look included.

## Source material
Where the facts come from — file paths, data sources, prior artifacts to match.

</brief-template>

## Rules

- **No interview.** Synthesise or report the gap.
- **No file paths or line numbers** in the body where a description of the thing would do — paths go stale and a brief may sit for weeks. `## Source material` is the exception; that section is paths by definition.
- **Behavioural, not procedural.** Describe what the deliverable must be true of, not the steps to make it. The producer explores and decides its own approach.
- **Respect settled decisions** in `_ai/decisions.md` and `_ai/facts/` — do not silently re-open one.
- Write to `_ai/task-prds/`; create it if absent.
- Do not stage or commit to git.
