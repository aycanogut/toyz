import { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import type { Metadata } from 'next';

import { Locale } from '@/i18n';
import Layout from '@/layout';
import { grotesque } from '@/theme';

import '@/theme/globals.css';

// TODO: Og image
export async function generateMetadata({
  params,
}: {
  params: {
    locale: Locale;
  };
}): Promise<Metadata> {
  const title = 'TOYZ';
  const description = params.locale === 'en' ? 'TOYZ is a counter-culture themed webzine' : 'TOYZ karşı kültür temalı bir webzindir';
  const applicationName = 'TOYZ';
  const keywords =
    params.locale === 'en'
      ? 'toyz, counter-culture, webzine, graffiti, skateboarding, punk rock, art, cinema, photography '
      : 'toyz, karşı kültür, webzine, graffiti, kaykay, punk rock, sanat, sinema, fotoğrafçılık';
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

async function RootLayout({ children, params: { locale } }: { children: ReactNode; params: { locale: Locale } }) {
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={grotesque.variable}
    >
      <NextIntlClientProvider messages={messages}>
        <Layout>{children}</Layout>
      </NextIntlClientProvider>
    </html>
  );
}

export default RootLayout;
