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

import getContact from '@/services/contact';

describe('getContact', () => {
  const mockContact = {
    id: '1',
    title: 'Contact Us',
    email: 'contact@example.com',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockPayloadFindGlobal.mockResolvedValue(mockContact);
  });

  it('should return contact data', async () => {
    const result = await getContact('tr');

    expect(result).toEqual(mockContact);
  });

  it('should filter by locale', async () => {
    await getContact('en');

    expect(mockPayloadFindGlobal).toHaveBeenCalledWith({
      slug: 'contact',
      locale: 'en',
      depth: 1,
    });
  });
});
