import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { useLocale } from 'next-intl'

import { client } from '@/api/contentful'
import Post from '@/components/Post'

interface PostsPageProps {
  params: {
    slug: string
  }
}

const PostsPage = async ({ params }: PostsPageProps) => {
  const locale = useLocale()
  const { slug } = params

  const page = await client.getEntries({
    content_type: 'post',
    locale: locale === 'en' ? 'en-US' : 'tr-TR',
  })

  const post = page.items.find((item: any) => item.fields.id === Number(slug))

  if (!post) return <h1 className="text-3xl text-white">404 dönecek</h1>

  const { content, title, image, author, date } = post?.fields as any

  return (
    <div className="flex h-screen flex-col items-center p-4 md:p-6 lg:p-12">
      <Post
        title={title}
        image={`https:${image?.fields?.file?.url}`}
        alt={image.fields.description}
        author={author}
        date={date}
      >
        {documentToReactComponents(content)}
      </Post>
    </div>
  )
}

export default PostsPage
