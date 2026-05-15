'use client';

import * as React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { chartTheme } from '@/lib/design/tokens';

export interface TrendLine {
  key: string;
  name: string;
  color?: string;
}

export interface TrendChartProps {
  data: Record<string, string | number>[];
  lines: TrendLine[];
  height?: number;
  xKey?: string;
  className?: string;
}

const COLORS = ['#8B5CF6', '#EC4899', '#3B82F6'];

export default function TrendChart({
  data,
  lines,
  height = 280,
  xKey = 'date',
  className,
}: TrendChartProps) {
  return (
    <div className={className} style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            {lines.map((line, idx) => {
              const color = line.color ?? COLORS[idx % COLORS.length];
              return (
                <linearGradient key={line.key} id={`grad-${line.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              );
            })}
          </defs>

          <CartesianGrid
            stroke={chartTheme.grid.stroke}
            strokeDasharray={chartTheme.grid.strokeDasharray}
            vertical={false}
          />
          <XAxis
            dataKey={xKey}
            stroke={chartTheme.axis.stroke}
            tick={{ fill: '#71717A', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke={chartTheme.axis.stroke}
            tick={{ fill: '#71717A', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: chartTheme.tooltip.bg,
              border: chartTheme.tooltip.border,
              borderRadius: 10,
              fontSize: 12,
              color: '#FFFFFF',
            }}
            cursor={{ stroke: 'rgba(255,255,255,0.08)' }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, color: '#A1A1AA', paddingTop: 12 }}
          />
          {lines.map((line, idx) => {
            const color = line.color ?? COLORS[idx % COLORS.length];
            return (
              <Area
                key={line.key}
                type="monotone"
                dataKey={line.key}
                name={line.name}
                stroke={color}
                strokeWidth={2.5}
                fill={`url(#grad-${line.key})`}
                dot={false}
                isAnimationActive={true}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
