---
paths:
  - 'tests/**'
  - 'vitest.config.mts'
  - 'playwright.config.ts'
  - '.github/workflows/tests.yml'
---

# Testing

- **Unit** — `tests/unit/{utils,hooks,payload,schemas}/*.test.ts`, node env. Pure helpers, revalidation hooks, `formatSlug`, zod schemas.
- **Integration** — `tests/integration/**/*.test.ts`, node env. Services, server actions, newsletter hook + task, with Payload mocked.
- **Component** — `tests/components/*.test.tsx`, happy-dom, Testing Library + `@testing-library/jest-dom`.
- **E2E** — `tests/e2e/*.spec.ts`, Playwright Chromium, against a real dev server and database.

## Vitest

- Two projects in `vitest.config.mts`: `node` (unit + integration `*.test.ts`) and `dom` (components `*.test.tsx`). A file outside these globs is silently ignored.
- `globals: true`, setup in `tests/setup.ts`, `@` alias → repo root.
- Single file: `pnpm vitest run <path>`; filter: `-t "name"`.

## Playwright

- One worker (the Next + Payload dev server crashes under parallel load), 60 s timeout, 2 retries on CI.
- `reuseExistingServer` is on locally: if another app already listens on :3000, E2E runs against that app. Check the port before running.
- Single spec: `pnpm playwright test <path>`.

## General

- Test files are type-checked by `next build`; a type error in a test breaks the build.
- CI (`.github/workflows/tests.yml`) runs Vitest then Playwright on push/PR to `main` and `development`.
