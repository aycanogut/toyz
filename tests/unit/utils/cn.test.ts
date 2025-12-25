import { describe, expect, it } from 'vitest';

import cn from '@/utils/cn';

describe('cn', () => {
  it('should merge multiple class names', () => {
    const result = cn('px-4', 'py-2');

    expect(result).toBe('px-4 py-2');
  });

  it('should resolve Tailwind conflicts (last one wins)', () => {
    const result = cn('px-4', 'px-8');

    expect(result).toBe('px-8');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');

    expect(result).toBe('base-class active-class');
  });

  it('should ignore falsy values', () => {
    const result = cn('base', false, null, undefined, '', 'valid');

    expect(result).toBe('base valid');
  });

  it('should return empty string for no inputs', () => {
    const result = cn();

    expect(result).toBe('');
  });

  it('should handle object syntax', () => {
    const result = cn({ 'text-red-500': true, 'text-blue-500': false });

    expect(result).toBe('text-red-500');
  });

  it('should handle array of classes', () => {
    const result = cn(['px-4', 'py-2']);

    expect(result).toBe('px-4 py-2');
  });
});
