import { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import type { Metadata } from 'next';

import { Locale } from '@/i18n';
import Layout from '@/layout';
import { grotesque } from '@/theme';

import '@/theme/globals.css';

export async function generateMetadata({
  params,
}: {
  params: {
    locale: Locale;
  };
}) {
  const title = 'TOYZ';
  const description = params.locale === 'en' ? 'TOYZ is a counter-culture themed webzine' : 'TOYZ karşı kültür temalı bir webzindir';

  return {
    title,
    description,
  };
}

export default async function RootLayout({ children, params: { locale } }: { children: ReactNode; params: { locale: Locale } }) {
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
