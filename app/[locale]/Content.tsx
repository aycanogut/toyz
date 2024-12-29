import { use } from 'react';

import { useLocale } from 'next-intl';

import { Card } from '@/components';
import { getEntriesByType } from '@/contentful/client';

async function getData(locale: Locale, query: string): Promise<ContentProps[]> {
  const response = await getEntriesByType('content', locale, query);

  return response as unknown as ContentProps[];
}

function Content() {
  const locale = useLocale();

  const data = use(getData(locale as Locale, ''));

  return (
    <section className="container flex flex-col gap-14 px-4 py-12 md:py-16 lg:py-20 xl:py-24">
      {data.length > 0 &&
        data.map(item => (
          <Card
            key={item.fields.id}
            title={item.fields.title}
            image={`https:${item.fields.image.fields.file.url}`}
            items={item.fields.details}
            slug={item.fields.slug}
          />
        ))}
    </section>
  );
}

export default Content;
