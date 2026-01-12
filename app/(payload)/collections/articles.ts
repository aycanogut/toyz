import type { CollectionConfig } from 'payload';

import slugField from '../fields/slug';
import queueNewArticleEmails from '../utils/queueNewArticleEmails';

export const Articles: CollectionConfig = {
  slug: 'articles',
  hooks: {
    afterChange: [queueNewArticleEmails],
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
      name: 'keywords',
      type: 'text',
      hasMany: true,
      localized: true,
    },
    slugField('title'),
  ],
};
