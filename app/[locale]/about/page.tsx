import Image from 'next/image';

import { getLocale } from 'next-intl/server';

import { Media } from '@/payload-types';
import getAbout from '@/services/about';

import Breadcrumbs from '../components/Breadcrumbs';

async function About() {
  const locale = await getLocale();

  const about = await getAbout(locale);

  const media = about.image as Media;

  if (!media) return null;

  return (
    <section>
      <span className="bg-background block h-20 md:h-24 lg:hidden" />

      <Breadcrumbs />

      <div className="relative h-30 lg:h-45.5">
        <Image
          src={media.url ?? ''}
          alt={media.alt ?? ''}
          fill
          className="object-cover"
        />
      </div>

      <div className="container flex flex-col gap-2 p-4 pt-4 pb-14 lg:gap-8 lg:pt-10 lg:pb-28">
        <header>
          <h1 className="font-grotesque text-title-light text-2xl font-medium uppercase lg:text-6xl">{about.title}</h1>
        </header>

        <div className="font-grotesque text-title-light space-y-4 text-xl lg:space-y-6 lg:text-3xl">{about.description}</div>
      </div>
    </section>
  );
}

export default About;
