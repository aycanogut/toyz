import { getLocale } from 'next-intl/server';

import { getPayloadClient } from '@/utils/payloadClient';

import ContentView from './components/ContentView';
import Slider from './components/Slider';

async function Home() {
  const locale = await getLocale();

  const payload = await getPayloadClient();

  const slider = await payload.findGlobal({
    slug: 'slider',
  });

  const articles = await payload.find({
    collection: 'articles',
    locale: locale as Locale,
  });

  return (
    <>
      <Slider slider={slider} />
      <ContentView articles={articles.docs} />
    </>
  );
}

export default Home;
