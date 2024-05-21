import { useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Card, Search } from '@/components';
import { getEntriesByType, getEntryCategories } from '@/contentful/client';
import { Locale } from '@/i18n';

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

async function Content({
  searchParams,
}: {
  searchParams?: {
    query: string;
    category: string;
  };
}) {
  const locale = useLocale();
  const t = await getTranslations({ locale, namespace: 'Search' });

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
    <div className="container flex flex-col gap-12 px-4 py-12">
      <Search categories={categories} />

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
        <div className="font-grotesque text-2xl font-semibold text-title-light lg:mb-24 lg:text-3xl">{t('result')}</div>
      )}
    </div>
  );
}

export default Content;
