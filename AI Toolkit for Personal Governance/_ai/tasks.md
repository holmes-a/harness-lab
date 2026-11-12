Structural build complete through Phase 6 of `implementation-tasks.md`. Four of the six skills are now reviewed against `writing-great-skills` and fixed — `check-in`, `idea`, `routine`, `opposition` — with `manifesto` and `appoint-advisor` outstanding. Adrian's manifesto, department manifestos, and advisor methods are still unwritten templates.

## Open
- [ ] `PM/_ai/tasks.md` holds the detailed build backlog — the remaining skill reviews, the `grill-me-as` adaptation, the ruling return path, and the department grillings. Read it there rather than duplicating it here
- [ ] Run `manifesto` with Adrian to grill `PM/manifesto.md` into existence
- [ ] Run `appoint-advisor` for each of the five departments to grill their mandates, manifestos and methods into existence
- [ ] Verification pass against `implementation-tasks.md`'s "Verification pass — for the second agent" checklist (V1–V7), by a second agent or session

## Inbox
<!-- Items captured mid-session via /grilling-handoff. Surface at next session start ("what's next") for triage. [task] items are to-dos; [finding], [decision], [thought] items will be routed to their own files at triage. -->

## Recently Done
- `opposition` reviewed against `writing-great-skills` (2026-08-12), fixed, and its second conflict kind built — it now raises **collisions** (decision vs manifesto) and **disagreements** (two advisor positions that cannot both be acted on), and works each to a ruling Adrian gives, one at a time. Two defects fixed: first-collision firing had no loop back, so a second collision in a session was silently dropped; and the collisions file had two owners. Adrian then ruled twice on its posture — the manifesto is the **senior source** and amending it takes his explicit instruction, and the skill **does** recommend, but the recommendation is **found in the manifesto cascade, not formed**. Consequential edits to `idea` Step 7 and `check-in` Step 6, both deployed
- `routine` reviewed against `writing-great-skills` (2026-08-12) and fixed — it claimed to return "what needs doing" while reading departments only, so `PM/_ai/tasks.md` and `PM/opposition-collisions.md` were both invisible to it. Step 1 now reads five sources. `Rules` deleted as duplication, completion criteria added
- `check-in` reviewed against `writing-great-skills` (2026-08-12) and fixed — opposition-collisions now re-raised at Step 1, per-department clock given a home in each department's `CLAUDE.md` (widening `appoint-advisor` to four write targets), completion criteria added, duplication and no-ops pruned. Authored in `Shareable/`, deployed, no drift. First of the six skill reviews
- Phases 1–4 of `implementation-tasks.md` built into `Holmes.Administration` — root scaffold, reused toolkit skills, PM office and department scaffolds, five minister agents
- Phase 5 — the six new skills (`check-in`, `idea`, `routine`, `opposition`, `manifesto`, `appoint-advisor`) written and verified against their acceptance criteria
