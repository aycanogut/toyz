'use client';

import { useCallback, useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import Button from '@/components/Button';

const SCROLL_THRESHOLD = 600;

function ScrollUp() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('Global');

  const handleScroll = useCallback(() => {
    setIsVisible(window.scrollY >= SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key="scroll-up-button"
          initial={{ opacity: 0, y: 32, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed right-4 bottom-4 z-50"
        >
          <Button
            variant="secondary"
            aria-label={t('scroll-up')}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            appendIconProps={{
              name: 'arrow-up',
              className: 'size-5',
            }}
            className="bg-background cursor-pointer shadow-lg shadow-black/30"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default ScrollUp;
