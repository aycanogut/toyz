import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { Badge, ContentLabels } from '@/components';
import { Link } from '@/i18n';

interface Props {
  title: string;
  image: string;
  items: ContentLabelsProps[];
  slug: string;
}

function Card({ title, image, items, slug }: Props) {
  const t = useTranslations('Content');

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

        <Link
          href={`/content/${slug}`}
          className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-title-light md:mt-6 md:w-44"
        >
          <Badge
            className="w-full uppercase"
            appendIcon="arrow-right"
            iconSize={24}
          >
            {t('show-more')}
          </Badge>
        </Link>
      </div>
    </article>
  );
}

export default Card;
