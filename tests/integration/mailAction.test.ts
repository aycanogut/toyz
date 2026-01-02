import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockVerifyReCaptcha, mockSendEmail, mockGetTranslations } = vi.hoisted(() => ({
  mockVerifyReCaptcha: vi.fn(),
  mockSendEmail: vi.fn(),
  mockGetTranslations: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: () => mockGetTranslations,
}));

vi.mock('@/app/[locale]/contact/mailAction/verifyReCaptcha', () => ({
  default: mockVerifyReCaptcha,
}));

vi.mock('@/utils/payloadClient', () => ({
  getPayloadClient: () =>
    Promise.resolve({
      sendEmail: mockSendEmail,
    }),
}));

vi.mock('@/toyzConfig', () => ({
  default: {
    contactEmail: 'test@example.com',
  },
}));

import { mailAction } from '@/app/[locale]/contact/mailAction';

describe('mailAction', () => {
  const validInput = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Test Subject',
    message: 'This is a test message with more than 10 characters',
    token: 'valid-recaptcha-token',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetTranslations.mockImplementation((key: string) => key);
    mockVerifyReCaptcha.mockResolvedValue({ isValid: true, score: 0.9 });
    mockSendEmail.mockResolvedValue({ id: 'email-123' });
  });

  it('should send email successfully with valid data', async () => {
    const result = await mailAction(validInput);

    expect(result.success).toBe(true);
    expect(result.message).toBe('success');
    expect(mockSendEmail).toHaveBeenCalledTimes(1);
  });

  it('should send email with correct content', async () => {
    await mailAction(validInput);

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'test@example.com',
        subject: 'Test Subject',
        replyTo: 'john@example.com',
      })
    );
  });

  it('should return error for name shorter than 2 characters', async () => {
    const result = await mailAction({
      ...validInput,
      name: 'A',
    });

    expect(result.success).toBe(false);
    expect(result.message).toBe('invalid-data');
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it('should return error for invalid email', async () => {
    const result = await mailAction({
      ...validInput,
      email: 'not-an-email',
    });

    expect(result.success).toBe(false);
    expect(result.message).toBe('invalid-data');
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it('should return error for message shorter than 10 characters', async () => {
    const result = await mailAction({
      ...validInput,
      message: 'Short',
    });

    expect(result.success).toBe(false);
    expect(result.message).toBe('invalid-data');
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it('should return error when reCaptcha is invalid', async () => {
    mockVerifyReCaptcha.mockResolvedValue({ isValid: false, score: 0.2 });

    const result = await mailAction(validInput);

    expect(result.success).toBe(false);
    expect(result.message).toBe('error');
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it('should return error when reCaptcha score is low', async () => {
    mockVerifyReCaptcha.mockResolvedValue({ isValid: true, score: 0.3 });

    const result = await mailAction(validInput);

    expect(result.success).toBe(false);
    expect(result.message).toBe('error');
    expect(mockSendEmail).not.toHaveBeenCalled();
  });

  it('should return error when email sending fails', async () => {
    mockSendEmail.mockRejectedValue(new Error('SMTP connection failed'));

    const result = await mailAction(validInput);

    expect(result.success).toBe(false);
    expect(result.message).toBe('SMTP connection failed');
  });

  it('should escape HTML in user input', async () => {
    await mailAction({
      ...validInput,
      name: '<script>alert("xss")</script>',
    });

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        html: expect.stringContaining('&lt;script&gt;'),
      })
    );
  });

  it('should return error for empty token', async () => {
    const result = await mailAction({
      ...validInput,
      token: '',
    });

    expect(result.success).toBe(false);
    expect(result.message).toBe('invalid-data');
  });
});
