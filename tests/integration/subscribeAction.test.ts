import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockVerifyReCaptcha, mockFind, mockCreate, mockUpdate } = vi.hoisted(() => ({
  mockVerifyReCaptcha: vi.fn(),
  mockFind: vi.fn(),
  mockCreate: vi.fn(),
  mockUpdate: vi.fn(),
}));

vi.mock('@/utils/verifyReCaptcha', () => ({
  default: mockVerifyReCaptcha,
}));

vi.mock('@/utils/payloadClient', () => ({
  getPayloadClient: () => Promise.resolve({ find: mockFind, create: mockCreate, update: mockUpdate }),
}));

import { subscribeAction } from '@/app/[locale]/footer/subscribeAction';

const validInput = { email: 'reader@example.com', preferredLocale: 'tr' as const, token: 'token' };

describe('subscribeAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    mockVerifyReCaptcha.mockResolvedValue({ isValid: true, score: 0.9 });
    mockFind.mockResolvedValue({ docs: [] });
  });

  it('creates a new active subscriber', async () => {
    await expect(subscribeAction(validInput)).resolves.toEqual({ success: true, message: 'subscribed' });

    expect(mockFind).toHaveBeenCalledWith({
      collection: 'subscribers',
      where: { email: { equals: 'reader@example.com' } },
      limit: 1,
    });
    expect(mockCreate).toHaveBeenCalledWith({
      collection: 'subscribers',
      data: { email: 'reader@example.com', preferredLocale: 'tr', isActive: true },
    });
  });

  it('rejects an invalid email without calling reCAPTCHA', async () => {
    await expect(subscribeAction({ ...validInput, email: 'nope' })).resolves.toEqual({ success: false, message: 'invalid-email' });

    expect(mockVerifyReCaptcha).not.toHaveBeenCalled();
  });

  it('rejects a failed reCAPTCHA check without touching the database', async () => {
    mockVerifyReCaptcha.mockResolvedValue({ isValid: false, score: 0.1 });

    await expect(subscribeAction(validInput)).resolves.toEqual({ success: false, message: 'error' });

    expect(mockFind).not.toHaveBeenCalled();
  });

  it('reports an already active subscriber', async () => {
    mockFind.mockResolvedValue({ docs: [{ id: 'sub-1', isActive: true }] });

    await expect(subscribeAction(validInput)).resolves.toEqual({ success: false, message: 'already-subscribed' });

    expect(mockCreate).not.toHaveBeenCalled();
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('reactivates an unsubscribed reader with the new locale', async () => {
    mockFind.mockResolvedValue({ docs: [{ id: 'sub-1', isActive: false }] });

    await expect(subscribeAction(validInput)).resolves.toEqual({ success: true, message: 'subscribed' });

    expect(mockUpdate).toHaveBeenCalledWith({
      collection: 'subscribers',
      id: 'sub-1',
      data: { preferredLocale: 'tr', isActive: true },
    });
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('treats a duplicate key race as already subscribed', async () => {
    mockCreate.mockRejectedValue(new Error('E11000 duplicate key error'));

    await expect(subscribeAction(validInput)).resolves.toEqual({ success: false, message: 'already-subscribed' });
  });

  it('returns a generic error for other database failures', async () => {
    mockCreate.mockRejectedValue(new Error('connection lost'));

    await expect(subscribeAction(validInput)).resolves.toEqual({ success: false, message: 'error' });
  });
});
