import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/toyzConfig', () => ({
  default: { reCaptchaSecretKey: 'test-secret' },
}));

import verifyReCaptcha from '@/utils/verifyReCaptcha';

const mockFetch = vi.fn();

const googleResponds = (body: unknown) => mockFetch.mockResolvedValue({ json: async () => body });

describe('verifyReCaptcha', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch);
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    mockFetch.mockReset();
  });

  it('sends the secret and token to Google', async () => {
    googleResponds({ success: true, score: 0.9 });

    await verifyReCaptcha('token-123');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://www.google.com/recaptcha/api/siteverify',
      expect.objectContaining({ method: 'POST', body: 'secret=test-secret&response=token-123' })
    );
  });

  it.each([
    { score: 0.9, isValid: true },
    { score: 0.5, isValid: true },
    { score: 0.49, isValid: false },
    { score: 0, isValid: false },
  ])('treats score $score as valid: $isValid', async ({ score, isValid }) => {
    googleResponds({ success: true, score });

    await expect(verifyReCaptcha('token')).resolves.toEqual({ isValid, score });
  });

  it('is invalid when Google reports failure, whatever the score', async () => {
    googleResponds({ success: false, score: 0.9 });

    await expect(verifyReCaptcha('token')).resolves.toEqual({ isValid: false, score: 0.9 });
  });

  it('is invalid when the score is missing', async () => {
    googleResponds({ success: true });

    await expect(verifyReCaptcha('token')).resolves.toEqual({ isValid: false, score: 0 });
  });

  it('is invalid when the request fails', async () => {
    mockFetch.mockRejectedValue(new Error('network down'));

    await expect(verifyReCaptcha('token')).resolves.toEqual({ isValid: false, score: 0 });
  });
});
