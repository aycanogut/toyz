import { getLocale } from 'next-intl/server';

import { Slider } from '@/components';
import { getEntriesByType } from '@/contentful/client';

import ContentView from './ContentView';

interface DataProps {
  slider: SliderImageProps[];
  content: ContentProps[];
}

async function getData(locale: Locale, query: string): Promise<DataProps> {
  const responseSlider = await getEntriesByType('slider', locale, query);
  const responseContent = await getEntriesByType('content', locale, query);

  return {
    slider: responseSlider[0].fields.images as SliderImageProps[],
    content: responseContent as unknown as ContentProps[],
  };
}

async function Home() {
  const locale = await getLocale();

  const { slider } = await getData(locale as Locale, '');
  const { content } = await getData(locale as Locale, '');

  return (
    <>
      <Slider images={slider} />
      <ContentView content={content} />
    </>
  );
}

export default Home;
