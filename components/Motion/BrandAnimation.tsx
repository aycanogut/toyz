'use client'

import { type ReactNode } from 'react'

import { motion } from 'framer-motion'

interface BrandAnimationProps {
  children: ReactNode
}

function BrandAnimation({ children }: BrandAnimationProps) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.25, 1],
      }}
      transition={{
        duration: 5,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
    >
      {children}
    </motion.div>
  )
}

export default BrandAnimation
