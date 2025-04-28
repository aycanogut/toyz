import { getLocale } from 'next-intl/server';

import { Slider } from '@/components';

import ContentView from './ContentView';

async function Home() {
  const locale = await getLocale();

  return null;

  // return (
  //   <>
  //     <Slider images={slider} />
  //     <ContentView content={content} />
  //   </>
  // );
}

export default Home;
