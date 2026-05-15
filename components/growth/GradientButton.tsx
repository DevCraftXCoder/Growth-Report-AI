'use client';

import * as React from 'react';
import { cn } from '@/lib/design/cn';

export interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

export default function GradientButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: GradientButtonProps) {
  if (variant === 'secondary') {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-[12px] font-semibold transition-all duration-200',
          'border border-[rgba(255,255,255,0.10)] bg-transparent text-white',
          'hover:border-[rgba(255,255,255,0.20)] hover:bg-[rgba(255,255,255,0.04)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070A]',
          'disabled:pointer-events-none disabled:opacity-50',
          sizeMap[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-[12px] font-semibold',
        'text-white transition-all duration-200',
        'bg-gradient-to-br from-[#7C3AED] to-[#EC4899]',
        'hover:opacity-90 hover:shadow-[0_0_24px_rgba(124,58,237,0.35),0_0_48px_rgba(236,72,153,0.15)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070A]',
        'disabled:pointer-events-none disabled:opacity-50',
        sizeMap[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
