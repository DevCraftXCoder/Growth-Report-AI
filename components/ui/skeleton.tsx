import * as React from 'react';
import { cn } from '@/lib/design/cn';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('skeleton rounded-[8px]', className)}
      aria-hidden="true"
      {...props}
    />
  );
}
