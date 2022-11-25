import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type FormInputProps = {
  label?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, id, error, className, ...props }, ref) => (
    <div>
      {label && (
        <label className="sr-only" htmlFor={label}>
          {label}
        </label>
      )}

      <input
        id={label}
        className={cn(
          'my-0  block h-9 w-full rounded-md border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-1',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-left ml-2 text-xs text-red-600">{error}</p>
      )}
    </div>
  )
);
