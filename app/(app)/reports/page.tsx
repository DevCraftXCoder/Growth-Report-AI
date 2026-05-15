'use client';

import * as React from 'react';
import Link from 'next/link';
import type { ReportSummary, ReportGrade } from '@/lib/data/types';
import GlassPanel from '@/components/growth/GlassPanel';
import GradientButton from '@/components/growth/GradientButton';
import EmptyState from '@/components/growth/EmptyState';
import PageHeader from '@/components/growth/PageHeader';

// ---------------------------------------------------------------------------
// FilterBar
// ---------------------------------------------------------------------------

type FilterOption = 'all' | 'monthly' | 'quarterly' | 'platform' | 'campaign';

const FILTERS: { label: string; value: FilterOption }[] = [
  { label: 'All',       value: 'all' },
  { label: 'Monthly',   value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Platform',  value: 'platform' },
  { label: 'Campaign',  value: 'campaign' },
];

function FilterBar({
  active,
  onChange,
}: {
  active: FilterOption;
  onChange: (v: FilterOption) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {FILTERS.map((f) => {
        const isActive = f.value === active;
        return (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: 32,
              paddingLeft: 14,
              paddingRight: 14,
              borderRadius: 9999,
              border: isActive ? 'none' : '1px solid rgba(255,255,255,0.10)',
              background: isActive
                ? 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)'
                : 'transparent',
              color: isActive ? '#FFFFFF' : '#A1A1AA',
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Badges
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
        minWidth: 22,
        height: 22,
        borderRadius: 9999,
        background: GRADE_BG[grade],
        color: '#fff',
        fontSize: 11,
        fontWeight: 700,
        paddingLeft: 6,
        paddingRight: 6,
        letterSpacing: '0.02em',
      }}
    >
      {grade}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 20,
        borderRadius: 9999,
        border: '1px solid rgba(255,255,255,0.12)',
        color: '#A1A1AA',
        fontSize: 10,
        fontWeight: 600,
        paddingLeft: 8,
        paddingRight: 8,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}
    >
      {type}
    </span>
  );
}

// ---------------------------------------------------------------------------
// ReportRow
// ---------------------------------------------------------------------------

function ReportRow({ report, isLast }: { report: ReportSummary; isLast: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.06)',
        flexWrap: 'wrap',
      }}
    >
      {/* Left: title + type badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0, flex: 1 }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#FFFFFF',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {report.title}
        </span>
        <TypeBadge type={report.type} />
      </div>

      {/* Right: date | grade | view */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flexShrink: 0 }}>
        <span style={{ fontSize: 12, color: '#71717A' }}>{report.runDate}</span>
        <GradeBadge grade={report.grade} />
        <Link
          href={`/reports/${report.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            height: 30,
            paddingLeft: 12,
            paddingRight: 12,
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.10)',
            fontSize: 12,
            fontWeight: 500,
            color: '#FFFFFF',
            textDecoration: 'none',
          }}
        >
          View
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ReportsContent — owns filter state
// ---------------------------------------------------------------------------

function ReportsContent({ reports }: { reports: ReportSummary[] }) {
  const [active, setActive] = React.useState<FilterOption>('all');

  const filtered =
    active === 'all' ? reports : reports.filter((r) => r.type === active);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <FilterBar active={active} onChange={setActive} />

      <GlassPanel padding="0 1.5rem">
        {filtered.length === 0 ? (
          <EmptyState
            title="No reports found"
            description={
              active === 'all'
                ? 'Generate your first AI growth report to see insights here.'
                : `No ${active} reports yet.`
            }
            cta={
              <Link href="/reports/new" style={{ textDecoration: 'none' }}>
                <GradientButton size="sm">+ New Report</GradientButton>
              </Link>
            }
          />
        ) : (
          filtered.map((report, i) => (
            <ReportRow
              key={report.id}
              report={report}
              isLast={i === filtered.length - 1}
            />
          ))
        )}
      </GlassPanel>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page — 'use client' loads data via dynamic import on mount
// ---------------------------------------------------------------------------

export default function ReportsPage() {
  const [reports, setReports] = React.useState<ReportSummary[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    import('@/lib/data/api').then(({ fetchReports }) =>
      fetchReports().then((data) => {
        setReports(data);
        setLoading(false);
      })
    );
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
      <PageHeader
        title="Reports"
        description="AI-generated growth reports and analytics"
        actions={
          <Link href="/reports/new" style={{ textDecoration: 'none' }}>
            <GradientButton size="sm">+ New Report</GradientButton>
          </Link>
        }
      />

      {loading ? (
        <GlassPanel>
          <div style={{ color: '#71717A', fontSize: 14, textAlign: 'center', padding: '2rem 0' }}>
            Loading reports…
          </div>
        </GlassPanel>
      ) : (
        <ReportsContent reports={reports} />
      )}
    </div>
  );
}
