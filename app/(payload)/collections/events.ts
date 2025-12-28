import type { CollectionConfig } from 'payload';
import slugField from '../fields/slug';

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'createdAt'],
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
      name: 'eventDate',
      type: 'date',
      required: true,
    },
    {
      name: 'gallery',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    slugField('title'),
  ],
};