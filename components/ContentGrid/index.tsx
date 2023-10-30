import { useLocale } from 'next-intl'

import { client } from '@/api/contentful'

import Post from '../Post'

async function ContentGrid() {
  const locale = useLocale()

  const posts = await client.getEntries({
    content_type: 'post',
    locale: locale === 'en' ? 'en-US' : 'tr-TR',
  })

  const { items } = posts

  return (
    <section className="container-fluid mx-auto my-4 h-screen p-4 lg:my-12 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:grid-rows-2 [&>*:last-child]:mb-32">
        {items.map((item: any) => {
          return (
            <Post
              key={item.fields.id}
              id={item.fields.id}
              title={item.fields.title}
              image={`https:${item.fields.image.fields.file.url}`}
              alt={item.fields.image.fields.file.fileName}
            />
          )
        })}
      </div>
    </section>
  )
}

export default ContentGrid
