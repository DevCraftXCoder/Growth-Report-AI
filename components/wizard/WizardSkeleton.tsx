'use client';

import * as React from 'react';
import '@/styles/wizard.css';

export function WizardSkeleton() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: '100%',
      }}
      aria-hidden="true"
      role="presentation"
    >
      {/* Large header block */}
      <div
        className="skeleton"
        style={{ height: 32, width: '60%', borderRadius: 8 }}
      />

      {/* Paragraph block 1 */}
      <div
        className="skeleton"
        style={{ height: 16, width: '90%', borderRadius: 6 }}
      />

      {/* Paragraph block 2 */}
      <div
        className="skeleton"
        style={{ height: 16, width: '75%', borderRadius: 6 }}
      />

      {/* Paragraph block 3 */}
      <div
        className="skeleton"
        style={{ height: 16, width: '85%', borderRadius: 6 }}
      />

      {/* Chart placeholder */}
      <div
        className="skeleton"
        style={{ height: 120, width: '100%', borderRadius: 10, marginTop: 4 }}
      />
    </div>
  );
}
