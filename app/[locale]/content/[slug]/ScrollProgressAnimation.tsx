'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

function ScrollProgressAnimation() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.span
      style={{ scaleX }}
      className="bg-title-light fixed inset-0 h-1 origin-left"
    />
  );
}

export default ScrollProgressAnimation;
