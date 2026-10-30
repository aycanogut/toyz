import { GlobalConfig } from 'payload';

import { revalidateGlobalCache } from '../hooks/revalidateGlobalCache';

export const About: GlobalConfig = {
  slug: 'about',
  hooks: {
    afterChange: [revalidateGlobalCache('about')],
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
