import { revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

import type { Article } from '@/payload-types';

export const revalidateArticleCacheOnChange: CollectionAfterChangeHook<Article> = ({ doc }) => {
  if (doc._status === 'published') {
    revalidateTag('article', { expire: 0 });
    revalidateTag('articles', { expire: 0 });
    revalidateTag('sitemap', { expire: 0 });
  }

  return doc;
};

export const revalidateArticleCacheOnDelete: CollectionAfterDeleteHook = () => {
  revalidateTag('article', { expire: 0 });
  revalidateTag('articles', { expire: 0 });
  revalidateTag('sitemap', { expire: 0 });
};
