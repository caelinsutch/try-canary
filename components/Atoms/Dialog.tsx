'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';

type DialogPrimitiveProps = DialogPrimitive.DialogProps;

export function Dialog({ ...props }: DialogPrimitiveProps) {
  return <DialogPrimitive.Root {...props} />;
}

Dialog.Trigger = React.forwardRef<
  HTMLButtonElement,
  DialogPrimitive.DialogTriggerProps
>(function DialogTrigger({ ...props }, ref) {
  return <DialogPrimitive.Trigger {...props} ref={ref} />;
});

Dialog.Content = React.forwardRef<
  HTMLDivElement,
  DialogPrimitive.DialogContentProps
>(function DialogContent({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          'fixed inset-0 bg-black bg-opacity-50 transition-opacity',
          className
        )}
      />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'bg-white dark:bg-neutral-900 rounded-md shadow-md border border-slate-50 dark:border-slate-700 fixed radius-1 top-1/2 left-1/2 ' +
            'p-4 min-w-[300px] max-w-[600px] max-h-[90vh] transform -translate-x-1/2 -translate-y-1/2',
          className
        )}
        {...props}
      />
    </DialogPrimitive.Portal>
  );
});

Dialog.Title = React.forwardRef<
  HTMLHeadingElement,
  DialogPrimitive.DialogTitleProps
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        'text-lg font-semibold text-slate-900 dark:text-white',
        className
      )}
      {...props}
    />
  );
});

Dialog.Close = React.forwardRef<
  HTMLButtonElement,
  DialogPrimitive.DialogCloseProps
>(function DialogClose({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Close
      ref={ref}
      className={cn('text-slate-900 dark:text-white', className)}
      {...props}
    />
  );
});
