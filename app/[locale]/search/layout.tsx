import { ReactNode } from 'react';

import { Locale } from '@/i18n';

// TODO: Update og image and production URL
export async function generateMetadata({
  params,
}: {
  params: {
    locale: Locale;
  };
}) {
  const title = 'TOYZ';
  const description = params.locale === 'en' ? 'TOYZ is a counter-culture themed webzine' : 'TOYZ karşı kültür temalı bir webzindir';
  const applicationName = 'TOYZ';
  const keywords =
    params.locale === 'en'
      ? 'toyz, counter-culture, webzine, graffiti, skateboarding, punk rock, art, cinema, photography '
      : 'toyz, karşı kültür, webzine, graffiti, kaykay, punk rock, sanat, sinema, fotoğrafçılık';
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
