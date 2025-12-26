import { describe, it, expect } from 'vitest';

import { ContactSchema } from '@/app/[locale]/contact/ContactForm';

describe('ContactSchema', () => {
  it('should validate the contact form', () => {
    const validData = {
      name: 'John Doe',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with more than 10 characters',
    };

    const result = ContactSchema.safeParse(validData);

    expect(result.success).toBe(true);
  });

  it('should reject invalid email format', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'not-valid-email',
      subject: 'Test Subject',
      message: 'This is a test message with more than 10 characters',
    };

    const result = ContactSchema.safeParse(invalidData);

    expect(result.success).toBe(false);

    console.log(result);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe('validation-email-error');
    }
  });

  it('should reject subject shorter than 3 characters', () => {
    const invalidData = {
      name: 'Aycan',
      email: 'test@example.com',
      subject: 'Te',
      message: 'This is a test message',
    };

    const result = ContactSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('validation-subject-error');
    }
  });

  it('should reject empty strings', () => {
    const invalidData = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };

    const result = ContactSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    expect(result.error?.issues.length).toBeGreaterThan(0);
  });
});
