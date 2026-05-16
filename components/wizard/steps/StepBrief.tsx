'use client';

import { motion } from 'framer-motion';
import { useWizardState } from '@/lib/wizard/use-wizard-state';
import { IndustryPill, INDUSTRIES } from '@/components/wizard/IndustryPill';
import { LivePreview } from '@/components/wizard/LivePreview';
import '@/styles/wizard.css';

const PERIOD_OPTIONS = [
  'Q1 2024',
  'Q2 2024',
  'Q3 2024',
  'Q4 2024',
  'H1 2024',
  'H2 2024',
  'Full Year 2024',
];

export function StepBrief() {
  const { state, setStep, updateBrief } = useWizardState();
  const { brief } = state;

  const canProceed = brief.industry !== '';

  const buttonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 28px',
    borderRadius: 999,
    border: 'none',
    cursor: canProceed ? 'pointer' : 'not-allowed',
    fontSize: 14,
    fontWeight: 600,
    background: canProceed
      ? 'linear-gradient(135deg,#7C3AED,#EC4899)'
      : 'rgba(255,255,255,0.08)',
    color: canProceed ? '#fff' : 'rgba(255,255,255,0.3)',
    transition: 'opacity 0.2s, transform 0.15s',
    opacity: canProceed ? 1 : 0.5,
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: 32,
        alignItems: 'start',
      }}
      className="step-brief-grid"
    >
      {/* ── Left column: form ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Mode toggle */}
        <div>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.4)',
              marginBottom: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Input mode
          </p>
          <div
            style={{
              position: 'relative',
              display: 'inline-flex',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 999,
              padding: 4,
              gap: 4,
            }}
          >
            {[
              { label: 'Use Form', value: false },
              { label: 'Use Brief', value: true },
            ].map(({ label, value }) => {
              const isActive = brief.useBriefMode === value;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => updateBrief({ useBriefMode: value })}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    padding: '6px 18px',
                    borderRadius: 999,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                    transition: 'color 0.2s',
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="brief-toggle"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 999,
                        background: 'linear-gradient(135deg,#7C3AED,#EC4899)',
                        zIndex: -1,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mode-dependent fields */}
        {brief.useBriefMode ? (
          <div>
            <label
              htmlFor="brief-text"
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 8,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Brief
            </label>
            <textarea
              id="brief-text"
              value={brief.briefText}
              onChange={(e) => updateBrief({ briefText: e.target.value })}
              placeholder="Describe your growth goals in plain language..."
              rows={5}
              style={{
                width: '100%',
                minHeight: 120,
                padding: '12px 14px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                color: '#fff',
                fontSize: 14,
                lineHeight: 1.6,
                resize: 'vertical',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Entity name */}
            <div>
              <label
                htmlFor="entity-name"
                style={{
                  display: 'block',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: 8,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Entity name
              </label>
              <input
                id="entity-name"
                type="text"
                value={brief.entity}
                onChange={(e) => updateBrief({ entity: e.target.value })}
                placeholder="Brand, artist, company…"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  color: '#fff',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Period */}
            <div>
              <label
                htmlFor="period-select"
                style={{
                  display: 'block',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: 8,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Period
              </label>
              <select
                id="period-select"
                value={brief.period}
                onChange={(e) => updateBrief({ period: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  color: brief.period ? '#fff' : 'rgba(255,255,255,0.35)',
                  fontSize: 14,
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                  boxSizing: 'border-box',
                }}
              >
                <option value="" disabled style={{ background: '#12141C' }}>
                  Select period…
                </option>
                {PERIOD_OPTIONS.map((p) => (
                  <option key={p} value={p} style={{ background: '#12141C', color: '#fff' }}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Industry pills */}
        <div>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.4)',
              marginBottom: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Industry
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {INDUSTRIES.map(({ id, label, icon }) => (
              <IndustryPill
                key={id}
                industry={label}
                icon={icon}
                active={brief.industry === id}
                onClick={() => updateBrief({ industry: id })}
              />
            ))}
          </div>
          {!canProceed && (
            <p
              style={{
                marginTop: 8,
                fontSize: 12,
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              Select an industry to continue.
            </p>
          )}
        </div>

        {/* Next button */}
        <div>
          <button
            type="button"
            disabled={!canProceed}
            onClick={() => canProceed && setStep('template')}
            style={buttonStyle}
            className="step-brief-next-btn"
          >
            Next: Choose Template
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* ── Right column: live preview (desktop only) ── */}
      <div className="step-brief-preview">
        <LivePreview brief={brief} />
      </div>

      {/* Responsive styles via a scoped <style> tag */}
      <style>{`
        .step-brief-grid {
          grid-template-columns: 1fr 340px;
        }
        @media (max-width: 767px) {
          .step-brief-grid {
            grid-template-columns: 1fr !important;
          }
          .step-brief-preview {
            display: none !important;
          }
          .step-brief-next-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}

export default StepBrief;
