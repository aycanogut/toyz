import type { CollectionConfig } from 'payload';

import {
  revalidateArticleCacheOnChange,
  revalidateArticleCacheOnDelete,
} from '../hooks/revalidateArticleCache';
import slugField from '../fields/slug';
import { scheduleNewsletterDispatch } from '../utils/scheduleNewsletterDispatch';

export const Articles: CollectionConfig = {
  slug: 'articles',
  hooks: {
    afterChange: [scheduleNewsletterDispatch, revalidateArticleCacheOnChange],
    afterDelete: [revalidateArticleCacheOnDelete],
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'createdAt', 'updatedAt'],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;

      return {
        _status: {
          equals: 'published',
        },
      };
    },
  },
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true,
      validate: false,
    },
    maxPerDoc: 10,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'details',
      type: 'group',
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
          required: true,
          localized: true,
          hasMany: false,
          admin: {
            appearance: 'select',
          },
        },
        {
          name: 'author',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'sendNewsletter',
      type: 'checkbox',
      defaultValue: false,
      localized: false,
      admin: {
        position: 'sidebar',
        description:
          'When this article is first published with this checked, all active subscribers will receive an email after ~30 minutes. The field becomes read-only once the newsletter has been sent.',
      },
      access: {
        update: async ({ req, id }) => {
          if (!id) return true;
          try {
            const { docs } = await req.payload.find({
              collection: 'newsletter-dispatches',
              where: {
                and: [
                  { article: { equals: id } },
                  { status: { equals: 'sent' } },
                ],
              },
              limit: 1,
            });
            return docs.length === 0;
          } catch {
            return true;
          }
        },
      },
    },
    slugField('title'),
  ],
};
