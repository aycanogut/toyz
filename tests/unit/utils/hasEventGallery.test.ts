import { describe, expect, it } from 'vitest';

import type { EventMedia } from '@/payload-types';

import hasEventGallery from '@/utils/hasEventGallery';

const media = (id: string) => ({ id }) as EventMedia;

describe('hasEventGallery', () => {
  it('returns false when the gallery join is missing or empty', () => {
    expect(hasEventGallery({ poster: 'p1' })).toBe(false);
    expect(hasEventGallery({ poster: 'p1', gallery: { docs: [] } })).toBe(false);
  });

  it('does not count the poster as a gallery image', () => {
    expect(hasEventGallery({ poster: 'p1', gallery: { docs: ['p1'] } })).toBe(false);
    expect(hasEventGallery({ poster: media('p1'), gallery: { docs: [media('p1')] } })).toBe(false);
  });

  it('returns true when a non-poster image is linked', () => {
    expect(hasEventGallery({ poster: 'p1', gallery: { docs: ['p1', 'g1'] } })).toBe(true);
    expect(hasEventGallery({ poster: media('p1'), gallery: { docs: [media('g1')] } })).toBe(true);
  });
});
