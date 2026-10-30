---
paths:
  - 'services/**'
  - 'app/*payload*/hooks/**'
  - 'app/*locale*/content/**'
  - 'app/*locale*/events/**'
  - 'app/sitemap.ts'
  - 'tests/integration/services/**'
  - 'tests/unit/hooks/**'
---

# Services and caching

- `services/*.ts` — one default-exported fetcher per resource, wrapped in `unstable_cache(fn, [key], { revalidate, tags })`. Always filter `_status: 'published'` and pass `locale` explicitly.
- Use `getPayloadClient()` from `utils/payloadClient.ts` (global singleton, avoids connection leaks on serverless cold starts).
- TTL: 3600 s for collections and sitemaps, 86400 s for globals. `tests/integration/services/cacheConfig.test.ts` asserts these.
- A new service needs a tag **and** a matching `revalidateTag(tag, { expire: 0 })` call in `app/(payload)/hooks/`.

## Tags and invalidation

- `article`, `articles`, `sitemap` — `revalidateArticleCache`: on change when the doc **or the previous doc** is published (so unpublishing clears it), and on delete. `randomArticles` shares the `articles` tag.
- `categories` — `revalidateCategoriesCache` also clears `articles` and `article`, because article caches embed the populated category name.
- `event`, `events`, `sitemap-events` — `revalidateEventsCache`, same published/previously-published rule.
- `home`, `slider`, `about`, `contact` — `revalidateGlobalCache(tag)` on the matching global.
- `events-global` — `revalidateEventsGlobalCache`.

## Static params

- `services/slugs.ts` and `services/event-slugs.ts` are **not** cached; they feed `generateStaticParams`.
- `content/[slug]` and `events/[slug]` set `dynamicParams = false`: only slugs known at build time resolve, everything else 404s.
