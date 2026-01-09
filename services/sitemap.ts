import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/utils/payloadClient';

const getSitemap = unstable_cache(
  async () => {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: 'articles',
      pagination: false,
      limit: 10000,
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    return result.docs;
  },
  ['sitemap'],
  { revalidate: 86400 }
);

export default getSitemap;
