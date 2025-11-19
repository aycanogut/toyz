import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/utils/payloadClient';

const getArticle = unstable_cache(
  async (slug: string, locale: string) => {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: 'articles',
      locale: locale as Locale,
      where: {
        slug: { equals: slug },
      },
      limit: 1,
      depth: 1,
    });

    return result.docs[0] ?? null;
  },
  ['article'],
  { revalidate: 3600 }
);

export default getArticle;
