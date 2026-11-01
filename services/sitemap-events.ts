import { unstable_cache } from 'next/cache';

import hasEventGallery from '@/utils/hasEventGallery';
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
      depth: 0,
      joins: { gallery: { limit: 2 } },
      select: {
        slug: true,
        poster: true,
        gallery: true,
        updatedAt: true,
      },
    });

    return result.docs.filter(hasEventGallery);
  },
  ['sitemap-events'],
  { revalidate: 3600, tags: ['sitemap-events'] }
);

export default getSitemapEvents;
