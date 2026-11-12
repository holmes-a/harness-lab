---
name: grilling-handoff
description: Capture an out-of-scope task, finding, decision, or thought that surfaces during a /grill-me-as session. Writes to ## Inbox in the active project's tasks.md without interrupting the session. Use when an item surfaces mid-session that belongs to a different project or a future session.
---

# Grilling Handoff

Captures out-of-scope items with full context during a /grill-me-as session, then returns immediately. Designed for zero friction — the common case requires no questions.

## Quick Start

Invoke during a /grill-me-as session:
```
/grilling-handoff
```
The skill infers the item, type, and blocking dependency from conversation context — no prompts in the common case.

## Process

### Step 1 — Infer the item from context

Read the user's invocation message and the current conversation context. Determine:

- **What** — the task, finding, decision, or thought being captured (one sentence)
- **Type** — infer from content: `[task]` (something to do), `[finding]` (an observed fact), `[decision]` (a settled choice), `[thought]` (a loose idea worth keeping)
- **Why** — the reasoning behind it; the user will typically provide this in the invocation message
- **Blocked by** — if it is clear from the conversation that this item cannot proceed until something else is done, note what blocks it

If the item is unclear from context, ask one question: **"What should I capture?"** — then proceed. Do not ask about type, trigger, or blocking.

### Step 2 — Identify the active project

Determine the active project's folder from the current conversation context. Locate its `tasks.md`.

### Step 3 — Decide: inline or context file

If the full context (why + what + resolution) fits in two lines or fewer, write it inline. If it needs more, create a context file at `task-prds/inbox-YYYY-MM-DD-[slug].md` and link to it.

**Inline format:**
```
- [type] [Item — one sentence] — Context: [why it matters] _(captured YYYY-MM-DD)_
```

**With blocking:**
```
- [type] [Item — one sentence] — Context: [why it matters] [blocked by: X] _(captured YYYY-MM-DD)_
```

**Linked context file:**
```
- [type] [Item — one sentence] → [context](task-prds/inbox-YYYY-MM-DD-[slug].md) _(captured YYYY-MM-DD)_
```

### Step 4 — Create context file (if needed)

If a context file is required, create it using the template in [REFERENCE.md](REFERENCE.md). If `task-prds/` does not exist in the active project folder, create it first.

### Step 5 — Write to ## Inbox

Open `tasks.md`. If no `## Inbox` section exists, insert one immediately before `## Recently Done`:

```
## Inbox
<!-- Items captured mid-session via /grilling-handoff. Surface at next session start ("what's next") for triage. [task] items are to-dos; [finding], [decision], [thought] items will be routed to their own files at triage. -->
```

Add the entry under `## Inbox`.

### Step 6 — Confirm and return

Output a single confirmation line, then stop:

> Captured: [type] "[item]" → `## Inbox`. Returning to your session.

If a context file was created, add: `(context file: task-prds/inbox-YYYY-MM-DD-[slug].md)`

Do not summarise, analyse, or ask follow-up questions. Resume the grill-me-as session immediately.

## Rules

- Always infer from context first — ask nothing unless the item itself is unclear
- One fallback question maximum: "What should I capture?" — never ask about type, trigger, or blocking
- Type is always inferred, never asked
- Blocking is always inferred, never asked — write `[blocked by: X]` only when the dependency is unambiguous from the conversation
- The `## Inbox` section always sits between `## Open` (or the last Open sub-section) and `## Recently Done`
- All entries use plain `- [type]` format — no checkboxes on any type
- Context files live in `task-prds/` with the `inbox-` prefix; never in any other location
- If `tasks.md` cannot be identified from context, ask for the project path before proceeding
- This skill is invoked from within /grill-me-as only — do not invoke outside a grilling session
