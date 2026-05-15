'use client';

import * as React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

export interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  className?: string;
}

export default function Sparkline({ data, color = '#8B5CF6', height = 40 }: SparklineProps) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <div style={{ width: 80, height }} aria-hidden="true">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Tooltip
            contentStyle={{
              background: '#12141C',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 8,
              fontSize: 11,
              color: '#FFFFFF',
            }}
            formatter={(v: number) => [v.toLocaleString(), '']}
            labelFormatter={() => ''}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
