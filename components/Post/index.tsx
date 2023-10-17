import { type ReactNode } from 'react'

import Image from 'next/image'

import { useTranslations } from 'next-intl'

interface PostProps {
	title: string
	image: string
	alt: string
	author: string
	date: string
	children: ReactNode
}

function Post({ title, image, alt, author, date, children }: PostProps) {
	const t = useTranslations('Post')
	const publishDate = new Date(date).toLocaleDateString()

	return (
		<article className="prose font-golos dark:prose-invert lg:prose-xl">
			<header>
				<h1>{title}</h1>
			</header>
			<div className="flex w-full justify-between">
				<div className="flex">
					<span>{t('author')}</span>&#58;&nbsp;
					<address rel="author">{author}</address>
				</div>
				<time dateTime={date}>{publishDate}</time>
			</div>
			<div className="relative h-96 w-full">
				<Image
					className="object-cover"
					src={image}
					alt={alt}
					fill
				/>
			</div>
			<div className="mt-20 leading-6 md:leading-7">{children}</div>
		</article>
	)
}

export default Post
