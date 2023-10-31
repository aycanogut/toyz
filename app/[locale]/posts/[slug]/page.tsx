import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { useLocale } from 'next-intl'

import { client } from '@/api/contentful'
import PostDetail from '@/components/PostDetail'

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

  if (!post) return <h1 className="text-3xl text-white">404 dönecek</h1>

  const { content, title, image, author, date } = post?.fields as any

  return (
    <div className="flex h-screen flex-col items-center p-4 md:p-6 lg:p-12">
      <PostDetail
        title={title}
        image={`https:${image?.fields?.file?.url}`}
        alt={image.fields.description}
        author={author}
        date={date}
      >
        {documentToReactComponents(content)}
      </PostDetail>
    </div>
  )
}

export default PostsPage
