'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, LayoutDashboard, FileText, Sparkles, TrendingUp, Settings, CreditCard } from 'lucide-react';
import Logo from '@/components/growth/Logo';
import { cn } from '@/lib/design/cn';

const navItems = [
  { href: '/dashboard',   label: 'Dashboard',   icon: LayoutDashboard },
  { href: '/reports',     label: 'Reports',     icon: FileText },
  { href: '/ai-insights', label: 'AI Insights', icon: Sparkles },
  { href: '/historical',  label: 'Historical',  icon: TrendingUp },
  { href: '/settings',    label: 'Settings',    icon: Settings },
  { href: '/billing',     label: 'Billing',     icon: CreditCard },
];

export interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const pathname = usePathname();

  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="md:hidden fixed inset-0 z-40">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={cn(
          'absolute left-0 top-0 bottom-0 w-[280px] max-w-[85vw]',
          'bg-[#0F1117] border-r border-[rgba(255,255,255,0.06)]',
          'flex flex-col'
        )}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-[#A1A1AA] hover:text-white"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname?.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-[10px] text-sm',
                  active
                    ? 'bg-[rgba(124,58,237,0.10)] text-white'
                    : 'text-[#A1A1AA] hover:bg-[rgba(255,255,255,0.04)] hover:text-white'
                )}
              >
                <Icon size={18} className={active ? 'text-[#EC4899]' : ''} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
