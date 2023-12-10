import { Box, Container } from '@mantine/core'

import ContentGrid from '@/components/ContentGrid'
import Landing from '@/components/Landing'

import classes from './index.module.css'

export default function Home() {
  return (
    <Container
      fluid
      p="0"
    >
      <Box
        component="main"
        className={classes.main}
      >
        <Landing />
        <ContentGrid />
      </Box>
    </Container>
  )
}
