import { ButtonHTMLAttributes, PropsWithChildren, Ref, forwardRef } from 'react';

import { VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

import buttonVariants from './buttonVariants';

function Button(
  { children, variant, size, className, ...props }: PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
}

export default forwardRef(Button);
