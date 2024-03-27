import Image from 'next/image';
import Link from 'next/link';

import { Button, ContentLabels } from '@/components';

interface Props {
  title: string;
  image: string;
  items: ContentLabelsProps[];
  slug: string;
}

function Card({ title, image, items, slug }: Props) {
  return (
    <article className="flex h-full flex-col items-center gap-6 md:flex-row md:items-stretch md:gap-10 lg:gap-14">
      <div className="relative h-52 w-full md:h-[20rem] lg:h-[22.5rem]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex w-full flex-col gap-6">
        <header className="w-full">
          <h2 className="text-start font-grotesque text-2xl font-medium text-title-light md:text-3xl lg:text-4xl">{title}</h2>
        </header>
        <ContentLabels items={items} />

        <div className="w-full md:mt-6 md:w-40">
          <Link href={`/content/${slug}`}>
            <Button
              className="w-full"
              appendIcon="arrow-right"
              iconSize={24}
            >
              SHOW MORE
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default Card;
