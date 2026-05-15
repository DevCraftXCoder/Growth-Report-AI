import * as React from 'react';
import { cn } from '@/lib/design/cn';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[80px] w-full rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[#0F1117]',
        'px-3 py-2 text-sm text-white placeholder:text-[#71717A]',
        'resize-none transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C3AED]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';
