import { ReactNode } from 'react';

import { notFound } from 'next/navigation';

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

  if (!article) {
    return notFound();
  }

  const media = article.images as Media;

  const ogImage = {
    url: media.url ?? '',
    width: media.width ?? 1200,
    height: media.height ?? 630,
    alt: article.title,
    type: media.mimeType ?? 'image/jpeg',
  };

  return {
    metadataBase: new URL(toyzConfig.baseUrl),
    title: `${article.title} - ${toyzConfig.title}`,
    description: article.description,
    applicationName: toyzConfig.title,
    keywords: article.keywords?.join(', ') ?? '',
    openGraph: {
      siteName: toyzConfig.title,
      title: article.title,
      description: article.description,
      type: 'article',
      images: [ogImage],
      url: `${toyzConfig.baseUrl}/${locale}/content/${slug}`,
      locale,
      modifiedTime: article.updatedAt,
      authors: [article.details.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [ogImage],
    },
    authors: [
      {
        name: article.details.author,
      },
    ],
    alternates: {
      canonical: `${toyzConfig.baseUrl}/${locale}/content/${slug}`,
      languages: {
        en: `${toyzConfig.baseUrl}/en/content/${slug}`,
        tr: `${toyzConfig.baseUrl}/tr/content/${slug}`,
        'x-default': `${toyzConfig.baseUrl}/en/content/${slug}`,
      },
    },
  };
}

export default function ContentLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
