'use client';

import * as React from 'react';
import { Menu, Search } from 'lucide-react';
import { cn } from '@/lib/design/cn';

export interface TopBarProps {
  onMobileMenuClick?: () => void;
}

export default function TopBar({ onMobileMenuClick }: TopBarProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-20',
        'bg-[#07070A]/80 backdrop-blur-[12px]',
        'border-b border-[rgba(255,255,255,0.06)]'
      )}
    >
      <div className="flex items-center gap-3 px-4 sm:px-6 md:px-8 py-3 max-w-[1400px] mx-auto">
        <button
          type="button"
          onClick={onMobileMenuClick}
          className="md:hidden p-2 -ml-2 rounded-md text-[#A1A1AA] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-colors"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search reports, metrics..."
              className={cn(
                'w-full pl-9 pr-3 py-2 text-sm',
                'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]',
                'rounded-[10px] text-white placeholder-[#71717A]',
                'focus:outline-none focus:border-[#7C3AED]',
                'transition-colors'
              )}
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className={cn(
              'hidden sm:inline-flex px-3 py-1.5 text-xs font-medium',
              'border border-[rgba(255,255,255,0.10)] rounded-[8px]',
              'text-[#A1A1AA] hover:text-white hover:border-[rgba(255,255,255,0.20)]',
              'transition-colors'
            )}
          >
            Last 30 days
          </button>
        </div>
      </div>
    </header>
  );
}
