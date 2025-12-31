'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslations } from 'next-intl';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { Media } from '@/payload-types';

interface GalleryProps {
  images: Media[];
}

const OPTIONS: EmblaOptionsType = {
  containScroll: 'keepSnaps',
  dragFree: false,
  loop: true,
  align: 'start',
};

function Gallery({ images }: GalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  const t = useTranslations('Global');

  useEffect(() => {
    if (emblaApi && isOpen) {
      emblaApi.scrollTo(selectedIndex);
    }
  }, [emblaApi, isOpen, selectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        setIsOpen(false);
      } else if (event.key === 'ArrowLeft' && emblaApi) {
        emblaApi.scrollPrev();
      } else if (event.key === 'ArrowRight' && emblaApi) {
        emblaApi.scrollNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, emblaApi]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  if (images.length === 0) return null;

  return (
    <section>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => {
              setSelectedIndex(index);
              setIsOpen(true);
            }}
            className="group relative aspect-square w-full cursor-pointer overflow-hidden transition-transform hover:scale-105"
          >
            <Image
              src={image.url ?? ''}
              alt={image.alt ?? `Event photo ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsOpen(false)}
        >
          <Button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70"
            aria-label={t('close-gallery')}
          >
            <Icon
              name="close"
              className="size-6"
            />
          </Button>

          {images.length > 1 && (
            <Button
              type="button"
              onClick={e => {
                e.stopPropagation();
                scrollPrev();
              }}
              className="absolute top-1/2 left-4 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70"
              aria-label={t('previous-image')}
            >
              <Icon
                name="arrow-left"
                className="size-6"
              />
            </Button>
          )}

          <div
            className="relative h-full w-full max-w-7xl"
            onClick={e => e.stopPropagation()}
          >
            <div
              className="relative h-full w-full overflow-hidden"
              ref={emblaRef}
            >
              <div className="flex h-full">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative h-full w-full min-w-0 shrink-0 grow-0"
                  >
                    <Image
                      src={image.url ?? ''}
                      alt={image.alt ?? `Event photo ${index + 1}`}
                      fill
                      className="object-contain"
                      priority={index === selectedIndex}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {images.length > 1 && (
            <Button
              type="button"
              onClick={e => {
                e.stopPropagation();
                scrollNext();
              }}
              className="absolute top-1/2 right-4 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70"
              aria-label={t('next-image')}
            >
              <Icon
                name="arrow-right"
                className="size-6"
              />
            </Button>
          )}

          {images.length > 1 && (
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-white">
              <span className="font-grotesque text-sm">
                {currentIndex + 1} / {images.length}
              </span>
            </span>
          )}
        </div>
      )}
    </section>
  );
}

export default Gallery;
