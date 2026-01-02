'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslations } from 'next-intl';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { EventMedia } from '@/payload-types';

interface GalleryProps {
  images: EventMedia[];
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
          <Button
            key={image.id}
            type="button"
            onClick={() => {
              setSelectedIndex(index);
              setIsOpen(true);
            }}
            className="group relative aspect-square w-full cursor-pointer overflow-hidden transition-transform hover:scale-102"
          >
            <Image
              src={image.url ?? ''}
              alt={image.alt ?? `Event photo ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          </Button>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 md:p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="size-full max-w-7xl"
            onClick={e => e.stopPropagation()}
          >
            <div
              className="relative size-full overflow-hidden"
              ref={emblaRef}
            >
              <div className="flex h-full items-center">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative flex h-full w-full min-w-0 shrink-0 grow-0 items-center justify-center"
                  >
                    <div className="relative inline-block max-h-full max-w-full">
                      <Image
                        src={image.url ?? ''}
                        alt={image.alt ?? `Event photo ${index + 1}`}
                        width={image.width ?? 1920}
                        height={image.height ?? 1080}
                        className="max-h-[80vh] w-auto object-contain md:max-h-[85vh] lg:max-h-[90vh]"
                        priority={index === selectedIndex}
                      />

                      {index === currentIndex && (
                        <>
                          <Button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="bg-background/70 hover:bg-background-light/70 text-title-light absolute top-1 right-1 z-10 cursor-pointer p-1 transition-colors md:top-4 md:right-4 md:p-2"
                            aria-label={t('close-gallery')}
                          >
                            <Icon
                              name="close"
                              className="size-4 md:size-6"
                            />
                          </Button>

                          {images.length > 1 && (
                            <Button
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                scrollPrev();
                              }}
                              className="bg-background/70 hover:bg-background-light/70 text-title-light absolute top-1/2 left-1 z-10 -translate-y-1/2 cursor-pointer p-1 transition-colors md:left-4 md:p-2"
                              aria-label={t('previous-image')}
                            >
                              <Icon
                                name="arrow-left"
                                className="size-4 md:size-6"
                              />
                            </Button>
                          )}

                          {images.length > 1 && (
                            <Button
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                scrollNext();
                              }}
                              className="bg-background/70 hover:bg-background-light/70 text-title-light absolute top-1/2 right-1 z-10 -translate-y-1/2 cursor-pointer p-1 transition-colors md:right-4 md:p-2"
                              aria-label={t('next-image')}
                            >
                              <Icon
                                name="arrow-right"
                                className="size-4 md:size-6"
                              />
                            </Button>
                          )}

                          {images.length > 1 && (
                            <span className="bg-background/70 text-title-light font-grotesque absolute bottom-1 left-1/2 z-10 -translate-x-1/2 p-1 text-xs md:bottom-4 md:p-2 md:text-base">
                              {currentIndex + 1} / {images.length}
                            </span>
                          )}

                          {image.credits && (
                            <div className="bg-background/70 absolute right-2 bottom-2 z-10 flex items-center justify-center gap-1 p-1 md:right-4 md:bottom-4 md:gap-2 md:p-2">
                              <Icon
                                name="camera"
                                className="text-title-light mt-1 size-3 md:mt-0.5 md:size-5"
                              />
                              <span className="font-grotesque text-title-light text-xs font-medium md:text-base">{image.credits}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
