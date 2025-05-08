import { ReactNode } from 'react';

import { notFound } from 'next/navigation';

import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import { routing } from '@/i18n/routing';
import Layout from '@/layout';
import { grotesque, nabla } from '@/theme';
import toyzConfig from '@/toyzConfig';
import { cn } from '@/utils';
import '@/theme/globals.css';

// TODO: Bu alan için payloadcms kullanılarak yeniden kullanılabilir bir yapı oluşturulacak.
// export async function generateMetadata(props: {
//   params: Promise<{
//     locale: Locale;
//   }>;
// }): Promise<Metadata> {
//   const params = await props.params;
//   const { locale } = params;

//   const t = await getTranslations({ locale, namespace: 'About.Meta' });

//   const title = t('title');
//   const description = t('description');
//   const applicationName = toyzConfig.title;
//   const keywords = t('keywords');
//   const openGraph = {
//     siteName: toyzConfig.title,
//     url: toyzConfig.baseUrl,
//     type: 'website',
//   };
//   const authors = {
//     name: 'Aycan Öğüt',
//     url: 'https://aycan.dev',
//   };

//   return {
//     title,
//     description,
//     applicationName,
//     keywords,
//     openGraph,
//     authors,
//   };
// }

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
