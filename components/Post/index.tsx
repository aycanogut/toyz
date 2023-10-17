import { type ReactNode } from 'react'

import Image from 'next/image'

import { useTranslations } from 'next-intl'

interface PostProps {
	title: string
	image: string
	alt: string
	author: string
	children: ReactNode
}

function Post({ title, image, alt, author, children }: PostProps) {
	const t = useTranslations('Post')

	return (
		<article className="font-golos prose dark:prose-invert lg:prose-xl">
			<header>
				<h1>{title}</h1>
			</header>
			<div>{`${t('author')}: ${author}`}</div>
			<div className="relative h-96 w-full">
				<Image
					className="object-cover"
					src={image}
					alt={alt}
					fill
				/>
			</div>
			<div className="mt-20  leading-6 md:leading-7">{children}</div>
		</article>
	)
}

export default Post
