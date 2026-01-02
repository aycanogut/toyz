import { ReactNode } from 'react';

import { Metadata } from 'next';

import { Media } from '@/payload-types';
import getEventGlobal from '@/services/event-global';
import toyzConfig from '@/toyzConfig';

export async function generateMetadata(props: {
  params: Promise<{
    locale: Locale;
  }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  const events = await getEventGlobal(locale);

  const images = events.openGraph?.images as Media;

  return {
    title: `${events.title} - ${toyzConfig.title}`,
    applicationName: toyzConfig.title,
    keywords: events.keywords,
    openGraph: {
      siteName: toyzConfig.title,
      title: events.title,
      type: 'website',
      images: images ? [images.url ?? ''] : undefined,
      url: `${toyzConfig.baseUrl}/${locale}/events`,
      locale,
    },
    alternates: {
      canonical: `${toyzConfig.baseUrl}/${locale}/events`,
      languages: {
        en: `${toyzConfig.baseUrl}/en/events`,
        tr: `${toyzConfig.baseUrl}/tr/events`,
        'x-default': `${toyzConfig.baseUrl}/en/events`,
      },
    },
  };
}

export default function EventsLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
