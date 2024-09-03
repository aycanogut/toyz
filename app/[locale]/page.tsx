import { useLocale } from 'next-intl';

import { Slider, Content } from '@/components';
import { getEntriesByType } from '@/contentful/client';
import { Locale } from '@/i18n';

async function getData(locale: Locale, query: string): Promise<SliderImageProps[]> {
  const response = await getEntriesByType('slider', locale, query);

  return response[0].fields.images as SliderImageProps[];
}

async function Home() {
  const locale = useLocale();
  const data = await getData(locale as Locale, '');

  return (
    <>
      <Slider images={data ?? []} />
      <Content />
    </>
  );
}

export default Home;
