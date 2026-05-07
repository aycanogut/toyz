'use client';

import { useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import FilterPill from '@/components/FilterPill';
import { Category } from '@/payload-types';

interface CategoryFilterProps {
  categories: Category[];
  counts: Record<string, number>;
  totalCount: number;
}

function CategoryFilter({ categories, counts, totalCount }: CategoryFilterProps) {
  const t = useTranslations('Home');
  const searchParams = useSearchParams();
  const active = searchParams.get('category') ?? undefined;

  const buildHref = (slug?: string): string => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  };

  return (
    <div className="bg-background border-title-light top-23.5 z-40 flex flex-wrap items-center gap-2 border-b-2 px-6 py-4 md:px-8 lg:sticky">
      <span className="font-heading text-paper-muted tracking-eyebrow mr-2 font-black uppercase">{t('filter-prefix')}</span>

      <FilterPill
        href={buildHref()}
        label={t('filter-all')}
        active={!active}
        count={totalCount}
      />

      {categories.map(cat => (
        <FilterPill
          key={cat.id}
          href={buildHref(cat.slug)}
          label={cat.name}
          active={active === cat.slug}
          count={counts[cat.slug] ?? 0}
        />
      ))}
    </div>
  );
}

export default CategoryFilter;
