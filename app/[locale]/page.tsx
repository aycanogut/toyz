import { use } from 'react';

import { useLocale } from 'next-intl';

import { Slider } from '@/components';
import { getEntriesByType } from '@/contentful/client';

import Content from './Content';

async function getData(locale: Locale, query: string): Promise<SliderImageProps[]> {
  const response = await getEntriesByType('slider', locale, query);

  return response[0].fields.images as SliderImageProps[];
}

function Home() {
  const locale = useLocale();
  const data = use(getData(locale as Locale, ''));

  return (
    <>
      <Slider images={data} />
      <Content />
    </>
  );
}

export default Home;
