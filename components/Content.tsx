import { useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Card, Search } from '@/components';
import { getEntriesByType } from '@/contentful/client';
import { Locale } from '@/i18n';

async function getData(locale: Locale, query: string): Promise<ContentProps[]> {
  const response = await getEntriesByType('content', locale, query);

  return response as unknown as ContentProps[];
}

async function Content({
  searchParams,
}: {
  searchParams?: {
    query: string;
  };
}) {
  const locale = useLocale();

  const query = searchParams?.query ?? '';

  const data = await getData(locale as Locale, query);

  const t = await getTranslations({ locale, namespace: 'Search' });

  return (
    <div className="container flex flex-col gap-12 px-4 py-12">
      <Search />

      {data.length > 0 ? (
        data.map(item => (
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
