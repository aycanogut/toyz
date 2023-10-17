import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { useLocale } from 'next-intl'

import { client } from '@/api/contentful'
import Post from '@/components/Post'

const PostsPage = async () => {
	const locale = useLocale()

	const page = await client.getEntries({
		content_type: 'post',
		locale: locale === 'en' ? 'en-US' : 'tr-TR',
	})

	const { content, title, image, author } = page.items[0].fields as any

	return (
		<div className="flex h-screen flex-col items-center p-4 md:p-6 lg:p-12">
			<Post
				title={title}
				image={`https:${image?.fields?.file?.url}`}
				alt={image.fields.description}
				author={author}
			>
				{documentToReactComponents(content)}
			</Post>
		</div>
	)
}

export default PostsPage
