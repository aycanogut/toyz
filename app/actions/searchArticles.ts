'use server';

import { getLocale } from 'next-intl/server';

import { Category } from '@/payload-types';
import { getPayloadClient } from '@/utils/payloadClient';
import readTime from '@/utils/readTime';

export interface SearchResult {
  id: string;
  title: string;
  slug: string;
  category?: string;
  categorySlug?: string;
  date: string;
  author: string;
  readTimeMinutes: number;
}

export async function searchArticles(query: string, categorySlug?: string): Promise<SearchResult[]> {
  const locale = await getLocale();
  const payload = await getPayloadClient();

  const articles = await payload.find({
    collection: 'articles',
    where: {
      and: [
        { _status: { equals: 'published' } },
        ...(query ? [{ title: { contains: query } }] : []),
        ...(categorySlug ? [{ 'details.category.slug': { equals: categorySlug } }] : []),
      ],
    },
    depth: 1,
    locale: locale as Locale,
    limit: 10,
  });

  return articles.docs.map(item => {
    const cat = item.details.category as Category;
    const minutes = readTime(item.content as Parameters<typeof readTime>[0]);

    return {
      id: String(item.id),
      title: item.title,
      slug: item.slug ?? '',
      category: cat?.name,
      categorySlug: cat?.slug ?? undefined,
      date: item.details.date,
      author: item.details.author,
      readTimeMinutes: minutes,
    };
  });
}
