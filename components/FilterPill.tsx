import { ButtonHTMLAttributes } from 'react';

import cn from '@/utils/cn';

interface FilterPillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  count?: number;
  label: string;
}

function FilterPill({ active = false, count, label, className, ...props }: FilterPillProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        'font-heading tracking-meta cursor-pointer border-2 px-3.5 py-1.5 text-sm uppercase transition-colors',
        active ? 'bg-acid text-background border-acid font-black' : 'border-paper-faint text-title-light hover:border-title-light font-bold',
        className
      )}
    >
      {label}
      {count != null && <span className={cn('ml-1.5 opacity-60', active && 'opacity-80')}>({count})</span>}
    </button>
  );
}

export default FilterPill;
