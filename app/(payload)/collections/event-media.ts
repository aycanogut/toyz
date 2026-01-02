import type { CollectionConfig } from 'payload';

export const EventMedia: CollectionConfig = {
  slug: 'event-media',
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    disableLocalStorage: true,
  },
  admin: {
    defaultColumns: ['filename', 'thumbnail', 'event', 'updatedAt'],
    useAsTitle: 'filename',
  },
  fields: [
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'alt',
      type: 'text',
      localized: true,
    },
    {
      name: 'credits',
      type: 'text',
      localized: false,
    },
  ],
};

