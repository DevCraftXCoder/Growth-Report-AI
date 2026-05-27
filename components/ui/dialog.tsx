'use client';

import * as React from 'react';
import { cn } from '@/lib/design/cn';

interface DialogContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

export function Dialog({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
}) {
  const [internal, setInternal] = React.useState(false);
  const isOpen = open ?? internal;
  const setOpen = React.useCallback(
    (v: boolean) => {
      setInternal(v);
      onOpenChange?.(v);
    },
    [onOpenChange]
  );
  return (
    <DialogContext.Provider value={{ open: isOpen, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const ctx = React.useContext(DialogContext)!;
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: React.MouseEventHandler }>, {
      onClick: () => ctx.setOpen(true),
    });
  }
  return <button type="button" onClick={() => ctx.setOpen(true)}>{children}</button>;
}

export function DialogOverlay({ className }: { className?: string }) {
  const ctx = React.useContext(DialogContext)!;
  if (!ctx.open) return null;
  return (
    <div
      role="presentation"
      className={cn('fixed inset-0 z-50 bg-black/60 backdrop-blur-sm', className)}
      onClick={() => ctx.setOpen(false)}
      onKeyDown={(e) => { if (e.key === 'Escape') ctx.setOpen(false); }}
    />
  );
}

export function DialogContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(DialogContext)!;
  if (!ctx.open) return null;
  return (
    <>
      <DialogOverlay />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
          'w-full max-w-lg rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#12141C] p-6 shadow-xl',
          className
        )}
      >
        {children}
      </div>
    </>
  );
}

export function DialogHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mb-4 flex flex-col gap-1', className)}>{children}</div>;
}

export function DialogTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h2 className={cn('text-lg font-semibold text-white', className)}>{children}</h2>;
}

export function DialogDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn('text-sm text-[#A1A1AA]', className)}>{children}</p>;
}

export function DialogFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mt-4 flex justify-end gap-2', className)}>{children}</div>;
}

export function DialogClose({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(DialogContext)!;
  return React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<{ onClick?: React.MouseEventHandler }>, {
        onClick: () => ctx.setOpen(false),
      })
    : null;
}
