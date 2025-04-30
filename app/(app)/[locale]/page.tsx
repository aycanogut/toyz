import { getLocale } from 'next-intl/server';

import ContentView from './ContentView';
import Slider from './Slider';

async function Home() {
  const locale = await getLocale();

  return (
    <>
      <Slider />
      {/* <ContentView content={content} /> */}
    </>
  );
}

export default Home;
