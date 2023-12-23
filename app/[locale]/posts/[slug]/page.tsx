import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { type Metadata } from 'next'

import { useLocale } from 'next-intl'

import { client } from '@/api'
import { PostDetail } from '@/modules'

interface MetadataProps {
  params: {
    slug: string
    locale: string
  }
}
export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { slug } = params

  const page = await client.getEntries({
    content_type: 'post',
    locale: params.locale === 'en' ? 'en-US' : 'tr-TR',
  })

  const post = page.items.find((item) => item.fields.id === Number(slug))
  const { metaTitle, metaDescription } = post?.fields as any

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
    },
  }
}

interface PostsPageProps {
  params: {
    slug: string
  }
}

async function PostsPage({ params }: PostsPageProps) {
  const locale = useLocale()
  const { slug } = params

  const page = await client.getEntries({
    content_type: 'post',
    locale: locale === 'en' ? 'en-US' : 'tr-TR',
  })

  const post = page.items.find((item) => item.fields.id === Number(slug))

  if (!post) return null

  const { content, title, image, author, date } = post.fields as any

  return (
    <PostDetail
      title={title}
      image={`https:${image?.fields?.file?.url}`}
      alt={image.fields.description}
      author={author}
      date={date}
    >
      {documentToReactComponents(content)}
    </PostDetail>
  )
}

export default PostsPage
