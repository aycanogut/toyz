import { ReactNode } from 'react';

import { notFound } from 'next/navigation';

import { Metadata } from 'next';

import { Media } from '@/payload-types';
import getEvent from '@/services/event';
import toyzConfig from '@/toyzConfig';

export async function generateMetadata(props: {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;

  const event = await getEvent(slug, locale);

  if (!event) {
    return notFound();
  }

  const media = event.poster as Media;

  const ogImage = {
    url: media.url ?? '',
    width: media.width ?? 1200,
    height: media.height ?? 630,
    alt: event.title,
    type: media.mimeType ?? 'image/jpeg',
  };

  return {
    metadataBase: new URL(toyzConfig.baseUrl),
    title: `${event.title} - ${toyzConfig.title}`,
    applicationName: toyzConfig.title,
    keywords: event.keywords?.join(', ') ?? '',
    openGraph: {
      siteName: toyzConfig.title,
      title: event.title,
      type: 'article',
      images: [ogImage],
      url: `${toyzConfig.baseUrl}/${locale}/events/${slug}`,
      locale,
      modifiedTime: event.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      images: [ogImage],
    },
    alternates: {
      canonical: `${toyzConfig.baseUrl}/${locale}/events/${slug}`,
      languages: {
        en: `${toyzConfig.baseUrl}/en/events/${slug}`,
        tr: `${toyzConfig.baseUrl}/tr/events/${slug}`,
        'x-default': `${toyzConfig.baseUrl}/en/events/${slug}`,
      },
    },
  };
}

export default function EventLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
