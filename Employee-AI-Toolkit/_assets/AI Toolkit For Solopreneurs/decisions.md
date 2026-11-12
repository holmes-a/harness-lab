# Decisions

<!-- Entry format:
## [Short title]
**Date:** YYYY-MM-DD
**Decision:** [one sentence]
**Rationale:** [one sentence]
**Finding:** [ref to findings.md entry, if any — or omit]
**Supersedes:** [ref to earlier decision, if any — or omit]
-->

## PreCompact hook over SessionEnd for memory preservation

**Date:** 2026-06-14
**Decision:** Implement a PreCompact hook (PowerShell, no Python dependency) rather than a SessionEnd hook with Claude Agent SDK for memory preservation.
**Rationale:** The PreCompact hook injects memory into compaction context with no per-session API cost and no external package dependencies, which fits the solopreneur low-friction goal.
**Finding:** PreCompact hook closes a memory gap

## /wrap-up skill over automated SessionEnd for session state saving

**Date:** 2026-06-14
**Decision:** Use an explicit `/wrap-up` skill for end-of-session saves rather than a fully automated SessionEnd hook calling the Claude Agent SDK.
**Rationale:** Adrian manages session length deliberately and is already pausing to decide to end, so one command is sufficient and avoids per-session API cost and transcript-analysis reliability risk.

## /wrap-up does not auto-commit

**Date:** 2026-06-14
**Decision:** The `/wrap-up` skill updates project files but does not stage or commit to git.
**Rationale:** Adrian commits manually so he can review the diff and write the commit message himself; this applies to all skills, not just wrap-up.
