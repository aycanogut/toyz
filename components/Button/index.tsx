import { ButtonHTMLAttributes, ComponentPropsWithoutRef, PropsWithChildren, Ref, forwardRef } from 'react';

import { VariantProps } from 'class-variance-authority';

import cn from '@/utils/cn';

import Icon from '../Icon';

import buttonVariants from './buttonVariants';

type IconProps = ComponentPropsWithoutRef<typeof Icon>;

interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  appendIconProps?: IconProps;
  loading?: boolean;
}

function Button({ children, appendIconProps, loading, variant, size, className, ...props }: ButtonProps, ref: Ref<HTMLButtonElement>) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {loading ? (
        <Icon
          name="loading"
          className="size-5 animate-spin"
        />
      ) : (
        children
      )}

      {appendIconProps && <Icon {...appendIconProps} />}
    </button>
  );
}

export default forwardRef(Button);
