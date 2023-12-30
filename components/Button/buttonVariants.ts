import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-white text-sm font-normal leading-6 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-red-light hover:bg-red',
        secondary: 'bg-gray-900 hover:bg-gray-700',
        outline: 'text-black border border-gray-900 border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
        ghost: 'text-black hover:bg-accent hover:text-accent-foreground',
        badge: 'bg-white shadow text-black text-xs',
      },
      size: {
        xs: 'px-2 py-1',
        sm: 'px-6 py-2',
        md: 'px-4 py-2',
        lg: 'px-6 py-3',
      },
      radius: {
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      radius: 'lg',
      fullWidth: false,
    },
  }
);

export default buttonVariants;
