import { Anchor, Box, Text, Title } from '@mantine/core'

import Image from 'next/image'
import Link from 'next/link'

import { useLocale } from 'next-intl'

import classes from './index.module.css'

export interface PostProps {
  id: number
  title: string
  category: string
  image: string
  alt: string
}

function Post({ id, title, category, image, alt }: PostProps) {
  const locale = useLocale()

  return (
    <Anchor
      className={classes.anchor}
      component={Link}
      href={`${locale}/posts/${id}`}
    >
      <Box
        className={classes.article}
        component="article"
      >
        <Image
          className={classes.image}
          src={image}
          alt={alt}
          width={300}
          height={300}
        />
        <Box className={classes.header}>
          <Text
            size="xs"
            fw={500}
            tt="lowercase"
          >
            {category}
          </Text>
          <Title
            order={2}
            size="lg"
          >
            {title}
          </Title>
        </Box>
      </Box>
    </Anchor>
  )
}

export default Post
