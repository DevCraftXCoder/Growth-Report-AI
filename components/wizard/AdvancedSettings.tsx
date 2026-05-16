'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import '@/styles/wizard.css';

interface AdvancedSettingsProps {
  open: boolean;
  onToggle: () => void;
}

type Tone = 'Professional' | 'Casual' | 'Technical';
type ChartStyle = 'Modern' | 'Classic' | 'Minimal';

export function AdvancedSettings({ open, onToggle }: AdvancedSettingsProps) {
  const [tone, setTone] = useState<Tone>('Professional');
  const [chartStyle, setChartStyle] = useState<ChartStyle>('Modern');
  const [includeBenchmarks, setIncludeBenchmarks] = useState(true);

  const tones: Tone[] = ['Professional', 'Casual', 'Technical'];
  const chartStyles: ChartStyle[] = ['Modern', 'Classic', 'Minimal'];

  return (
    <div
      className="glass-panel"
      style={{ overflow: 'hidden' }}
    >
      {/* Toggle header */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 18px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.7)',
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
          </svg>
          Advanced Settings
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>

      {/* Collapsible content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="advanced-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '4px 18px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Tone selector */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                  Tone
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {tones.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      style={{
                        flex: 1,
                        padding: '8px 0',
                        borderRadius: 8,
                        border: tone === t
                          ? '1px solid rgba(124,58,237,0.6)'
                          : '1px solid rgba(255,255,255,0.08)',
                        background: tone === t
                          ? 'rgba(124,58,237,0.15)'
                          : 'rgba(255,255,255,0.03)',
                        color: tone === t ? '#C084FC' : 'rgba(255,255,255,0.5)',
                        fontSize: 13,
                        fontWeight: tone === t ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart style selector */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                  Chart Style
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {chartStyles.map((s) => (
                    <button
                      key={s}
                      onClick={() => setChartStyle(s)}
                      style={{
                        flex: 1,
                        padding: '8px 0',
                        borderRadius: 8,
                        border: chartStyle === s
                          ? '1px solid rgba(236,72,153,0.6)'
                          : '1px solid rgba(255,255,255,0.08)',
                        background: chartStyle === s
                          ? 'rgba(236,72,153,0.12)'
                          : 'rgba(255,255,255,0.03)',
                        color: chartStyle === s ? '#F472B6' : 'rgba(255,255,255,0.5)',
                        fontSize: 13,
                        fontWeight: chartStyle === s ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Include benchmarks toggle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                    Include Benchmarks
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                    Compare against industry averages
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={includeBenchmarks}
                  onClick={() => setIncludeBenchmarks((v) => !v)}
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 999,
                    border: 'none',
                    cursor: 'pointer',
                    background: includeBenchmarks
                      ? 'linear-gradient(135deg, #7C3AED, #EC4899)'
                      : 'rgba(255,255,255,0.1)',
                    position: 'relative',
                    flexShrink: 0,
                    transition: 'background 0.2s ease',
                    padding: 0,
                  }}
                >
                  <motion.span
                    animate={{ x: includeBenchmarks ? 22 : 2 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    style={{
                      display: 'block',
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: '#fff',
                      position: 'absolute',
                      top: 2,
                      left: 0,
                    }}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
