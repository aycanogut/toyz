import { Container, SimpleGrid } from '@mantine/core'

import { useLocale } from 'next-intl'
import { getTranslator } from 'next-intl/server'

import { client } from '@/api/contentful'

import Select from '@/components/Select'
import Post from '../../../components/Post'

async function ContentGrid() {
  const locale = useLocale()
  const t = await getTranslator(useLocale(), 'Categories')

  // fetch posts
  const posts = await client.getEntries({
    content_type: 'post',
    locale: locale === 'en' ? 'en-US' : 'tr-TR',
  })

  const { items } = posts

  // fetch categories
  const categoriesResponse = await client.getEntries({
    content_type: 'post',
    select: ['fields.category'],
    locale: locale === 'en' ? 'en-US' : 'tr-TR',
  })

  // map categories
  const categories = categoriesResponse.items
    .map((item: any) => item.fields.category)
    .flat()

  // add all categories
  locale === 'en'
    ? categories.unshift('All')
    : categories.unshift('Tüm Kategoriler')

  return (
    <Container
      fluid
      px="md"
      pb={100}
    >
      <Select
        categories={categories}
        label={t('label')}
        placeholder={t('placeholder')}
      />
      <SimpleGrid
        cols={{ base: 1, sm: 2 }}
        spacing={{ base: 10, sm: 'xl' }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}
      >
        {items
          // .filter((item: any) => item.fields.category[0] === activeCategory)
          .map((item: any) => {
            return (
              <Post
                key={item.fields.id}
                id={item.fields.id}
                title={item.fields.title}
                category={`#${item.fields.category[0]}`}
                image={`https:${item.fields.image.fields.file.url}`}
                alt={item.fields.image.fields.file.fileName}
              />
            )
          })}
      </SimpleGrid>
    </Container>
  )
}

export default ContentGrid
