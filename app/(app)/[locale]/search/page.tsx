import { getLocale, getTranslations } from 'next-intl/server';

import { default as SearchComponent } from './Search';

async function Search(props: {
  searchParams?: Promise<{
    query: string;
    category: string;
  }>;
}) {
  return null;
  // const searchParams = await props.searchParams;

  // const t = await getTranslations('Search');

  // const query = searchParams?.query ?? '';
  // const category = searchParams?.category ?? '';

  // const locale = await getLocale();
  // const defaultCategory = locale === 'en' ? 'all' : 'hepsi';

  // const data = await getData(locale as Locale, query);
  // const categories = await getCategories(locale as Locale);

  // /**
  //  *  If the category is the default category, return unfiltered data
  //  *  Otherwise, filter the data by the selected category
  //  */
  // const filteredData = data.filter(item => {
  //   if (!category || category === defaultCategory) return data;

  //   return item.fields.details[1].label.slice(1) === category;
  // });

  // return (
  //   <section className="container flex flex-col gap-12 px-4 py-12">
  //     <SearchComponent categories={categories} />

  //     {filteredData.length > 0 ? (
  //       filteredData.map(item => (
  //         <ContentCard
  //           key={item.fields.id}
  //           title={item.fields.title}
  //           image={`https:${item.fields.image.fields.file.url}`}
  //           items={item.fields.details}
  //           slug={item.fields.slug}
  //         />
  //       ))
  //     ) : (
  //       <p className="font-grotesque text-title-light text-2xl font-semibold lg:mb-24 lg:text-3xl">{t('result')}</p>
  //     )}
  //   </section>
  // );
}

export default Search;
