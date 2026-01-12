import { describe, expect, it } from 'vitest';

import extractLexicalText, { type LexicalDataProps } from '@/utils/extractLexicalText';

describe('extractLexicalText', () => {
  it('should return empty string for null data', () => {
    const result = extractLexicalText(null);

    expect(result).toBe('');
  });

  it('should return empty string for undefined data', () => {
    const result = extractLexicalText(undefined);

    expect(result).toBe('');
  });

  it('should return empty string for data without root', () => {
    const result = extractLexicalText({} as LexicalDataProps);

    expect(result).toBe('');
  });

  it('should return empty string for data without children', () => {
    const result = extractLexicalText({ root: {} } as LexicalDataProps);

    expect(result).toBe('');
  });

  it('should extract text from a single paragraph', () => {
    const data: LexicalDataProps = {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Hello world' }],
          },
        ],
      },
    };

    const result = extractLexicalText(data);

    expect(result).toBe('Hello world');
  });

  it('should extract text from two paragraphs by default', () => {
    const data: LexicalDataProps = {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'First paragraph' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Second paragraph' }],
          },
        ],
      },
    };

    const result = extractLexicalText(data);

    expect(result).toBe('First paragraph\n\nSecond paragraph');
  });

  it('should respect limitParagraphs parameter', () => {
    const data: LexicalDataProps = {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'First' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Second' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Third' }],
          },
        ],
      },
    };

    const result = extractLexicalText(data, 1);

    expect(result).toBe('First');
  });

  it('should extract more paragraphs when limitParagraphs is higher', () => {
    const data: LexicalDataProps = {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'First' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Second' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Third' }],
          },
        ],
      },
    };

    const result = extractLexicalText(data, 3);

    expect(result).toBe('First\n\nSecond\n\nThird');
  });

  it('should skip empty paragraphs', () => {
    const data: LexicalDataProps = {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: '' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Actual content' }],
          },
        ],
      },
    };

    const result = extractLexicalText(data);

    expect(result).toBe('Actual content');
  });

  it('should skip whitespace-only paragraphs', () => {
    const data: LexicalDataProps = {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: '   ' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Real content' }],
          },
        ],
      },
    };

    const result = extractLexicalText(data);

    expect(result).toBe('Real content');
  });

  it('should ignore non-paragraph nodes', () => {
    const data: LexicalDataProps = {
      root: {
        children: [
          {
            type: 'heading',
            children: [{ type: 'text', text: 'This is a heading' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'This is a paragraph' }],
          },
        ],
      },
    };

    const result = extractLexicalText(data);

    expect(result).toBe('This is a paragraph');
  });

  it('should concatenate multiple text nodes within a paragraph', () => {
    const data: LexicalDataProps = {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Hello ' },
              { type: 'text', text: 'beautiful ' },
              { type: 'text', text: 'world' },
            ],
          },
        ],
      },
    };

    const result = extractLexicalText(data);

    expect(result).toBe('Hello beautiful world');
  });

  it('should handle paragraphs without children array', () => {
    const data: LexicalDataProps = {
      root: {
        children: [
          {
            type: 'paragraph',
          } as LexicalDataProps['root']['children'][0],
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Valid paragraph' }],
          },
        ],
      },
    };

    const result = extractLexicalText(data);

    expect(result).toBe('Valid paragraph');
  });

  it('should handle text nodes without text property', () => {
    const data: LexicalDataProps = {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ type: 'text' }, { type: 'text', text: 'Some text' }],
          },
        ],
      },
    };

    const result = extractLexicalText(data);

    expect(result).toBe('Some text');
  });
});
