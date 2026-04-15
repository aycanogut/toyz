import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    disableLocalStorage: true,
    imageSizes: [
      {
        name: 'email',
        width: 600,
        formatOptions: {
          format: 'jpeg',
          options: {
            quality: 100,
          },
        },
      },
    ],
  },
  access: {
    read: () => true,
  },
  fields: [
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
