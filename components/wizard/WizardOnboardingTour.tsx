'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/wizard/reduced-motion';

const TOUR_KEY = 'wizard-tour-seen';

const STEPS = [
  {
    title: 'Step through the wizard',
    body: 'Brief → Template → Generate. Takes about 2 minutes.',
  },
  {
    title: 'Live preview updates',
    body: 'Watch your report take shape as you fill in details.',
  },
  {
    title: 'AI picks the best template',
    body: 'Based on your industry, we recommend the perfect starting point.',
  },
];

export function WizardOnboardingTour() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    try {
      const seen = localStorage.getItem(TOUR_KEY);
      if (!seen) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (SSR or private mode) — silently skip tour
    }
  }, []);

  function handleNext() {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      completeTour();
    }
  }

  function completeTour() {
    try {
      localStorage.setItem(TOUR_KEY, 'true');
    } catch {
      // ignore
    }
    setVisible(false);
  }

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  const slideVariants = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
      };

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="tour-card"
          className="glass-panel"
          role="dialog"
          aria-modal="false"
          aria-label="Wizard tour"
          style={{
            position: 'fixed',
            bottom: 160,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 260,
            padding: 20,
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 16 },
              })}
          transition={transition}
        >
          {/* Step dots */}
          <div
            style={{
              display: 'flex',
              gap: 6,
              justifyContent: 'center',
            }}
          >
            {STEPS.map((_, i) => (
              <div
                key={i}
                aria-hidden="true"
                style={{
                  width: i === step ? 18 : 6,
                  height: 6,
                  borderRadius: 999,
                  background:
                    i === step
                      ? 'linear-gradient(135deg,#7C3AED,#EC4899)'
                      : 'rgba(255,255,255,0.15)',
                  transition: 'width 0.25s ease, background 0.25s ease',
                }}
              />
            ))}
          </div>

          {/* Content with per-step animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: slideVariants.initial,
                    animate: slideVariants.animate,
                    exit: slideVariants.exit,
                  })}
              transition={transition}
            >
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#fff',
                  margin: 0,
                }}
              >
                {current.title}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {current.body}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action button */}
          <button
            type="button"
            onClick={handleNext}
            style={{
              padding: '8px 0',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg,#7C3AED,#EC4899)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              textAlign: 'center',
              width: '100%',
            }}
          >
            {isLast ? 'Got it' : 'Next'}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default WizardOnboardingTour;
