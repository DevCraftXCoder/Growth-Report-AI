'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/wizard/reduced-motion';
import { LiveChart } from './LiveChart';
import { StartReportCTA } from './StartReportCTA';
import '@/styles/wizard.css';

export interface HeroIntroProps {
  onStart: () => void;
}

const AVATAR_COLORS = ['#7C3AED', '#EC4899', '#2DD4BF'] as const;

const HEADLINE_STYLE: React.CSSProperties = {
  fontFamily: 'Syne, sans-serif',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  lineHeight: 1.15,
  margin: 0,
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] as const },
  },
};

export function HeroIntro({ onStart }: HeroIntroProps) {
  const prefersReducedMotion = useReducedMotion();

  const content = (
    <div
      style={{
        minHeight: '100vh',
        background: '#07070A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 16px',
        boxSizing: 'border-box',
      }}
    >
      {/* Badge */}
      <div
        className={prefersReducedMotion ? undefined : 'pulse-glow'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 16px',
          borderRadius: 999,
          border: '1px solid transparent',
          backgroundImage:
            'linear-gradient(#07070A, #07070A), linear-gradient(135deg, #7C3AED, #EC4899)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          fontSize: 12,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.75)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          marginBottom: 32,
          ...(prefersReducedMotion
            ? {}
            : ({ '--glow-color': 'rgba(124,58,237,0.4)' } as React.CSSProperties)),
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
            flexShrink: 0,
          }}
        />
        AI-Powered Growth Analytics
      </div>

      {/* Headline */}
      <h1
        style={{
          ...HEADLINE_STYLE,
          fontSize: 'clamp(32px, 5vw, 48px)',
          textAlign: 'center',
          maxWidth: 660,
          marginBottom: 20,
        }}
      >
        Turn Your Growth Data Into Strategy
      </h1>

      {/* Subheadline */}
      <p
        style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: 16,
          lineHeight: 1.6,
          textAlign: 'center',
          maxWidth: 520,
          margin: '0 auto 40px',
        }}
      >
        Generate professional growth reports in 3 steps.{' '}
        AI-powered insights, beautiful templates.
      </p>

      {/* LiveChart inside glass panel */}
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: 540,
          marginBottom: 40,
          padding: '24px 20px 16px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          Monthly Growth Preview
        </div>
        <LiveChart height={160} />
      </div>

      {/* CTA */}
      <div style={{ marginBottom: 32 }}>
        <StartReportCTA onClick={onStart} />
      </div>

      {/* Social proof */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          color: 'rgba(255,255,255,0.35)',
          fontSize: 13,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {AVATAR_COLORS.map((color, i) => (
            <div
              key={color}
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: color,
                border: '2px solid #07070A',
                marginLeft: i === 0 ? 0 : -8,
                flexShrink: 0,
              }}
            />
          ))}
        </div>
        <span>Trusted by 1,200+ creators</span>
      </div>
    </div>
  );

  if (prefersReducedMotion) {
    return <div style={{ display: 'contents' }}>{content}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        layoutId="hero-container"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        style={{ display: 'contents' }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}

export default HeroIntro;
