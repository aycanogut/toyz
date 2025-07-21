import { ReactNode } from 'react';

import { Metadata } from 'next';

import { Media } from '@/payload-types';
import toyzConfig from '@/toyzConfig';
import { getPayloadClient } from '@/utils/payloadClient';

export async function generateMetadata(props: {
  params: Promise<{
    locale: Locale;
  }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  const payload = await getPayloadClient();

  const search = await payload.findGlobal({
    slug: 'searchPage',
    locale: locale as Locale,
    depth: 1,
  });

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
      images: [images.url ?? ''],
      url: `${toyzConfig.baseUrl}/${locale}/search`,
      locale,
    },
    authors: [
      {
        name: 'Aycan Öğüt',
        url: 'https://aycan.dev',
      },
    ],
    alternates: {
      canonical: `${toyzConfig.baseUrl}/${locale}/search`,
    },
  };
}

export default function SearchLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
