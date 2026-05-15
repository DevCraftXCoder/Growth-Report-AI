import * as React from 'react';

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export default function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: '#FFFFFF',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            style={{
              fontSize: 14,
              color: '#A1A1AA',
              marginTop: 6,
              maxWidth: 560,
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
          {actions}
        </div>
      )}
    </div>
  );
}
