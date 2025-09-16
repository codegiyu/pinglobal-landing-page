import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] transition-all cursor-pointer transition-all duration-300 ease-in disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive blur-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        hero: 'bg-gradient-hero text-primary-foreground hover:shadow-pin-button transform hover:scale-105',
        cta: 'bg-pin-red text-primary-foreground hover:bg-pin-red-dark shadow-pin-card hover:shadow-pin-button transform hover:scale-105',
        none: '',
      },
      size: {
        default: 'w-fit px-6 py-3.5',
        sm: 'w-fit py-2 px-4',
        hero: 'w-fit py-3 px-8',
        icon: '',
        full: 'w-full py-3 px-4',
      },
      typo: {
        default: 'font-montserrat text-sm font-medium',
        small: 'font-montserrat text-xs font-medium',
        hero: 'font-semibold text-lg',
        custom: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      typo: 'default',
    },
  }
);

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, typo, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, typo, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants, type ButtonProps };
