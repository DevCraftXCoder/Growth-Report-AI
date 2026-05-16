'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizardState } from '@/lib/wizard/use-wizard-state';
import { useReducedMotion } from '@/lib/wizard/reduced-motion';
import { HeroIntro } from './HeroIntro';
import { WizardStepper } from './WizardStepper';
import { StickySidebar } from './StickySidebar';
import '@/styles/wizard.css';

export function WizardShell() {
  const { state, setStep } = useWizardState();
  const prefersReducedMotion = useReducedMotion();
  const [heroVisible, setHeroVisible] = useState(true);

  function handleStart() {
    setStep('brief');
    setHeroVisible(false);
  }

  const builderContent = (
    <div
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '32px 16px',
        boxSizing: 'border-box',
      }}
    >
      <WizardStepper currentStep={state.step} />

      <div style={{ display: 'flex', gap: 24, marginTop: 32 }}>
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* Placeholder — T3/T4/T5 will fill step content here */}
          <div
            className="glass-panel"
            style={{ padding: 32, color: 'rgba(255,255,255,0.6)' }}
          >
            Step: {state.step}
          </div>
        </main>
        <aside
          style={{ width: 260, flexShrink: 0 }}
          aria-label="Report sidebar"
        >
          <StickySidebar step={state.step} brief={state.brief} />
        </aside>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar visibility override */}
      <style>{`
        @media (min-width: 768px) {
          .wizard-sticky-sidebar {
            display: block !important;
          }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {heroVisible ? (
          <HeroIntro key="hero" onStart={handleStart} />
        ) : prefersReducedMotion ? (
          <div key="builder">{builderContent}</div>
        ) : (
          <motion.div
            key="builder"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {builderContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default WizardShell;
