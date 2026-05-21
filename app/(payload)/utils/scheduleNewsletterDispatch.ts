import type { CollectionAfterChangeHook } from 'payload';

import type { Article } from '@/payload-types';

const NEWSLETTER_SEND_DELAY_MS = 30 * 60 * 1000;

// MongoDB throws error code 11000 (E11000) on unique-index violations.
const MONGO_DUPLICATE_KEY_ERROR_CODE = 11000;

const isProduction = () => process.env.NODE_ENV === 'production';

/**
 * Detects MongoDB unique-index violation errors.
 *
 * When a newsletter dispatch already exists for an article, attempting to
 * insert another one rejects with E11000. We treat that as the "already
 * scheduled" signal and silently no-op the hook.
 */
const isDuplicateKeyError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const code = (error as { code?: number }).code;

  if (code === MONGO_DUPLICATE_KEY_ERROR_CODE) {
    return true;
  }

  const message = (error as { message?: string }).message ?? '';

  return message.includes('E11000') || message.includes('duplicate key');
};

export const scheduleNewsletterDispatch: CollectionAfterChangeHook<Article> = async ({
  doc,
  operation,
  req: { payload },
}) => {
  try {
    // Newsletter sending is gated behind production to keep dev/staging from
    // emailing real subscribers.
    if (!isProduction()) {
      return doc;
    }

    if (operation !== 'create' && operation !== 'update') {
      return doc;
    }

    // Draft saves (including every autosave tick) land here with _status !==
    // 'published'. We bail before touching the dispatch collection, so
    // autosave is implicitly safe — no extra context check needed.
    if (doc._status !== 'published') {
      return doc;
    }

    if (doc.sendNewsletter === true) {
      const scheduledFor = new Date(Date.now() + NEWSLETTER_SEND_DELAY_MS);

      try {
        const dispatch = await payload.create({
          collection: 'newsletter-dispatches',
          data: {
            article: doc.id,
            status: 'queued',
            scheduledFor: scheduledFor.toISOString(),
            triggeredAt: new Date().toISOString(),
          },
        });

        await payload.jobs.queue({
          task: 'dispatchNewsletter',
          input: { dispatchId: String(dispatch.id) },
          waitUntil: scheduledFor,
        });

        payload.logger.info(
          `📬 Newsletter dispatch queued for article "${doc.title}" (dispatch ${dispatch.id}, scheduledFor ${scheduledFor.toISOString()})`
        );
      } catch (error) {
        if (isDuplicateKeyError(error)) {
          payload.logger.warn(
            `⏭️ Newsletter dispatch already exists for article ${doc.id} — skipping (this is expected on re-edits).`
          );
        } else {
          payload.logger.error(
            `❌ Failed to create newsletter dispatch for article ${doc.id}: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      }

      return doc;
    }

    if (doc.sendNewsletter === false) {
      try {
        const { docs } = await payload.find({
          collection: 'newsletter-dispatches',
          where: {
            and: [
              { article: { equals: doc.id } },
              { status: { equals: 'queued' } },
            ],
          },
          limit: 1,
        });

        if (docs.length > 0) {
          await payload.update({
            collection: 'newsletter-dispatches',
            id: docs[0].id,
            data: { status: 'disabled' },
          });
          payload.logger.info(
            `🛑 Newsletter dispatch disabled for article ${doc.id} (user toggled off sendNewsletter).`
          );
        }
      } catch (error) {
        payload.logger.error(
          `❌ Failed to disable newsletter dispatch for article ${doc.id}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }
  } catch (error) {
    payload.logger.error(
      `❌ Unexpected error in scheduleNewsletterDispatch (article ${doc.id}): ${error instanceof Error ? error.message : String(error)}`
    );
  }

  return doc;
};
