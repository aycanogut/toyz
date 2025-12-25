import { describe, expect, it } from 'vitest';

import formatDate from '@/utils/formatDate';

describe('formatDate', () => {
  it('should format date correctly for Turkish locale', () => {
    const date = '2024-01-15';
    const locale = 'tr' as Locale;

    const result = formatDate(date, locale);

    expect(result).toBe('15.01.2024');
  });

  it('should format date correctly for English locale', () => {
    const date = '2024-01-15';
    const locale = 'en' as Locale;

    const result = formatDate(date, locale);

    expect(result).toBe('01/15/2024');
  });

  it('should handle year end dates', () => {
    const date = '2024-12-31';
    const locale = 'tr' as Locale;

    const result = formatDate(date, locale);

    expect(result).toBe('31.12.2024');
  });

  it('should handle leap year dates', () => {
    const date = '2024-02-29';
    const locale = 'tr' as Locale;

    const result = formatDate(date, locale);

    expect(result).toBe('29.02.2024');
  });

  it('should throw error for invalid date string', () => {
    const invalidDate = 'not-a-date';
    const locale = 'tr' as Locale;

    expect(() => formatDate(invalidDate, locale)).toThrow('Invalid date string');
  });

  it('should throw error for empty string', () => {
    const emptyDate = '';
    const locale = 'tr' as Locale;

    expect(() => formatDate(emptyDate, locale)).toThrow('Invalid date string');
  });
});
