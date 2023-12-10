import { Box } from '@mantine/core'

import Image from 'next/image'

import { BrandAnimation } from '@/components/Motion'

import classes from './index.module.css'

interface BrandProps {
  src: string
  alt: string
}

function Brand({ src, alt }: BrandProps) {
  return (
    <Box className={classes.brand}>
      <BrandAnimation>
        <Image
          src={src}
          alt={alt}
          width={200}
          height={200}
        />
      </BrandAnimation>
    </Box>
  )
}

export default Brand
