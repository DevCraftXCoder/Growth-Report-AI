'use client';

import * as React from 'react';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  const [visible, setVisible] = React.useState(false);

  const positionStyles: Record<string, React.CSSProperties> = {
    top:    { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 6 },
    bottom: { top: '100%',   left: '50%', transform: 'translateX(-50%)', marginTop: 6 },
    left:   { right: '100%', top: '50%',  transform: 'translateY(-50%)', marginRight: 6 },
    right:  { left: '100%',  top: '50%',  transform: 'translateY(-50%)', marginLeft: 6 },
  };

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          style={{
            position: 'absolute',
            zIndex: 50,
            ...positionStyles[side],
            whiteSpace: 'nowrap',
            padding: '4px 10px',
            borderRadius: 8,
            background: '#12141C',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: 500,
            pointerEvents: 'none',
          }}
        >
          {content}
        </span>
      )}
    </span>
  );
}

// Re-exported as named alias for compatibility
export const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const TooltipTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const TooltipContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn('', className)}>{children}</span>
);

function cn(...args: (string | undefined)[]) {
  return args.filter(Boolean).join(' ');
}
