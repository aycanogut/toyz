'use client';

import { HTMLAttributes } from 'react';

import { motion, useScroll, useSpring } from 'motion/react';

import cn from '@/utils/cn';

function ScrollProgressAnimation({ className }: HTMLAttributes<HTMLSpanElement>) {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.span
      style={{ scaleX }}
      className={cn('bg-acid origin-left', className)}
    />
  );
}

export default ScrollProgressAnimation;
