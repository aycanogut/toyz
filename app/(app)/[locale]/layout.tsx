import { ReactNode } from 'react';

import { notFound } from 'next/navigation';

import { NextIntlClientProvider } from 'next-intl';

import type { Metadata } from 'next';

import { routing } from '@/i18n/routing';
import Layout from '@/layout';
import { Media } from '@/payload-types';
import { grotesque, nabla } from '@/theme/fonts';
import '@/theme/globals.css';
import toyzConfig from '@/toyzConfig';
import cn from '@/utils/cn';
import { getPayloadClient } from '@/utils/payloadClient';

export async function generateMetadata(props: {
  params: Promise<{
    locale: Locale;
  }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  const payload = await getPayloadClient();

  const home = await payload.findGlobal({
    slug: 'home',
    locale: locale as Locale,
    depth: 1,
  });

  const images = home.openGraph?.images as Media;

  return {
    title: home.title,
    description: home.description,
    applicationName: toyzConfig.title,
    keywords: home.keywords,
    openGraph: {
      siteName: toyzConfig.title,
      title: home.title,
      description: home.description,
      type: 'website',
      images: [images.url ?? ''],
      url: `${toyzConfig.baseUrl}/${locale}`,
      locale,
    },
    authors: [
      {
        name: 'Aycan Öğüt',
        url: 'https://aycan.dev',
      },
    ],
    alternates: {
      canonical: `${toyzConfig.baseUrl}/${locale}`,
    },
  };
}

async function RootLayout(props: { children: ReactNode; params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={cn(grotesque.variable, nabla.variable)}
    >
      <NextIntlClientProvider>
        <Layout>{children}</Layout>
      </NextIntlClientProvider>
    </html>
  );
}

export default RootLayout;
