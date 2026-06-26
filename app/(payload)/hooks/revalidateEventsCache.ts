import { revalidateTag } from 'next/cache';
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload';

import type { Event } from '@/payload-types';

const revalidateEventTags = () => {
  revalidateTag('events', { expire: 0 });
  revalidateTag('event', { expire: 0 });
  revalidateTag('sitemap-events', { expire: 0 });
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
  revalidateTag('events-global', { expire: 0 });

  return doc;
};
