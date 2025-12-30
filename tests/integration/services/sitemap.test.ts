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

import getSitemap from '@/services/sitemap';

describe('getSitemap', () => {
  const mockSitemap = [
    { slug: 'article-1', updatedAt: '2024-01-01' },
    { slug: 'article-2', updatedAt: '2024-01-02' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockPayloadFind.mockResolvedValue({
      docs: mockSitemap,
      totalDocs: 2,
    });
  });

  it('should return sitemap data', async () => {
    const result = await getSitemap();

    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe('article-1');
  });

  it('should use correct query parameters', async () => {
    await getSitemap();

    expect(mockPayloadFind).toHaveBeenCalledWith({
      collection: 'articles',
      pagination: false,
      limit: 10000,
      select: {
        slug: true,
        updatedAt: true,
      },
    });
  });

  it('should return empty array when no articles', async () => {
    mockPayloadFind.mockResolvedValue({
      docs: [],
      totalDocs: 0,
    });

    const result = await getSitemap();

    expect(result).toHaveLength(0);
  });
});
