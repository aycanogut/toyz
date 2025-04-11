import { Variants } from 'motion/react';

const variants: Variants = {
  initial: {
    y: '-100%',
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
  exit: {
    y: '-100%',
    opacity: 0,
  },
};

export default variants;
