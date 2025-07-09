import { GlobalConfig } from 'payload';

export const Contact: GlobalConfig = {
  slug: 'contact',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
};
