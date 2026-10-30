---
paths:
  - 'app/*payload*/jobs/**'
  - 'app/*payload*/utils/scheduleNewsletterDispatch.ts'
  - 'app/*payload*/collections/articles.ts'
  - 'app/*payload*/collections/newsletter-dispatches.ts'
  - 'app/*payload*/collections/subscribers.ts'
  - 'app/*locale*/footer/subscribeAction/**'
  - 'emails/**'
  - '.github/workflows/payload-jobs.yml'
  - 'tests/integration/*Newsletter*.test.ts'
  - 'tests/integration/subscribeAction.test.ts'
---

# Newsletter pipeline

There is **no `autoRun`**. `.github/workflows/payload-jobs.yml` calls `/api/payload-jobs/run` **hourly** on the `*.vercel.app` URL (bypassing Cloudflare Bot Fight Mode) with `Authorization: Bearer $CRON_SECRET` and a Vercel protection-bypass header. `jobs.access.run` accepts that bearer token or any logged-in admin. Real send time is therefore 30–90 min after publish.

1. **Schedule** — `scheduleNewsletterDispatch` (article `afterChange`) returns early for non-published saves, so autosave ticks are safe. On a published save with `sendNewsletter: true` it creates a `newsletter-dispatches` row (`queued`) and queues `dispatchNewsletter` with `waitUntil` = now + 30 min. It runs in every environment; dev and prod use separate databases and buckets.
2. **Dedup** — `newsletter-dispatches.article` is unique. A second publish hits Mongo E11000, which is logged and skipped on purpose. Unchecking `sendNewsletter` while `queued` marks the dispatch `disabled`.
3. **Send** — `dispatchNewsletterTask` (3 retries) only acts on `queued` / `sending`. Per subscriber it loads the article in the subscriber's locale, renders `emails/NewArticleEmail.tsx`, and sends via Resend 600 ms apart with one retry on 429.
4. **Idempotency** — each success is written to `sentSubscribers` immediately, outside the send try/catch, so a retry resumes without double-sending. `failureCount` is per run.
5. **Terminal states** — `sent`, `failed` (zero successes), `disabled` (article unpublished mid-run). On `sent`/`disabled` a hook on `newsletter-dispatches` resets the article's `sendNewsletter` to `false`. The checkbox is read-only once a `sent` dispatch exists.
6. Jobs are deleted on completion.

- Subscription happens in `subscribeAction` (zod + reCAPTCHA); re-subscribing reactivates an inactive row. Unsubscribe is the `subscribers` custom endpoint linked from the email.
- Image URLs in emails are built from `toyzConfig.r2PublicUrl`, preferring the `email` image size.
- Keep the "why" comments (rate limits, idempotency, E11000) intact when editing.
