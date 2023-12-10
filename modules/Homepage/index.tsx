import { Box, Container } from '@mantine/core'

import ContentGrid from './ContentGrid'
import Landing from './Landing'

import classes from './index.module.css'

function Homepage() {
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

export default Homepage
