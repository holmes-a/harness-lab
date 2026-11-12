# harness-lab

A central home for the AI toolkits that were previously scattered across individual business repos.
Each toolkit is a set of Claude Code skills, agents, templates and hooks that give a workspace a
repeatable way of working.

## ⚠️ These are snapshots, not yet the source of truth

Copied here on **2026-08-12**. The live, deployed copies still sit in the business repos listed below,
and those are what actually runs today. **Editing a toolkit here will not change any workspace, and
will silently fork it from the copy that does.**

Deciding which direction is authoritative — and migrating to it — is the open question this repo
exists to answer. Until then, treat these as read-only reference.

## The three toolkits

| Toolkit | What it governs | Status |
|---|---|---|
| [AI Toolkit for Personal Governance](#ai-toolkit-for-personal-governance) | A life, by role | Active — structure built, content not yet filled |
| [AI Toolkit for Solopreneurs](#ai-toolkit-for-solopreneurs) | A business, by value-chain function | Active — in production across three workspaces |
| [Employee-AI-Toolkit](#employee-ai-toolkit) | A job, by role | Completed - Partial; superseded |

### Lineage

```
Employee-AI-Toolkit  ──►  AI Toolkit for Solopreneurs  ──►  AI Toolkit for Personal Governance
   (superseded)              (business, by function)          (a life, by role — sibling)
```

The Employee toolkit's own closing note records the hand-off: *"Only used as a source to develop the
'AI Toolkit for Solopreneurs' project."* Personal Governance was then built as a sibling of
Solopreneurs, sharing its project scaffold but not its governing model.

## AI Toolkit for Personal Governance

A cabinet-government model for personal decision-making. The human is **Prime Minister**; five
specialist advisors hold departments (Work, Financial, Health, Family, Personal) and argue their own
corner, deliberately partial rather than balanced. An `opposition` skill audits decisions against a
manifesto. There is no PM agent and no opposition agent — skills convene, route and record; they never
conclude on the human's behalf.

**Skills:** `appoint-advisor` · `check-in` · `grill-me-as` · `idea` · `manifesto` · `opposition` ·
`routine`

Three triggers drive it: `check-in` (weekly, advisors ask first), `idea` (rare and expensive, forces a
disposition — commit / park-with-a-trigger / kill), and `routine` (fast, reads pre-computed state,
writes nothing).

**Governing rule:** structure is invented, content is not. Every manifesto, target, commitment and
tolerance is produced by a grilling session with the human — a plausible-looking manifesto is treated
as a failure, not a partial success, because it will later be mistaken for something they agreed to.

**Live at:** `Holmes.Administration/PM/AI Toolkit for Personal Governance`

### Status

The scaffold is complete and all seven skills have been reviewed. The manifesto, the five department
manifestos and the advisor methods are still templates awaiting their grilling sessions. Remaining
build tasks are in `_ai/tasks.md`; the design record — including several rejected designs and why — is
in `_ai/decisions.md`.

## AI Toolkit for Solopreneurs

Governs business work, organised by value-chain function (Cross-Function, Create Value, Marketing,
Sales, Deliver Value, Finance) rather than by role. Provides the project scaffold both active toolkits
share, plus a dashboard, memory conventions and session hooks.

**Skills:** `archive-project` · `business-init` · `grill-me-as` · `grilling-handoff` · `new-skill` ·
`project-init` · `project-migrate` · `project-start` · `project-update` · `project-wrap-up` ·
`run-cycle` · `to-brief` · `to-work-units`

**Live at:** `HotIron.Business/00 - Cross Function/AI Toolkit for Solopreneurs` (source of truth),
mirrored into `Holmes.Lifecoach` and `Localix.Business`, deployed to `HotIron.Business/.claude/skills/`
and `Holmes.Administration/.claude/skills/`

## Employee-AI-Toolkit

The ancestor of both. Organised around a **role** within an employer rather than a business or a life —
`role-init` and `archive-project-or-role` are its distinctive skills. Marked *Completed - Partial* and
kept for provenance; its ideas live on in the two active toolkits.

**Skills:** `archive-project-or-role` · `grill-me-as` · `grilling-handoff` · `project-init` ·
`project-migrate` · `project-update` · `project-wrap-up` · `role-init` · `workspace-new-skill`

**Copied from:** `HotIron.Business/00 - Cross Function/_archived/Employee-AI-Toolkit` — the later of
two surviving copies, and the one carrying the project's closing disposition. An earlier copy exists at
`Saturn.AdrianHolmes/.../Technical-Director/Employee-AI-Toolkit`, still marked Active.

## Shared conventions

All three toolkits follow the same structure, which is what makes centralising them plausible:

- **`Shareable/` is the source of truth.** Author there, deploy out to a workspace's `.claude/skills/`
  and `_system/`. Editing a deployed copy directly is how forks start.
- **Skills are committed to the repo**, in `.claude/skills/` — never installed personally to
  `~/.claude/skills/`, which is machine-local, unversioned, and already carries stale copies.
- **The project scaffold** — `CLAUDE.md` plus `_ai/{tasks,decisions,findings}.md`, `_ai/facts/`,
  `_ai/task-prds/`, `_assets/`, `_skills/`, `_archived/` — is common to all three. `.gitkeep` files
  hold the empty ones, since git cannot track an empty directory.
- **`grill-me-as` appears in all three** and is the shared interview engine underneath every grilling
  step. Personal Governance's copy has diverged deliberately: it takes a minister or the PM seat as its
  role and sources recommendations from the manifesto cascade.

### Skill scope: Global vs Project

The Solopreneurs inventory already tags each skill `Global` (portable to any workspace) or `Project`
(references workspace-specific paths, e.g. `ai-toolkit-sync`). That taxonomy is the natural seam for
this repo — the Global scaffold skills are the ones with a genuine claim to a single shared home,
while the governing-model skills belong to their own toolkit.

## Portability

`Shareable/` is clean of absolute machine paths in all three toolkits — verified 2026-08-12. Absolute
`C:\Enterprise\...` paths appear only in `_ai/` build documents (briefs, task lists, audits), which are
project history rather than distributable material.

## Open questions

Recorded for whoever picks this up next:

1. **Which direction is authoritative?** Either this repo becomes the source of truth and the business
   repos consume from it, or it stays an archive. Both are defensible; leaving it undecided is not, as
   that is precisely how the current drift arose.
2. **Should the shared scaffold skills be extracted?** Eight skills (`archive-project`,
   `grilling-handoff`, `new-skill`, `project-init`, `project-migrate`, `project-start`,
   `project-update`, `project-wrap-up`) are consumed by Personal Governance but owned by Solopreneurs,
   which means one workspace reaches into another business's repo for its source of truth. Extracting
   them into a shared set neither toolkit owns would resolve that.
3. **What consumes what?** No workspace currently records which of its installed skills it owns versus
   consumes. That silence is how a hand-edit to a deployed copy became a fork that went unnoticed.
4. **Does `ai-toolkit-sync` need repointing?** It deploys from `Shareable/` to installed locations and
   currently assumes the Solopreneurs layout.

## Recent work

The seven Personal Governance skills and `project-wrap-up` were reviewed against
[`writing-for-agents`](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL.md)
during 2026-08-12. Findings and fixes are recorded in each toolkit's `_ai/decisions.md`. Two bugs
worth noting came out of that pass: `project-wrap-up` was writing a stale open-task count to the
dashboard on every run, and `appoint-advisor` would have filled two manifesto sections that must stay
pointers.
