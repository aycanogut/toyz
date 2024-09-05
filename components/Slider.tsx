'use client';

import Image from 'next/image';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';

const OPTIONS: EmblaOptionsType = { containScroll: 'keepSnaps', dragFree: false, loop: true, align: 'start' };

interface Props {
  images: SliderImageProps[];
}

function Slider({ images }: Props) {
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
    <div
      className="h-screen overflow-hidden"
      ref={emblaRef}
    >
      <div
        className="flex h-screen touch-pan-y"
        style={{ backfaceVisibility: 'hidden' }}
      >
        {images.map(item => {
          return (
            <div
              className="relative h-screen w-full min-w-0 flex-shrink-0 flex-grow-0"
              key={item.fields.title}
            >
              <Image
                src={`https:${item.fields.file.url}`}
                alt={item.fields.title}
                fill
                className="absolute left-0 top-0 block h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Slider;
