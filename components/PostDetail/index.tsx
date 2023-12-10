import { Box, Container } from '@mantine/core'

import { type ReactNode } from 'react'

import Image from 'next/image'

import { useTranslations } from 'next-intl'

import ScrollAnimation from '@/components/Motion/ScrollAnimation'

import classes from './index.module.css'

interface PostDetailProps {
  title: string
  image: string
  alt: string
  author: string
  date: string
  children: ReactNode
}

function PostDetail({
  title,
  image,
  alt,
  author,
  date,
  children,
}: PostDetailProps) {
  const t = useTranslations('PostDetail')
  const publishDate = new Date(date).toLocaleDateString()

  return (
    <Container size="md">
      <ScrollAnimation />
      <Box
        component="article"
        className={classes.article}
      >
        <Box component="header">
          <h1>{title}</h1>
        </Box>
        <Box className={classes.author}>
          <Box>
            <Box component="span">{t('author')}</Box>&#58;&nbsp;
            <Box component="address">{author}</Box>
          </Box>
          <time dateTime={date}>{publishDate}</time>
        </Box>
        <Box className={classes.image}>
          <Image
            src={image}
            alt={alt}
            fill
          />
        </Box>
        <div className={classes.content}>{children}</div>
      </Box>
    </Container>
  )
}

export default PostDetail
