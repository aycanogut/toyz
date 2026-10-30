import { revalidateTag } from 'next/cache';
import type { GlobalAfterChangeHook } from 'payload';

export const revalidateGlobalCache =
  (tag: string): GlobalAfterChangeHook =>
  ({ doc }) => {
    revalidateTag(tag, { expire: 0 });

    return doc;
  };
