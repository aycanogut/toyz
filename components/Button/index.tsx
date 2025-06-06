import { ButtonHTMLAttributes, PropsWithChildren, Ref, forwardRef } from 'react';

import { VariantProps } from 'class-variance-authority';

import cn from '@/utils/cn';

import Icon from '../Icon';

import buttonVariants from './buttonVariants';

interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  appendIcon?: IconLabelProps;
  iconSize?: number;
  loading?: boolean;
}

function Button({ children, appendIcon, iconSize = 16, loading, variant, size, className, ...props }: ButtonProps, ref: Ref<HTMLButtonElement>) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
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
    </button>
  );
}

export default forwardRef(Button);
