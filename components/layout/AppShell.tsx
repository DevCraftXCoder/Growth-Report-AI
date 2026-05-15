'use client';

import * as React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileNavDrawer from './MobileNavDrawer';

export interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#07070A] text-white">
      <div className="flex">
        <Sidebar />
        <MobileNavDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
        <div className="flex-1 min-w-0 md:ml-[260px]">
          <TopBar onMobileMenuClick={() => setMobileOpen(true)} />
          <main className="px-4 sm:px-6 md:px-8 py-6 md:py-8 max-w-[1400px] mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
