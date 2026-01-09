import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/utils/payloadClient';

const getArticles = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadClient();

    return await payload.find({
      collection: 'articles',
      locale: locale as Locale,
      where: {
        _status: {
          equals: 'published',
        },
      },
    });
  },
  ['articles'],
  { revalidate: 86400 }
);

export default getArticles;
