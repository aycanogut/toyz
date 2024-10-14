import { use } from 'react';

import Image from 'next/image';

import { useLocale, useTranslations } from 'next-intl';

import { getEntriesByType } from '@/contentful/client';
import { Locale } from '@/i18n';

async function getData(locale: Locale, query: string): Promise<AboutProps> {
  const response = await getEntriesByType('about', locale, query);

  return response[0].fields as unknown as AboutProps;
}

function About() {
  const locale = useLocale();

  const data = use(getData(locale as Locale, ''));

  const t = useTranslations('About');

  return (
    <section>
      <span className="block h-20 bg-background-light lg:hidden" />

      <div className="relative h-[7.5rem]">
        <Image
          src={`https:${data.image.fields.file.url}`}
          alt={data.image.fields.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="container px-4 pb-16">
        <header className="my-4">
          <h1 className="font-grotesque text-2xl font-medium uppercase text-title-light">{t('title')}</h1>
        </header>

        <p className="mt-2 font-grotesque text-xl text-title-light">{data.description.content[0].content[0].value}</p>
      </div>
    </section>
  );
}

export default About;
