import type { CollectionAfterChangeHook } from 'payload';

import type { Article } from '@/payload-types';
import extractLexicalText from '@/utils/extractLexicalText';

/**
 * Queues email notification jobs for all active subscribers when an article is published.
 * This hook is triggered after an article is created or updated.
 * Instead of sending emails directly, it queues background jobs for better performance.
 *
 * @param {Object} params - The hook parameters provided by Payload CMS.
 * @param {Article} params.doc - The current document state after the change.
 * @param {Article} params.previousDoc - The previous document state before the change.
 * @param {Object} params.req - The request object containing the Payload instance.
 * @returns {Promise<Article>} The document, unchanged.
 */
async function queueNewArticleEmails({
  doc,
  previousDoc,
  req: { payload },
}: Parameters<CollectionAfterChangeHook<Article>>[0]): Promise<Article> {
  const isPublished = doc._status === 'published';
  const isRecentlyPublished = isPublished && (!previousDoc || previousDoc._status !== 'published');

  if (isRecentlyPublished) {
    try {
      const { docs: subscribers } = await payload.find({
        collection: 'subscribers',
        where: {
          isActive: {
            equals: true,
          },
        },
        limit: 0,
      });

      if (subscribers && subscribers.length > 0 && doc.slug) {
        const articleSlug = doc.slug;
        const summary = extractLexicalText(doc.content, 2);

        let imageUrl = '';

        if (doc.images) {
          const mediaId = typeof doc.images === 'object' ? doc.images.id : doc.images;
          const media = await payload.findByID({
            collection: 'media',
            id: mediaId,
          });

          if (media && media.filename) {
            imageUrl = `https://cdn.toyzwebzine.com/${media.filename}`;
          }
        }

        await Promise.all(
          subscribers.map((subscriber) => {
            const locale = subscriber.preferredLocale === 'tr' ? 'tr' : 'en';

            return payload.jobs.queue({
              task: 'newArticleEmail',
              input: {
                subscriberEmail: subscriber.email,
                preferredLocale: locale,
                articleTitle: doc.title,
                articleSlug,
                articleSummary: summary,
                articleImageUrl: imageUrl,
              },
            });
          })
        );

        payload.logger.info(`✅ Queued ${subscribers.length} notification jobs for article: ${doc.title}`);
      }
    } catch (error) {
      payload.logger.error(`❌ Error while queuing notifications: ${error}`);
    }
  }

  return doc;
}

export default queueNewArticleEmails;
