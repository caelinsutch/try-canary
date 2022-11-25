import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';
import { Icons } from '../icons';

type ButtonProps = {
  variant?: keyof typeof ButtonVariants;
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonVariants = {
  primary:
    'relative inline-flex h-9 items-center rounded-md border border-transparent bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 transition-all',
  ghost:
    'relative inline-flex h-9 items-center rounded-md border border-transparent bg-transparent px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 transition-all',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      isLoading,
      className,
      children,
      ...props
    }: ButtonProps,
    ref
  ) => (
    <button
      disabled={isLoading}
      className={cn(
        ButtonVariants[variant],
        {
          'cursor-not-allowed opacity-60': isLoading,
        },
        className
      )}
      ref={ref}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        children
      )}
    </button>
  )
);
