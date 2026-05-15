export interface KPIMetric {
  key: string;
  label: string;
  value: number;
  formatted: string;
  delta: number;
  deltaLabel: string;
  trend?: number[];
}

export interface TimeSeriesPoint {
  date: string;
  followers?: number;
  engagement?: number;
  plays?: number;
  revenue?: number;
  shares?: number;
}

export type ReportStatus = 'draft' | 'running' | 'complete' | 'failed';
export type ReportGrade = 'A' | 'B' | 'C' | 'D' | 'F';

export interface ReportSummary {
  id: string;
  title: string;
  type: string;
  runDate: string;
  grade: ReportGrade;
  status: ReportStatus;
}

export interface AIInsightSection {
  heading: string;
  body: string;
}

export interface AIInsight {
  id: string;
  prompt: string;
  generatedAt: string;
  sections: AIInsightSection[];
}

export interface AudienceSegment {
  label: string;
  value: number;
  color: string;
}
