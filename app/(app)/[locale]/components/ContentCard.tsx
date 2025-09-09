import Image from 'next/image';

import { useTranslations } from 'next-intl';

import Badge from '@/components/Badge';
import { Link } from '@/i18n/routing';

import ContentLabels, { ContentLabelItem } from './ContentLabels';

interface ContentCardProps {
  title: string;
  image: string;
  details: ContentLabelItem;
  slug: string;
}

function ContentCard({ title, image, details, slug }: ContentCardProps) {
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
          <h2 className="font-grotesque text-title-light text-start text-2xl font-medium md:text-3xl lg:text-4xl">{title}</h2>
        </header>
        <ContentLabels items={details} />

        <Link
          href={`/content/${slug}`}
          className="focus-visible:ring-title-light w-full focus-visible:ring-2 focus-visible:outline-hidden md:mt-6 md:w-44"
        >
          <Badge
            className="w-full uppercase"
            appendIconProps={{
              name: 'arrow-right',
              className: 'size-6',
            }}
          >
            {t('show-more')}
          </Badge>
        </Link>
      </div>
    </article>
  );
}

export default ContentCard;
