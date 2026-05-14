'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslations } from 'next-intl';

import Icon from '@/components/Icon';
import { EventMedia } from '@/payload-types';
import cn from '@/utils/cn';

interface GalleryProps {
  images: EventMedia[];
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
}

const CAROUSEL_OPTIONS: EmblaOptionsType = {
  containScroll: 'keepSnaps',
  dragFree: false,
  loop: true,
  align: 'center',
};

function Gallery({ images, eventTitle, eventDate, eventLocation }: GalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(CAROUSEL_OPTIONS);

  const t = useTranslations('Events');

  const sortedImages = [...images].sort((a, b) => (a.filename ?? '').localeCompare(b.filename ?? '', undefined, { numeric: true }));

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (emblaApi && isOpen) {
      emblaApi.scrollTo(selectedIndex, true);
    }
  }, [emblaApi, isOpen, selectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowLeft') emblaApi?.scrollPrev();
      else if (e.key === 'ArrowRight') emblaApi?.scrollNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, emblaApi]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (sortedImages.length === 0) return null;

  const currentImage = sortedImages[currentIndex];

  return (
    <>
      {/* Gallery grid */}
      <div className="grid grid-cols-1 gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3">
        {sortedImages.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => openModal(index)}
            className="group border-title-light relative aspect-3/2 w-full cursor-pointer overflow-hidden border-4 p-0 transition-transform hover:scale-102"
          >
            <Image
              src={image.url ?? ''}
              alt={image.alt ?? `Photo ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="xerox-halftone" />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="bg-background/95 fixed inset-0 z-50 flex flex-col"
          onClick={closeModal}
        >
          {/* Top bar */}
          <div
            className="border-rule-faint flex h-12 shrink-0 items-stretch border-b"
            onClick={e => e.stopPropagation()}
          >
            {/* Label */}
            <div className="border-rule-faint hidden items-center border-r px-5 md:flex">
              <span className="font-heading tracking-meta text-acid text-base font-black whitespace-nowrap uppercase">{t('photo-archive')}</span>
            </div>

            {/* Event info */}
            <div className="flex min-w-0 flex-1 items-center px-4">
              <span className="font-heading tracking-label text-title-dark truncate text-base uppercase">
                {eventTitle}
                <span className="text-paper-muted mx-2">·</span>
                {eventDate}
                <span className="text-paper-muted mx-2">·</span>
                {eventLocation}
              </span>
            </div>

            {/* Counter + close */}
            <div className="border-rule-faint flex shrink-0 items-stretch border-l">
              {sortedImages.length > 1 && (
                <div className="border-rule-faint flex items-center border-r px-4">
                  <span className="font-heading text-base font-bold tabular-nums">
                    <span className="text-acid">{String(currentIndex + 1).padStart(2, '0')}</span>
                    <span className="text-paper-muted mx-1">/</span>
                    <span className="text-title-light">{String(sortedImages.length).padStart(2, '0')}</span>
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={closeModal}
                className="bg-acid hover:bg-title-light text-background flex cursor-pointer items-center justify-center px-4 transition-colors"
                aria-label={t('close-modal')}
              >
                <Icon
                  name="close"
                  className="size-5"
                />
              </button>
            </div>
          </div>

          {/* Photo area */}
          <div
            className="relative min-h-0 flex-1 overflow-hidden"
            ref={emblaRef}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex h-full items-center">
              {sortedImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative flex h-full w-full min-w-0 shrink-0 grow-0 items-center justify-center px-6 py-6"
                >
                  {/* Layered border: acid furthest (most offset), blood middle, white image frame on top */}
                  <div className="relative">
                    <div
                      aria-hidden="true"
                      className="border-acid absolute inset-0 translate-x-3 translate-y-3 border-8"
                    />
                    <div
                      aria-hidden="true"
                      className="border-blood absolute inset-0 translate-x-1.5 translate-y-1.5 border-8"
                    />
                    <div className="border-title-light relative border-8">
                      <Image
                        src={image.url ?? ''}
                        alt={image.alt ?? `Photo ${index + 1}`}
                        width={image.width ?? 1920}
                        height={image.height ?? 1080}
                        className="max-h-gallery-sm md:max-h-gallery-md lg:max-h-gallery-lg block w-auto object-contain"
                        priority={index === selectedIndex}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="border-title-light/20 flex h-14 shrink-0 items-stretch border-t"
            onClick={e => e.stopPropagation()}
          >
            {/* Prev button */}
            {sortedImages.length > 1 && (
              <div className="border-rule-faint relative flex shrink-0 items-stretch border-r">
                <div
                  aria-hidden="true"
                  className="border-acid pointer-events-none absolute inset-0 translate-x-1 translate-y-1 border-4"
                />
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollPrev()}
                  className="border-title-light text-title-light hover:border-acid hover:text-acid bg-background relative cursor-pointer border-r-0 px-4 transition-colors"
                  aria-label={t('previous-photo')}
                >
                  <Icon
                    name="arrow-left"
                    className="size-5"
                  />
                </button>
              </div>
            )}

            {/* Credits — LEFT, flex-1 pushes right group to edge */}
            <div className="flex min-w-0 flex-1 items-center gap-2 px-4 md:px-5">
              <Icon
                name="camera"
                className="text-paper-muted size-4 shrink-0"
              />
              <span className="font-heading tracking-label text-paper-muted text-base whitespace-nowrap uppercase">{t('photo-credit')}</span>
              {currentImage?.credits && <span className="font-heading text-title-light truncate text-base font-bold uppercase">· {currentImage.credits}</span>}
            </div>

            {/* Thumbnails + keyboard hint — RIGHT */}
            <div className="border-title-light/20 hidden shrink-0 items-stretch border-l xl:flex">
              {sortedImages.length > 1 && (
                <div className="flex items-center gap-1.5 overflow-x-auto px-4">
                  {sortedImages.map((image, index) => (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => emblaApi?.scrollTo(index)}
                      className={cn(
                        'relative size-10 shrink-0 cursor-pointer overflow-hidden border-2 transition-colors',
                        index === currentIndex ? 'border-acid border-4' : 'border-rule-faint hover:border-title-dark border-2'
                      )}
                      aria-label={`Photo ${index + 1}`}
                    >
                      <Image
                        src={image.url ?? ''}
                        alt={image.alt ?? `Photo ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="border-title-light/20 hidden items-center border-l px-4 md:flex md:px-5">
                <span className="font-heading tracking-label text-acid text-base uppercase">{t('keyboard-hint')}</span>
              </div>
            </div>

            {/* Next button */}
            {sortedImages.length > 1 && (
              <div className="border-rule-faint relative flex shrink-0 items-stretch border-l">
                <div
                  aria-hidden="true"
                  className="border-acid pointer-events-none absolute inset-0 translate-x-1 translate-y-1 border-4"
                />
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollNext()}
                  className="border-title-light text-title-light hover:border-acid hover:text-acid bg-background relative cursor-pointer px-4 transition-colors"
                  aria-label={t('next-photo')}
                >
                  <Icon
                    name="arrow-right"
                    className="size-5"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Gallery;
