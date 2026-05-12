---
name: feedback_code_spacing
description: User requires blank lines between code blocks for readability
metadata:
  type: feedback
---

Always add blank lines between logical blocks in code: after const declarations, after if/else blocks, before return statements, between distinct operations.

**Why:** User finds tightly packed code hard to read and explicitly asked for this style.

**How to apply:** Any time writing or editing TypeScript/TSX — leave a blank line after `const` groups, after `if/else`, before `router.*` calls, before `return`, etc.
