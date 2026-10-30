import { describe, expect, it } from 'vitest';

import { ContactSchema } from '@/app/[locale]/contact/contactSchema';
import en from '@/locales/en.json';

const validData = {
  name: 'John Doe',
  email: 'test@example.com',
  subject: 'Test Subject',
  message: 'This is a test message with more than 10 characters',
};

const issueMessages = (data: unknown) => ContactSchema.safeParse(data).error?.issues.map(issue => issue.message) ?? [];

describe('ContactSchema', () => {
  it('accepts valid data', () => {
    expect(ContactSchema.safeParse(validData).success).toBe(true);
  });

  it.each([
    { field: 'name', value: 'J', message: 'validation-name-error' },
    { field: 'name', value: 'a'.repeat(51), message: 'validation-name-max-error' },
    { field: 'email', value: 'not-valid-email', message: 'validation-email-error' },
    { field: 'subject', value: 'Te', message: 'validation-subject-error' },
    { field: 'subject', value: 'a'.repeat(101), message: 'validation-subject-max-error' },
    { field: 'message', value: 'Too short', message: 'validation-message-error' },
    { field: 'message', value: 'a'.repeat(5001), message: 'validation-message-max-error' },
  ])('rejects $field "$value" with $message', ({ field, value, message }) => {
    expect(issueMessages({ ...validData, [field]: value })).toEqual([message]);
  });

  it('accepts values at the max length', () => {
    const atMax = { ...validData, name: 'a'.repeat(50), subject: 'a'.repeat(100), message: 'a'.repeat(5000) };

    expect(ContactSchema.safeParse(atMax).success).toBe(true);
  });

  it('reports one error per field for empty input', () => {
    expect(issueMessages({ name: '', email: '', subject: '', message: '' })).toEqual([
      'validation-name-error',
      'validation-email-error',
      'validation-subject-error',
      'validation-message-error',
    ]);
  });

  it('uses message keys that exist in the translations', () => {
    const keys = issueMessages({ name: '', email: '', subject: '', message: 'a'.repeat(5001) });

    for (const key of keys) {
      expect(en.Contact).toHaveProperty(key);
    }
  });
});
