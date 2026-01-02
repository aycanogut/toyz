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

import getAbout from '@/services/about';

describe('getAbout', () => {
  const mockAbout = {
    id: '1',
    title: 'About Us',
    content: 'About content',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockPayloadFindGlobal.mockResolvedValue(mockAbout);
  });

  it('should return about data', async () => {
    const result = await getAbout('tr');

    expect(result).toEqual(mockAbout);
  });

  it('should filter by locale', async () => {
    await getAbout('en');

    expect(mockPayloadFindGlobal).toHaveBeenCalledWith({
      slug: 'about',
      locale: 'en',
      depth: 1,
    });
  });
});
