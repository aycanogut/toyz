import { revalidateTag } from 'next/cache';
import type { GlobalAfterChangeHook } from 'payload';

export const revalidateSliderCache: GlobalAfterChangeHook = ({ doc }) => {
  revalidateTag('slider', 'max');

  return doc;
};
