import { getLocale } from 'next-intl/server';

import getArticles from '@/services/articles';
import getCategories from '@/services/categories';
import getSlider from '@/services/slider';
import toyzConfig from '@/toyzConfig';

import ContentView from './components/ContentView';
import Slider from './components/Slider';

interface HomeProps {
  searchParams: Promise<{ category?: string }>;
}

async function Home({ searchParams }: HomeProps) {
  const locale = await getLocale();
  const { category } = await searchParams;

  const [slider, articlesAll, articlesFiltered, categories] = await Promise.all([
    getSlider(),
    getArticles(locale),
    category ? getArticles(locale, category) : null,
    getCategories(locale),
  ]);

  const filtered = articlesFiltered?.docs ?? articlesAll.docs;

  return (
    <>
      <h1 className="sr-only">{toyzConfig.title}</h1>
      <Slider slider={slider} />
      <ContentView
        articles={filtered}
        allArticles={articlesAll.docs}
        categories={categories}
      />
    </>
  );
}

export default Home;
