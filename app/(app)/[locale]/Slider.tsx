'use client';

import Image from 'next/image';

import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import { Media, Slider as SliderType } from 'payload-types';

const OPTIONS: EmblaOptionsType = { containScroll: 'keepSnaps', dragFree: false, loop: true, align: 'start' };

interface SliderProps {
  slider: SliderType;
}

function Slider({ slider }: SliderProps) {
  const [emblaRef] = useEmblaCarousel(OPTIONS, [
    Autoplay({
      delay: 300,
      jump: true,
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnLastSnap: false,
      rootNode: null,
      active: true,
      breakpoints: {},
    }),
  ]);

  return (
    <section className="sticky top-0 z-10 h-screen">
      <div
        className="relative h-screen overflow-hidden"
        ref={emblaRef}
      >
        <div className="flex h-screen touch-pan-y">
          {slider.images.map((image, index) => {
            const media = image as Media;

            return (
              <div
                className="relative h-screen w-full min-w-0 shrink-0 grow-0"
                key={index}
              >
                <Image
                  src={media.url ?? ''}
                  alt={media.alt ?? ''}
                  fill
                  className="absolute top-0 left-0 block h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>
        <div className="bg-background-dark absolute inset-0 opacity-15" />
        <Image
          src={(slider.animation as Media).url ?? ''}
          alt="Animation"
          width={200}
          height={200}
          className="absolute inset-0 m-auto size-[60rem] object-contain drop-shadow-lg"
          unoptimized
        />
      </div>
    </section>
  );
}

export default Slider;
