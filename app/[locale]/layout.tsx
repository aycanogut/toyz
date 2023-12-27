import { type PropsWithChildren } from 'react'

import { notFound } from 'next/navigation'

import { MantineProvider } from '@mantine/core'

import { type Metadata } from 'next'

import { GoogleAnalytics, Header, LanguagePicker } from '@/components'
import { metadata } from '@/constants'
import { locales, navigation } from '@/routes'

import '@mantine/core/styles.css'
import '@mantine/core/styles/global.css'
import classes from './index.module.css'

interface MetadataProps {
  params: {
    slug: string
    locale: string
  }
}
export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = params

  const metaDescription =
    locale === 'en' ? metadata.description.en : metadata.description.tr

  return {
    title: metadata.title,
    description: metaDescription,
    openGraph: {
      title: metadata.title,
      description: metaDescription,
    },
  }
}

export default function RootLayout({
  children,
  params: { locale },
}: PropsWithChildren<{ params: { locale: string } }>) {
  const isValidLocale = locales.some((cur) => cur.label === locale)
  if (!isValidLocale) notFound()

  return (
    <html lang={locale}>
      <body className={classes.body}>
        <MantineProvider defaultColorScheme="dark">
          {children}
          <Header items={navigation} />
          <LanguagePicker locales={locales} />
          <GoogleAnalytics />
        </MantineProvider>
      </body>
    </html>
  )
}
