import * as React from 'react';
import { cn } from '@/lib/design/cn';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-9 w-full rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[#0F1117]',
        'px-3 py-2 text-sm text-white placeholder:text-[#71717A]',
        'transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C3AED]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';
