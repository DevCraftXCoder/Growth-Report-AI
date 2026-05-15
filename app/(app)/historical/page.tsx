'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/growth/PageHeader';
import GlassPanel from '@/components/growth/GlassPanel';
import TrendChart from '@/components/growth/TrendChart';
import { cn } from '@/lib/design/cn';

// ---------------------------------------------------------------------------
// Static data — simulate different time ranges
// ---------------------------------------------------------------------------

const DAYS_7: Record<string, string | number>[] = [
  { date: 'Mon', followers: 120, engagement: 340, plays: 1200, revenue: 48 },
  { date: 'Tue', followers: 145, engagement: 390, plays: 1380, revenue: 52 },
  { date: 'Wed', followers: 138, engagement: 420, plays: 1520, revenue: 61 },
  { date: 'Thu', followers: 162, engagement: 460, plays: 1640, revenue: 74 },
  { date: 'Fri', followers: 175, engagement: 510, plays: 1880, revenue: 88 },
  { date: 'Sat', followers: 192, engagement: 560, plays: 2100, revenue: 95 },
  { date: 'Sun', followers: 208, engagement: 590, plays: 2340, revenue: 103 },
];

const DAYS_30: Record<string, string | number>[] = Array.from({ length: 10 }, (_, i) => ({
  date: `Apr ${(i + 1) * 3}`,
  followers: 90 + i * 28 + Math.round(Math.sin(i) * 15),
  engagement: 260 + i * 48 + Math.round(Math.cos(i) * 22),
  plays: 900 + i * 180 + Math.round(Math.sin(i * 2) * 80),
  revenue: 38 + i * 12 + Math.round(Math.cos(i * 1.5) * 8),
}));

const DAYS_90: Record<string, string | number>[] = Array.from({ length: 12 }, (_, i) => ({
  date: `Wk ${i + 1}`,
  followers: 300 + i * 120 + Math.round(Math.sin(i) * 60),
  engagement: 800 + i * 190 + Math.round(Math.cos(i) * 90),
  plays: 3200 + i * 680 + Math.round(Math.sin(i * 1.3) * 300),
  revenue: 120 + i * 48 + Math.round(Math.cos(i * 0.8) * 28),
}));

const YTD: Record<string, string | number>[] = [
  { date: 'Jan', followers: 1200, engagement: 3400, plays: 14200, revenue: 480 },
  { date: 'Feb', followers: 1560, engagement: 3900, plays: 17800, revenue: 620 },
  { date: 'Mar', followers: 2100, engagement: 4600, plays: 21400, revenue: 810 },
  { date: 'Apr', followers: 2740, engagement: 5200, plays: 26800, revenue: 1040 },
  { date: 'May', followers: 3120, engagement: 6100, plays: 31200, revenue: 1280 },
];

const PERIOD_DATA: Record<string, Record<string, string | number>[]> = {
  '7D': DAYS_7,
  '30D': DAYS_30,
  '90D': DAYS_90,
  YTD,
};

// Period comparison numbers
const PERIOD_CURRENT: Record<string, { label: string; value: string }[]> = {
  '7D': [
    { label: 'New Followers', value: '+208' },
    { label: 'Engagements', value: '3,590' },
    { label: 'Total Plays', value: '12,060' },
    { label: 'Revenue', value: '$103' },
  ],
  '30D': [
    { label: 'New Followers', value: '+1,344' },
    { label: 'Engagements', value: '17,480' },
    { label: 'Total Plays', value: '68,400' },
    { label: 'Revenue', value: '$548' },
  ],
  '90D': [
    { label: 'New Followers', value: '+6,420' },
    { label: 'Engagements', value: '88,200' },
    { label: 'Total Plays', value: '326,000' },
    { label: 'Revenue', value: '$2,740' },
  ],
  YTD: [
    { label: 'New Followers', value: '+3,120' },
    { label: 'Engagements', value: '28,200' },
    { label: 'Total Plays', value: '111,400' },
    { label: 'Revenue', value: '$1,280' },
  ],
};

const PERIOD_PRIOR: Record<string, { label: string; value: string }[]> = {
  '7D': [
    { label: 'New Followers', value: '+174' },
    { label: 'Engagements', value: '2,980' },
    { label: 'Total Plays', value: '9,840' },
    { label: 'Revenue', value: '$82' },
  ],
  '30D': [
    { label: 'New Followers', value: '+1,088' },
    { label: 'Engagements', value: '14,100' },
    { label: 'Total Plays', value: '56,200' },
    { label: 'Revenue', value: '$440' },
  ],
  '90D': [
    { label: 'New Followers', value: '+5,140' },
    { label: 'Engagements', value: '70,800' },
    { label: 'Total Plays', value: '262,000' },
    { label: 'Revenue', value: '$2,180' },
  ],
  YTD: [
    { label: 'New Followers', value: '+2,560' },
    { label: 'Engagements', value: '22,600' },
    { label: 'Total Plays', value: '90,200' },
    { label: 'Revenue', value: '$1,020' },
  ],
};

const CHART_LINES = [
  { key: 'followers', name: 'Followers', color: '#8B5CF6' },
  { key: 'engagement', name: 'Engagement', color: '#EC4899' },
  { key: 'plays', name: 'Plays', color: '#3B82F6' },
  { key: 'revenue', name: 'Revenue', color: '#10B981' },
];

const PLATFORM_ROWS = [
  { platform: 'Spotify', followers: '4.2K', growth: '+18%', plays: '28.4K' },
  { platform: 'TikTok', followers: '6.1K', growth: '+34%', plays: '12.1K' },
  { platform: 'Instagram', followers: '1.8K', growth: '+12%', plays: '6.2K' },
  { platform: 'YouTube', followers: '320', growth: '+8%', plays: '2.0K' },
];

const TABS = ['7D', '30D', '90D', 'YTD'] as const;
type Tab = (typeof TABS)[number];

// ---------------------------------------------------------------------------
// PeriodTabs — client component
// ---------------------------------------------------------------------------

function PeriodTabs() {
  const [active, setActive] = useState<Tab>('30D');
  const data = PERIOD_DATA[active];
  const current = PERIOD_CURRENT[active];
  const prior = PERIOD_PRIOR[active];

  return (
    <div className="space-y-6">
      {/* Tab nav */}
      <div className="flex gap-1 p-1 rounded-xl bg-[rgba(255,255,255,0.04)] w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              'relative px-5 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150',
              active === tab
                ? 'text-white'
                : 'text-[#71717A] hover:text-[#A1A1AA]'
            )}
          >
            {active === tab && (
              <span
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                  opacity: 1,
                  zIndex: 0,
                }}
              />
            )}
            <span className="relative z-10">{tab}</span>
            {active === tab && (
              <span
                className="absolute bottom-0 left-1/4 right-1/4 h-[2px] rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Multi-Platform Growth */}
      <GlassPanel>
        <h3 className="text-sm font-semibold text-white mb-4">Multi-Platform Growth</h3>
        <TrendChart data={data} lines={CHART_LINES} height={320} />
      </GlassPanel>

      {/* Platform Breakdown */}
      <GlassPanel>
        <h3 className="text-sm font-semibold text-white mb-4">Platform Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="pb-3 text-left text-[#71717A] font-medium">Platform</th>
                <th className="pb-3 text-right text-[#71717A] font-medium">Followers</th>
                <th className="pb-3 text-right text-[#71717A] font-medium">Growth</th>
                <th className="pb-3 text-right text-[#71717A] font-medium">Plays</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
              {PLATFORM_ROWS.map((row) => (
                <tr key={row.platform} className="group hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                  <td className="py-3 text-white font-medium">{row.platform}</td>
                  <td className="py-3 text-right text-[#A1A1AA]">{row.followers}</td>
                  <td className="py-3 text-right">
                    <span className="text-emerald-400 font-medium">▲ {row.growth}</span>
                  </td>
                  <td className="py-3 text-right text-[#A1A1AA]">{row.plays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>

      {/* Period Comparison */}
      <GlassPanel>
        <h3 className="text-sm font-semibold text-white mb-4">Period Comparison</h3>
        <div className="grid grid-cols-2 gap-6">
          {/* This Period */}
          <div>
            <p className="text-xs font-semibold text-[#7C3AED] uppercase tracking-wider mb-3">
              This Period
            </p>
            <div className="space-y-3">
              {current.map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="text-sm text-[#71717A]">{row.label}</span>
                  <span className="text-sm font-semibold text-white">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Last Period */}
          <div className="border-l border-[rgba(255,255,255,0.06)] pl-6">
            <p className="text-xs font-semibold text-[#71717A] uppercase tracking-wider mb-3">
              Last Period
            </p>
            <div className="space-y-3">
              {prior.map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="text-sm text-[#71717A]">{row.label}</span>
                  <span className="text-sm font-medium text-[#A1A1AA]">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page — server component wrapper
// ---------------------------------------------------------------------------

export default function HistoricalPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <PageHeader
        title="Historical Analytics"
        description="Compare performance across time periods"
      />
      <PeriodTabs />
    </div>
  );
}
