import { type PropsWithChildren } from 'react'

import type { Metadata } from 'next'
import { Golos_Text } from 'next/font/google'
import { notFound } from 'next/navigation'

import { locales } from '@/routes/locales'

import './globals.css'

const golos = Golos_Text({
	subsets: ['latin'],
	variable: '--font-tolos',
	weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
	title: 'TOYZ',
	description: 'A well blend of counter culture and modern art.',
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
			className={golos.variable}
		>
			<body>{children}</body>
		</html>
	)
}