import { ReactNode } from 'react';

import { Metadata } from 'next';

import { Media } from '@/payload-types';
import toyzConfig from '@/toyzConfig';
import { getPayloadClient } from '@/utils/payloadClient';

export async function generateMetadata(props: {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;

  const payload = await getPayloadClient();

  const article = await payload.find({
    collection: 'articles',
    locale: locale as Locale,
    where: { slug: { equals: slug } },
  });

  const media = article.docs[0].images[0] as Media;

  return {
    title: article.docs[0].title,
    description: article.docs[0].description,
    applicationName: toyzConfig.title,
    keywords: article.docs[0].keywords?.join(', ') ?? '',
    openGraph: {
      siteName: toyzConfig.title,
      title: article.docs[0].title,
      description: article.docs[0].description,
      type: 'article',
      images: [media.url ?? ''],
      url: `${toyzConfig.baseUrl}/${locale}/content/${slug}`,
      locale,
      modifiedTime: article.docs[0].updatedAt,
      authors: [article.docs[0].details.author],
    },
    authors: [
      {
        name: article.docs[0].details.author,
      },
    ],
    robots: 'index, follow',
    alternates: {
      canonical: `${toyzConfig.baseUrl}/${locale}/content/${slug}`,
    },
  };
}

export default function ContentLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
