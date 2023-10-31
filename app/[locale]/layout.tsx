import { type PropsWithChildren } from 'react'

import { type Metadata } from 'next'
import { Golos_Text } from 'next/font/google'
import { notFound } from 'next/navigation'

import classnames from 'classnames'

import Header from '@/components/Header'
import LanguagePicker from '@/components/LanguagePicker.tsx'
import metadata from '@/constants/metadata'
import { locales } from '@/routes/locales'
import { navigation } from '@/routes/navigation'

import './globals.css'

const golos = Golos_Text({
  subsets: ['latin'],
  variable: '--font-golos',
  weight: ['400', '500', '600', '700', '800'],
})

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
    <html
      lang={locale}
      className={classnames(golos.variable, 'bg-black')}
    >
      <body>
        {children}
        <Header items={navigation} />
        <LanguagePicker locales={locales} />
      </body>
    </html>
  )
}
