import { HTMLAttributes } from 'react';

import cn from '@/utils/cn';

interface CategoryBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  categoryId: string | number;
}

const ACCENTS = [
  'bg-acid text-background',
  'bg-blood text-title-light',
  'bg-amber text-title-darker',
  'bg-title-light text-background',
  'bg-social-reddit text-title-light',
  'bg-social-mastodon text-title-light',
] as const;

function getAccent(id: string | number): string {
  const sum = String(id)
    .split('')
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return ACCENTS[sum % ACCENTS.length];
}

function CategoryBadge({ name, categoryId, className, ...props }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        'font-heading tracking-meta inline-block w-fit px-2.5 py-1 text-base font-black uppercase transition-transform duration-150 hover:scale-105 active:scale-95',
        getAccent(categoryId),
        className
      )}
      {...props}
    >
      {name}
    </span>
  );
}

export default CategoryBadge;
