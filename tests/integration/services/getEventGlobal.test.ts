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

import getEventGlobal from '@/services/event-global';

describe('getEventGlobal', () => {
  const mockEventGlobal = {
    title: 'Events Global Title',
    description: 'Events Global Description',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockPayloadFindGlobal.mockResolvedValue(mockEventGlobal);
  });

  it('should return event global settings', async () => {
    const result = await getEventGlobal('tr');

    expect(result).toEqual(mockEventGlobal);
    expect(mockPayloadFindGlobal).toHaveBeenCalledWith({
      slug: 'events-global',
      locale: 'tr',
      depth: 1,
    });
  });

  it('should respect the locale parameter', async () => {
    await getEventGlobal('en');

    expect(mockPayloadFindGlobal).toHaveBeenCalledWith(
      expect.objectContaining({
        locale: 'en',
      })
    );
  });
});
