import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockGetPayload } = vi.hoisted(() => ({
  mockGetPayload: vi.fn(),
}));

vi.mock('payload', () => ({
  getPayload: mockGetPayload,
}));

vi.mock('@/payload.config', () => ({
  default: {},
}));

const loadClient = async () => (await import('@/utils/payloadClient')).getPayloadClient;

describe('getPayloadClient', () => {
  beforeEach(() => {
    vi.resetModules();
    mockGetPayload.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    delete (globalThis as { payload?: unknown }).payload;
  });

  it('initializes Payload once and reuses the client', async () => {
    const client = { id: 'payload' };
    mockGetPayload.mockResolvedValue(client);
    const getPayloadClient = await loadClient();

    const [first, second] = await Promise.all([getPayloadClient(), getPayloadClient()]);
    const third = await getPayloadClient();

    expect(first).toBe(client);
    expect(second).toBe(client);
    expect(third).toBe(client);
    expect(mockGetPayload).toHaveBeenCalledTimes(1);
  });

  it('retries initialization after a failed connection', async () => {
    const client = { id: 'payload' };
    mockGetPayload.mockRejectedValueOnce(new Error('connection refused')).mockResolvedValueOnce(client);
    const getPayloadClient = await loadClient();

    await expect(getPayloadClient()).rejects.toThrow('connection refused');
    await expect(getPayloadClient()).resolves.toBe(client);
    expect(mockGetPayload).toHaveBeenCalledTimes(2);
  });
});
