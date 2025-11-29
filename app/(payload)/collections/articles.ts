import type { CollectionConfig } from 'payload';
import slugField from '../fields/slug';

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'createdAt', 'updatedAt'],
  },
  versions: {
    drafts: true,
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
