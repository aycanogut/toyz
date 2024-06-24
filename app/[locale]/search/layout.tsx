import { ReactNode } from 'react';

import { Locale } from '@/i18n';

export async function generateMetadata({
  params,
}: {
  params: {
    locale: Locale;
  };
}) {
  const title = params.locale === 'en' ? 'Search' : 'Arama';
  const description = params.locale === 'en' ? 'Search page' : 'Arama sayfası';

  return {
    title,
    description,
  };
}

export default function SearchLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
