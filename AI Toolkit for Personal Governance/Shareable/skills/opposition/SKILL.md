---
name: opposition
description: Raises the conflicts in a session — a decision colliding with the manifesto, or advisors disagreeing with each other — and works each one to a resolution Adrian gives. Invoked by /check-in and /idea; not normally invoked directly.
---

# Opposition

**Procedural, not perspectival.** It holds two things side by side and asks whether they agree — a
question that is **falsifiable**: it holds or it does not. The alternative, "attack the plan", is
unfalsifiable, because there is always another angle left to push from.

It raises two kinds of **conflict** and settles neither. Adrian settles every one; this skill puts each
in front of him, assists his thinking, and records what he chose.

- **A collision** — a decision against `PM/manifesto.md`. The two documents say different things.
- **A disagreement** — two advisor positions that cannot both be acted on.

## Process

### Step 1 — Read both sides

Read `PM/manifesto.md`, plus the relevant `Advisors/<Dept>/manifesto.md` where the decision is
department-specific, alongside what the invoking trigger passed in: a check-in's answers and minister
statuses, or an idea's five positions and the disposition Adrian is moving toward.

Complete when the manifesto and every ruling or position in the session are in hand.

### Step 2 — Find the conflicts

Two passes over the same material:

- **Collision** — check the decision against every relevant manifesto line: targets, commitments, the
  slot rule, the not-yet list, the balance plan. A straightforward contradiction is a collision; a
  values-level judgement call is Adrian's and is not.
- **Disagreement** — check the positions against each other. Two are in conflict when acting on one
  forecloses the other: Work's "take it" against Family's "it costs the evenings you committed". Name
  what acting on one costs the other, or it is a difference in emphasis rather than a conflict.

**Fires on the first collision, not a threshold.** The moment one is found, stop the scan and raise it
— no severity gate, no waiting for several to accumulate. A single contradiction is reason enough to
stop and ask.

A session where the documents agree and the advisors are compatible returns nothing, which is a valid
and expected outcome.

Complete when the first conflict is raised, or both passes have run to the end having found none.

### Step 3 — Work through them one at a time

Each conflict is put to Adrian on its own and settled before the next is named. A batch of conflicts
gets shallow answers to all of them.

What is forced depends on the kind:

- **A collision forces exactly one of two.** `PM/manifesto.md` is the **senior source** — it stands as
  written, so *reverse the ruling* is where a collision lands by default. *Amend the manifesto* is
  open to Adrian at any time and takes his **explicit instruction**; on it, route to the `manifesto`
  skill for a dated, reasoned amendment.
- **A disagreement forces Adrian to name which cost he accepts.** Both advisors are partial and each is
  right about its own department; the missing piece is his ruling on which one gives way.

**Recommend what the documents already say.** A recommendation is **found, not formed**: read down the
cascade and stop at the first level that settles it — `PM/manifesto.md` first (its targets, binding
constraints, slot rule, not-yet list and balance plan), then the two departments' `manifesto.md`. Where
a level settles it, recommend, and quote the line it rests on, so Adrian is checking a citation rather
than trusting a view.

**Where nothing settles it, say so in those words** — the manifesto does not rank these two — and put
one short argument for each side, in the advisors' own terms, so the choice is quick to review. That
silence is a fact about the manifesto, reported like any other; what to do about it is his.

Restate both sides in their own words, lay out what each would cost, and look facts up rather than
asking him for them. The ruling stays his either way.

A deferral leaves the conflict open for Step 4 rather than settling it. Either way, return to Step 2
and carry the scan on from where it stopped.

Complete when every conflict found is settled or recorded open, and a fresh pass raises nothing new.

### Step 4 — Persist what is still open

`PM/opposition-collisions.md` is the single source of truth for unsettled conflicts of both kinds.
Create it on first use — a plain list, each entry carrying the date raised, its kind, the manifesto
line or the two positions in question, and its status.

Every open entry is re-raised at the start of the next `check-in` or `idea` session, which is where
`check-in` Step 1 reads this file, and stays open until it is settled. Silence is not resolution.

Complete when every conflict Adrian deferred has an entry.

### Step 5 — Record the resolution

Move each settled entry to a resolved section of the same file, or drop it where the trigger's own
`PM/reviews/` record already captures the resolution. The durable record of an amendment is the
manifesto's amendment log, not this file.

Where a conflict has come up before, report the **facts** of the repetition — the manifesto line or the
two departments involved, how many times, on what dates, and how each one was ruled, read from
`PM/reviews/` history. A pattern is evidence Adrian weighs; what it means about the manifesto is his to
say, and acting on it takes the explicit instruction Step 3 describes.

Complete when no settled conflict is still listed as open.
