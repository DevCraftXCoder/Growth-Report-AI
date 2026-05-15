'use client';

import * as React from 'react';
import { cn } from '@/lib/design/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-gradient-to-br from-[#7C3AED] to-[#EC4899] text-white hover:opacity-90 shadow-[0_0_20px_rgba(124,58,237,0.25)]',
  secondary:
    'border border-[rgba(255,255,255,0.10)] bg-transparent text-white hover:border-[rgba(255,255,255,0.20)] hover:bg-[rgba(255,255,255,0.04)]',
  ghost:
    'bg-transparent text-[#A1A1AA] hover:text-white hover:bg-[rgba(255,255,255,0.04)]',
  danger:
    'bg-[#EF4444] text-white hover:bg-[#DC2626]',
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-[8px]',
  md: 'px-4 py-2 text-sm rounded-[10px]',
  lg: 'px-6 py-3 text-base rounded-[12px]',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'secondary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070A]',
          'disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
