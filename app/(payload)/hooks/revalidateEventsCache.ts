import { revalidateTag } from 'next/cache';
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload';

import type { Event } from '@/payload-types';

const revalidateEventTags = () => {
  revalidateTag('events', 'max');
  revalidateTag('event', 'max');
  revalidateTag('sitemap-events', 'max');
};

export const revalidateEventsCacheOnChange: CollectionAfterChangeHook<Event> = ({ doc }) => {
  if (doc._status === 'published') {
    revalidateEventTags();
  }

  return doc;
};

export const revalidateEventsCacheOnDelete: CollectionAfterDeleteHook = () => {
  revalidateEventTags();
};

export const revalidateEventsGlobalCache: GlobalAfterChangeHook = ({ doc }) => {
  revalidateTag('events-global', 'max');

  return doc;
};
