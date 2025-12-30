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

import getArticle from '@/services/article';

describe('getArticle', () => {
  const mockArticle = {
    id: '1',
    title: 'Test Article',
    slug: 'test-article',
    content: 'Article content',
    _status: 'published',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return article by slug', async () => {
    mockPayloadFind.mockResolvedValue({
      docs: [mockArticle],
      totalDocs: 1,
    });

    const result = await getArticle('test-article', 'tr');

    expect(result).toEqual(mockArticle);
    expect(result?.slug).toBe('test-article');
  });

  it('should return null for non-existent slug', async () => {
    mockPayloadFind.mockResolvedValue({
      docs: [],
      totalDocs: 0,
    });

    const result = await getArticle('non-existent', 'tr');

    expect(result).toBeNull();
  });

  it('should filter by slug and locale', async () => {
    mockPayloadFind.mockResolvedValue({
      docs: [mockArticle],
      totalDocs: 1,
    });

    await getArticle('test-article', 'en');

    expect(mockPayloadFind).toHaveBeenCalledWith({
      collection: 'articles',
      locale: 'en',
      where: {
        and: [
          {
            slug: { equals: 'test-article' },
          },
          {
            _status: {
              equals: 'published',
            },
          },
        ],
      },
      limit: 1,
      depth: 1,
    });
  });

  it('should only return published articles', async () => {
    mockPayloadFind.mockResolvedValue({
      docs: [],
      totalDocs: 0,
    });

    await getArticle('draft-article', 'tr');

    expect(mockPayloadFind).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          and: expect.arrayContaining([
            {
              _status: {
                equals: 'published',
              },
            },
          ]),
        },
      })
    );
  });

  it('should limit results to 1', async () => {
    mockPayloadFind.mockResolvedValue({
      docs: [mockArticle],
      totalDocs: 1,
    });

    await getArticle('test-article', 'tr');

    expect(mockPayloadFind).toHaveBeenCalledWith(
      expect.objectContaining({
        limit: 1,
      })
    );
  });

  it('should use depth 1 for relations', async () => {
    mockPayloadFind.mockResolvedValue({
      docs: [mockArticle],
      totalDocs: 1,
    });

    await getArticle('test-article', 'tr');

    expect(mockPayloadFind).toHaveBeenCalledWith(
      expect.objectContaining({
        depth: 1,
      })
    );
  });
});
