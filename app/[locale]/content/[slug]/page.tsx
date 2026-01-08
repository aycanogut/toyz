import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getTranslations } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { Category, Media } from '@/payload-types';
import getArticle from '@/services/article';
import getArticles from '@/services/articles';
import getAllArticleSlugs from '@/services/slugs';
import formatDate from '@/utils/formatDate';

import BackButton from '../../components/BackButton';
import Breadcrumbs from '../../components/Breadcrumbs';
import ContentLabels from '../../components/ContentLabels';
import SimiliarContentCard from '../../components/SimiliarContentCard';
import SocialMediaShare from '../../components/SocialMediaShare';

import RichText from './RichText';
import ScrollProgressAnimation from './ScrollProgressAnimation';

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

  const t = await getTranslations('Content');

  const article = await getArticle(slug, locale);

  if (!article) {
    return notFound();
  }

  const { title, images, details, content } = article;

  const media = images as Media;
  const category = details.category as Category;

  const articles = await getArticles(locale);

  const otherArticles = articles.docs.filter(item => item.slug !== slug);
  const randomArticles = otherArticles.sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <section className="pb-24 md:pb-28 lg:pb-32">
      <ScrollProgressAnimation />

      <span className="bg-background block h-20 lg:hidden" />

      <Breadcrumbs currentPageTitle={title} />

      <article className="flex flex-col gap-8 md:gap-10 lg:gap-12">
        <div className="relative min-w-full">
          <div className="h-80 md:h-100 lg:h-160">
            <Image
              src={media.url ?? ''}
              alt={title}
              fill
              className="object-cover"
            />

            <header className="absolute inset-0 mx-auto flex size-full max-w-96 flex-col items-center justify-between p-4 md:mx-0 md:max-w-lg md:items-start md:p-5 lg:max-w-4xl lg:p-6">
              <div className="bg-background/80 size-auto p-2 md:p-3 lg:p-4">
                <h1 className="font-grotesque text-title-light max-w-3xl text-center text-2xl font-medium uppercase text-shadow-md md:text-start md:text-4xl lg:text-6xl lg:font-semibold">
                  {title}
                </h1>
              </div>

              <div className="bg-background/80 size-auto p-2 md:p-3 lg:p-4">
                <ContentLabels
                  rootProps={{
                    className: 'flex gap-8',
                  }}
                  iconProps={{
                    className: 'size-4 md:size-5 lg:size-6 mt-1.5',
                  }}
                  labelProps={{
                    className: 'text-base md:text-lg lg:text-2xl text-shadow-md',
                  }}
                  items={{
                    ...details,
                    category: category.name,
                    categorySlug: category.slug,
                  }}
                />
              </div>
            </header>
          </div>

          <div className="absolute right-0 bottom-0 hidden md:block md:p-5 lg:p-6">
            <SocialMediaShare
              title={title}
              slug={slug}
              locale={locale}
              type="content"
            />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-3xl justify-between px-4 lg:px-0">
          <BackButton />

          <div className="md:hidden">
            <SocialMediaShare
              title={title}
              slug={slug}
              locale={locale}
            />
          </div>
        </div>

        <RichText
          data={content}
          className="prose text-title-light md:prose-lg lg:prose-xl prose-strong:font-extrabold prose-p:leading-6 md:prose-p:leading-7 lg:prose-p:leading-8 mx-auto max-w-3xl px-4 lg:px-0"
        />
      </article>

      {randomArticles.length > 0 && (
        <section className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-4 px-4 md:mt-16 md:gap-8 lg:mt-20 lg:gap-10 lg:px-6">
          <header>
            <h2 className="font-grotesque text-title-light text-2xl font-semibold uppercase md:text-3xl lg:text-4xl">{t('similar-content')}</h2>
          </header>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {randomArticles.map(item => {
              const itemMedia = item.images as Media;
              const itemCategory = item.details.category as Category;

              return (
                <SimiliarContentCard
                  key={item.id}
                  title={item.title}
                  image={itemMedia.url ?? ''}
                  categoryName={itemCategory.name}
                  date={formatDate(item.details.date, locale)}
                  author={item.details.author}
                  slug={item.slug ?? ''}
                />
              );
            })}
          </div>
        </section>
      )}
    </section>
  );
}

export default ContentDetails;
