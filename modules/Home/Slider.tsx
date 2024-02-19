'use client';

import Image from 'next/image';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';

import images from './sliderImages';

const OPTIONS: EmblaOptionsType = { containScroll: 'keepSnaps', dragFree: false, loop: true, align: 'start' };

function Carousel() {
  const [emblaRef] = useEmblaCarousel(OPTIONS, [
    Autoplay({
      delay: 300,
      jump: true,
      playOnInit: true,
      stopOnFocusIn: true,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnLastSnap: false,
      rootNode: null,
      active: true,
      breakpoints: {},
    }),
  ]);

  return (
    <div>
      <div
        className="overflow-hidden"
        ref={emblaRef}
      >
        <div
          className="flex touch-pan-y"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {images.map(item => {
            return (
              <div
                className="relative h-[34.1875rem] w-full min-w-0 flex-shrink-0 flex-grow-0 md:h-[50.25rem]"
                key={item.id}
              >
                <Image
                  src={item.url}
                  alt="Your alt text"
                  fill
                  className="absolute left-0 top-0 block h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
