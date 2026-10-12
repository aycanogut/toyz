import { describe, expect, it } from 'vitest';

import categoryColor from '@/utils/categoryColor';

describe('categoryColor', () => {
  it('returns a distinct accent for each of the first six indexes', () => {
    const colors = [0, 1, 2, 3, 4, 5].map(categoryColor);

    expect(new Set(colors).size).toBe(6);
  });

  it('cycles back to the first accent after six', () => {
    expect(categoryColor(6)).toBe(categoryColor(0));
    expect(categoryColor(13)).toBe(categoryColor(1));
  });
});
