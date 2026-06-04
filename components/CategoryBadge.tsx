import { HTMLAttributes } from 'react';

import categoryColor from '@/utils/categoryColor';
import cn from '@/utils/cn';

interface CategoryBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  colorIndex: number;
}

function CategoryBadge({ name, colorIndex, className, ...props }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        'font-heading tracking-meta inline-block w-fit px-2.5 py-1 text-base font-black uppercase transition-transform duration-150 hover:scale-105 active:scale-95',
        categoryColor(colorIndex),
        className
      )}
      {...props}
    >
      {name}
    </span>
  );
}

export default CategoryBadge;
