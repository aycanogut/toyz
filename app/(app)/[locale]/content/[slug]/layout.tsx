import { ReactNode } from 'react';

import { Metadata } from 'next';

import { Media } from '@/payload-types';
import getArticle from '@/services/article';
import toyzConfig from '@/toyzConfig';

export async function generateMetadata(props: {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;

  const article = await getArticle(slug, locale);

  const media = article.images as Media;

  return {
    title: article.title,
    description: article.description,
    applicationName: toyzConfig.title,
    keywords: article.keywords?.join(', ') ?? '',
    openGraph: {
      siteName: toyzConfig.title,
      title: article.title,
      description: article.description,
      type: 'article',
      images: [media.url ?? ''],
      url: `${toyzConfig.baseUrl}/${locale}/content/${slug}`,
      locale,
      modifiedTime: article.updatedAt,
      authors: [article.details.author],
    },
    authors: [
      {
        name: article.details.author,
      },
    ],
    alternates: {
      canonical: `${toyzConfig.baseUrl}/${locale}/content/${slug}`,
    },
  };
}

export default function ContentLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
