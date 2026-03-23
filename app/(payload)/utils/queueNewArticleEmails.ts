import type { CollectionAfterChangeHook, CollectionBeforeChangeHook } from 'payload';
import type { Article } from '@/payload-types';

const emailQueueLock = new Set<number | string>();

export const setArticleEmailFlag: CollectionBeforeChangeHook<Article> = async ({ data, originalDoc, operation, req }) => {
  if (operation !== 'update' && operation !== 'create') return data;

  const isNowPublished = data._status === 'published';
  const wasAlreadyPublished = originalDoc?._status === 'published';
  const hasAlreadySentMail = originalDoc?.isEmailSent === true;

  req.payload.logger.info(
    `🔍 Hook Check [${data.title}]: NowPublished: ${isNowPublished}, PreviouslyPublished: ${wasAlreadyPublished}, AlreadySent: ${hasAlreadySentMail}`
  );

  if (isNowPublished && !wasAlreadyPublished && !hasAlreadySentMail) {
    req.payload.logger.info(`🎯 Targeting for Email Queue: ${data.title}`);

    data.isEmailSent = true;

    req.context.shouldQueueEmails = true;
  } else {
    if (hasAlreadySentMail) {
      data.isEmailSent = true;
    }
    req.payload.logger.info(`🚫 Skipping Email Queue: Article already published or mail already sent.`);
  }

  return data;
};

export const queueNewArticleEmails: CollectionAfterChangeHook<Article> = async ({ doc, req: { payload, context } }) => {
  if (!context.shouldQueueEmails) {
    return doc;
  }

  if (emailQueueLock.has(doc.id)) {
    payload.logger.info(`⏭️ Email queue already in progress for: ${doc.title}, skipping duplicate`);
    return doc;
  }

  emailQueueLock.add(doc.id);

  try {
    const { docs: subscribers } = await payload.find({
      collection: 'subscribers',
      where: { isActive: { equals: true } },
      limit: 0,
    });

    if (!subscribers?.length) return doc;

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
  } finally {
    setTimeout(() => emailQueueLock.delete(doc.id), 10000);
  }

  delete context.shouldQueueEmails;

  return doc;
};
