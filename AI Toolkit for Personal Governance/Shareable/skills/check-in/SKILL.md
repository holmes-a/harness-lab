---
name: check-in
description: The weekly check-in, where the ministers put the questions and Adrian answers. Use when Adrian wants his weekly review, asks how the week went, wants to catch up on his commitments, or says it's time to check in. For a one-off idea use /idea; for a fast task list use /routine.
---

# Check-In

Trigger 1 of three (`implementation-brief.md` §4). This is **Prime Minister's Questions inverted** — the
ministers put the questions, Adrian answers. Reporting does not get done reliably; questions always get
answered.

Every question comes from **silence**: a commitment whose clock has elapsed with nothing reported. There
is no cap on session length — a long session means a lot genuinely went unreported, which is exactly the
session that should be long. Length is controlled by how many commitments Adrian makes, not here.

## Process

### Step 1 — Read what is still open

Before any minister is launched, read:

- **`PM/opposition-collisions.md`** — the single source of truth for unresolved collisions. Put every
  open entry back to Adrian now. Step 6 raises new collisions; this is the only place old ones return.
  No file means no open collisions.
- **The most recent snapshot in `PM/reviews/`** — open questions and pending data-gap tasks carried
  forward from last session.

Complete when every open collision has been put to Adrian and the last snapshot's carried-forward items
are in hand.

### Step 2 — Ministers produce their questions, in parallel

Launch all five minister agents (`.claude/agents/minister-{work,financial,health,family,personal}.md`)
**in parallel, in a single batch** of subagent invocations. Sequential execution lets each minister see
what came before, and the first voice anchors the rest.

Each minister owns what it reads — its own agent file says so. Brief each one to produce this session's
questions from **silence**, found by subtracting dates against its `_ai/state.md` "Last heard" column
rather than scanning the log.

A department is due only when its **clock** — recorded in its `Advisors/<Dept>/CLAUDE.md` — has elapsed.
The check-in is weekly; the departments are not. A department that is not due returns nothing.

Complete when all five have reported, the ones returning nothing included.

### Step 3 — Adrian answers

Present each minister's questions as its own block, under its own heading, in its own words
(`implementation-brief.md` §6.2). Adrian answers conversationally.

### Step 4 — Route answers to departments

For each answer:

- Append it as dated testimony to that department's `_assets/data/log.md`
- Update that department's `_ai/state.md` — "Last heard" to today, and "Status" for the tracking line the
  answer resolves

This write-time update is what keeps `_ai/state.md` cheap to read later (`implementation-brief.md` §5).

Complete when every answer Adrian gave is accounted for: each one logged to exactly one department, or
put back to him as ambiguous between two. An answer that spans departments is his call to split.

### Step 5 — Ministers return status

Launch the five again, **in parallel, in a single batch**, each given only its own department's
newly-logged answers. Each returns its three-part output contract, applied to this session:

- Commitment status against its manifesto
- Any new questions the answers raised
- Any data-gap escalation — a task asking Adrian to supply missing evidence

Complete when all five have returned all three parts, "none" included.

### Step 6 — Opposition raises the conflicts

Invoke the `opposition` skill with this session's rulings, the five outputs from Step 5 and
`PM/manifesto.md`. It runs every session, including the ones where nothing looks like a conflict, and
it raises both kinds — a ruling colliding with the manifesto, and two departments whose positions
cannot both be acted on.

Complete when `opposition` has returned and every conflict it raised is settled or recorded open.

### Step 7 — Write the session output

Write:

- New tasks, data-gap tasks included, to the relevant department's `_ai/tasks.md`
- Unanswered questions, carried forward to next session
- A dated **snapshot** to `PM/reviews/` holding the computed comparison against the manifesto, so next
  session's Step 1 processes only what changed

`opposition` Step 4 owns `PM/opposition-collisions.md` and has already written anything left open.

Complete when all three are written and every item raised in Steps 5 and 6 appears in one of them.

## Rules

- **The session opens with the ministers' questions**, produced before Adrian says anything.
- **"Nothing this week" is a valid and expected output** — from one minister, or from the whole session.
  An empty session is a better outcome than a question invented to fill it.
