import Image from 'next/image'
import Link from 'next/link'

import { useLocale } from 'next-intl'

export interface PostProps {
  id: number
  title: string
  image: string
  alt: string
}

function Post({ id, title, image, alt }: PostProps) {
  const locale = useLocale()

  return (
    <Link href={`${locale}/posts/${id}`}>
      <article className="flex w-full flex-col gap-3 lg:gap-5">
        <Image
          className="h-full w-auto"
          src={image}
          alt={alt}
          width={1200}
          height={1200}
          sizes="100vw"
        />
        <h2 className="text-xl font-semibold uppercase text-white lg:text-2xl">
          {title}
        </h2>
      </article>
    </Link>
  )
}

export default Post
