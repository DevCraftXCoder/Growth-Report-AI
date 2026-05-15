import * as React from 'react';
import KPICard from './KPICard';
import type { KPICardProps } from './KPICard';

export type KPIMetric = KPICardProps;

export interface MetricRowProps {
  metrics: KPIMetric[];
  className?: string;
}

export default function MetricRow({ metrics, className }: MetricRowProps) {
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
      }}
    >
      {metrics.map((metric) => (
        <KPICard key={metric.title} {...metric} />
      ))}
    </div>
  );
}
