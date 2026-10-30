import { GlobalConfig } from 'payload';

import { revalidateGlobalCache } from '../hooks/revalidateGlobalCache';

export const Contact: GlobalConfig = {
  slug: 'contact',
  hooks: {
    afterChange: [revalidateGlobalCache('contact')],
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
