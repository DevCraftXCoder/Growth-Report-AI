'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import type { Template } from '@/lib/data/templates';
import '@/styles/wizard.css';

interface SampleReportPeekProps {
  template: Template | null;
  onClose: () => void;
}

export function SampleReportPeek({ template, onClose }: SampleReportPeekProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {template && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(7,7,10,0.75)',
              backdropFilter: 'blur(4px)',
              zIndex: 50,
            }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="glass-panel"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: 520,
              maxHeight: '80vh',
              overflowY: 'auto',
              zIndex: 51,
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div
                  style={{
                    display: 'inline-block',
                    width: 4,
                    height: 18,
                    borderRadius: 2,
                    background: template.previewColor,
                    marginRight: 10,
                    verticalAlign: 'middle',
                  }}
                />
                <h2
                  style={{
                    display: 'inline',
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#fff',
                    verticalAlign: 'middle',
                  }}
                >
                  {template.name}
                </h2>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                  {template.description}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close preview"
                style={{
                  flexShrink: 0,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  fontSize: 18,
                  lineHeight: 1,
                  padding: '4px 10px',
                }}
              >
                ×
              </button>
            </div>

            {/* Sections list */}
            <div>
              <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Report Sections
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {template.sections.map((section, i) => (
                  <div
                    key={section}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 14px',
                      borderRadius: 8,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        background: `${template.previewColor}20`,
                        border: `1px solid ${template.previewColor}50`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        fontWeight: 700,
                        color: template.previewColor,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{section}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mock bar chart placeholder */}
            <div
              style={{
                padding: '16px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <p style={{ margin: '0 0 12px', fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Sample Chart Preview
              </p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 64 }}>
                {[45, 72, 55, 88, 63, 94, 78].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      borderRadius: '4px 4px 0 0',
                      background: `linear-gradient(180deg, ${template.previewColor}cc, ${template.previewColor}44)`,
                    }}
                  />
                ))}
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
                    {d}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer note */}
            <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
              AI-generated content will replace placeholder data
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
