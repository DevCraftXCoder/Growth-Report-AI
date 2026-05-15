import * as React from 'react';

export interface LogoProps {
  collapsed?: boolean;
  size?: number;
}

export default function Logo({ collapsed, size = 28 }: LogoProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.3,
          background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        <svg
          width={size * 0.55}
          height={size * 0.55}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline
            points="1,12 5,6 9,9 13,3"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="13" cy="3" r="1.5" fill="white" />
        </svg>
      </div>
      {!collapsed && (
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
          }}
        >
          Growth Report AI
        </span>
      )}
    </div>
  );
}
