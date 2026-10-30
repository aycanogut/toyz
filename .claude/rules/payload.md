---
paths:
  - 'app/*payload*/**'
  - 'payload.config.ts'
  - 'payload-types.ts'
---

# Payload CMS

Config lives in `payload.config.ts`. Payload localization: `en` (default), `tr`. For Payload API details (hooks, access control, queries, jobs) see `.agents/payload/SKILL.md` and `.agents/payload/reference/`.

## Data model

Only facts not obvious from the schema files:

- `articles` — drafts with autosave + scheduled publish, max 10 versions. `title`, `description`, `content` and `details.category` are localized; `slug` is not. `sendNewsletter` drives the newsletter (see `newsletter.md`).
- `events` — drafts with autosave. `gallery` is a join field over `event-media.event`.
- `categories` — `slug` is an inline field, not `slugField`.
- `media` — the `email` image size is used by the newsletter. `media` and `event-media` accept images only and are stored in R2 (`disableLocalStorage`), URLs built from `toyzConfig.r2PublicUrl`.
- `subscribers` — public `create`; custom `GET /api/subscribers/unsubscribe?email=` endpoint redirects to `/<locale>?status=…`.
- `newsletter-dispatches` — `create` is denied to everyone; rows are created via the Local API, which bypasses access.
- `payload-jobs` — shown in admin with custom columns.
- Globals: `home`, `slider`, `about`, `contact`, `events-global`. Each revalidates its own cache tag.

## Rules

- Public read on `articles` and `events` is restricted to `_status: 'published'` in access control; authenticated users see everything. Services still filter on `_status` explicitly.
- Auth uses Payload's default `users` collection. `collections/users.ts` exists but is **not registered** in the config.
- Use `slugField(fieldToUse, overrides)` from `fields/slug.ts` for new slugged collections.
- Every collection/global that feeds the site needs an `afterChange` (and `afterDelete`) revalidation hook from `hooks/` (see `caching.md`).
- Inside hooks use `req.payload`, not `getPayloadClient()`.
- Rich text is Lexical with default features plus `YouTubeBlock` (`blocks/youtube.ts`). A new block also needs a renderer in `app/[locale]/content/[slug]/RichText/`.
- Upload size limit is 1 MB.
- Live preview is enabled for `articles` and the `slider`, `about`, `contact` globals.
- After a schema change, `payload-types.ts` and `toyz-panel/importMap.js` are regenerated. Commit them; never hand-edit.
- `app/(payload)/**` is excluded from ESLint; follow the project style anyway.
- `onInit` resets jobs stuck in `processing: true` without `completedAt` on every cold start.
