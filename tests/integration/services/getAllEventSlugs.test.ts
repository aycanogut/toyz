import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockPayloadFind } = vi.hoisted(() => ({
  mockPayloadFind: vi.fn(),
}));

vi.mock('@/utils/payloadClient', () => ({
  getPayloadClient: () =>
    Promise.resolve({
      find: mockPayloadFind,
    }),
}));

import getAllEventSlugs from '@/services/event-slugs';

describe('getAllEventSlugs', () => {
  const mockSlugs = {
    docs: [
      { slug: 'event-1', poster: 'p1', gallery: { docs: ['p1', 'g1'] } },
      { slug: 'event-2', poster: 'p2', gallery: { docs: ['g2'] } },
      { slug: 'poster-only', poster: 'p3', gallery: { docs: ['p3'] } },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockPayloadFind.mockResolvedValue(mockSlugs);
  });

  it('should return slugs of published events that have a gallery', async () => {
    const result = await getAllEventSlugs('tr');

    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe('event-1');
    expect(mockPayloadFind).toHaveBeenCalledWith({
      collection: 'events',
      locale: 'tr',
      where: {
        _status: {
          equals: 'published',
        },
      },
      limit: 0,
      pagination: false,
      depth: 0,
      joins: { gallery: { limit: 2 } },
      select: {
        slug: true,
        poster: true,
        gallery: true,
      },
    });
  });
});
