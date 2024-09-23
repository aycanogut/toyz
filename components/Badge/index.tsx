import { HTMLAttributes } from 'react';

import { VariantProps } from 'class-variance-authority';

import { Icon } from '@/components';
import { cn } from '@/utils';

import badgeVariants from './badgeVariants';

export interface Props extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  appendIcon?: IconLabelProps;
  iconSize?: number;
  loading?: boolean;
}

function Badge({ children, appendIcon, iconSize = 16, loading, variant, size, className, ...props }: Props) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? (
        <Icon
          name="loading"
          size={iconSize}
          className="animate-spin"
        />
      ) : (
        children
      )}

      {appendIcon && (
        <Icon
          name={appendIcon}
          size={iconSize}
        />
      )}
    </span>
  );
}

export default Badge;
