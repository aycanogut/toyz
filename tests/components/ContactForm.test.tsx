import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ContactForm from '@/app/[locale]/contact/ContactForm';

const { mockGetRecaptchaToken } = vi.hoisted(() => ({
  mockGetRecaptchaToken: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/app/[locale]/hooks/useReCaptcha', () => ({
  default: () => ({
    getRecapthcaToken: mockGetRecaptchaToken,
  }),
}));

vi.mock('@/app/[locale]/contact/mailAction', () => ({
  mailAction: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/components/Icon', () => ({
  default: ({ name }: { name: string }) => <span data-testid={`icon-${name}`}>{name}</span>,
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetRecaptchaToken.mockResolvedValue('mock-token');
  });

  it('should render all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText('name')).toBeInTheDocument();
    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByLabelText('subject')).toBeInTheDocument();
    expect(screen.getByLabelText('message-label')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'send' })).toBeInTheDocument();
  });

  it('should render form title', () => {
    render(<ContactForm />);

    expect(screen.getByRole('heading', { name: 'message' })).toBeInTheDocument();
  });

  it('should show validation errors for empty form submission', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: 'send' }));

    await waitFor(() => {
      expect(screen.getByText('validation-name-error')).toBeInTheDocument();
    });
  });

  it('should show error for name shorter than 2 characters', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText('name'), 'A');
    await user.click(screen.getByRole('button', { name: 'send' }));

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
});
