import { ReactNode } from 'react';

import { Metadata } from 'next';

import { Media } from '@/payload-types';
import getAbout from '@/services/about';
import toyzConfig from '@/toyzConfig';

export async function generateMetadata(props: {
  params: Promise<{
    locale: Locale;
  }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  const about = await getAbout(locale);

  const images = about.openGraph?.images as Media;

  return {
    metadataBase: new URL(toyzConfig.baseUrl),
    title: about.title,
    description: about.description,
    applicationName: toyzConfig.title,
    keywords: about.keywords,
    openGraph: {
      siteName: toyzConfig.title,
      title: about.title,
      description: about.description,
      type: 'website',
      images: images ? [images.url ?? ''] : undefined,
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
    other: {
      'og:logo': `${toyzConfig.baseUrl}/brand-logo.webp`,
    },
  };
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
