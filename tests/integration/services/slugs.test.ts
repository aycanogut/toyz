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

import getAllArticleSlugs from '@/services/slugs';

describe('getAllArticleSlugs', () => {
  const mockSlugs = [{ slug: 'article-1' }, { slug: 'article-2' }];

  beforeEach(() => {
    vi.clearAllMocks();
    mockPayloadFind.mockResolvedValue({
      docs: mockSlugs,
      totalDocs: 2,
    });
  });

  it('should return article slugs', async () => {
    const result = await getAllArticleSlugs('tr');

    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe('article-1');
  });

  it('should filter by locale', async () => {
    await getAllArticleSlugs('en');

    expect(mockPayloadFind).toHaveBeenCalledWith({
      collection: 'articles',
      locale: 'en',
      where: {
        _status: {
          equals: 'published',
        },
      },
      limit: 0,
      pagination: false,
      select: {
        slug: true,
      },
    });
  });

  it('should only return published articles', async () => {
    await getAllArticleSlugs('tr');

    expect(mockPayloadFind).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          _status: {
            equals: 'published',
          },
        },
      })
    );
  });

  it('should use limit 0 and pagination false', async () => {
    await getAllArticleSlugs('tr');

    expect(mockPayloadFind).toHaveBeenCalledWith(
      expect.objectContaining({
        limit: 0,
        pagination: false,
      })
    );
  });

  it('should only select slug field', async () => {
    await getAllArticleSlugs('tr');

    expect(mockPayloadFind).toHaveBeenCalledWith(
      expect.objectContaining({
        select: {
          slug: true,
        },
      })
    );
  });
});
