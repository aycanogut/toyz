import { unstable_cache } from 'next/cache';

import type { Where } from 'payload';

import { getPayloadClient } from '@/utils/payloadClient';

const getArticles = unstable_cache(
  async (locale: string, categorySlug?: string) => {
    const payload = await getPayloadClient();

    const conditions: Where[] = [{ _status: { equals: 'published' } }];

    if (categorySlug) {
      const categoryQuery = await payload.find({
        collection: 'categories',
        where: { slug: { equals: categorySlug } },
        limit: 1,
        pagination: false,
      });
      const categoryId = categoryQuery.docs[0]?.id;
      conditions.push({ 'details.category': { equals: categoryId ?? '__none__' } });
    }

    return await payload.find({
      collection: 'articles',
      locale: locale as Locale,
      where: { and: conditions },
      pagination: false,
    });
  },
  ['articles'],
  { revalidate: 3600, tags: ['articles'] }
);

export default getArticles;
