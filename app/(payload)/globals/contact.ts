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
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
  ],
};
