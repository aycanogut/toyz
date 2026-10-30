import { describe, expect, it } from 'vitest';

import readTime from '@/utils/readTime';

const content = (...texts: string[]) => ({
  root: { children: [{ type: 'paragraph', children: texts.map(text => ({ type: 'text', text })) }] },
});

describe('readTime', () => {
  it('returns at least one minute for empty or missing content', () => {
    expect(readTime(null)).toBe(1);
    expect(readTime(undefined)).toBe(1);
    expect(readTime({ root: { children: [] } })).toBe(1);
  });

  it('rounds up at 200 words per minute', () => {
    expect(readTime(content('word '.repeat(200)))).toBe(1);
    expect(readTime(content('word '.repeat(201)))).toBe(2);
  });

  it('counts words across nested nodes', () => {
    const nested = {
      root: {
        children: [
          { type: 'heading', children: [{ type: 'text', text: 'word '.repeat(150) }] },
          { type: 'list', children: [{ type: 'listitem', children: [{ type: 'text', text: 'word '.repeat(150) }] }] },
        ],
      },
    };

    expect(readTime(nested)).toBe(2);
  });
});
