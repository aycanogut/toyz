'use client';

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

  return (
    <section
      className="relative h-screen overflow-hidden"
      ref={emblaRef}
    >
      <div className="flex h-screen touch-pan-y">
        {images.map(item => (
          <div
            className="relative h-screen w-full min-w-0 shrink-0 grow-0"
            key={item.fields.title}
          >
            <Image
              src={`https:${item.fields.file.url}`}
              alt={item.fields.title}
              fill
              className="absolute top-0 left-0 block h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="bg-background-dark absolute inset-0 opacity-15" />
      <Image
        src="/animation.gif"
        alt="Animation"
        width={200}
        height={200}
        className="absolute inset-0 m-auto size-[60rem] object-contain"
        unoptimized
      />
    </section>
  );
}

export default Slider;
