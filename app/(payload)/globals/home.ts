import { GlobalConfig } from 'payload';

import { revalidateGlobalCache } from '../hooks/revalidateGlobalCache';

export const Home: GlobalConfig = {
  slug: 'home',
  hooks: {
    afterChange: [revalidateGlobalCache('home')],
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
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'openGraph',
      type: 'group',
      fields: [
        {
          name: 'images',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
    },
  ],
};
