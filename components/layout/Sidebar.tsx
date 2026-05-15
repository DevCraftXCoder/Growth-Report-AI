'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  TrendingUp,
  Settings,
  CreditCard,
} from 'lucide-react';
import Logo from '@/components/growth/Logo';
import UserMenu from './UserMenu';
import { cn } from '@/lib/design/cn';

const navItems = [
  { href: '/dashboard',     label: 'Dashboard',          icon: LayoutDashboard },
  { href: '/reports',       label: 'Reports',            icon: FileText },
  { href: '/ai-insights',   label: 'AI Insights',        icon: Sparkles },
  { href: '/historical',    label: 'Historical',         icon: TrendingUp },
  { href: '/settings',      label: 'Settings',           icon: Settings },
  { href: '/billing',       label: 'Billing',            icon: CreditCard },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'hidden md:flex',
        'fixed left-0 top-0 bottom-0 z-30',
        'w-[260px]',
        'flex-col',
        'bg-[rgba(255,255,255,0.03)] backdrop-blur-[20px]',
        'border-r border-[rgba(255,255,255,0.06)]'
      )}
      aria-label="Primary navigation"
    >
      <div className="px-5 py-5 border-b border-[rgba(255,255,255,0.06)]">
        <Link href="/" aria-label="Growth Report AI home">
          <Logo />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname?.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-[10px] text-sm transition-all',
                active
                  ? 'bg-[rgba(124,58,237,0.10)] text-white'
                  : 'text-[#A1A1AA] hover:bg-[rgba(255,255,255,0.04)] hover:text-white'
              )}
            >
              <Icon size={16} className={active ? 'text-[#EC4899]' : ''} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[rgba(255,255,255,0.06)] p-3">
        <UserMenu />
      </div>
    </aside>
  );
}
