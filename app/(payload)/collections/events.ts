import type { CollectionConfig } from 'payload';
import slugField from '../fields/slug';

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'createdAt'],
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
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'poster',
      type: 'relationship',
      relationTo: 'media',
      required: true,
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
          name: 'location',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'gallery',
      type: 'join',
      collection: 'event-media',
      on: 'event',
      defaultSort: 'filename',
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