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

import getCategories from '@/services/categories';

describe('getCategories', () => {
  const mockCategories = [
    {
      id: '1',
      name: 'Technology',
      slug: 'technology',
    },
    {
      id: '2',
      name: 'Design',
      slug: 'design',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockPayloadFind.mockResolvedValue({
      docs: mockCategories,
      totalDocs: 2,
    });
  });

  it('should return categories', async () => {
    const result = await getCategories('tr');

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Technology');
    expect(mockPayloadFind).toHaveBeenCalledTimes(1);
  });

  it('should filter by locale', async () => {
    await getCategories('en');

    expect(mockPayloadFind).toHaveBeenCalledWith({
      collection: 'categories',
      depth: 1,
      locale: 'en',
      pagination: false,
    });
  });

  it('should disable pagination', async () => {
    await getCategories('tr');

    expect(mockPayloadFind).toHaveBeenCalledWith(
      expect.objectContaining({
        pagination: false,
      })
    );
  });

  it('should use depth 1 for relations', async () => {
    await getCategories('tr');

    expect(mockPayloadFind).toHaveBeenCalledWith(
      expect.objectContaining({
        depth: 1,
      })
    );
  });

  it('should return empty array when no categories found', async () => {
    mockPayloadFind.mockResolvedValue({
      docs: [],
      totalDocs: 0,
    });

    const result = await getCategories('tr');

    expect(result).toHaveLength(0);
  });
});
