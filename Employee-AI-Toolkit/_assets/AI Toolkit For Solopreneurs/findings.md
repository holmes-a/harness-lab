# Findings

<!-- Entry format:
## [Short title]
**Date:** YYYY-MM-DD
**Finding:** [one sentence — factual, not interpretive]
**Source:** [test result / analysis / external research / user feedback]
**Status:** Open | Actioned | Superseded
**Decision:** [ref to decisions.md entry, once made — or omit]
-->

## PreCompact hook closes a memory gap

**Date:** 2026-06-14
**Finding:** Claude Code auto-compaction can discard session context before the memory system captures it; a PreCompact hook that injects the full memory directory into the compaction context prevents this loss.
**Source:** External research — coleam00/claude-memory-compiler AGENTS.md
**Status:** Actioned

## MEMORY.md index pattern validated by external design

**Date:** 2026-06-14
**Finding:** The coleam00/claude-memory-compiler independently converged on the same index-first retrieval pattern used in MEMORY.md, confirming it outperforms vector similarity at personal KB scale (50-500 articles).
**Source:** External research — coleam00/claude-memory-compiler AGENTS.md
**Status:** Open
