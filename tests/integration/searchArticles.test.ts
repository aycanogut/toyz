import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockFind } = vi.hoisted(() => ({
  mockFind: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  getLocale: () => Promise.resolve('tr'),
}));

vi.mock('@/utils/payloadClient', () => ({
  getPayloadClient: () => Promise.resolve({ find: mockFind }),
}));

import { searchArticles } from '@/app/actions/searchArticles';

const article = {
  id: 42,
  title: 'Punk Is Not Dead',
  slug: 'punk-is-not-dead',
  content: { root: { children: [{ type: 'text', text: 'word '.repeat(250) }] } },
  details: {
    category: { name: 'Müzik', slug: 'music' },
    date: '2026-01-01',
    author: 'Author',
  },
};

describe('searchArticles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFind.mockResolvedValue({ docs: [article] });
  });

  it('searches published articles by title in the current locale', async () => {
    await searchArticles('punk');

    expect(mockFind).toHaveBeenCalledWith({
      collection: 'articles',
      where: { and: [{ _status: { equals: 'published' } }, { title: { contains: 'punk' } }] },
      depth: 1,
      locale: 'tr',
      limit: 10,
    });
  });

  it('adds the category filter and skips the title filter when the query is empty', async () => {
    await searchArticles('', 'music');

    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { and: [{ _status: { equals: 'published' } }, { 'details.category.slug': { equals: 'music' } }] },
      })
    );
  });

  it('maps articles to search results', async () => {
    await expect(searchArticles('punk')).resolves.toEqual([
      {
        id: '42',
        title: 'Punk Is Not Dead',
        slug: 'punk-is-not-dead',
        category: 'Müzik',
        categorySlug: 'music',
        date: '2026-01-01',
        author: 'Author',
        readTimeMinutes: 2,
      },
    ]);
  });
});
