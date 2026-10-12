import { revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload';

import type { Event } from '@/payload-types';

const revalidateEventTags = () => {
  revalidateTag('events', { expire: 0 });
  revalidateTag('event', { expire: 0 });
  revalidateTag('sitemap-events', { expire: 0 });
};

// Also runs when a published event is unpublished, so it disappears from the site.
export const revalidateEventsCacheOnChange: CollectionAfterChangeHook<Event> = ({ doc, previousDoc }) => {
  if (doc._status === 'published' || previousDoc?._status === 'published') {
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
