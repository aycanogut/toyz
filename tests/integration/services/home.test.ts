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

import getHome from '@/services/home';

describe('getHome', () => {
  const mockHome = {
    id: '1',
    title: 'Home Page',
    description: 'Welcome',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockPayloadFindGlobal.mockResolvedValue(mockHome);
  });

  it('should return home data', async () => {
    const result = await getHome('tr');

    expect(result).toEqual(mockHome);
  });

  it('should filter by locale', async () => {
    await getHome('en');

    expect(mockPayloadFindGlobal).toHaveBeenCalledWith({
      slug: 'home',
      locale: 'en',
      depth: 1,
    });
  });

  it('should use depth 1', async () => {
    await getHome('tr');

    expect(mockPayloadFindGlobal).toHaveBeenCalledWith(
      expect.objectContaining({
        depth: 1,
      })
    );
  });
});
