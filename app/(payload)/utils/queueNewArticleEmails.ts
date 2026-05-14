import type { CollectionAfterChangeHook } from 'payload';
import type { Model } from 'mongoose';
import type { Article } from '@/payload-types';

const isProduction = () => process.env.NODE_ENV === 'production';

export const queueNewArticleEmails: CollectionAfterChangeHook<Article> = async ({
  doc,
  previousDoc,
  operation,
  req: { payload },
}) => {
  if (!isProduction()) {
    payload.logger.info(
      `🚫 Skipping Email Queue: Not in production environment (NODE_ENV=${process.env.NODE_ENV})`
    );
    return doc;
  }

  if (operation !== 'create' && operation !== 'update') return doc;

  const isNowPublished = doc._status === 'published';
  const wasPreviouslyPublished = previousDoc?._status === 'published';

  if (!isNowPublished || wasPreviouslyPublished) return doc;

  const mongooseDb = payload.db as unknown as {
    collections: Record<string, Model<{ isEmailSent?: boolean }>>;
  };
  const ArticlesModel = mongooseDb.collections?.articles;

  if (!ArticlesModel || typeof ArticlesModel.findOneAndUpdate !== 'function') {
    payload.logger.error(
      `❌ Could not access Articles mongoose model — aborting email queue for: ${doc.title}`
    );
    return doc;
  }

  // Atomic claim across all instances. MongoDB guarantees this single-document
  // update is serialized: only one concurrent caller will match the predicate
  // and update the flag; all others see `null` and bail.
  const claimed = await ArticlesModel.findOneAndUpdate(
    { _id: doc.id, isEmailSent: { $ne: true } },
    { $set: { isEmailSent: true } },
    { new: false }
  );

  if (!claimed) {
    payload.logger.info(
      `⏭️ Email already claimed for: ${doc.title} (lost race or previously sent)`
    );
    return doc;
  }

  payload.logger.info(`🎯 Claimed email send for: ${doc.title}`);

  try {
    const { docs: subscribers } = await payload.find({
      collection: 'subscribers',
      where: { isActive: { equals: true } },
      limit: 0,
    });

    if (!subscribers?.length) {
      payload.logger.info(`ℹ️ No active subscribers, nothing to queue for: ${doc.title}`);
      return doc;
    }

    await Promise.all(
      subscribers.map((subscriber, index) =>
        payload.jobs.queue({
          task: 'newArticleEmail',
          input: {
            subscriberEmail: subscriber.email,
            preferredLocale: subscriber.preferredLocale === 'tr' ? 'tr' : 'en',
            articleId: doc.id,
          },
          waitUntil: new Date(Date.now() + index * 600),
        })
      )
    );

    payload.logger.info(`✅ Successfully queued ${subscribers.length} jobs for: ${doc.title}`);
  } catch (error) {
    payload.logger.error(`❌ Error in queueing: ${error}`);
  }

  return doc;
};
