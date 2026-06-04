import { Suspense } from 'react';

import { Article, Category, Media } from '@/payload-types';
import readTime from '@/utils/readTime';

import { ArticleCardData } from './AnimatedArticleList';
import FilterableArticles from './FilterableArticles';

interface ContentViewProps {
  articles: Article[];
  categories: Category[];
}

async function ContentView({ articles, categories }: ContentViewProps) {
  const counts = articles.reduce<Record<string, number>>((acc, a) => {
    const cat = a.details.category as Category | string;
    const slug = typeof cat === 'string' ? cat : cat?.slug;
    if (slug) acc[slug] = (acc[slug] ?? 0) + 1;
    return acc;
  }, {});

  const mapped: ArticleCardData[] = articles.map(item => {
    const media = item.images as Media;
    const category = item.details.category as Category;
    const minutes = readTime(item.content as Parameters<typeof readTime>[0]);
    const colorIndex = categories.findIndex(color => color.id === category?.id);

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      image: media?.url ?? '',
      imageAlt: media?.alt ?? item.title,
      date: item.details.date,
      author: item.details.author,
      category: category?.name,
      categorySlug: category?.slug,
      colorIndex,
      readTimeMinutes: minutes,
      slug: item.slug ?? '',
    };
  });

  return (
    <section className="bg-background relative z-20">
      <div className="mx-auto w-full max-w-7xl">
        <Suspense>
          <FilterableArticles
            articles={mapped}
            categories={categories}
            counts={counts}
          />
        </Suspense>
      </div>
    </section>
  );
}

export default ContentView;
