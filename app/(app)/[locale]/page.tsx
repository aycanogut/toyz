import { getLocale } from 'next-intl/server';

import { getPayload } from 'payload';

import ContentView from './ContentView';
import Slider from './Slider';
import payloadConfig from '@/payload.config';

async function Home() {
  const locale = await getLocale();

  const payload = await getPayload({ config: payloadConfig });

  const slider = await payload.findGlobal({
    slug: 'slider',
    depth: 2,
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
