import { unstable_cache } from 'next/cache';

import type { Article } from '@/payload-types';

import { getPayloadClient } from '@/utils/payloadClient';

const getRandomArticles = unstable_cache(
  async (locale: string, excludeSlug: string, limit = 3): Promise<Article[]> => {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: 'articles',
      locale: locale as Locale,
      where: {
        and: [{ _status: { equals: 'published' } }, { slug: { not_equals: excludeSlug } }],
      },
      pagination: false,
    });

    return result.docs
      .map(article => ({ article, order: Math.random() }))
      .sort((a, b) => a.order - b.order)
      .slice(0, limit)
      .map(({ article }) => article);
  },
  ['random-articles'],
  { revalidate: 3600 }
);

export default getRandomArticles;
