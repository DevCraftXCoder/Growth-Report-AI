// Thin client. Falls back to mock data when NEXT_PUBLIC_FRXNCOIS_API is unset.
import {
  mockKPIs,
  mockTimeSeries,
  mockReports,
  mockAudienceSegments,
  mockInsights,
} from './mock';
import type {
  KPIMetric,
  TimeSeriesPoint,
  ReportSummary,
  AIInsight,
  AudienceSegment,
} from './types';

const BASE = process.env.NEXT_PUBLIC_FRXNCOIS_API ?? '';

function shouldFetch(): boolean {
  return BASE.length > 0;
}

export async function fetchKPIs(): Promise<KPIMetric[]> {
  if (!shouldFetch()) return mockKPIs;
  try {
    const res = await fetch(`${BASE}/api/mizzy-tools/growth-report/kpis`, { cache: 'no-store' });
    if (!res.ok) return mockKPIs;
    return (await res.json()) as KPIMetric[];
  } catch {
    return mockKPIs;
  }
}

export async function fetchTimeSeries(): Promise<TimeSeriesPoint[]> {
  if (!shouldFetch()) return mockTimeSeries;
  try {
    const res = await fetch(`${BASE}/api/mizzy-tools/growth-report/timeseries`, { cache: 'no-store' });
    if (!res.ok) return mockTimeSeries;
    return (await res.json()) as TimeSeriesPoint[];
  } catch {
    return mockTimeSeries;
  }
}

export async function fetchReports(): Promise<ReportSummary[]> {
  if (!shouldFetch()) return mockReports;
  try {
    const res = await fetch(`${BASE}/api/mizzy-tools/growth-report/saved`, { cache: 'no-store' });
    if (!res.ok) return mockReports;
    return (await res.json()) as ReportSummary[];
  } catch {
    return mockReports;
  }
}

export async function fetchAudience(): Promise<AudienceSegment[]> {
  return mockAudienceSegments;
}

export async function fetchInsights(): Promise<AIInsight[]> {
  return mockInsights;
}
