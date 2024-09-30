import { ReactNode } from 'react';

import { Locale } from '@/i18n';

// TODO: Og image
export async function generateMetadata({
  params,
}: {
  params: {
    locale: Locale;
  };
}) {
  const title = params.locale === 'en' ? 'Search' : 'Arama';
  const description = params.locale === 'en' ? 'Search page' : 'Arama sayfası';
  const applicationName = 'TOYZ';
  const keywords =
    params.locale === 'en'
      ? 'search page, toyz, counter-culture, webzine, graffiti, skateboarding, punk rock, art, cinema, photography '
      : 'arama sayfası,  toyz, karşı kültür, webzine, graffiti, kaykay, punk rock, sanat, sinema, fotoğrafçılık';
  const openGraph = { card: 'summary_large_image', site: '@site', creator: '@creator', images: 'https://example.com/og.png' };
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
