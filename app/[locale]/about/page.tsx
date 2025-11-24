import { getLocale } from 'next-intl/server';

import PageHeader from '@/components/PageHeader';
import { Media } from '@/payload-types';
import getAbout from '@/services/about';

async function About() {
  const locale = await getLocale();

  const about = await getAbout(locale);

  const media = about.image as Media;

  if (!media) return null;

  return (
    <section>
      <PageHeader
        image={{
          src: media.url ?? '',
          alt: media.alt ?? '',
        }}
        title={about.title}
      />

      <div className="container flex flex-col gap-6 p-4 pb-14 lg:gap-0 lg:pt-8 lg:pb-28">
        <header>
          <h1 className="font-grotesque text-title-light text-2xl font-medium uppercase lg:hidden">{about.title}</h1>
        </header>

        <div className="font-grotesque text-title-light space-y-4 text-xl lg:space-y-6 lg:text-3xl lg:leading-10">{about.description}</div>
      </div>
    </section>
  );
}

export default About;
