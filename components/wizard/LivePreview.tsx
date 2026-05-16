'use client';

import { useEffect, useState } from 'react';
import type { BriefState } from '@/lib/wizard/use-wizard-state';
import { useIndustryAccent } from '@/lib/wizard/use-industry-accent';

interface LivePreviewProps {
  brief: BriefState;
}

const SECTION_HEADERS = ['Executive Summary', 'Growth Metrics', 'Key Insights'];

function formatPeriod(period: string): string {
  if (!period) return 'All time';
  return period;
}

export function LivePreview({ brief }: LivePreviewProps) {
  const [displayed, setDisplayed] = useState<BriefState>(brief);
  const accent = useIndustryAccent(displayed.industry);

  // Debounce display updates 300ms
  useEffect(() => {
    const id = setTimeout(() => {
      setDisplayed(brief);
    }, 300);
    return () => clearTimeout(id);
  }, [brief]);

  const panelStyle: React.CSSProperties = {
    boxShadow: displayed.industry ? `0 0 20px ${accent.glow}` : undefined,
    transition: 'box-shadow 0.3s ease',
  };

  return (
    <div className="live-preview-panel" style={panelStyle}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Report Preview
        </span>
        {displayed.industry && (
          <span
            aria-label={`${displayed.industry} industry`}
            style={{
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: accent.ring,
              boxShadow: `0 0 6px ${accent.glow}`,
            }}
          />
        )}
      </div>

      {/* Entity */}
      <div style={{ marginBottom: 12 }}>
        <p
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: displayed.entity ? '#fff' : 'rgba(255,255,255,0.2)',
            marginBottom: 4,
          }}
        >
          {displayed.entity || 'Your Entity'}
        </p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
          {formatPeriod(displayed.period)}
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: 'rgba(255,255,255,0.06)',
          marginBottom: 16,
        }}
      />

      {/* Mock section headers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SECTION_HEADERS.map((header) => (
          <div key={header}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.35)',
                marginBottom: 6,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {header}
            </p>
            {/* Placeholder lines */}
            <div
              className="skeleton"
              style={{ height: 8, width: '100%', marginBottom: 4 }}
            />
            <div
              className="skeleton"
              style={{ height: 8, width: '75%' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
