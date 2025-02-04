import { use } from 'react';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import { useLocale, useTranslations } from 'next-intl';

import { PageHeader } from '@/components';
import { getEntriesByType } from '@/contentful/client';

async function getData(locale: Locale, query: string): Promise<AboutProps> {
  const response = await getEntriesByType('about', locale, query);

  return response[0] as unknown as AboutProps;
}

function About() {
  const locale = useLocale();

  const data = use(getData(locale as Locale, ''));

  const t = useTranslations('About');

  return (
    <section>
      <PageHeader
        image={{
          src: `https:${data.fields.image.fields.file.url}`,
          alt: data.fields.image.fields.title,
        }}
        title={t('title')}
      />
      <div className="container flex flex-col gap-6 p-4 pb-14 lg:gap-0 lg:pb-28 lg:pt-8">
        <header>
          <h1 className="font-grotesque text-2xl font-medium uppercase text-title-light lg:hidden">{t('title')}</h1>
        </header>

        <div className="space-y-4 font-grotesque text-xl text-title-light lg:space-y-6 lg:text-3.5 lg:leading-10">
          {documentToReactComponents(data.fields.description as unknown as Document)}
        </div>
      </div>
    </section>
  );
}

export default About;
