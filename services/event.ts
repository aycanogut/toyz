import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/utils/payloadClient';

const getEvent = unstable_cache(
  async (slug: string, locale: string) => {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: 'events',
      locale: locale as Locale,
      where: {
        slug: { equals: slug },
        _status: { equals: 'published' },
      },
      limit: 1,
      depth: 1,
    });
    return result.docs[0] ?? null;
  },
  ['event'],
  { revalidate: 3600 }
);

export default getEvent;
