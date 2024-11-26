import { ReactNode } from 'react';

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

// TODO: Update og image and production URL
// TODO: Update metadata description and keywords
export async function generateMetadata({
  params,
}: {
  params: {
    locale: Locale;
  };
}): Promise<Metadata> {
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: 'Search.Meta' });

  const title = t('title');
  const description = t('description');
  const applicationName = 'TOYZ';
  const keywords = t('keywords');
  const openGraph = {
    siteName: 'TOYZ',
    url: 'https://toyz-swart.vercel.app/',
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

export default function SearchLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
