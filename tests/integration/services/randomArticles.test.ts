import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockPayloadFind } = vi.hoisted(() => ({
  mockPayloadFind: vi.fn(),
}));

vi.mock('@/utils/payloadClient', () => ({
  getPayloadClient: () => Promise.resolve({ find: mockPayloadFind }),
}));

vi.mock('next/cache', () => ({
  unstable_cache: (fn: unknown) => fn,
}));

import getRandomArticles from '@/services/randomArticles';

const articles = (count: number) => Array.from({ length: count }, (_, index) => ({ id: String(index + 1), slug: `article-${index + 1}` }));

describe('getRandomArticles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('queries published articles excluding the current one', async () => {
    mockPayloadFind.mockResolvedValue({ docs: [] });

    await getRandomArticles('tr', 'current-slug');

    expect(mockPayloadFind).toHaveBeenCalledWith({
      collection: 'articles',
      locale: 'tr',
      where: {
        and: [{ _status: { equals: 'published' } }, { slug: { not_equals: 'current-slug' } }],
      },
      pagination: false,
    });
  });

  it('returns three articles by default', async () => {
    mockPayloadFind.mockResolvedValue({ docs: articles(5) });

    await expect(getRandomArticles('en', 'x')).resolves.toHaveLength(3);
  });

  it('respects a custom limit', async () => {
    mockPayloadFind.mockResolvedValue({ docs: articles(5) });

    await expect(getRandomArticles('en', 'x', 2)).resolves.toHaveLength(2);
  });

  it('returns every article when there are fewer than the limit', async () => {
    mockPayloadFind.mockResolvedValue({ docs: articles(2) });

    await expect(getRandomArticles('en', 'x')).resolves.toHaveLength(2);
  });

  it('shuffles articles using the random order', async () => {
    mockPayloadFind.mockResolvedValue({ docs: articles(3) });
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.9).mockReturnValueOnce(0.1).mockReturnValueOnce(0.5);

    const result = await getRandomArticles('en', 'x');

    expect(result.map(article => article.id)).toEqual(['2', '3', '1']);
  });
});
