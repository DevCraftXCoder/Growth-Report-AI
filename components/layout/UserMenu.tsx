'use client';

import * as React from 'react';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/design/cn';

export default function UserMenu() {
  return (
    <div
      className={cn(
        'flex items-center gap-3 px-2 py-2 rounded-[10px]',
        'hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer'
      )}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
        style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)' }}
        aria-hidden="true"
      >
        F
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-white truncate">Frxncois</div>
        <div className="text-xs text-[#71717A] truncate">Demo plan</div>
      </div>
      <button
        type="button"
        className="text-[#71717A] hover:text-white transition-colors"
        aria-label="Log out"
      >
        <LogOut size={14} />
      </button>
    </div>
  );
}
