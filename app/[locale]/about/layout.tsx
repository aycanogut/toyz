import { ReactNode } from 'react';

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import toyzConfig from '@/toyzConfig';

// TODO: Update og image
// TODO: Update metadata description and keywords
export async function generateMetadata({
  params,
}: {
  params: {
    locale: Locale;
  };
}): Promise<Metadata> {
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: 'About.Meta' });

  const title = t('title');
  const description = t('description');
  const applicationName = toyzConfig.title;
  const keywords = t('keywords');
  const openGraph = {
    siteName: toyzConfig.title,
    url: toyzConfig.baseUrl,
    type: 'website',
  };
  const authors = {
    name: 'Aycan Öğüt',
    url: 'https://aycan.dev',
  };

  return {
    title,
    description,
    applicationName,
    keywords,
    openGraph,
    authors,
  };
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}