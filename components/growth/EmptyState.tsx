import * as React from 'react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  cta?: React.ReactNode;
  className?: string;
}

export default function EmptyState({ icon, title, description, cta, className }: EmptyStateProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}
    >
      {icon && (
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'rgba(124,58,237,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#7C3AED',
          }}
        >
          {icon}
        </div>
      )}
      <h3 style={{ fontSize: 16, fontWeight: 600, color: '#FFFFFF' }}>{title}</h3>
      {description && (
        <p style={{ fontSize: 14, color: '#71717A', maxWidth: 360, lineHeight: 1.5 }}>
          {description}
        </p>
      )}
      {cta}
    </div>
  );
}
