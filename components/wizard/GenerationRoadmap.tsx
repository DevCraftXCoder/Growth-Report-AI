'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/wizard/reduced-motion';
import '@/styles/wizard.css';

const STAGES = [
  'Analyzing Brief',
  'Matching Data Sources',
  'Generating Insights',
  'Formatting Report',
] as const;

export interface GenerationRoadmapProps {
  activeStage: number; // 0-3 active, -1 idle
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2.5 7L5.5 10L11.5 4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StageNode({
  index,
  label,
  activeStage,
  prefersReducedMotion,
}: {
  index: number;
  label: string;
  activeStage: number;
  prefersReducedMotion: boolean;
}) {
  const isCompleted = activeStage > index;
  const isActive = activeStage === index;
  const isPending = activeStage < index;

  const nodeStyle: React.CSSProperties = {
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    position: 'relative',
    zIndex: 1,
    transition: 'background 0.3s ease, box-shadow 0.3s ease',
    ...(isCompleted
      ? {
          background: 'linear-gradient(135deg, #22C55E, #16A34A)',
          color: 'white',
        }
      : isActive
      ? {
          background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
          color: 'white',
          boxShadow: '0 0 0 4px rgba(124,58,237,0.2)',
        }
      : {
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.3)',
        }),
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.03em',
    textAlign: 'center',
    color: isCompleted
      ? '#22C55E'
      : isActive
      ? 'rgba(255,255,255,0.9)'
      : 'rgba(255,255,255,0.3)',
    transition: 'color 0.3s ease',
    whiteSpace: 'nowrap',
  };

  // Spinning ring overlay for active node (non-reduced-motion only)
  const spinningRing =
    isActive && !prefersReducedMotion ? (
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          background:
            'conic-gradient(from 0deg, rgba(124,58,237,0.8), rgba(236,72,153,0.8), rgba(124,58,237,0))',
          zIndex: 0,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      />
    ) : null;

  const nodeContent = isCompleted ? (
    <CheckIcon />
  ) : (
    <span style={{ fontSize: 13, fontWeight: 700, lineHeight: 1 }}>{index + 1}</span>
  );

  const pulseProps =
    isActive && !prefersReducedMotion
      ? {
          animate: { scale: [1, 1.1, 1] },
          transition: { duration: 1.0, repeat: Infinity, ease: 'easeInOut' as const },
        }
      : {};

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <div style={{ position: 'relative', width: 36, height: 36 }}>
        {spinningRing}
        <motion.div style={{ ...nodeStyle, position: 'relative', zIndex: 1 }} {...pulseProps}>
          {nodeContent}
        </motion.div>
      </div>
      <span style={labelStyle}>{label}</span>
    </div>
  );
}

function ConnectorLine({
  index,
  activeStage,
}: {
  index: number;
  activeStage: number;
}) {
  const isFilled = activeStage > index;

  return (
    <div
      style={{
        flex: 1,
        height: 2,
        borderRadius: 2,
        background: isFilled
          ? 'linear-gradient(90deg, #7C3AED, #EC4899)'
          : 'rgba(255,255,255,0.08)',
        transition: 'background 0.4s ease',
        margin: '0 4px',
        // Vertically center with the node circle (offset for label below)
        marginBottom: 28,
        alignSelf: 'flex-start',
        marginTop: 18,
      }}
    />
  );
}

export function GenerationRoadmap({ activeStage }: GenerationRoadmapProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      role="status"
      aria-label="Report generation progress"
      aria-live="polite"
    >
      {/* Desktop: horizontal row. Mobile: vertical column */}
      <div
        className="roadmap-layout"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          width: '100%',
        }}
      >
        {STAGES.map((label, idx) => {
          const isLast = idx === STAGES.length - 1;
          return (
            <React.Fragment key={label}>
              <StageNode
                index={idx}
                label={label}
                activeStage={activeStage}
                prefersReducedMotion={prefersReducedMotion}
              />
              {!isLast && (
                <ConnectorLine index={idx} activeStage={activeStage} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Screen-reader stage announcement */}
      <span className="sr-only">
        {activeStage >= 0 && activeStage < STAGES.length
          ? `Stage ${activeStage + 1} of ${STAGES.length}: ${STAGES[activeStage]}`
          : activeStage >= STAGES.length
          ? 'All stages complete'
          : 'Generation not started'}
      </span>

      <style>{`
        .roadmap-layout {
          flex-direction: row;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border: 0;
        }
        @media (max-width: 600px) {
          .roadmap-layout {
            flex-direction: column;
            align-items: flex-start;
          }
          .roadmap-layout > div {
            flex-direction: row !important;
            align-items: center;
            gap: 12px;
          }
          .roadmap-connector {
            width: 2px;
            height: 24px;
            margin: 4px 17px;
          }
        }
      `}</style>
    </div>
  );
}

export default GenerationRoadmap;
