import { GlobalConfig } from 'payload';

export const Home: GlobalConfig = {
  slug: 'home',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'seo',
      type: 'relationship',
      relationTo: 'seo',
      required: true,
    },
  ],
};
