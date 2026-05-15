import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchReports } from '@/lib/data/api';
import { mockKPIs } from '@/lib/data/mock';
import type { ReportGrade } from '@/lib/data/types';
import PageHeader from '@/components/growth/PageHeader';
import GlassPanel from '@/components/growth/GlassPanel';
import MetricRow from '@/components/growth/MetricRow';

// ---------------------------------------------------------------------------
// Grade badge (server-renderable)
// ---------------------------------------------------------------------------

const GRADE_BG: Record<ReportGrade, string> = {
  A: '#22C55E',
  B: '#3B82F6',
  C: '#F59E0B',
  D: '#EF4444',
  F: '#71717A',
};

function GradeBadge({ grade }: { grade: ReportGrade }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 26,
        height: 26,
        borderRadius: 9999,
        background: GRADE_BG[grade],
        color: '#fff',
        fontSize: 13,
        fontWeight: 700,
        paddingLeft: 8,
        paddingRight: 8,
        letterSpacing: '0.02em',
        flexShrink: 0,
      }}
    >
      {grade}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

interface ReportDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportDetailPage({ params }: ReportDetailPageProps) {
  const { id } = await params;
  const reports = await fetchReports();
  const report = reports.find((r) => r.id === id);

  if (!report) {
    notFound();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', padding: '2rem' }}>
      {/* Back link */}
      <Link
        href="/reports"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.375rem',
          fontSize: 13,
          color: '#A1A1AA',
          textDecoration: 'none',
          width: 'fit-content',
        }}
      >
        <span style={{ fontSize: 16, lineHeight: 1 }}>←</span> All Reports
      </Link>

      {/* Header */}
      <PageHeader
        title={report.title}
        description={`${report.type} report · ${report.runDate}`}
        actions={<GradeBadge grade={report.grade} />}
      />

      {/* Executive Summary */}
      <GlassPanel>
        <h2
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#FFFFFF',
            marginBottom: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          Executive Summary
        </h2>
        <p style={{ fontSize: 14, color: '#A1A1AA', lineHeight: 1.75, margin: 0 }}>
          Over the reporting period, the platform demonstrated solid momentum across key growth
          vectors with follower acquisition up 26.5% month-over-month driven by accelerated
          TikTok distribution and algorithmic placement on Spotify editorial playlists. Engagement
          held above the 8% threshold, outperforming the indie artist category median by roughly
          2.3 percentage points. Play counts reached 48.7K, reflecting strong content velocity
          from two weekly releases and a resurfaced catalog track that re-entered the daily mix
          algorithm. Revenue experienced a modest 2.4% contraction attributable to a churn spike
          in the Underground+ free-trial cohort; the conversion funnel remains the primary lever
          for recovery in the next cycle.
        </p>
      </GlassPanel>

      {/* KPI grid */}
      <MetricRow
        metrics={mockKPIs.map((k) => ({
          title: k.label,
          value: k.formatted,
          delta: k.delta,
          deltaLabel: k.deltaLabel,
          trend: k.trend,
        }))}
      />

      {/* AI Recommendations */}
      <GlassPanel>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>AI</span>
          </div>
          <h2
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              margin: 0,
            }}
          >
            AI Recommendations
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {[
            'Increase TikTok posting cadence to 3–4 short-form videos per week targeting the 18–24 age cohort. Hook density in the first 2 seconds is the primary driver of saves and shares, which compound into playlist adds.',
            'Launch a 7-day free trial of Underground+ paired with the next single drop. The revenue dip correlates directly with trial expiry churn; a time-limited promotion during peak release attention should restore conversion rate above 4.2%.',
            'Prioritize Spotify smart link placements with pre-save incentives ahead of the Q3 release window. Pre-saves signal playlist-fit to the algorithm and have shown a 1.8× lift in first-week stream velocity compared to cold drops.',
          ].map((rec, i) => (
            <div
              key={i}
              style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}
            >
              <span
                style={{
                  color: '#7C3AED',
                  fontSize: 18,
                  lineHeight: 1.4,
                  flexShrink: 0,
                  fontWeight: 700,
                }}
              >
                •
              </span>
              <p style={{ fontSize: 14, color: '#A1A1AA', lineHeight: 1.65, margin: 0 }}>
                {rec}
              </p>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
