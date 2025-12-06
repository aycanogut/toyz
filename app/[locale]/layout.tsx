import { ReactNode } from 'react';

import { notFound } from 'next/navigation';

import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from 'sonner';

import type { Metadata } from 'next';

import { routing } from '@/i18n/routing';
import Layout from '@/layout';
import { Media } from '@/payload-types';
import getHome from '@/services/home';
import { grotesque, nabla } from '@/theme/fonts';
import '@/theme/globals.css';
import toyzConfig from '@/toyzConfig';
import cn from '@/utils/cn';

import GoogleAnalytics from './components/GoogleAnalytics';
import ScrollUp from './components/ScrollUp';

export async function generateMetadata(props: {
  params: Promise<{
    locale: Locale;
  }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  const home = await getHome(locale);

  const images = home.openGraph?.images as Media;

  return {
    metadataBase: new URL(toyzConfig.baseUrl),
    title: `${home.title} - ${toyzConfig.title}`,
    description: home.description,
    applicationName: toyzConfig.title,
    keywords: home.keywords,
    openGraph: {
      siteName: toyzConfig.title,
      title: home.title,
      description: home.description,
      type: 'website',
      images: images ? [images.url ?? ''] : undefined,
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
      languages: {
        en: `${toyzConfig.baseUrl}/en`,
        tr: `${toyzConfig.baseUrl}/tr`,
        'x-default': `${toyzConfig.baseUrl}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'og:logo': `${toyzConfig.baseUrl}/brand-logo.webp`,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
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
      <body className="bg-background">
        <NextIntlClientProvider>
          <Layout>{children}</Layout>
          <Toaster theme="dark" />
          <GoogleAnalytics />
          <ScrollUp />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
