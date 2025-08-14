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

  const contact = await payload.findGlobal({
    slug: 'contact',
    locale: locale as Locale,
    depth: 1,
  });

  const images = contact.openGraph?.images as Media;

  return {
    title: contact.title,
    description: contact.description,
    applicationName: toyzConfig.title,
    keywords: contact.keywords,
    openGraph: {
      siteName: toyzConfig.title,
      title: contact.title,
      description: contact.description,
      type: 'website',
      images: images ? [images.url ?? ''] : undefined,
      url: `${toyzConfig.baseUrl}/${locale}/contact`,
      locale,
    },
    authors: [
      {
        name: 'Aycan Öğüt',
        url: 'https://aycan.dev',
      },
    ],
    alternates: {
      canonical: `${toyzConfig.baseUrl}/${locale}/contact`,
    },
  };
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
