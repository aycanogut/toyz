import { revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

import type { Article } from '@/payload-types';

export const revalidateArticleCacheOnChange: CollectionAfterChangeHook<Article> = ({ doc }) => {
  if (doc._status === 'published') {
    revalidateTag('article', 'max');
    revalidateTag('articles', 'max');
    revalidateTag('sitemap', 'max');
  }

  return doc;
};

export const revalidateArticleCacheOnDelete: CollectionAfterDeleteHook = () => {
  revalidateTag('article', 'max');
  revalidateTag('articles', 'max');
  revalidateTag('sitemap', 'max');
};
