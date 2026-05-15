import * as React from 'react';
import { cn } from '@/lib/design/cn';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

export function Separator({ orientation = 'horizontal', className, ...props }: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'bg-[rgba(255,255,255,0.06)] flex-shrink-0',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className
      )}
      {...props}
    />
  );
}
