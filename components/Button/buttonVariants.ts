import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-grotesque font-bold font-base uppercase transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-title-light disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-button-background text-title-darker hover:bg-background-light hover:text-title-light',
        secondary: 'bg-transparent text-title-light border-border-dark border hover:bg-title-light hover:text-title-darker',
        acid: 'font-heading tracking-eyebrow bg-acid text-background border-2 border-title-light hover:bg-title-light',
        outline: 'font-heading tracking-eyebrow bg-transparent text-title-light border-2 border-title-light hover:bg-title-light hover:text-background',
      },
      size: {
        sm: 'py-3 px-4',
        fullWidth: 'w-full p-4',
        iconSm: 'size-8 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  }
);

export default buttonVariants;
