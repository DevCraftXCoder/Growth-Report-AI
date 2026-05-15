import * as React from 'react';
import { cn } from '@/lib/design/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'danger' | 'warn' | 'info' | 'purple';
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-[rgba(255,255,255,0.07)] text-[#A1A1AA]',
  success: 'bg-[rgba(34,197,94,0.12)] text-[#22C55E]',
  danger:  'bg-[rgba(239,68,68,0.12)] text-[#EF4444]',
  warn:    'bg-[rgba(245,158,11,0.12)] text-[#F59E0B]',
  info:    'bg-[rgba(59,130,246,0.12)] text-[#3B82F6]',
  purple:  'bg-[rgba(124,58,237,0.15)] text-[#A78BFA]',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
);
Badge.displayName = 'Badge';
