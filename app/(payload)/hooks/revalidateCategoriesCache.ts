import { revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

// Article caches embed the populated category name, so they are cleared too.
const revalidateCategoryTags = () => {
  revalidateTag('categories', { expire: 0 });
  revalidateTag('articles', { expire: 0 });
  revalidateTag('article', { expire: 0 });
};

export const revalidateCategoriesCacheOnChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidateCategoryTags();

  return doc;
};

export const revalidateCategoriesCacheOnDelete: CollectionAfterDeleteHook = () => {
  revalidateCategoryTags();
};
