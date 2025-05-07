import { getLocale } from 'next-intl/server';

import { getPayload } from 'payload';

// import ContentView from './ContentView';

import Slider from './Slider';
import payloadConfig from '@/payload.config';

async function Home() {
  const locale = await getLocale();

  const payload = await getPayload({ config: payloadConfig });

  const slider = await payload.findGlobal({
    slug: 'slider',
    depth: 2,
  });

  return (
    <>
      <Slider slider={slider} />
      {/* <ContentView content={content} /> */}
    </>
  );
}

export default Home;
