import { getTranslations } from 'next-intl/server';

import { HeadingItem } from '@/utils/extractHeadings';

import Aside from './Aside';

interface TOCProps {
  headings: HeadingItem[];
}

async function TOC({ headings }: TOCProps) {
  if (headings.length < 2)
    return (
      <div
        className="hidden lg:block"
        aria-hidden="true"
      />
    );

  const t = await getTranslations('Content');
  const label = t('in-this-article');

  return (
    <Aside
      headings={headings}
      label={label}
    />
  );
}

export default TOC;
