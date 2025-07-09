import { ComponentPropsWithoutRef, HTMLAttributes } from 'react';

import { VariantProps } from 'class-variance-authority';

import cn from '@/utils/cn';

import Icon from '../Icon';

import badgeVariants from './badgeVariants';

type IconProps = ComponentPropsWithoutRef<typeof Icon>;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  appendIconProps?: IconProps;
  loading?: boolean;
}

function Badge({ children, appendIconProps, loading, variant, size, className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? (
        <Icon
          name="loading"
          className="size-4 animate-spin"
        />
      ) : (
        children
      )}

      {appendIconProps && <Icon {...appendIconProps} />}
    </span>
  );
}

export default Badge;
