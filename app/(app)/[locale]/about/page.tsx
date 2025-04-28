import { getLocale, getTranslations } from 'next-intl/server';

import { PageHeader } from '@/components';

async function About() {
  const locale = await getLocale();
  const t = await getTranslations('About');

  return null;

  // return (
  //   <section>
  //     <PageHeader
  //       image={{
  //         src: `https:${data.fields.image.fields.file.url}`,
  //         alt: data.fields.image.fields.title,
  //       }}
  //       title={t('title')}
  //     />
  //     <div className="container flex flex-col gap-6 p-4 pb-14 lg:gap-0 lg:pt-8 lg:pb-28">
  //       <header>
  //         <h1 className="font-grotesque text-title-light text-2xl font-medium uppercase lg:hidden">{t('title')}</h1>
  //       </header>

  //       <div className="font-grotesque text-title-light space-y-4 text-xl lg:space-y-6 lg:text-3xl lg:leading-10">
  //         {documentToReactComponents(data.fields.description as unknown as Document)}
  //       </div>
  //     </div>
  //   </section>
  // );
}

export default About;
