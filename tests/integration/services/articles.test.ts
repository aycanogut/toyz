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

import getArticles from '@/services/articles';

describe('getArticles', () => {
  const mockArticles = {
    docs: [
      {
        id: '1',
        title: 'Test Article 1',
        slug: 'test-article-1',
        _status: 'published',
      },
      {
        id: '2',
        title: 'Test Article 2',
        slug: 'test-article-2',
        _status: 'published',
      },
    ],
    totalDocs: 2,
    limit: 10,
    page: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockPayloadFind.mockResolvedValue(mockArticles);
  });

  it('should return published articles', async () => {
    const result = await getArticles('tr');

    expect(result.docs).toHaveLength(2);
    expect(result.docs[0].title).toBe('Test Article 1');
    expect(mockPayloadFind).toHaveBeenCalledTimes(1);
  });

  it('should filter by locale', async () => {
    await getArticles('en');

    expect(mockPayloadFind).toHaveBeenCalledWith({
      collection: 'articles',
      locale: 'en',
      where: {
        _status: {
          equals: 'published',
        },
      },
    });
  });

  it('should only return published articles', async () => {
    await getArticles('tr');

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

  it('should return empty array when no articles found', async () => {
    mockPayloadFind.mockResolvedValue({
      docs: [],
      totalDocs: 0,
      limit: 10,
      page: 1,
    });

    const result = await getArticles('tr');

    expect(result.docs).toHaveLength(0);
    expect(result.totalDocs).toBe(0);
  });

  it('should work with different locales', async () => {
    await getArticles('tr');
    await getArticles('en');

    expect(mockPayloadFind).toHaveBeenCalledTimes(2);
    expect(mockPayloadFind).toHaveBeenNthCalledWith(1, expect.objectContaining({ locale: 'tr' }));
    expect(mockPayloadFind).toHaveBeenNthCalledWith(2, expect.objectContaining({ locale: 'en' }));
  });
});
