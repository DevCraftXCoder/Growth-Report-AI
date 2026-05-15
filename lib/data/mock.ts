// Deterministic mock data — used when NEXT_PUBLIC_FRXNCOIS_API is unset.
import type {
  KPIMetric,
  TimeSeriesPoint,
  ReportSummary,
  AIInsight,
  AudienceSegment,
} from './types';

function pseudoRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function generateSeries(days: number, base: number, growth: number, seedKey: number): number[] {
  const rng = pseudoRandom(seedKey);
  const out: number[] = [];
  let current = base;
  for (let i = 0; i < days; i++) {
    const noise = (rng() - 0.5) * base * 0.08;
    current = current * (1 + growth / 100 / days) + noise;
    out.push(Math.max(0, Math.round(current)));
  }
  return out;
}

const days30 = 30;

export const mockKPIs: KPIMetric[] = [
  {
    key:        'followers',
    label:      'Followers',
    value:      12420,
    formatted:  '12.4K',
    delta:      26.5,
    deltaLabel: 'vs last 30 days',
    trend:      generateSeries(days30, 9800, 26.5, 11),
  },
  {
    key:        'engagement',
    label:      'Engagement',
    value:      8.4,
    formatted:  '8.4%',
    delta:      4.1,
    deltaLabel: 'vs last 30 days',
    trend:      generateSeries(days30, 7, 4.1, 22),
  },
  {
    key:        'plays',
    label:      'Plays',
    value:      48700,
    formatted:  '48.7K',
    delta:      12.8,
    deltaLabel: 'vs last 30 days',
    trend:      generateSeries(days30, 43000, 12.8, 33),
  },
  {
    key:        'revenue',
    label:      'Revenue',
    value:      2340,
    formatted:  '$2.34K',
    delta:      -2.4,
    deltaLabel: 'vs last 30 days',
    trend:      generateSeries(days30, 2400, -2.4, 44),
  },
];

export const mockTimeSeries: TimeSeriesPoint[] = (() => {
  const followers  = generateSeries(days30,  9800, 26.5, 11);
  const engagement = generateSeries(days30,    70,  4.1, 22);
  const plays      = generateSeries(days30, 43000, 12.8, 33);
  const revenue    = generateSeries(days30,  2400, -2.4, 44);
  const today = new Date();
  return Array.from({ length: days30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (days30 - 1 - i));
    return {
      date:        d.toISOString().slice(0, 10),
      followers:   followers[i],
      engagement:  engagement[i] / 10,
      plays:       plays[i],
      revenue:     revenue[i],
    };
  });
})();

export const mockReports: ReportSummary[] = [
  { id: 'r-001', title: 'May Growth Snapshot',         type: 'monthly',    runDate: '2026-05-12', grade: 'B', status: 'complete' },
  { id: 'r-002', title: 'Q1 Performance Deep Dive',    type: 'quarterly',  runDate: '2026-04-08', grade: 'A', status: 'complete' },
  { id: 'r-003', title: 'TikTok Audience Audit',       type: 'platform',   runDate: '2026-03-22', grade: 'C', status: 'complete' },
  { id: 'r-004', title: 'Spotify Playlist Pipeline',   type: 'platform',   runDate: '2026-03-09', grade: 'B', status: 'complete' },
  { id: 'r-005', title: 'Underground+ Subscriber Lift', type: 'campaign',  runDate: '2026-02-18', grade: 'A', status: 'complete' },
];

export const mockAudienceSegments: AudienceSegment[] = [
  { label: '18-24', value: 38, color: '#7C3AED' },
  { label: '25-34', value: 32, color: '#EC4899' },
  { label: '35-44', value: 18, color: '#8B5CF6' },
  { label: '45-54', value:  8, color: '#A78BFA' },
  { label: '55+',   value:  4, color: '#C4B5FD' },
];

export const mockInsights: AIInsight[] = [
  {
    id: 'i-001',
    prompt: 'What should I focus on next month?',
    generatedAt: '2026-05-12T18:00:00Z',
    sections: [
      {
        heading: 'Lean into TikTok',
        body: 'Engagement is up 4.1% with 38% of your audience in 18-24. Two short-form posts per week with a hook in the first 2 seconds will compound.',
      },
      {
        heading: 'Tighten revenue funnel',
        body: 'Revenue dipped 2.4%. Pair the next single drop with a 7-day Underground+ trial CTA on the smart-link footer.',
      },
    ],
  },
];
