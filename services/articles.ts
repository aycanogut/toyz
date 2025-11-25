import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/utils/payloadClient';

const getArticles = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadClient();

    return await payload.find({
      collection: 'articles',
      locale: locale as Locale,
    });
  },
  ['articles-2'],
  { revalidate: 60 }
);

export default getArticles;
