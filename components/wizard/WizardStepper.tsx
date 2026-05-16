'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/wizard/reduced-motion';

export type WizardStepId = 'brief' | 'template' | 'generate';

export interface WizardStepperProps {
  currentStep: WizardStepId;
}

const STEPS: Array<{ id: WizardStepId; label: string }> = [
  { id: 'brief', label: 'Brief' },
  { id: 'template', label: 'Template' },
  { id: 'generate', label: 'Generate' },
];

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

function getStepStatus(
  stepId: WizardStepId,
  currentStep: WizardStepId
): 'active' | 'complete' | 'inactive' {
  const order: WizardStepId[] = ['brief', 'template', 'generate'];
  const currentIdx = order.indexOf(currentStep);
  const stepIdx = order.indexOf(stepId);
  if (stepIdx === currentIdx) return 'active';
  if (stepIdx < currentIdx) return 'complete';
  return 'inactive';
}

export function WizardStepper({ currentStep }: WizardStepperProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <nav
      aria-label="Wizard steps"
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 480,
        margin: '0 auto',
      }}
    >
      {STEPS.map((step, idx) => {
        const status = getStepStatus(step.id, currentStep);
        const isLast = idx === STEPS.length - 1;

        const nodeContent =
          status === 'complete' ? (
            <CheckIcon />
          ) : (
            <span style={{ fontSize: 13, fontWeight: 700, lineHeight: 1 }}>
              {idx + 1}
            </span>
          );

        const nodeStyle: React.CSSProperties = {
          width: 32,
          height: 32,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
          zIndex: 1,
          ...(status === 'active'
            ? {
                background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                boxShadow: '0 0 0 3px rgba(124,58,237,0.25)',
                color: 'white',
              }
            : status === 'complete'
            ? {
                background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                color: 'white',
              }
            : {
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.3)',
              }),
        };

        const node =
          status === 'active' && !prefersReducedMotion ? (
            <motion.div layoutId="stepper-active" style={nodeStyle}>
              {nodeContent}
            </motion.div>
          ) : (
            <div style={nodeStyle}>{nodeContent}</div>
          );

        const lineStyle: React.CSSProperties = {
          flex: 1,
          height: 1,
          background:
            status === 'complete'
              ? 'linear-gradient(90deg, #7C3AED, #EC4899)'
              : 'rgba(255,255,255,0.08)',
          margin: '0 4px',
        };

        return (
          <React.Fragment key={step.id}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              {node}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color:
                    status === 'active'
                      ? 'rgba(255,255,255,0.9)'
                      : status === 'complete'
                      ? 'rgba(255,255,255,0.5)'
                      : 'rgba(255,255,255,0.25)',
                  whiteSpace: 'nowrap',
                }}
              >
                {step.label}
              </span>
            </div>
            {!isLast && <div style={lineStyle} />}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default WizardStepper;
