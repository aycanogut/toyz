import { useLocale } from 'next-intl';

import { Card } from '@/components';
import { getEntriesByType } from '@/contentful/client';
import { Locale } from '@/i18n';

async function getData(locale: Locale): Promise<ContentProps[]> {
  /**
   * TODO: Burasi locale gore cekilecek
   */
  const response = await getEntriesByType('content', locale);

  return response as unknown as ContentProps[];
}

async function Content() {
  const locale = useLocale();

  const data = await getData(locale as Locale);

  return (
    <div className="container flex flex-col gap-12 px-4 py-12">
      {data.map(item => (
        <Card
          key={item.fields.id}
          title={item.fields.title}
          image={`https:${item.fields.image.fields.file.url}`}
          items={item.fields.details}
          slug={item.fields.slug}
        />
      ))}
    </div>
  );
}

export default Content;
