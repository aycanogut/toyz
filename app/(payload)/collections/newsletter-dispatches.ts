import type { CollectionAfterChangeHook, CollectionConfig } from 'payload';

// When a dispatch reaches a terminal state, flip the article's sendNewsletter
// checkbox off so the admin UI reflects that the job is done (or cancelled).
const syncArticleSendNewsletter: CollectionAfterChangeHook = async ({ doc, req: { payload } }) => {
  const isFinished = doc.status === 'sent' || doc.status === 'disabled';

  if (!isFinished) {
    return doc;
  }

  const articleId = typeof doc.article === 'object' ? doc.article.id : doc.article;

  if (!articleId) {
    return doc;
  }

  try {
    await payload.update({
      collection: 'articles',
      id: articleId,
      data: { sendNewsletter: false },
      overrideAccess: true,
    });
  } catch (error) {
    payload.logger.error(
      `Failed to reset sendNewsletter for article ${articleId}: ${error instanceof Error ? error.message : String(error)}`
    );
  }

  return doc;
};

export const NewsletterDispatches: CollectionConfig = {
  slug: 'newsletter-dispatches',
  hooks: {
    afterChange: [syncArticleSendNewsletter],
  },
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['article', 'status', 'scheduledFor', 'successCount', 'failureCount'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => false,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'article',
      type: 'relationship',
      relationTo: 'articles',
      required: true,
      unique: true,
      hasMany: false,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'queued',
      options: [
        { label: 'Queued', value: 'queued' },
        { label: 'Sending', value: 'sending' },
        { label: 'Sent', value: 'sent' },
        { label: 'Disabled', value: 'disabled' },
        { label: 'Failed', value: 'failed' },
      ],
    },
    {
      name: 'scheduledFor',
      type: 'date',
      required: true,
    },
    {
      name: 'triggeredAt',
      type: 'date',
    },
    {
      name: 'completedAt',
      type: 'date',
    },
    {
      name: 'recipientCount',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'successCount',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'failureCount',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'sentSubscribers',
      type: 'relationship',
      relationTo: 'subscribers',
      hasMany: true,
      admin: {
        description: 'Subscribers who have already received this newsletter. Used for resume on retry.',
      },
    },
    {
      name: 'lastError',
      type: 'text',
    },
  ],
};
