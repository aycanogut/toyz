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

import getAllEventSlugs from '@/services/event-slugs';

describe('getAllEventSlugs', () => {
  const mockSlugs = {
    docs: [{ slug: 'event-1' }, { slug: 'event-2' }],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockPayloadFind.mockResolvedValue(mockSlugs);
  });

  it('should return all published event slugs', async () => {
    const result = await getAllEventSlugs('tr');

    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe('event-1');
    expect(mockPayloadFind).toHaveBeenCalledWith({
      collection: 'events',
      locale: 'tr',
      where: {
        _status: {
          equals: 'published',
        },
      },
      limit: 0,
      pagination: false,
      select: {
        slug: true,
      },
    });
  });
});
