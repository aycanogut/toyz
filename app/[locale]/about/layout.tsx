import { ReactNode } from 'react';

import { getTranslations } from 'next-intl/server';

// TODO: Update og image and production URL
// TODO: Update metadata description and keywords
export async function generateMetadata({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'About.Meta' });

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

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
