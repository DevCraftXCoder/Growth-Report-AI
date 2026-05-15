import * as React from 'react';
import { cn } from '@/lib/design/cn';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0–100
}

export function Progress({ value = 0, className, ...props }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        'relative h-1.5 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]',
        className
      )}
      {...props}
    >
      <div
        className="h-full rounded-full transition-all duration-300 ease-out"
        style={{
          width: `${clamped}%`,
          background: 'linear-gradient(90deg, #7C3AED 0%, #EC4899 100%)',
        }}
      />
    </div>
  );
}
