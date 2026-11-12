---
name: appoint-advisor
description: Grills one department into existence — its mandate, its data demands, its manifesto and its method. Use when a department is still a template scaffold and needs its actual content.
---

# Appoint Advisor

Fills in one department's mandate, manifesto and method through a direct interview. Where `manifesto`
does this at PM level, this skill does the equivalent job one level down, and additionally produces the
minister agent and its method skill — content `manifesto` never touches.

Everything written traces back to something Adrian said in the interview. A plausible guess at what a
"Financial advisor" or a "Health advisor" would typically want is a failure rather than a partial
success: it will be read later as his own position.

`grill-me-as` runs the interview. This skill names the department, names what the interview must cover,
and writes the result.

## Process

### Step 1 — Confirm the department is unappointed

Name which of `Work`, `Financial`, `Health`, `Family` or `Personal` is being appointed. Read its
`CLAUDE.md`, its `manifesto.md` and its minister agent (`.claude/agents/minister-<name>.md`).

Template scaffolds throughout mean the department is unappointed, and this skill proceeds. A department
already holding real content is **amended**, which is work this skill does not do — stop and say so.

Complete when the department is named and confirmed unappointed.

### Step 2 — Invoke `grill-me-as` as the minister, and cover the mandate

Pass the minister role — `work`, `financial`, `health`, `family` or `personal`. Name the write target:
the file each answer belongs to, from Step 6's four.

Cover:

- What this department is accountable for arguing, sharpened beyond the generic description already in
  its `CLAUDE.md`
- Where its mandate is deliberately **partial** — what it will never be asked to balance against the
  other four departments

Complete when both are stated in Adrian's words.

### Step 3 — Data demands

Establish what evidence this department needs to do its job:

- What Adrian reports, and how often — this becomes the department's commitments and their time
  elements
- What counts as a data gap worth escalating, against what the advisor can reasonably infer
- **This department's clock** — how often it is due to speak at all. The check-in is weekly;
  departments are not, and a department may be quiet for months and then have something real. Ask for
  the cadence directly: it is Adrian's answer, and a department's name is no guide to it.

Complete when all three are answered, the clock as an explicit cadence.

### Step 4 — Manifesto content

The same structure `PM/manifesto.md` uses, one level down: how this department delivers the relevant
PM-level targets, and its own commitments — each carrying a **time element** (when its clock resets)
and an **agency grade** (`mine` / `shared` / `influence`).

Complete when every commitment row carries both fields.

### Step 5 — Method

Ask **explicitly which sources should be distilled into this department's method**. The answer is
Adrian's, asked for at this step even where he has mentioned a book in passing elsewhere.

Then ask which of his own failure patterns the method should guard against — a method is distilled from
both chosen sources and his own history.

`idea` Step 1 runs this department's **quick value test** from `_skills/`, so the method carries one.

Complete when the sources are named, the failure patterns are named, and the quick value test is
described.

### Step 6 — Write the four outputs

1. **`.claude/agents/minister-<name>.md`** — sharpen the Mandate section with what Step 2 established.
   The frontmatter, output contract, rules and reads list stay exactly as they are.
2. **`Advisors/<Dept>/manifesto.md`** — fill **How This Delivers the PM Targets** and **Commitments**
   from Steps 3–4, following the existing table format. **Mandate Summary** and **Method Notes** stay
   pointers to the agent file and to `_skills/` — confirm them, and leave them pointing. Seed the
   Amendment Log with one entry: `**Date:** [today], **Amendment:** Department manifesto written,
   **Reason:** appointment via the appoint-advisor grilling.`
3. **`Advisors/<Dept>/_skills/`** — the distilled method as one or more skill files named for what they
   do (e.g. `evaluate-opportunity/SKILL.md`), citing the sources chosen at Step 5.
4. **`Advisors/<Dept>/CLAUDE.md`** — the **Per-department clock** line, carrying the cadence from
   Step 3. That line and no other part of the file. `check-in` reads it to decide whether the
   department is due to speak, so a department appointed without it is never skipped.

Write each output as its interview branch resolves, following `grill-me-as`'s write-as-you-go pattern.

`PM/manifesto.md` belongs to the `manifesto` skill and stays untouched here.

Complete when all four are written, the department manifesto's two pointer-only sections still point,
and its Amendment Log holds its first entry.
