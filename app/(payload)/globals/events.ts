import { GlobalConfig } from 'payload';

import { revalidateEventsGlobalCache } from '../hooks/revalidateEventsCache';

export const EventsGlobal: GlobalConfig = {
  slug: 'events-global',
  label: 'Events',
  hooks: {
    afterChange: [revalidateEventsGlobalCache],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
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
