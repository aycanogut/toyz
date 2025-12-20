import Image from 'next/image';

import { routing } from '@/i18n/routing';
import { Category, Media } from '@/payload-types';
import getArticle from '@/services/article';
import getAllArticleSlugs from '@/services/slugs';

import ContentLabels from '../../components/ContentLabels';

import BackButton from './BackButton';
import RichText from './RichText';
import ScrollProgressAnimation from './ScrollProgressAnimation';
import SocialMediaShare from './SocialMediaShare';

interface ContentDetailsProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

export async function generateStaticParams() {
  const allArticlesPromises = routing.locales.map(async locale => {
    const articles = await getAllArticleSlugs(locale);

    return articles
      .filter(article => article.slug)
      .map(article => ({
        locale,
        slug: article.slug!,
      }));
  });

  const results = await Promise.all(allArticlesPromises);

  return results.flat();
}

export const dynamicParams = true;

async function ContentDetails({ params }: ContentDetailsProps) {
  const { locale, slug } = await params;

  const article = await getArticle(slug, locale);

  const { title, images, details, content } = article;

  const media = images as Media;
  const category = details.category as Category;

  return (
    <section className="lg:pt-2 lg:pb-24">
      <ScrollProgressAnimation />

      <span className="bg-background block h-20 lg:hidden" />
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
          <BackButton />

          <h1 className="font-grotesque text-title-light text-start text-2xl font-medium md:text-3xl lg:text-5xl lg:font-semibold">{title}</h1>
          <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <ContentLabels
              items={{
                ...details,
                category: category.name,
                categorySlug: category.slug,
              }}
            />

            <SocialMediaShare
              title={title}
              slug={slug}
              locale={locale}
            />
          </div>
        </header>

        <div className="container mt-4 space-y-6 px-4 pb-12 md:space-y-10 xl:px-0">
          <div className="relative hidden h-80 w-full md:block lg:h-89.25">
            <Image
              src={media.url ?? ''}
              alt={title}
              fill
              className="object-cover opacity-70 blur-xs"
            />

            <div className="absolute inset-0 m-auto h-77.25 w-126.5">
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
            className="prose text-title-light md:prose-lg lg:prose-xl prose-strong:font-extrabold prose-p:leading-8 max-w-none"
          />
        </div>
      </article>
    </section>
  );
}

export default ContentDetails;
