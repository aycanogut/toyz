'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import Icon from '@/components/Icon';
import { Media, Slider as SliderType } from 'payload-types';

const OPTIONS: EmblaOptionsType = { containScroll: 'keepSnaps', dragFree: false, loop: true, align: 'start' };

interface SliderProps {
  slider: SliderType;
}

function Slider({ slider }: SliderProps) {
  const autoplay = useRef(
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
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [autoplay.current]);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const updatePlayingStatus = () => {
      setIsPlaying(autoplay.current.isPlaying());
    };

    emblaApi.on('autoplay:play', updatePlayingStatus);
    emblaApi.on('autoplay:stop', updatePlayingStatus);

    updatePlayingStatus();

    return () => {
      emblaApi.off('autoplay:play', updatePlayingStatus);
      emblaApi.off('autoplay:stop', updatePlayingStatus);
    };
  }, [emblaApi]);

  if (!slider.images) return null;

  return (
    <section className="sticky top-0 z-10 h-screen">
      <div
        className="relative h-screen overflow-hidden"
        ref={emblaRef}
      >
        <div className="flex h-screen touch-pan-y">
          {slider.images.map((image, index) => {
            const media = image as Media;
            const { photographer } = media;

            if (!media.url) return null;

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

                {isPlaying && photographer && (
                  <div className="bg-background/70 absolute right-4 bottom-4 flex items-center justify-center gap-2 p-2">
                    <Icon
                      name="camera"
                      className="text-title-light size-5"
                    />
                    <span className="font-grotesque text-title-light text-md font-medium">{photographer}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-background-dark absolute inset-0 opacity-15" />

        <Image
          src={(slider.animation as Media).url ?? ''}
          alt=""
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
