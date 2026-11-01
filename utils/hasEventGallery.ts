import type { Event } from '@/payload-types';

const toId = (value: string | { id: string }) => (typeof value === 'string' ? value : value.id);

/**
 * Whether an event has gallery images besides its poster. The poster is also an `event-media`
 * doc linked to the event, so it shows up in the `gallery` join and must not count on its own.
 *
 * @param event - Event with `poster` and the `gallery` join (populated or as IDs)
 * @returns `true` when at least one non-poster image is linked to the event
 */
function hasEventGallery(event: Partial<Pick<Event, 'poster' | 'gallery'>>): boolean {
  const posterId = event.poster ? toId(event.poster) : null;

  return (event.gallery?.docs ?? []).some(doc => toId(doc) !== posterId);
}

export default hasEventGallery;
