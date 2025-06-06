import Image from 'next/image';

import { getTranslations } from 'next-intl/server';
import { getPayload } from 'payload';

import { ContentLabels, Icon } from '@/components';
import { Link } from '@/i18n/routing';
import { Category, Media } from '@/payload-types';
import payloadConfig from '@/payload.config';

import RichText from './RichText';
import ScrollProgressAnimation from './ScrollProgressAnimation';
import SocialMediaShare from './SocialMediaShare';

interface ContentDetailsProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

async function ContentDetails({ params }: ContentDetailsProps) {
  const { locale, slug } = await params;

  const t = await getTranslations('Content');

  const payload = await getPayload({ config: payloadConfig });

  const article = await payload.find({
    collection: 'articles',
    locale: locale as Locale,
    where: { slug: { equals: slug } },
  });

  const { title, images, details, content } = article.docs[0];

  const media = images[0] as Media;
  const category = details.category as Category;

  return (
    <section className="lg:pt-2 lg:pb-24">
      <ScrollProgressAnimation />

      <span className="bg-background-light block h-20 lg:hidden" />
      <article>
        <div className="relative container h-56 w-full md:hidden">
          <Image
            src={media.url ?? ''}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        <header className="container space-y-6 px-4 pt-8 md:pb-8 lg:space-y-10 xl:px-0">
          <Link
            href="/"
            className="focus-visible:ring-title-light inline-flex items-center gap-2 p-2 focus-visible:ring-2 focus-visible:outline-hidden"
          >
            <Icon
              name="arrow-left"
              size={24}
              className="text-title-light"
            />
            <span className="font-grotesque text-title-light mb-1 bg-transparent text-xl font-bold capitalize lg:text-2xl">{t('back')}</span>
          </Link>

          <h1 className="font-grotesque text-title-light text-start text-2xl font-medium md:text-3xl lg:text-5xl lg:font-semibold">{title}</h1>
          <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <ContentLabels
              items={{
                ...details,
                category: category.name,
              }}
            />

            <SocialMediaShare
              title={title}
              slug={slug}
              locale={locale}
            />
          </div>
        </header>

        <div className="container space-y-6 px-4 pb-12 md:space-y-10 xl:px-0">
          <div className="relative hidden h-80 w-full md:block lg:h-[22.3125rem]">
            <Image
              src={media.url ?? ''}
              alt={title}
              fill
              className="object-cover opacity-70 blur-xs"
            />

            <div className="absolute inset-0 m-auto h-[19.3125rem] w-[31.625rem]">
              <Image
                src={media.url ?? ''}
                alt={title}
                fill
                className="object-contain"
              />
            </div>
          </div>

          <RichText
            data={content}
            className="prose text-title-light md:prose-lg lg:prose-xl w-full max-w-none"
          />
        </div>
      </article>
    </section>
  );
}

export default ContentDetails;
