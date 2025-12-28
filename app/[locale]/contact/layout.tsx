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
    title: `${contact.title} - ${toyzConfig.title}`,
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
    alternates: {
      canonical: `${toyzConfig.baseUrl}/${locale}/contact`,
      languages: {
        en: `${toyzConfig.baseUrl}/en/contact`,
        tr: `${toyzConfig.baseUrl}/tr/contact`,
        'x-default': `${toyzConfig.baseUrl}/en/contact`,
      },
    },
  };
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
