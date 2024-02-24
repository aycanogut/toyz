import Image from 'next/image';

import { ArticleDetails, Button } from '@/components';

interface Props {
  title: string;
  image: string;
  items: ArticleDetailsProps[];
}

function Card({ title, image, items }: Props) {
  return (
    <article className="flex flex-col items-center gap-6">
      <div className="relative h-52 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <header className="w-full">
        <h2 className="text-start font-grotesque text-2xl font-medium text-title-light">{title}</h2>
      </header>
      <ArticleDetails items={items} />
      <Button
        className="w-full"
        appendIcon="arrow-right"
        iconSize={24}
      >
        SHOW MORE
      </Button>
    </article>
  );
}

export default Card;
