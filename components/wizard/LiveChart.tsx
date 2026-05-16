'use client';

import * as React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from 'recharts';
import { useReducedMotion } from '@/lib/wizard/reduced-motion';

const DEFAULT_DATA = [
  { name: 'Jan', value: 4200 },
  { name: 'Feb', value: 5800 },
  { name: 'Mar', value: 5100 },
  { name: 'Apr', value: 7400 },
  { name: 'May', value: 8900 },
  { name: 'Jun', value: 9600 },
  { name: 'Jul', value: 11200 },
];

export interface LiveChartProps {
  data?: Array<{ name: string; value: number }>;
  height?: number;
  animated?: boolean;
}

function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: '#0F1117',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8,
        padding: '8px 12px',
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
      }}
    >
      <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 2, fontSize: 11 }}>{label}</div>
      <div style={{ fontWeight: 600, color: '#fff' }}>
        {payload[0].value?.toLocaleString()}
      </div>
    </div>
  );
}

export function LiveChart({ data = DEFAULT_DATA, height = 140, animated }: LiveChartProps) {
  const prefersReducedMotion = useReducedMotion();
  const isAnimationActive = prefersReducedMotion ? false : (animated ?? true);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(124,58,237,0.4)" />
            <stop offset="100%" stopColor="rgba(124,58,237,0)" />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="name"
          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: number) =>
            v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
          }
        />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
        <Area
          type="monotone"
          dataKey="value"
          fill="url(#chartGrad)"
          stroke="#7C3AED"
          strokeWidth={2}
          isAnimationActive={isAnimationActive}
          dot={false}
          activeDot={{ r: 4, fill: '#7C3AED', stroke: '#EC4899', strokeWidth: 1 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default LiveChart;
