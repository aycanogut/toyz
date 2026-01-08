import Image from 'next/image';

import Icon from '@/components/Icon';
import { Link } from '@/i18n/routing';

interface SimiliarContentCardProps {
  title: string;
  image: string;
  categoryName: string;
  date: string;
  author: string;
  slug: string;
}

function SimiliarContentCard({ title, image, categoryName, date, author, slug }: SimiliarContentCardProps) {
  const items: { icon: IconLabelProps; value: string }[] = [
    { icon: 'date', value: date },
    { icon: 'category', value: categoryName },
    { icon: 'author', value: author },
  ];

  return (
    <article className="group relative h-full overflow-hidden">
      <Link
        href={`/content/${slug}`}
        className="focus-visible:ring-title-light block h-full focus-visible:ring-2 focus-visible:outline-hidden"
      >
        <div className="relative aspect-4/3 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <header className="bg-background/60 absolute inset-x-0 top-0 p-3">
            <h2 className="font-grotesque text-title-light line-clamp-2 text-lg leading-tight font-semibold uppercase lg:text-xl">{title}</h2>
          </header>

          <footer className="text-title-light bg-background/60 absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-4 p-3">
            {items.map(item => (
              <span
                key={item.icon}
                className="flex items-center gap-1.5"
              >
                <Icon
                  name={item.icon}
                  className="mt-1 size-3.5 md:size-4"
                />
                <span className="font-grotesque font-medium md:text-lg">{item.value}</span>
              </span>
            ))}
          </footer>
        </div>
      </Link>
    </article>
  );
}

export default SimiliarContentCard;
