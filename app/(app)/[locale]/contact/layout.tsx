import { ReactNode } from 'react';

import { Metadata } from 'next';

import { Media } from '@/payload-types';
import getContact from '@/services/contact';
import toyzConfig from '@/toyzConfig';

export async function generateMetadata(props: {
  params: Promise<{
    locale: Locale;
  }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  const contact = await getContact(locale);

  const images = contact.openGraph?.images as Media;

  return {
    metadataBase: new URL(toyzConfig.baseUrl),
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
    other: {
      'og:logo': `${toyzConfig.baseUrl}/brand-logo.webp`,
    },
  };
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
