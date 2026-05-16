'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/wizard/reduced-motion';

const SparklesIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 1L9.5 6H14L10.25 9.25L11.5 14L8 11L4.5 14L5.75 9.25L2 6H6.5L8 1Z"
      fill="white"
      fillOpacity="0.9"
    />
  </svg>
);

export interface StartReportCTAProps {
  onClick: () => void;
  label?: string;
}

const BUTTON_STYLE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '16px 32px',
  borderRadius: 999,
  background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
  color: '#fff',
  fontWeight: 700,
  fontSize: 16,
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  letterSpacing: '0.01em',
};

export function StartReportCTA({ onClick, label = 'Start My Report' }: StartReportCTAProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <button style={BUTTON_STYLE} onClick={onClick} type="button">
        <SparklesIcon />
        {label}
      </button>
    );
  }

  return (
    <motion.button
      style={BUTTON_STYLE}
      onClick={onClick}
      type="button"
      whileHover={{
        scale: 1.04,
        boxShadow: '0 0 32px rgba(124,58,237,0.6)',
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <SparklesIcon />
      {label}
    </motion.button>
  );
}

export default StartReportCTA;
