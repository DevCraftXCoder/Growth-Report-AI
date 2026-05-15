import * as React from 'react';
import {
  fetchKPIs,
  fetchTimeSeries,
  fetchReports,
  fetchAudience,
  fetchInsights,
} from '@/lib/data/api';
import type { ReportGrade } from '@/lib/data/types';
import PageHeader from '@/components/growth/PageHeader';
import MetricRow from '@/components/growth/MetricRow';
import GlassPanel from '@/components/growth/GlassPanel';
import TrendChart from '@/components/growth/TrendChart';
import DonutChart from '@/components/growth/DonutChart';
import AIInsightPanel from '@/components/growth/AIInsightPanel';
import GradientButton from '@/components/growth/GradientButton';
import Link from 'next/link';

function gradeColor(grade: ReportGrade): string {
  switch (grade) {
    case 'A':
      return '#22C55E';
    case 'B':
      return '#3B82F6';
    case 'C':
      return '#EAB308';
    case 'D':
      return '#F97316';
    case 'F':
      return '#EF4444';
    default:
      return '#71717A';
  }
}

function GradeBadge({ grade }: { grade: ReportGrade }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 700,
        background: gradeColor(grade) + '22',
        color: gradeColor(grade),
        border: `1px solid ${gradeColor(grade)}44`,
      }}
    >
      {grade}
    </span>
  );
}

export default async function DashboardPage() {
  const [kpis, series, reports, audience, insights] = await Promise.all([
    fetchKPIs(),
    fetchTimeSeries(),
    fetchReports(),
    fetchAudience(),
    fetchInsights(),
  ]);

  // Map KPIMetric[] -> KPICardProps[]
  const kpiCards = kpis.map((k) => ({
    title: k.label,
    value: k.formatted,
    delta: k.delta,
    deltaLabel: k.deltaLabel,
    trend: k.trend,
  }));

  // Map AudienceSegment[] -> DonutSlice[]
  const audienceSlices = audience.map((a) => ({
    name: a.label,
    value: a.value,
    color: a.color,
  }));

  // Build insight content string from first insight
  const insightContent =
    insights.length > 0
      ? insights[0].sections
          .map((s) => (s.heading ? `**${s.heading}**\n${s.body}` : s.body))
          .join('\n\n')
      : undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page header */}
      <PageHeader
        title="Dashboard"
        description="30-day performance overview"
        actions={
          <Link href="/reports/new" style={{ textDecoration: 'none' }}>
            <GradientButton size="md">Generate Report</GradientButton>
          </Link>
        }
      />

      {/* KPI row */}
      <MetricRow metrics={kpiCards} />

      {/* Charts row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Growth trends — spans 2 cols */}
        <div style={{ gridColumn: 'span 2' }}>
          <GlassPanel>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#A1A1AA',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '1.25rem',
              }}
            >
              Growth Trends
            </p>
            <TrendChart
              data={series as unknown as Record<string, string | number>[]}
              lines={[
                { key: 'followers', name: 'Followers' },
                { key: 'engagement', name: 'Engagement' },
              ]}
              height={280}
            />
          </GlassPanel>
        </div>

        {/* Audience donut */}
        <div>
          <GlassPanel style={{ height: '100%' }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#A1A1AA',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '1.25rem',
              }}
            >
              Audience
            </p>
            <DonutChart data={audienceSlices} label="Segments" height={220} />
            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              {audienceSlices.map((slice) => (
                <div
                  key={slice.name}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: slice.color,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 12, color: '#A1A1AA', flex: 1 }}>{slice.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF' }}>
                    {slice.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Reports + AI Insight row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Recent reports table — spans 2 cols */}
        <div style={{ gridColumn: 'span 2' }}>
          <GlassPanel>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#A1A1AA',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '1.25rem',
              }}
            >
              Recent Reports
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Title', 'Type', 'Date', 'Grade'].map((col) => (
                      <th
                        key={col}
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: '#52525B',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          textAlign: 'left',
                          padding: '0.5rem 0.75rem',
                          borderBottom: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report, idx) => (
                    <tr
                      key={report.id}
                      style={{
                        borderBottom:
                          idx < reports.length - 1
                            ? '1px solid rgba(255,255,255,0.04)'
                            : 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '0.75rem',
                          fontSize: 14,
                          color: '#FFFFFF',
                          fontWeight: 500,
                          maxWidth: 220,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {report.title}
                      </td>
                      <td style={{ padding: '0.75rem', fontSize: 13, color: '#71717A' }}>
                        {report.type}
                      </td>
                      <td style={{ padding: '0.75rem', fontSize: 13, color: '#71717A', whiteSpace: 'nowrap' }}>
                        {new Date(report.runDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <GradeBadge grade={report.grade} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {reports.length === 0 && (
                <p
                  style={{
                    fontSize: 14,
                    color: '#52525B',
                    textAlign: 'center',
                    padding: '2rem 0',
                    fontStyle: 'italic',
                  }}
                >
                  No reports yet. Generate your first one above.
                </p>
              )}
            </div>
          </GlassPanel>
        </div>

        {/* AI Insight panel */}
        <div>
          <AIInsightPanel content={insightContent} />
        </div>
      </div>
    </div>
  );
}
