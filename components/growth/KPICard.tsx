'use client';

import * as React from 'react';
import { cn } from '@/lib/design/cn';
import Sparkline from './Sparkline';

export interface KPICardProps {
  title: string;
  value: string | number;
  delta?: number;       // +/- percentage, e.g. 12.5 means +12.5%
  deltaLabel?: string;  // e.g. "vs last month"
  trend?: number[];     // sparkline data
  className?: string;
}

function formatDelta(delta: number): string {
  const sign = delta >= 0 ? '+' : '';
  return `${sign}${delta.toFixed(1)}%`;
}

export default function KPICard({ title, value, delta, deltaLabel, trend, className }: KPICardProps) {
  const deltaColor =
    delta === undefined
      ? '#A1A1AA'
      : delta > 0
      ? '#22C55E'
      : delta < 0
      ? '#EF4444'
      : '#A1A1AA';

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#12141C] p-5',
        className
      )}
    >
      <p style={{ fontSize: 12, fontWeight: 500, color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {title}
      </p>

      <p
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#FFFFFF',
          fontFamily: 'var(--font-mono, JetBrains Mono, monospace)',
          lineHeight: 1,
        }}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        {delta !== undefined && (
          <span style={{ fontSize: 13, fontWeight: 600, color: deltaColor }}>
            {formatDelta(delta)}
            {deltaLabel && (
              <span style={{ color: '#71717A', fontWeight: 400 }}> {deltaLabel}</span>
            )}
          </span>
        )}
        {trend && trend.length > 0 && (
          <Sparkline
            data={trend}
            color={delta === undefined || delta >= 0 ? '#8B5CF6' : '#EF4444'}
            height={32}
          />
        )}
      </div>
    </div>
  );
}
