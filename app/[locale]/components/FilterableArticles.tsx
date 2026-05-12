'use client';

import { useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { Category } from '@/payload-types';

import AnimatedArticleList, { ArticleCardData } from './AnimatedArticleList';
import CategoryFilter from './CategoryFilter';
import SectionStrip from './SectionStrip';

interface FilterableArticlesProps {
  articles: ArticleCardData[];
  categories: Category[];
  counts: Record<string, number>;
}

function FilterableArticles({ articles, categories, counts }: FilterableArticlesProps) {
  const t = useTranslations('Home');

  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') ?? undefined;

  const filtered = activeCategory ? articles.filter(a => a.categorySlug === activeCategory) : articles;

  return (
    <>
      <SectionStrip
        label={t('latest-drops')}
        count={t('article-count', { count: filtered.length, total: articles.length })}
      />

      <CategoryFilter
        categories={categories}
        counts={counts}
        totalCount={articles.length}
      />

      {filtered.length > 0 ? (
        <AnimatedArticleList articles={filtered} />
      ) : (
        <div className="font-heading text-paper-muted tracking-meta px-6 py-20 text-center uppercase md:px-8 md:py-24">{t('no-articles')}</div>
      )}
    </>
  );
}

export default FilterableArticles;
