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

import getEvent from '@/services/event';

describe('getEvent', () => {
  const mockEvent = {
    docs: [
      {
        id: '1',
        title: 'Test Event Detail',
        slug: 'test-event-detail',
        _status: 'published',
      },
    ],
    totalDocs: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockPayloadFind.mockResolvedValue(mockEvent);
  });

  it('should return a single published event by slug', async () => {
    const result = await getEvent('test-event-detail', 'tr');

    expect(result).not.toBeNull();
    expect(result?.title).toBe('Test Event Detail');
    expect(mockPayloadFind).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'events',
        where: {
          slug: { equals: 'test-event-detail' },
          _status: { equals: 'published' },
        },
        limit: 1,
      })
    );
  });

  it('should return null if event not found', async () => {
    mockPayloadFind.mockResolvedValue({ docs: [], totalDocs: 0 });

    const result = await getEvent('non-existent', 'tr');

    expect(result).toBeNull();
  });

  it('should respect the locale parameter', async () => {
    await getEvent('test-event', 'en');

    expect(mockPayloadFind).toHaveBeenCalledWith(
      expect.objectContaining({
        locale: 'en',
      })
    );
  });
});
