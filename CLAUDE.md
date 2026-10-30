# CLAUDE.md

Guidance for Claude Code in this repository. Area-specific rules live in `.claude/rules/` and load only when matching files are touched:

- `components.md`, `styling.md` — `.tsx` files, `theme/`
- `payload.md` — `app/(payload)/`, `payload.config.ts`
- `caching.md` — `services/`, revalidation hooks, `[slug]` routes, sitemap
- `newsletter.md` — jobs, dispatch hook, subscribers, `emails/`
- `testing.md` — `tests/`, Vitest/Playwright config

## Project overview

**TOYZ** (`toyzwebzine.com`) is a bilingual (`en` / `tr`) webzine about graffiti, street art, underground music, skateboarding, cinema and photography. It is a **single Next.js 16 App Router app with Payload CMS 3 running in-process**: public site, CMS admin, REST/GraphQL API and background jobs are served by the same app, deployed to **Vercel**.

- **Core**: Next.js 16 (Turbopack in dev), React 19, TypeScript strict
- **CMS / data**: Payload 3 (Lexical rich text, search plugin), MongoDB Atlas via Mongoose adapter
- **Media**: Cloudflare R2 via `@payloadcms/storage-s3`, served from a CDN subdomain
- **Email**: Resend (`@payloadcms/email-resend`), templates with `react-email`
- **i18n**: `next-intl` 4 (UI strings) + Payload localization (content)
- **UI**: Tailwind CSS v4, CVA, `tailwind-merge`, Radix Popover, Embla Carousel, `motion`, `react-icons`, `sonner`
- **Forms**: `react-hook-form` + `zod` 4, Google reCAPTCHA v3
- **Testing**: Vitest 5, Testing Library, Playwright
- **Tooling**: pnpm 12, Node 24 (`.nvmrc`), ESLint 9 flat config, Prettier 3

## Commands

Use **pnpm** for everything.

- `pnpm dev` — dev server on :3000 (site at `/en`, admin at `/toyz-panel`)
- `pnpm build` / `pnpm start` — production build / serve. `next build` also type-checks test files
- `pnpm lint` — ESLint
- `pnpm format` / `pnpm format:check` — Prettier (separate from ESLint)
- `pnpm test` — Vitest, single run. `pnpm vitest run <file>` (`-t "name"`) for one file/test
- `pnpm test:e2e` — Playwright. `pnpm playwright test <spec>` for one spec
- `pnpm generate:env-key-types` — regenerate `types/EnvFileTypes.d.ts` from `.env.development` (only)

Before calling work done, run `pnpm lint`, `pnpm format:check` and the relevant tests. Run `pnpm build` when touching types, Payload config or route segment config.

## Repository layout

```
app/
  [locale]/                 Public site (next-intl). layout, page, error, loading, not-found
    about/ contact/ events/ content/[slug]/   Feature routes
    contact/mailAction/     Server action: contact form → email
    footer/subscribeAction/ Server action: newsletter sign-up
    components/             Page-level components used by page.tsx files
    hooks/                  Client hooks (useReCaptcha)
    [...rest]/              Catch-all → notFound()
  (payload)/                Payload CMS: collections, globals, blocks, fields, hooks, jobs, utils,
                            toyz-panel (admin), api (REST/GraphQL routes)
  actions/searchArticles.ts Server action used by the header search overlay
  sitemap.ts robots.ts global-error.tsx
components/                 Reusable UI primitives (Badge, Button, Icon, Input, Popover, …)
layout/                     Header (desktop/mobile, SearchOverlay, LanguageSwitcher) and Footer
services/                   Cached server-side data fetchers (Payload Local API)
utils/                      Pure helpers + payloadClient singleton
emails/                     react-email templates
i18n/                       next-intl routing + request config
locales/                    en.json / tr.json UI strings
theme/                      globals.css (@theme tokens), animations.css, fonts.ts, icons.ts
types/                      Global ambient types (Locale, IntlMessages, env keys)
tests/                      unit/ integration/ components/ e2e/
payload.config.ts           Payload single source of truth
payload-types.ts            Generated — never edit by hand
toyzConfig.ts               Centralized env access
proxy.ts                    next-intl middleware (Next 16 name for middleware.ts)
next.config.mjs             Images, `/` → `/en` redirect, security headers + CSP
.agents/payload/            Payload reference skill (SKILL.md + reference/*.md)
```

## Architecture

1. `proxy.ts` runs `next-intl` middleware for every path except `toyz-panel`, `api`, `monitoring`, `_next`, `_vercel` and files with an extension. `/` redirects to `/en` in `next.config.mjs`.
2. `app/[locale]/layout.tsx` validates the locale, builds metadata from the `home` global and wraps the tree in `NextIntlClientProvider` → `ReCaptchaProvider` → `Layout` (Header / main / Footer), plus `Toaster` and `GoogleAnalytics`.
3. Server `page.tsx` files fetch data through `services/*` and pass plain props to client components.
4. Mutations go through server actions: zod validation → server-side reCAPTCHA (`utils/verifyReCaptcha.ts`) → Payload.

**UI code never calls Payload directly.** Reads go through `services/*` (cached with `unstable_cache` + tags, invalidated by Payload hooks). Outside Payload hooks, get the client with `getPayloadClient()` from `utils/payloadClient.ts`.

`content/[slug]` and `events/[slug]` use `dynamicParams = false`: only slugs known at build time resolve.

## i18n

- Two layers: **UI strings** in `locales/{en,tr}.json` (next-intl) and **content** localized by Payload (`localized: true`, queried with `locale`).
- Import `Link`, `redirect`, `usePathname`, `useRouter` from `@/i18n/routing`; ESLint blocks `next/link` and those `next/navigation` exports. `notFound` from `next/navigation` is fine.
- `Locale` (`'en' | 'tr'`) is a global ambient type — no import needed. `IntlMessages` is a global alias of `en.json`; keys are **not** type-checked via next-intl `AppConfig`. Add every new key to both JSON files.
- Locale lists are also hardcoded in `payload.config.ts`, `subscribers.preferredLocale`, `subscribeAction`'s zod enum, `sitemap.ts` and `[locale]/layout.tsx` metadata.

## SEO and security

- `app/sitemap.ts` emits static routes, articles and events per locale with `hreflang` alternates and `x-default` → `en`.
- `generateMetadata` lives in each route's `layout.tsx` and builds canonical + alternate URLs from `toyzConfig.baseUrl`.
- `next.config.mjs` sets HSTS, frame, referrer, permissions headers and a strict CSP. **Any new third-party script, image host or iframe needs a CSP update**, plus `images.remotePatterns` for images.
- The contact action HTML-escapes user input before building the email. Keep it that way.

## Environment

- Read env through `toyzConfig.ts`, never `process.env` in app code. Exceptions: `CRON_SECRET` (`payload.config.ts`) and `NODE_ENV`.
- New variable: add to `toyzConfig.ts`, `.env.example` and every `.env.*`, then run `pnpm generate:env-key-types` (reads only `.env.development`).
- Files: `.env.development`, `.env.production` (loaded by `next start`), `.env.local`, `.env.example`. Never print or commit their values.
- **Dev and prod are fully separated**: different MongoDB clusters and R2 buckets. Prod media comes from `cdn.toyzwebzine.com`, dev/preview from `cdn-dev.toyzwebzine.com`, selected by `R2_PUBLIC_URL`. Both hosts are hardcoded in `next.config.mjs` on purpose.
- `CRON_SECRET` is only set on Vercel and in GitHub secrets.

## CI / CD

- `.github/workflows/tests.yml` — Vitest + Playwright on push/PR to `main` and `development`.
- `.github/workflows/payload-jobs.yml` — hourly call to the Payload jobs endpoint (there is no `autoRun`).
- `development` is the working branch; `main` is production.

## Code conventions

- **Prettier**: single quotes, semicolons, `printWidth: 160`, `singleAttributePerLine`, `arrowParens: avoid`, `trailingComma: es5`, Tailwind class sorting.
- **Imports**: ESLint `import/order` is an error — builtin → external → type → internal → parent → sibling, blank line between groups, alphabetized; `react` first, `next/*` before other externals. No file extensions.
- **Blank lines** separate logical blocks: after `const` groups, after `if/else`, before `return`.
- Default exports for components, hooks, services and utils; named exports for server actions and Payload configs.
- Comments explain _why_ (rate limits, idempotency, unique-index tricks), never restate code.
- Conventional commits (`feat(scope): …`, `fix: …`, `chore(payload): …`).

## Gotchas

- Admin is at `/toyz-panel`, not `/admin`. Payload APIs are under `/api`.
- `proxy.ts` is Next 16's middleware file; do not add a `middleware.ts`.
- Font exports in `theme/fonts.ts` are named `grotesque` (Fira Code → `font-fira`) and `display` (DM Sans → `font-heading`).
- `images.unoptimized: true` — `next/image` does not resize; upload appropriately sized images.
- If another app is running on :3000, Playwright reuses it and tests the wrong app.
