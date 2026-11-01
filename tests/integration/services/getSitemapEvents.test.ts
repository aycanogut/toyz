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

vi.mock('next/cache', () => ({
  unstable_cache: (fn: unknown) => fn,
}));

import getSitemapEvents from '@/services/sitemap-events';

describe('getSitemapEvents', () => {
  const mockSitemapData = {
    docs: [
      { slug: 'event-1', poster: 'p1', gallery: { docs: ['g1'] }, updatedAt: '2024-01-01T00:00:00.000Z' },
      { slug: 'event-2', poster: 'p2', gallery: { docs: ['p2', 'g2'] }, updatedAt: '2024-01-02T00:00:00.000Z' },
      { slug: 'no-gallery', poster: 'p3', gallery: { docs: [] }, updatedAt: '2024-01-03T00:00:00.000Z' },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockPayloadFind.mockResolvedValue(mockSitemapData);
  });

  it('should return events data for sitemap', async () => {
    const result = await getSitemapEvents();

    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe('event-1');
    expect(mockPayloadFind).toHaveBeenCalledWith({
      collection: 'events',
      where: {
        _status: {
          equals: 'published',
        },
      },
      pagination: false,
      limit: 10000,
      depth: 0,
      joins: { gallery: { limit: 2 } },
      select: {
        slug: true,
        poster: true,
        gallery: true,
        updatedAt: true,
      },
    });
  });
});
