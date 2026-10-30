import { revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

import type { Article } from '@/payload-types';

const revalidateArticleTags = () => {
  revalidateTag('article', { expire: 0 });
  revalidateTag('articles', { expire: 0 });
  revalidateTag('sitemap', { expire: 0 });
};

// Also runs when a published article is unpublished, so it disappears from the site.
export const revalidateArticleCacheOnChange: CollectionAfterChangeHook<Article> = ({ doc, previousDoc }) => {
  if (doc._status === 'published' || previousDoc?._status === 'published') {
    revalidateArticleTags();
  }

  return doc;
};

export const revalidateArticleCacheOnDelete: CollectionAfterDeleteHook = () => {
  revalidateArticleTags();
};
