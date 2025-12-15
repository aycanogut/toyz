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
    title: `${about.title} - ${toyzConfig.title}`,
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
    alternates: {
      canonical: `${toyzConfig.baseUrl}/${locale}/about`,
      languages: {
        en: `${toyzConfig.baseUrl}/en/about`,
        tr: `${toyzConfig.baseUrl}/tr/about`,
        'x-default': `${toyzConfig.baseUrl}/en/about`,
      },
    },
  };
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
