'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/wizard/reduced-motion';

const CHIPS = [
  { label: 'Suggest industry', id: 'suggest-industry' },
  { label: 'Improve brief', id: 'improve-brief' },
  { label: 'Pick template', id: 'pick-template' },
];

function SparklesIcon() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 2l1.5 4.5L16 8l-4.5 1.5L10 14l-1.5-4.5L4 8l4.5-1.5L10 2z"
        fill="white"
        opacity={0.9}
      />
      <path
        d="M16 2l.75 2.25L19 5l-2.25.75L16 8l-.75-2.25L13 5l2.25-.75L16 2z"
        fill="white"
        opacity={0.6}
      />
      <path
        d="M4 13l.6 1.8L6.4 15.4l-1.8.6L4 17.8l-.6-1.8L1.6 15.4l1.8-.6L4 13z"
        fill="white"
        opacity={0.5}
      />
    </svg>
  );
}

export function AIAssistantFab() {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const panelVariants = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.96 },
      };

  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 88,
        right: 24,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 12,
      }}
    >
      {/* Side panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="ai-panel"
            className="glass-panel"
            style={{
              width: 280,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: panelVariants.initial,
                  animate: panelVariants.animate,
                  exit: panelVariants.exit,
                })}
            transition={panelTransition}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '0.02em',
                }}
              >
                AI Assistant
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close AI Assistant"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: 18,
                  lineHeight: 1,
                  padding: '2px 4px',
                  borderRadius: 4,
                }}
              >
                ×
              </button>
            </div>

            {/* Quick-action chips */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              {CHIPS.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  style={{
                    background: 'rgba(124,58,237,0.12)',
                    border: '1px solid rgba(124,58,237,0.25)',
                    borderRadius: 8,
                    padding: '9px 14px',
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.15s ease, border-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      'rgba(124,58,237,0.2)';
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      'rgba(124,58,237,0.45)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      'rgba(124,58,237,0.12)';
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      'rgba(124,58,237,0.25)';
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <motion.button
        type="button"
        aria-label={open ? 'Close AI Assistant' : 'Open AI Assistant'}
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: 'linear-gradient(135deg,#7C3AED,#EC4899)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(124,58,237,0.45)',
          flexShrink: 0,
        }}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
      >
        <SparklesIcon />
      </motion.button>
    </div>
  );
}

export default AIAssistantFab;
