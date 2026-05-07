import { RefObject, useEffect } from 'react';

interface UseOverlayBehaviorOptions {
  isOpen: boolean;
  onClose: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
  reset: () => void;
}

function useOverlayBehavior({ isOpen, onClose, inputRef, reset }: UseOverlayBehaviorOptions) {
  useEffect(() => {
    if (!isOpen) {
      reset();
      document.body.style.overflow = 'unset';
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    setTimeout(() => inputRef.current?.focus(), 150);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, inputRef, reset]);
}

export default useOverlayBehavior;
