import * as React from 'react';
import { cn } from '@/lib/design/cn';

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  padding?: string;
}

export default function GlassPanel({
  as: Tag = 'div',
  padding = '1.5rem',
  className,
  style,
  children,
  ...props
}: GlassPanelProps) {
  return (
    <Tag
      className={cn('glass', className)}
      style={{ padding, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}
