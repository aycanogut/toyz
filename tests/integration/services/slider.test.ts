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

import getSlider from '@/services/slider';

describe('getSlider', () => {
  const mockSlider = {
    id: '1',
    items: [
      { title: 'Slide 1', image: 'image1.jpg' },
      { title: 'Slide 2', image: 'image2.jpg' },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockPayloadFindGlobal.mockResolvedValue(mockSlider);
  });

  it('should return slider data', async () => {
    const result = await getSlider();

    expect(result).toEqual(mockSlider);
    expect(mockPayloadFindGlobal).toHaveBeenCalledWith({
      slug: 'slider',
    });
  });

  it('should call findGlobal with correct slug', async () => {
    await getSlider();

    expect(mockPayloadFindGlobal).toHaveBeenCalledWith({
      slug: 'slider',
    });
  });
});
