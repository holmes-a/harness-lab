---
topic: hooks-memory
one-liner: PreCompact hook is file-based (pre-compact.ps1); SessionEnd hook dropped; memory folder excluded from Shareable; hooks+skills included as cross-provider concepts.
---

# Fact: Hooks and Memory Architecture

**One-liner:** PreCompact hook is file-based (`pre-compact.ps1`); SessionEnd hook dropped; memory folder excluded from `Shareable/`; hooks and skills are included as cross-provider concepts.

## Detail

**PreCompact hook:** The PreCompact hook is an external `hooks/pre-compact.ps1` file that reads and injects all memory files into the compaction context. The previous inline `Write-Output` command was replaced because the file-based approach gives Claude the actual memory content to preserve rather than just a text reminder. It is also easier to maintain than an escaped inline JSON string. Confirmed functional: script runs without errors, produces valid JSON, and injects memory files as `additionalContext`.

**SessionEnd hook dropped:** The SessionEnd hook was removed. It was an unreliable reminder that fired after the window was already closing. A deliberate `/project-wrap-up` command is more reliable and does the actual work.

**Memory folder excluded from Shareable:** `Shareable/` does not include a memory folder or memory file templates. Memory file paths, formats, and loading are tool-controlled. The only portable concept is the pointer pattern, which is documented in the Shareable README.

**Hooks and skills as cross-provider concepts:** Both concepts exist across providers (confirmed: Claude Code and Codex CLI both support them). Hooks and skills are included in `Shareable/` with adaptation notes where implementation differs — not excluded because of provider-specific format.

**Selective adoption from claude-memory-compiler:** The PreCompact hook and connections layer concept were adopted from coleam00/claude-memory-compiler. The daily log structure, Python scripts, and API-cost model were not adopted — overengineered for a small team context.

## Source decisions

- File-based PreCompact hook over inline command (2026-06-15)
- SessionEnd hook dropped (2026-06-15)
- Memory folder excluded from Shareable (2026-06-15)
- Hooks and skills included in Shareable as cross-provider concepts (2026-06-15)
- Selective adoption of claude-memory-compiler pattern (2026-06-12)
