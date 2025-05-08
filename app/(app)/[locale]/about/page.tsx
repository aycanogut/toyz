import { getLocale } from 'next-intl/server';

import { PageHeader } from '@/components';
import payloadConfig from '@/payload.config';
import { getPayload } from 'payload';
import { Media } from '@/payload-types';

async function About() {
  const locale = await getLocale();

  const payload = await getPayload({ config: payloadConfig });

  const about = await payload.findGlobal({
    slug: 'about',
    locale: locale as Locale,
  });

  const media = about.image as Media;

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
