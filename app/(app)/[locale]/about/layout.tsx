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

  const about = await payload.findGlobal({
    slug: 'about',
    locale: locale as Locale,
    depth: 1,
  });

  const images = about.openGraph?.images as Media;

  return {
    title: about.title,
    description: about.description,
    applicationName: toyzConfig.title,
    keywords: about.keywords,
    openGraph: {
      siteName: toyzConfig.title,
      title: about.title,
      description: about.description,
      type: 'website',
      images: [images.url ?? ''],
      url: `${toyzConfig.baseUrl}/${locale}/about`,
      locale,
    },
    authors: [
      {
        name: 'Aycan Öğüt',
        url: 'https://aycan.dev',
      },
    ],
    alternates: {
      canonical: `${toyzConfig.baseUrl}/${locale}/about`,
    },
  };
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
