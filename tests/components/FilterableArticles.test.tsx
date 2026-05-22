import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import FilterableArticles from '@/app/[locale]/components/FilterableArticles';
import type { ArticleCardData } from '@/app/[locale]/components/AnimatedArticleList';
import type { Category } from '@/payload-types';

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: mockGet }),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    values ? `${key}:${JSON.stringify(values)}` : key,
}));

vi.mock('@/app/[locale]/components/AnimatedArticleList', () => ({
  default: ({ articles }: { articles: ArticleCardData[] }) => (
    <ul data-testid="article-list">
      {articles.map(a => (
        <li
          key={a.id}
          data-testid="article-item"
          data-slug={a.categorySlug ?? ''}
        >
          {a.title}
        </li>
      ))}
    </ul>
  ),
}));

vi.mock('@/app/[locale]/components/CategoryFilter', () => ({
  default: ({ totalCount }: { totalCount: number }) => <nav data-testid="category-filter">total:{totalCount}</nav>,
}));

vi.mock('@/app/[locale]/components/SectionStrip', () => ({
  default: ({ label, count }: { label: string; count: string }) => (
    <header data-testid="section-strip">
      <span data-testid="strip-label">{label}</span>
      <span data-testid="strip-count">{count}</span>
    </header>
  ),
}));

function makeArticle(overrides: Partial<ArticleCardData>): ArticleCardData {
  return {
    id: overrides.id ?? '1',
    title: overrides.title ?? 'Untitled',
    image: '/img.webp',
    date: '2026-01-01',
    author: 'Author',
    slug: overrides.slug ?? 'untitled',
    ...overrides,
  };
}

const articles: ArticleCardData[] = [
  makeArticle({ id: '1', title: 'Sinema Article', categorySlug: 'sinema', slug: 'a1' }),
  makeArticle({ id: '2', title: 'Music Article', categorySlug: 'muzik', slug: 'a2' }),
  makeArticle({ id: '3', title: 'Another Sinema', categorySlug: 'sinema', slug: 'a3' }),
];

const categories: Category[] = [
  { id: 'c1', name: 'Sinema', slug: 'sinema', updatedAt: '', createdAt: '' } as Category,
  { id: 'c2', name: 'Muzik', slug: 'muzik', updatedAt: '', createdAt: '' } as Category,
];

const counts = { sinema: 2, muzik: 1 };

describe('FilterableArticles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGet.mockReturnValue(null);
  });

  it('renders all articles when no category filter is active', () => {
    render(
      <FilterableArticles
        articles={articles}
        categories={categories}
        counts={counts}
      />,
    );

    const items = screen.getAllByTestId('article-item');
    expect(items).toHaveLength(3);
  });

  it('filters articles by the active category from the search params', () => {
    mockGet.mockImplementation((key: string) => (key === 'category' ? 'sinema' : null));

    render(
      <FilterableArticles
        articles={articles}
        categories={categories}
        counts={counts}
      />,
    );

    const items = screen.getAllByTestId('article-item');
    expect(items).toHaveLength(2);
    items.forEach(item => {
      expect(item.dataset.slug).toBe('sinema');
    });
  });

  it('shows the empty state when the active category has no matching articles', () => {
    mockGet.mockImplementation((key: string) => (key === 'category' ? 'edebiyat' : null));

    render(
      <FilterableArticles
        articles={articles}
        categories={categories}
        counts={counts}
      />,
    );

    expect(screen.queryByTestId('article-list')).not.toBeInTheDocument();
    expect(screen.getByText('no-articles')).toBeInTheDocument();
  });

  it('passes the filtered and total counts to the section strip', () => {
    mockGet.mockImplementation((key: string) => (key === 'category' ? 'muzik' : null));

    render(
      <FilterableArticles
        articles={articles}
        categories={categories}
        counts={counts}
      />,
    );

    expect(screen.getByTestId('strip-count')).toHaveTextContent('"count":1');
    expect(screen.getByTestId('strip-count')).toHaveTextContent('"total":3');
  });

  it('passes the unfiltered total to the category filter', () => {
    render(
      <FilterableArticles
        articles={articles}
        categories={categories}
        counts={counts}
      />,
    );

    expect(screen.getByTestId('category-filter')).toHaveTextContent('total:3');
  });

  it('renders the empty state when the article list itself is empty', () => {
    render(
      <FilterableArticles
        articles={[]}
        categories={categories}
        counts={{}}
      />,
    );

    expect(screen.queryByTestId('article-list')).not.toBeInTheDocument();
    expect(screen.getByText('no-articles')).toBeInTheDocument();
  });
});
