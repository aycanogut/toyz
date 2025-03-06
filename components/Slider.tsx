'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';

import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

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

  const [opacity, setOpacity] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative h-screen overflow-hidden"
      ref={emblaRef}
    >
      <div className="flex h-screen touch-pan-y">
        {images.map(item => (
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
        ))}
      </div>

      <div
        className="absolute inset-0 bg-background-dark transition-opacity duration-[8000ms] ease-in-out"
        style={{ opacity: opacity / 100 }}
      />
      <Image
        src="/animation.gif"
        alt="Animation"
        width={200}
        height={200}
        className="absolute inset-0 size-full object-contain"
      />
    </section>
  );
}

export default Slider;
