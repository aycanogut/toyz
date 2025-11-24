import { getLocale, getTranslations } from 'next-intl/server';

import { Media, Category } from '@/payload-types';
import getCategories from '@/services/categories';
import { getPayloadClient } from '@/utils/payloadClient';

import ContentCard from '../components/ContentCard';

import { default as SearchComponent } from './Search';

interface SearchProps {
  searchParams?: Promise<{ query?: string; category?: string }>;
}

async function Search({ searchParams }: SearchProps) {
  const params = await searchParams;
  const query = params?.query ?? '';
  const categorySlug = params?.category ?? '';

  const locale = await getLocale();
  const t = await getTranslations('Search');

  const payload = await getPayloadClient();

  const categories = await getCategories(locale);

  const articles = await payload.find({
    collection: 'articles',
    where: {
      ...(query && { title: { contains: query } }),
      ...(categorySlug && { 'details.category.slug': { equals: categorySlug } }),
    },
    depth: 1,
    locale: locale as Locale,
  });

  return (
    <section className="container flex flex-col gap-12 px-4 py-12">
      <SearchComponent categories={categories} />

      {articles.docs.length > 0 ? (
        articles.docs.map(item => {
          const media = item.images[0] as Media;
          const itemCategory = item.details.category as Category;

          return (
            <ContentCard
              key={item.id}
              title={item.title}
              image={media.url ?? ''}
              details={{
                date: item.details.date,
                category: itemCategory.name,
                categorySlug: itemCategory.slug,
                author: item.details.author,
              }}
              slug={item.slug ?? ''}
            />
          );
        })
      ) : (
        <p className="font-grotesque text-title-light text-2xl font-semibold lg:mb-24 lg:text-3xl">{t('result')}</p>
      )}
    </section>
  );
}

export default Search;
