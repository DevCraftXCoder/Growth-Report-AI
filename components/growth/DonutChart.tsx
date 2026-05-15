'use client';

import * as React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export interface DonutSlice {
  name: string;
  value: number;
  color?: string;
}

export interface DonutChartProps {
  data: DonutSlice[];
  label?: string;
  height?: number;
  className?: string;
}

const DEFAULT_COLORS = ['#7C3AED', '#EC4899', '#3B82F6', '#F59E0B', '#22C55E'];

export default function DonutChart({ data, label, height = 200, className }: DonutChartProps) {
  return (
    <div className={className} style={{ width: '100%', height, position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="55%"
            outerRadius="80%"
            paddingAngle={3}
            dataKey="value"
            isAnimationActive={true}
          >
            {data.map((entry, idx) => (
              <Cell
                key={entry.name}
                fill={entry.color ?? DEFAULT_COLORS[idx % DEFAULT_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: '#12141C',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10,
              fontSize: 12,
              color: '#FFFFFF',
            }}
            formatter={(v: number) => [v.toLocaleString(), '']}
          />
        </PieChart>
      </ResponsiveContainer>
      {label && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: '#A1A1AA' }}>{label}</span>
        </div>
      )}
    </div>
  );
}
