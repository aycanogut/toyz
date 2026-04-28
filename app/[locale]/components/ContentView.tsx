import { Suspense } from 'react';

import { getTranslations } from 'next-intl/server';

import { Article, Category, Media } from '@/payload-types';
import readTime from '@/utils/readTime';

import CategoryFilter from './CategoryFilter';
import ContentCard from './ContentCard';
import SectionStrip from './SectionStrip';

interface ContentViewProps {
  articles: Article[];
  allArticles: Article[];
  categories: Category[];
}

async function ContentView({ articles, allArticles, categories }: ContentViewProps) {
  const t = await getTranslations('Home');

  const counts = allArticles.reduce<Record<string, number>>((acc, a) => {
    const cat = a.details.category as Category | string;
    const slug = typeof cat === 'string' ? cat : cat?.slug;
    if (slug) acc[slug] = (acc[slug] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section className="bg-background relative z-20">
      <div className="mx-auto w-full max-w-7xl">
        <SectionStrip
          label={t('latest-drops')}
          count={t('article-count', { count: articles.length, total: allArticles.length })}
        />

        <Suspense>
          <CategoryFilter
            categories={categories}
            counts={counts}
            totalCount={allArticles.length}
          />
        </Suspense>

        {articles.length > 0 ? (
          <div className="px-6 py-6 md:px-8 md:py-10">
            {articles.map((item, idx) => {
              const media = item.images as Media;
              const category = item.details.category as Category;
              const minutes = readTime(item.content as Parameters<typeof readTime>[0]);

              return (
                <ContentCard
                  key={item.id}
                  index={idx}
                  title={item.title}
                  description={item.description}
                  image={media?.url ?? ''}
                  imageAlt={media?.alt ?? item.title}
                  date={item.details.date}
                  author={item.details.author}
                  category={category?.name}
                  categorySlug={category?.slug}
                  readTimeMinutes={minutes}
                  slug={item.slug ?? ''}
                />
              );
            })}
          </div>
        ) : (
          <div className="font-heading text-paper-muted tracking-meta px-6 py-20 text-center uppercase md:px-8 md:py-24">{t('no-articles')}</div>
        )}
      </div>
    </section>
  );
}

export default ContentView;
