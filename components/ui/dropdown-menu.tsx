'use client';

import * as React from 'react';
import { cn } from '@/lib/design/cn';

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  // Close on outside click
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) {
  const ctx = React.useContext(DropdownMenuContext)!;
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: React.MouseEventHandler }>, {
      onClick: () => ctx.setOpen(!ctx.open),
    });
  }
  return (
    <button type="button" onClick={() => ctx.setOpen(!ctx.open)}>
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  children,
  align = 'start',
  className,
}: {
  children: React.ReactNode;
  align?: 'start' | 'end';
  className?: string;
}) {
  const ctx = React.useContext(DropdownMenuContext)!;
  if (!ctx.open) return null;
  return (
    <div
      className={cn(
        'absolute z-50 mt-1 min-w-[160px] rounded-[12px] border border-[rgba(255,255,255,0.08)]',
        'bg-[#12141C] py-1 shadow-lg',
        align === 'end' ? 'right-0' : 'left-0',
        className
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const ctx = React.useContext(DropdownMenuContext)!;
  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center gap-2 px-3 py-2 text-sm text-[#A1A1AA] hover:bg-[rgba(255,255,255,0.04)] hover:text-white',
        'cursor-default transition-colors',
        className
      )}
      onClick={() => {
        onClick?.();
        ctx.setOpen(false);
      }}
    >
      {children}
    </button>
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn('my-1 h-px bg-[rgba(255,255,255,0.06)]', className)} />;
}

export function DropdownMenuLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-3 py-1.5 text-xs font-medium text-[#71717A]', className)}>
      {children}
    </div>
  );
}
