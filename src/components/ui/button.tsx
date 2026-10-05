'use client';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  [
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-medium tracking-tight',
    'transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--background)',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:size-4 [&_svg]:shrink-0',
    'active:translate-y-px',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-(--color-gekko-500) text-(--color-bg-void) shadow-[0_8px_28px_-12px_rgba(0,255,140,0.6)] hover:bg-(--color-gekko-400) hover:shadow-[0_8px_28px_-8px_rgba(0,255,140,0.8)]',
        outline:
          'border border-(--glass-border) bg-transparent text-(--color-text-primary) hover:border-(--color-gekko-500) hover:bg-(--glass-tint) hover:text-(--color-gekko-300)',
        ghost:
          'bg-transparent text-(--color-text-primary) hover:bg-(--glass-tint) hover:text-(--color-gekko-300)',
        glass: 'glass text-(--color-text-primary) hover:border-(--color-gekko-500)',
        violet:
          'bg-(--color-neon-violet) text-white shadow-[0_8px_28px_-12px_rgba(139,92,246,0.7)] hover:opacity-90',
        danger: 'bg-(--color-danger) text-white hover:opacity-90',
        link: 'text-(--color-gekko-400) underline-offset-4 hover:underline px-0 py-0',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-lg',
        default: 'h-11 px-5 text-sm rounded-xl',
        lg: 'h-12 px-6 text-base rounded-xl',
        xl: 'h-14 px-8 text-base rounded-2xl',
        icon: 'size-10 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
