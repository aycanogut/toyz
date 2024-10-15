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
      <span className="block h-20 bg-background-light md:h-24 lg:hidden" />

      <div className="relative h-[7.5rem] lg:h-[11.375rem]">
        <Image
          src={`https:${data.image.fields.file.url}`}
          alt={data.image.fields.title}
          fill
          className="object-cover"
        />

        <header className="container relative hidden h-full lg:block">
          <h1 className="absolute left-4 top-1/4 font-grotesque text-[4rem] font-medium uppercase leading-[5.375rem] text-title-light">{t('title')}</h1>
        </header>
      </div>
      <div className="container flex flex-col gap-6 p-4 pb-14 lg:gap-0 lg:pb-28 lg:pt-8">
        <header>
          <h1 className="font-grotesque text-2xl font-medium uppercase text-title-light lg:hidden">{t('title')}</h1>
        </header>

        <p className="font-grotesque text-xl text-title-light lg:text-[2rem] lg:leading-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptatum magni in facere fuga exercitationem, nisi totam alias, ad et, aspernatur
          maxime nihil reprehenderit nostrum. In neque qui iste illo alias! Laboriosam, voluptas magni? Ab optio pariatur laboriosam, fuga quasi officia et.
          Sunt aliquam nobis voluptatem? Voluptatibus pariatur minima, quod mollitia quae tempora vero perspiciatis ex, eaque perferendis natus nemo. Impedit
          veritatis esse animi iusto tempore ullam quia obcaecati autem, quam, temporibus nesciunt sit provident perspiciatis, culpa voluptatibus neque nulla ut
          inventore quod voluptas! Unde dolorem suscipit, fugiat earum totam, mollitia laboriosam nesciunt, nobis veniam ut cupiditate corporis obcaecati cum.
        </p>
      </div>
    </section>
  );
}

export default About;
