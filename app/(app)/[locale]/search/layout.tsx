import { ReactNode } from 'react';

import { Metadata } from 'next';

import { Media } from '@/payload-types';
import getSearch from '@/services/search';
import toyzConfig from '@/toyzConfig';

export async function generateMetadata(props: {
  params: Promise<{
    locale: Locale;
  }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  const search = await getSearch(locale);

  const images = search.openGraph?.images as Media;

  return {
    title: search.title,
    description: search.description,
    applicationName: toyzConfig.title,
    keywords: search.keywords,
    openGraph: {
      siteName: toyzConfig.title,
      title: search.title,
      description: search.description,
      type: 'website',
      images: images ? [images.url ?? ''] : undefined,
      url: `${toyzConfig.baseUrl}/${locale}/search`,
      locale,
    },
    alternates: {
      canonical: `${toyzConfig.baseUrl}/${locale}/search`,
    },
  };
}

export default function SearchLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
