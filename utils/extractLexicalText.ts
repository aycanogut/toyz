interface LexicalTextNodeProps {
  text?: string;
  type: string;
}

interface LexicalParagraphNodeProps {
  type: string;
  children?: LexicalTextNodeProps[];
}

interface LexicalRootProps {
  children: LexicalParagraphNodeProps[];
}

export interface LexicalDataProps {
  root: LexicalRootProps;
}

/**
 * Extracts and concatenates text from the first N paragraphs of Lexical JSON data.
 *
 * @param {LexicalDataProps | null | undefined} lexicalData - The Lexical JSON structure to parse.
 * @param {number} [limitParagraphs=2] - The maximum number of paragraphs to extract.
 * @returns {string} The extracted text content, separated by double newlines.
 */
function extractLexicalText(lexicalData: LexicalDataProps | null | undefined, limitParagraphs: number = 2): string {
  if (!lexicalData?.root?.children) {
    return '';
  }

  const result = lexicalData.root.children.reduce((acc: string[], child) => {
    if (acc.length < limitParagraphs && child.type === 'paragraph' && Array.isArray(child.children)) {
      const text = child.children
        .map((node: LexicalTextNodeProps) => node.text || '')
        .join('')
        .trim();

      if (text) {
        acc.push(text);
      }
    }
    return acc;
  }, []);

  return result.join('\n\n');
}

export default extractLexicalText;
