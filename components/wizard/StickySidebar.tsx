'use client';

import * as React from 'react';
import type { WizardStepId } from './WizardStepper';
import type { BriefState } from '@/lib/wizard/use-wizard-state';

export interface StickySidebarProps {
  step: WizardStepId;
  brief: BriefState;
}

const STEP_ORDER: WizardStepId[] = ['brief', 'template', 'generate'];

const INDUSTRY_DOT_COLOR: Record<string, string> = {
  music: '#7C3AED',
  tech: '#2DD4BF',
  fashion: '#EC4899',
  fitness: '#F97316',
  gaming: '#22C55E',
  food: '#EAB308',
  finance: '#3B82F6',
  other: '#94A3B8',
};

function getIndustryColor(industry: string): string {
  const key = industry.toLowerCase().trim();
  for (const [k, v] of Object.entries(INDUSTRY_DOT_COLOR)) {
    if (key.includes(k)) return v;
  }
  return '#94A3B8';
}

export function StickySidebar({ step, brief }: StickySidebarProps) {
  const stepIdx = STEP_ORDER.indexOf(step);
  const progressPct = Math.round(((stepIdx + 1) / 3) * 100);

  return (
    <aside
      aria-label="Report preview"
      style={{
        position: 'sticky',
        top: 24,
        width: '100%',
        display: 'none',
      }}
      className="wizard-sticky-sidebar"
    >
      {/* Panel */}
      <div
        style={{
          background: '#0F1117',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 12,
          padding: '20px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          Report Preview
        </div>

        {/* Entity */}
        <div>
          <div
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              marginBottom: 4,
              fontWeight: 500,
            }}
          >
            Entity
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: brief.entity ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)',
            }}
          >
            {brief.entity || 'Your Entity'}
          </div>
        </div>

        {/* Industry */}
        <div>
          <div
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              marginBottom: 4,
              fontWeight: 500,
            }}
          >
            Industry
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: brief.industry
                  ? getIndustryColor(brief.industry)
                  : 'rgba(255,255,255,0.12)',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: brief.industry ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)',
              }}
            >
              {brief.industry || 'Not selected'}
            </span>
          </div>
        </div>

        {/* Period */}
        <div>
          <div
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              marginBottom: 4,
              fontWeight: 500,
            }}
          >
            Period
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: brief.period ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)',
            }}
          >
            {brief.period || 'Not set'}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* Progress */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
              Progress
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              Step {stepIdx + 1} of 3
            </span>
          </div>
          {/* Progress bar */}
          <div
            style={{
              height: 4,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.06)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
                borderRadius: 2,
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default StickySidebar;
