interface LexicalTextNode {
  type: string;
  text?: string;
  children?: LexicalTextNode[];
}

interface LexicalHeadingNode {
  type: string;
  tag?: string;
  children?: LexicalTextNode[];
}

interface LexicalRoot {
  root?: { children?: LexicalHeadingNode[] };
}

export interface HeadingItem {
  id: string;
  text: string;
}

const TR_MAP: Record<string, string> = {
  ç: 'c',
  Ç: 'c',
  ğ: 'g',
  Ğ: 'g',
  ı: 'i',
  İ: 'i',
  ö: 'o',
  Ö: 'o',
  ş: 's',
  Ş: 's',
  ü: 'u',
  Ü: 'u',
};

export function slugifyHeading(text: string): string {
  const normalized = text.replace(/[çÇğĞıİöÖşŞüÜ]/g, ch => TR_MAP[ch] ?? ch);
  return normalized
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function collectText(node: LexicalTextNode | undefined, acc: string[]): void {
  if (!node) return;
  if (typeof node.text === 'string') acc.push(node.text);
  if (Array.isArray(node.children)) {
    for (const child of node.children) collectText(child, acc);
  }
}

/**
 * Extracts top-level headings of a given tag from Lexical JSON data and produces stable, unique slug ids.
 *
 * @param {LexicalRoot | null | undefined} content - The Lexical JSON structure to parse.
 * @param {'h2' | 'h3'} [tag='h2'] - The heading tag to extract.
 * @returns {HeadingItem[]} An array of `{ id, text }` items in document order. Empty when no matching headings exist.
 */
function extractHeadings(content: LexicalRoot | null | undefined, tag: 'h2' | 'h3' = 'h2'): HeadingItem[] {
  if (!content?.root?.children) return [];

  const items: HeadingItem[] = [];
  const seen = new Set<string>();

  for (const node of content.root.children) {
    if (node.type !== 'heading' || node.tag !== tag) continue;

    const acc: string[] = [];
    if (Array.isArray(node.children)) {
      for (const child of node.children) collectText(child, acc);
    }
    const text = acc.join('').trim();
    if (!text) continue;

    const baseId = slugifyHeading(text);
    if (!baseId) continue;

    let unique = baseId;
    let i = 2;
    while (seen.has(unique)) {
      unique = `${baseId}-${i++}`;
    }
    seen.add(unique);
    items.push({ id: unique, text });
  }

  return items;
}

export default extractHeadings;
