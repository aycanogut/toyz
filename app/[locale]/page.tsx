import { getLocale } from 'next-intl/server';

import getArticles from '@/services/articles';
import getCategories from '@/services/categories';
import getSlider from '@/services/slider';
import toyzConfig from '@/toyzConfig';

import ContentView from './components/ContentView';
import Slider from './components/Slider';

async function Home() {
  const locale = await getLocale();

  const [slider, articles, categories] = await Promise.all([getSlider(), getArticles(locale), getCategories(locale)]);

  return (
    <>
      <h1 className="sr-only">{toyzConfig.title}</h1>
      <Slider slider={slider} />
      <ContentView
        articles={articles.docs}
        categories={categories}
      />
    </>
  );
}

export default Home;
