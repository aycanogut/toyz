import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ContactForm from '@/app/[locale]/contact/ContactForm';

const { mockGetRecaptchaToken, mockMailAction, mockToast } = vi.hoisted(() => ({
  mockGetRecaptchaToken: vi.fn(),
  mockMailAction: vi.fn(),
  mockToast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/app/[locale]/hooks/useReCaptcha', () => ({
  default: () => ({
    getReCaptchaToken: mockGetRecaptchaToken,
  }),
}));

vi.mock('@/app/[locale]/contact/mailAction', () => ({
  mailAction: mockMailAction,
}));

vi.mock('sonner', () => ({
  toast: mockToast,
}));

vi.mock('@/components/Icon', () => ({
  default: ({ name }: { name: string }) => <span data-testid={`icon-${name}`}>{name}</span>,
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetRecaptchaToken.mockResolvedValue('mock-token');
    mockMailAction.mockResolvedValue({ success: true });
  });

  it('should render all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText('name')).toBeInTheDocument();
    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByLabelText('subject')).toBeInTheDocument();
    expect(screen.getByLabelText('message-label')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('should render form title', () => {
    render(<ContactForm />);

    expect(screen.getByRole('heading', { name: 'contact-form' })).toBeInTheDocument();
  });

  it('should show validation errors for empty form submission', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText('validation-name-error')).toBeInTheDocument();
    expect(screen.getByText('validation-email-error')).toBeInTheDocument();
    expect(screen.getByText('validation-subject-error')).toBeInTheDocument();
    expect(screen.getByText('validation-message-error')).toBeInTheDocument();
    expect(mockMailAction).not.toHaveBeenCalled();
  });

  it('should show error for name shorter than 2 characters', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText('name'), 'A');
    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText('validation-name-error')).toBeInTheDocument();
    });
  });

  it('should accept user input in all fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText('name'), 'John Doe');
    await user.type(screen.getByLabelText('email'), 'john@example.com');
    await user.type(screen.getByLabelText('subject'), 'Test Subject');
    await user.type(screen.getByLabelText('message-label'), 'This is a test message');

    expect(screen.getByLabelText('name')).toHaveValue('John Doe');
    expect(screen.getByLabelText('email')).toHaveValue('john@example.com');
    expect(screen.getByLabelText('subject')).toHaveValue('Test Subject');
    expect(screen.getByLabelText('message-label')).toHaveValue('This is a test message');
  });

  describe('submission', () => {
    const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
      await user.type(screen.getByLabelText('name'), 'John Doe');
      await user.type(screen.getByLabelText('email'), 'john@example.com');
      await user.type(screen.getByLabelText('subject'), 'Test Subject');
      await user.type(screen.getByLabelText('message-label'), 'This is a test message');
      await user.click(screen.getByRole('button', { name: /send/i }));
    };

    it('sends the form with the reCAPTCHA token, resets it and shows success', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await fillValidForm(user);

      await waitFor(() => expect(mockToast.success).toHaveBeenCalledWith('success'));
      expect(mockMailAction).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
        token: 'mock-token',
      });
      expect(screen.getByLabelText('name')).toHaveValue('');
    });

    it('does not call mailAction when no reCAPTCHA token is available', async () => {
      mockGetRecaptchaToken.mockResolvedValue(undefined);
      const user = userEvent.setup();
      render(<ContactForm />);

      await fillValidForm(user);

      await waitFor(() => expect(mockToast.error).toHaveBeenCalledWith('error'));
      expect(mockMailAction).not.toHaveBeenCalled();
    });

    it('keeps the input and shows an error when the server rejects the message', async () => {
      mockMailAction.mockResolvedValue({ success: false, message: 'error' });
      const user = userEvent.setup();
      render(<ContactForm />);

      await fillValidForm(user);

      await waitFor(() => expect(mockToast.error).toHaveBeenCalledWith('error'));
      expect(screen.getByLabelText('name')).toHaveValue('John Doe');
    });

    it('shows an error when mailAction throws', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      mockMailAction.mockRejectedValue(new Error('network'));
      const user = userEvent.setup();
      render(<ContactForm />);

      await fillValidForm(user);

      await waitFor(() => expect(mockToast.error).toHaveBeenCalledWith('error'));
    });
  });
});
