import { getLocale } from 'next-intl/server';

import getArticles from '@/services/articles';
import getSlider from '@/services/slider';

import ContentView from './components/ContentView';
import Slider from './components/Slider';

async function Home() {
  const locale = await getLocale();

  const slider = await getSlider();
  const articles = await getArticles(locale);

  return (
    <>
      <Slider slider={slider} />
      <ContentView articles={articles.docs} />
    </>
  );
}

export default Home;
