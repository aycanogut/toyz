import { describe, expect, it } from 'vitest';

import extractHeadings, { slugifyHeading } from '@/utils/extractHeadings';

describe('slugifyHeading', () => {
  it('should lowercase and replace spaces with hyphens', () => {
    expect(slugifyHeading('Hello World')).toBe('hello-world');
  });

  it('should transliterate Turkish characters', () => {
    expect(slugifyHeading('Şehir Güzelliği')).toBe('sehir-guzelligi');
    expect(slugifyHeading('İstanbul Çarşısı')).toBe('istanbul-carsisi');
    expect(slugifyHeading('Kültür ve Öğrenme')).toBe('kultur-ve-ogrenme');
  });

  it('should strip special characters', () => {
    expect(slugifyHeading('// Intro & Beyond!')).toBe('intro-beyond');
  });

  it('should collapse multiple hyphens', () => {
    expect(slugifyHeading('A — B')).toBe('a-b');
  });

  it('should return empty string for empty input', () => {
    expect(slugifyHeading('')).toBe('');
  });
});

describe('extractHeadings', () => {
  it('should return empty array for null content', () => {
    expect(extractHeadings(null)).toEqual([]);
  });

  it('should return empty array for undefined content', () => {
    expect(extractHeadings(undefined)).toEqual([]);
  });

  it('should return empty array when no headings match the tag', () => {
    const content = {
      root: {
        children: [
          { type: 'paragraph', children: [{ type: 'text', text: 'Some text' }] },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: 'Sub section' }] },
        ],
      },
    };

    expect(extractHeadings(content, 'h2')).toEqual([]);
  });

  it('should extract h2 headings with slugified ids', () => {
    const content = {
      root: {
        children: [
          { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Intro' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Body text' }] },
          { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Sonuç' }] },
        ],
      },
    };

    expect(extractHeadings(content)).toEqual([
      { id: 'intro', text: 'Intro' },
      { id: 'sonuc', text: 'Sonuç' },
    ]);
  });

  it('should extract h3 headings when tag is h3', () => {
    const content = {
      root: {
        children: [
          { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Section' }] },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: 'Sub section' }] },
        ],
      },
    };

    expect(extractHeadings(content, 'h3')).toEqual([{ id: 'sub-section', text: 'Sub section' }]);
  });

  it('should handle headings with multiple inline text nodes', () => {
    const content = {
      root: {
        children: [
          {
            type: 'heading',
            tag: 'h2',
            children: [
              { type: 'text', text: 'Bold ' },
              { type: 'text', text: 'and normal' },
            ],
          },
        ],
      },
    };

    expect(extractHeadings(content)).toEqual([{ id: 'bold-and-normal', text: 'Bold and normal' }]);
  });

  it('should skip headings with empty text', () => {
    const content = {
      root: {
        children: [
          { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '' }] },
          { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Real heading' }] },
        ],
      },
    };

    expect(extractHeadings(content)).toEqual([{ id: 'real-heading', text: 'Real heading' }]);
  });

  it('should transliterate Turkish characters in heading ids', () => {
    const content = {
      root: {
        children: [{ type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Müzik ve Şiir' }] }],
      },
    };

    expect(extractHeadings(content)).toEqual([{ id: 'muzik-ve-siir', text: 'Müzik ve Şiir' }]);
  });
});
