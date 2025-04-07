import { getTranslations } from 'next-intl/server';

import { Card } from '@/components';
import { getEntriesByType, getEntryCategories } from '@/contentful/client';

import { default as SearchComponent } from './Search';

async function getData(locale: Locale, query: string): Promise<ContentProps[]> {
  const response = await getEntriesByType('content', locale, query);

  return response as unknown as ContentProps[];
}

async function getCategories(locale: Locale): Promise<string[]> {
  const response = await getEntryCategories('content', locale);
  // @ts-expect-error:next-line
  const categories = response.map(item => item.fields.details[1].label.slice(1));

  return Array.from(new Set(categories));
}

async function Search(props: {
  searchParams?: Promise<{
    query: string;
    category: string;
    locale: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const locale = searchParams?.locale ?? '';

  console.log(locale);

  const t = await getTranslations('Search');

  const query = searchParams?.query ?? '';
  const category = searchParams?.category ?? '';

  const defaultCategory = locale === 'en' ? 'all' : 'hepsi';

  const data = await getData(locale as Locale, query);
  const categories = await getCategories(locale as Locale);

  /**
   *  If the category is the default category, return unfiltered data
   *  Otherwise, filter the data by the selected category
   */
  const filteredData = data.filter(item => {
    if (!category || category === defaultCategory) return data;

    return item.fields.details[1].label.slice(1) === category;
  });

  return (
    <section className="container flex flex-col gap-12 px-4 py-12">
      <SearchComponent categories={categories} />

      {filteredData.length > 0 ? (
        filteredData.map(item => (
          <Card
            key={item.fields.id}
            title={item.fields.title}
            image={`https:${item.fields.image.fields.file.url}`}
            items={item.fields.details}
            slug={item.fields.slug}
          />
        ))
      ) : (
        <p className="font-grotesque text-title-light text-2xl font-semibold lg:mb-24 lg:text-3xl">{t('result')}</p>
      )}
    </section>
  );
}

export default Search;
