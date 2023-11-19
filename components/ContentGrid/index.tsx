import { useLocale } from 'next-intl'

import { client } from '@/api/contentful'

import Post from '../Post'

async function ContentGrid() {
  const locale = useLocale()

  const posts = await client.getEntries({
    content_type: 'post',
    locale: locale === 'en' ? 'en-US' : 'tr-TR',
  })

  const categoriesResponse = await client.getEntries({
    content_type: 'post',
    select: ['fields.category'],
  })
  const categories = categoriesResponse.items.map(
    (item: any) => item.fields.category
  )

  const { items } = posts

  return (
    <section className="container-fluid mx-auto my-4 h-screen p-4 lg:my-12 lg:p-10">
      <div className="flex flex-col">
        <label htmlFor="categories">categories</label>
        <select
          name="categories"
          id="categories"
        >
          {/* 
          burada iceriklerin sahip oldugu butun kategoriler select icerisinde render oluyor 
          aktif olan kategoriyi bir state icerisinde tutup ona gore icerikleri render edebiliriz.
          */}
          {categories.flat().map((category: any) => {
            return (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            )
          })}
        </select>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:grid-rows-2 [&>*:last-child]:mb-32">
        {/* 
        aktif olan kategori all ise butun icerikler render olacak.
        diger turlu sadece o an secili olan kategoriye ait icerikler render olacak.
        */}
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
