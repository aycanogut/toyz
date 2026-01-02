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

import getEvents from '@/services/events';

describe('getEvents', () => {
  const mockEvents = {
    docs: [
      {
        id: '1',
        title: 'Test Event 1',
        slug: 'test-event-1',
        _status: 'published',
      },
      {
        id: '2',
        title: 'Test Event 2',
        slug: 'test-event-2',
        _status: 'published',
      },
    ],
    totalDocs: 2,
    limit: 10,
    page: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockPayloadFind.mockResolvedValue(mockEvents);
  });

  it('should return published events', async () => {
    const result = await getEvents('tr');

    expect(result.docs).toHaveLength(2);
    expect(result.docs[0].title).toBe('Test Event 1');
    expect(mockPayloadFind).toHaveBeenCalledTimes(1);
  });

  it('should filter by locale', async () => {
    await getEvents('en');

    expect(mockPayloadFind).toHaveBeenCalledWith({
      collection: 'events',
      locale: 'en',
      where: {
        _status: {
          equals: 'published',
        },
      },
    });
  });

  it('should only return published events', async () => {
    await getEvents('tr');

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

  it('should return empty array when no events found', async () => {
    mockPayloadFind.mockResolvedValue({
      docs: [],
      totalDocs: 0,
      limit: 10,
      page: 1,
    });

    const result = await getEvents('tr');

    expect(result.docs).toHaveLength(0);
    expect(result.totalDocs).toBe(0);
  });
});
