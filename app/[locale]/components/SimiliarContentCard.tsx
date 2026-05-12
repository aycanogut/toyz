import Image from 'next/image';

import { Link } from '@/i18n/routing';

import CategoryBadge from '../../../components/CategoryBadge';

interface SimiliarContentCardProps {
  title: string;
  image: string;
  categoryName: string;
  categoryId: string | number;
  date: string;
  author: string;
  slug: string;
}

function SimiliarContentCard({ title, image, categoryName, categoryId, date, author, slug }: SimiliarContentCardProps) {
  return (
    <article>
      <Link
        href={`/content/${slug}`}
        className="focus-visible:ring-title-light group block focus-visible:ring-2 focus-visible:outline-hidden"
      >
        <div className="relative mb-3 aspect-5/3 w-full">
          <div className="border-title-light absolute inset-0 overflow-hidden border-4">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="xerox-halftone" />

          <div className="absolute top-2 left-2 z-10">
            <CategoryBadge
              name={categoryName}
              categoryId={categoryId}
              className="px-2 py-0.5"
            />
          </div>
        </div>

        <h5 className="font-heading text-title-light group-hover:text-acid after:bg-acid relative mb-2 text-lg leading-tight font-black uppercase transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-[width] after:duration-300 group-hover:after:w-full md:text-xl">
          {title}
        </h5>

        <p className="font-heading tracking-label text-paper-muted text-base uppercase">
          {author} · {date}
        </p>
      </Link>
    </article>
  );
}

export default SimiliarContentCard;
