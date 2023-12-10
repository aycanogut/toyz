'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

import classes from './index.module.css'

function ScrollAnimation() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className={classes.scroll}
    />
  )
}

export default ScrollAnimation
