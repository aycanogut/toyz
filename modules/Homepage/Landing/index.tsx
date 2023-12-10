import { Box } from '@mantine/core'

import Brand from '../../../components/Brand'
import VideoOverlay from '../../../components/VideoOverlay'

import classes from './index.module.css'

const src = {
  mp4: '/assets/video/v.mp4',
  mov: '/assets/video/v.mov',
  ogv: '/assets/video/v.ogv',
}

function Landing() {
  return (
    <Box className={classes.wrapper}>
      <Brand
        src="/assets/logo.png"
        alt="toyz logo"
      />
      <VideoOverlay src={src} />
    </Box>
  )
}

export default Landing
