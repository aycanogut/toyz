import { getLocale } from 'next-intl/server';

import Breadcrumbs from '@/components/Breadcrumbs';
import getAbout from '@/services/about';

async function About() {
  const locale = await getLocale();

  const about = await getAbout(locale);

  return (
    <section>
      <Breadcrumbs />

      <article className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-[20rem_1fr] lg:pt-14 lg:pb-76 xl:px-0">
        <header>
          <h1 className="font-heading text-title-light text-6xl leading-none font-black tracking-tight uppercase md:text-6xl lg:text-8xl">{about.title}</h1>
        </header>

        <p className="border-acid font-fira text-title-light border-l-4 pl-5 text-lg leading-normal font-medium lg:text-2xl">{about.description}</p>
      </article>
    </section>
  );
}

export default About;
