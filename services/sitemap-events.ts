import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/utils/payloadClient';

const getSitemapEvents = unstable_cache(
  async () => {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: 'events',
      where: {
        _status: {
          equals: 'published',
        },
      },
      pagination: false,
      limit: 10000,
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    return result.docs;
  },
  ['sitemap-events'],
  { revalidate: 86400 }
);

export default getSitemapEvents;
