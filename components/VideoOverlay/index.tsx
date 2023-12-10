import { Box } from '@mantine/core'

import classes from './index.module.css'

interface VideoOverlayProps {
  src: {
    mp4: string
    mov: string
    ogv: string
  }
}

function VideoOverlay({ src }: VideoOverlayProps) {
  return (
    <Box className={classes.wrapper}>
      <Box
        component="video"
        className={classes.video}
        autoPlay
        loop
        muted
        preload="auto"
      >
        <Box
          component="source"
          src={src.mp4}
          type="video/mp4"
        />
        <Box
          component="source"
          src={src.mov}
          type="video/mov"
        />
        <Box
          component="source"
          src={src.ogv}
          type="video/ogv"
        />
      </Box>
    </Box>
  )
}

export default VideoOverlay
