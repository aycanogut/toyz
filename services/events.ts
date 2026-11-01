import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/utils/payloadClient';

const getEvents = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadClient();

    return await payload.find({
      collection: 'events',
      locale: locale as Locale,
      where: {
        _status: {
          equals: 'published',
        },
      },
      sort: 'details.date',
      pagination: false,
      // Only needed to decide whether the card links to a detail page; poster + one image is enough.
      joins: { gallery: { limit: 2 } },
    });
  },
  ['events'],
  { revalidate: 3600, tags: ['events'] }
);

export default getEvents;
