interface LexicalNode {
  type?: string;
  text?: string;
  children?: LexicalNode[];
}

interface LexicalRoot {
  root?: { children?: LexicalNode[] };
}

const WORDS_PER_MINUTE = 200;

function collectText(node: LexicalNode | undefined, acc: string[]): void {
  if (!node) return;
  if (typeof node.text === 'string') acc.push(node.text);
  if (Array.isArray(node.children)) {
    for (const child of node.children) collectText(child, acc);
  }
}

function readTime(content: LexicalRoot | null | undefined): number {
  const acc: string[] = [];
  collectText(content?.root as LexicalNode | undefined, acc);
  const words = acc.join(' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export default readTime;
