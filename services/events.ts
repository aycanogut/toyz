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
    });
  },
  ['events'],
  { revalidate: 3600 }
);

export default getEvents;
