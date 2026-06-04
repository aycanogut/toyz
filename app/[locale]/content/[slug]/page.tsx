import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getTranslations } from 'next-intl/server';

import Breadcrumbs from '@/components/Breadcrumbs';
import CategoryBadge from '@/components/CategoryBadge';
import { routing } from '@/i18n/routing';
import { Category, Media } from '@/payload-types';
import getArticle from '@/services/article';
import getCategories from '@/services/categories';
import getRandomArticles from '@/services/randomArticles';
import getAllArticleSlugs from '@/services/slugs';
import extractHeadings from '@/utils/extractHeadings';
import formatDate from '@/utils/formatDate';
import readTime from '@/utils/readTime';

import AnimatedSimilarGrid from '../../components/AnimatedSimilarGrid';
import SocialMediaShare from '../../components/SocialMediaShare';

import RichText from './RichText';
import ScrollProgressAnimation from './ScrollProgressAnimation';
import TOC from './TOC';

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

export const dynamicParams = false;

async function ContentDetails({ params }: ContentDetailsProps) {
  const { locale, slug } = await params;

  const t = await getTranslations('Content');
  const tMeta = await getTranslations('Meta');

  const [article, categories, randomArticles] = await Promise.all([getArticle(slug, locale), getCategories(locale), getRandomArticles(locale, slug)]);

  if (!article) {
    return notFound();
  }

  const { title, images, details, content } = article;

  const media = images as Media;
  const category = details.category as Category;
  const categoryColorIndex = categories.findIndex(color => color.id === category.id);

  const headings = extractHeadings(content as Parameters<typeof extractHeadings>[0]);
  const minutes = readTime(content as Parameters<typeof readTime>[0]);

  return (
    <div>
      <ScrollProgressAnimation />

      <Breadcrumbs currentPageTitle={title} />

      <section>
        <article>
          <header className="border-title-light border-b-2 px-4 md:px-8 lg:px-10">
            <div className="mx-auto max-w-335">
              <div className="flex flex-col gap-4 py-6">
                <CategoryBadge
                  name={category.name}
                  colorIndex={categoryColorIndex}
                  className="tracking-eyebrow px-3 py-1.5"
                />

                <h1 className="font-heading text-title-light text-4xl leading-[0.88] font-black tracking-tight text-balance uppercase md:text-6xl lg:text-8xl">
                  {title}
                </h1>
              </div>

              <div className="border-rule-faint flex flex-wrap items-end justify-between gap-y-4 border-t py-6">
                <dl className="flex flex-wrap gap-4 lg:gap-6">
                  <div className="flex items-baseline gap-2">
                    <dt className="font-heading tracking-meta text-paper-muted text-base uppercase">{t('label-author')}</dt>
                    <dd className="font-heading text-acid text-base font-bold uppercase">{details.author}</dd>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <dt className="font-heading tracking-meta text-paper-muted text-base uppercase">{t('label-date')}</dt>
                    <dd className="font-heading text-title-light text-base font-bold uppercase">{formatDate(details.date, locale)}</dd>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <dt className="font-heading tracking-meta text-paper-muted text-base uppercase">{t('label-read-time')}</dt>
                    <dd className="font-heading text-title-light text-base font-bold uppercase">{tMeta('read-time', { count: minutes })}</dd>
                  </div>
                </dl>

                <SocialMediaShare
                  title={title}
                  slug={slug}
                  locale={locale}
                  type="content"
                  className="bg-transparent! p-0!"
                />
              </div>
            </div>
          </header>

          <div className="border-title-light relative h-80 border-b-2 md:h-100 lg:h-120">
            <Image
              src={media.url ?? ''}
              alt={title}
              fill
              priority
              className="object-cover"
            />
            <div className="xerox-halftone opacity-20" />
          </div>

          <div className="mx-auto max-w-335 px-4 pt-10 sm:px-6 lg:grid lg:grid-cols-[12rem_1fr_12rem] lg:gap-x-12 lg:px-8 lg:pt-12">
            <TOC headings={headings} />

            <RichText
              data={content}
              className="article-drop-cap prose prose-invert font-fira prose-headings:font-heading prose-headings:uppercase prose-headings:tracking-tight prose-h2:text-2xl prose-h2:font-black prose-h2:text-title-light prose-h2:border-b-2 prose-h2:border-acid prose-h2:pb-2 prose-h2:mt-10 prose-h2:mb-4 prose-h2:before:content-['//\\_'] prose-h2:before:text-acid prose-p:text-base prose-p:leading-tight prose-p:text-title-light prose-strong:text-title-light prose-strong:font-extrabold prose-a:text-acid prose-a:no-underline prose-a:hover:underline prose-blockquote:not-italic prose-blockquote:relative prose-blockquote:bg-acid prose-blockquote:text-background prose-blockquote:font-heading prose-blockquote:font-bold prose-blockquote:text-xl prose-blockquote:leading-snug prose-blockquote:border-y-4 prose-blockquote:border-background prose-blockquote:border-none prose-blockquote:p-6 prose-blockquote:my-4 prose-blockquote:before:absolute prose-blockquote:before:-top-4 prose-blockquote:before:left-6 prose-blockquote:before:text-7xl prose-blockquote:before:leading-none prose-blockquote:before:text-background prose-blockquote:before:font-heading prose-blockquote:before:content-[open-quote] prose-img:border-4 prose-img:border-title-light md:prose-h2:text-4xl md:prose-blockquote:text-2xl md:prose-p:text-lg max-w-none"
            />

            <div
              className="hidden lg:block"
              aria-hidden="true"
            />
          </div>
        </article>
      </section>

      {randomArticles.length > 0 && (
        <section className="mt-12 md:mt-16 lg:mt-20">
          <div className="border-title-light flex items-center gap-4 border-b-2 p-4 sm:px-6 lg:px-8">
            <span className="font-heading text-title-light tracking-meta font-black uppercase md:text-lg">{t('similar-content')}</span>
            <span className="bg-title-light h-px flex-1" />
          </div>

          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
            <AnimatedSimilarGrid
              articles={randomArticles.map(item => {
                const itemMedia = item.images as Media;
                const itemCategory = item.details.category as Category;

                return {
                  id: item.id,
                  title: item.title,
                  image: itemMedia.url ?? '',
                  categoryName: itemCategory.name,
                  colorIndex: categories.findIndex(color => color.id === itemCategory.id),
                  date: formatDate(item.details.date, locale),
                  author: item.details.author,
                  slug: item.slug ?? '',
                };
              })}
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default ContentDetails;
