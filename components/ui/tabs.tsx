'use client';

import * as React from 'react';
import { cn } from '@/lib/design/cn';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error('Tabs components must be used inside <Tabs>');
  return ctx;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({ defaultValue, value, onValueChange, children, className, ...props }: TabsProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const active = value ?? internal;
  const setActive = React.useCallback(
    (v: string) => {
      setInternal(v);
      onValueChange?.(v);
    },
    [onValueChange]
  );
  return (
    <TabsContext.Provider value={{ activeTab: active, setActiveTab: setActive }}>
      <div className={cn('flex flex-col gap-4', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center gap-1 rounded-[10px] border border-[rgba(255,255,255,0.06)] bg-[#0F1117] p-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 text-sm font-medium transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C3AED]',
        isActive
          ? 'bg-[#12141C] text-white shadow-sm'
          : 'text-[#71717A] hover:text-[#A1A1AA]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const { activeTab } = useTabsContext();
  if (activeTab !== value) return null;
  return (
    <div role="tabpanel" className={cn(className)} {...props}>
      {children}
    </div>
  );
}
