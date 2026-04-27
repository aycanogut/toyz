import { ComponentPropsWithoutRef } from 'react';

import { Link } from '@/i18n/routing';
import cn from '@/utils/cn';

interface FilterPillProps extends Omit<ComponentPropsWithoutRef<typeof Link>, 'href'> {
  href: string;
  active?: boolean;
  count?: number;
  label: string;
}

function FilterPill({ active = false, count, label, className, href, scroll = false, ...props }: FilterPillProps) {
  return (
    <Link
      href={href as Parameters<typeof Link>[0]['href']}
      scroll={scroll}
      {...props}
      className={cn(
        'font-heading border-2 px-3.5 py-1.5 text-xs tracking-meta uppercase transition-colors',
        active ? 'bg-acid text-background border-acid font-black' : 'border-paper-faint text-title-light hover:border-title-light font-bold',
        className
      )}
    >
      {label}
      {count != null && (
        <span className={cn('ml-1.5 text-xs opacity-60', active && 'opacity-80')}>
          ({count})
        </span>
      )}
    </Link>
  );
}

export default FilterPill;
