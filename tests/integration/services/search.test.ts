import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockPayloadFindGlobal } = vi.hoisted(() => ({
  mockPayloadFindGlobal: vi.fn(),
}));

vi.mock('@/utils/payloadClient', () => ({
  getPayloadClient: () =>
    Promise.resolve({
      findGlobal: mockPayloadFindGlobal,
    }),
}));

vi.mock('next/cache', () => ({
  unstable_cache: (fn: unknown) => fn,
}));

import getSearch from '@/services/search';

describe('getSearch', () => {
  const mockSearch = {
    id: '1',
    title: 'Search Page',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockPayloadFindGlobal.mockResolvedValue(mockSearch);
  });

  it('should return search page data', async () => {
    const result = await getSearch('tr');

    expect(result).toEqual(mockSearch);
  });

  it('should filter by locale', async () => {
    await getSearch('en');

    expect(mockPayloadFindGlobal).toHaveBeenCalledWith({
      slug: 'searchPage',
      locale: 'en',
      depth: 1,
    });
  });

  it('should use correct slug', async () => {
    await getSearch('tr');

    expect(mockPayloadFindGlobal).toHaveBeenCalledWith(
      expect.objectContaining({
        slug: 'searchPage',
      })
    );
  });
});
