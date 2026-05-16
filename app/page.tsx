'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, FileText, Shuffle } from 'lucide-react';
import { LiveChart } from '@/components/wizard/LiveChart';
import { useReducedMotion } from '@/lib/wizard/reduced-motion';

const SKELETON_SECTIONS = [
  'Executive Summary',
  'Market Position',
  'Revenue Trends',
  'Audience Insights',
  'Channel Performance',
  'Competitor Analysis',
];

const PROOF_PILLS = [
  { icon: <TrendingUp size={12} aria-hidden="true" />, label: '10K+ reports generated', delay: 0.1 },
  { icon: <FileText size={12} aria-hidden="true" />, label: '15 sections', delay: 0.22 },
  { icon: <Shuffle size={12} aria-hidden="true" />, label: '60-second turnaround', delay: 0.34 },
];

export default function LandingPage() {
  const reduced = useReducedMotion();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#07070A',
        color: '#FFFFFF',
        fontFamily: 'var(--font-inter, Inter, sans-serif)',
        position: 'relative',
      }}
    >
      {/* Ambient glow background */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.22) 0%, transparent 70%),' +
            'radial-gradient(ellipse 60% 40% at 80% 80%, rgba(236,72,153,0.12) 0%, transparent 60%)',
        }}
      />

      {/* Nav */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(7,7,10,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            padding: '0 1.5rem',
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src="/images/growth-report-ai-logo.png" alt="" width={28} height={28} style={{ display: 'block' }} />
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: '#fff', letterSpacing: '-0.01em' }}>
              Growth Report AI
            </span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link href="/login" style={{ fontSize: 14, fontWeight: 500, color: '#A1A1AA', textDecoration: 'none', padding: '0.4rem 0.75rem', borderRadius: 8 }}>
              Sign In
            </Link>
            <Link
              href="/new"
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#fff',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: 10,
                background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                boxShadow: '0 0 16px rgba(124,58,237,0.35)',
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero — mirrors MizzyTools PanelGrowthReport idle hero */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 900,
          margin: '0 auto',
          padding: '48px 32px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ marginBottom: 32 }}
        >
          <img
            src="/images/growth-report-ai-logo.png"
            alt="Growth Report AI"
            width={120}
            height={120}
            style={{ display: 'block', filter: 'drop-shadow(0 0 24px rgba(236,72,153,0.45)) drop-shadow(0 0 48px rgba(124,58,237,0.35))' }}
            draggable={false}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            margin: '0 0 20px',
            background: 'linear-gradient(135deg, #ffffff 0%, #EC4899 40%, #A78BFA 80%, #7C3AED 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Growth Report AI
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: 'easeOut' }}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 19,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 580,
            lineHeight: 1.6,
            margin: '0 0 28px',
          }}
        >
          Turn 5 inputs into a 15-section growth blueprint &mdash;
          <br />
          benchmarks, audit, and strategy generated in 60 seconds.
        </motion.p>

        {/* Proof chips */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            flexWrap: 'wrap',
            marginBottom: 28,
          }}
        >
          {PROOF_PILLS.map(({ icon, label, delay }) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay, ease: 'easeOut' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 12,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.7)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 9999,
              }}
            >
              {icon}
              {label}
            </motion.span>
          ))}
        </div>

        {/* Growth Trajectory chart card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32, ease: 'easeOut' }}
          style={{
            width: '100%',
            maxWidth: 600,
            margin: '0 auto 20px',
            padding: '14px 16px 8px',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 0 60px rgba(236,72,153,0.15), 0 0 120px rgba(124,58,237,0.12), 0 16px 48px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
              Growth Trajectory
            </span>
          </div>
          <LiveChart height={148} />
        </motion.div>

        {/* "15 sections in 60 seconds" timeline card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.42, ease: 'easeOut' }}
          style={{ width: '100%' }}
        >
          <div
            aria-label="Report sections preview"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              margin: '0 auto',
              padding: '16px 20px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14,
              maxWidth: 480,
              width: '100%',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              boxSizing: 'border-box',
            }}
          >
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
              15 sections in 60 seconds
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
              {SKELETON_SECTIONS.map((s, i) => (
                <span
                  key={s}
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.55)',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 6,
                    padding: '3px 8px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {i + 1}. {s}
                </span>
              ))}
              <span style={{ fontSize: 11, color: '#e94560', fontWeight: 600, alignSelf: 'center' }}>
                + 9 more sections →
              </span>
            </div>
          </div>
        </motion.div>

        {/* Glowing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.52, ease: 'easeOut' }}
          style={{ marginTop: 28 }}
        >
          <Link
            href="/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 32px',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 16,
              fontWeight: 600,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
              border: 'none',
              borderRadius: 14,
              textDecoration: 'none',
              boxShadow: '0 0 32px rgba(124,58,237,0.55), 0 0 64px rgba(236,72,153,0.35)',
              animation: reduced ? 'none' : 'gr-cta-pulse 3s ease-in-out infinite',
              transition: 'transform 0.18s ease-out, filter 0.18s ease-out',
            }}
          >
            Generate Report
          </Link>
        </motion.div>

        {/* Animated dashboard preview — bar chart + trend line */}
        <div
          aria-hidden
          style={{
            width: '100%',
            maxWidth: 720,
            margin: '36px auto 0',
            borderRadius: 16,
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 0 60px rgba(236,72,153,0.18), 0 0 120px rgba(124,58,237,0.15), 0 24px 64px rgba(0,0,0,0.5)',
          }}
        >
          <svg
            viewBox="0 0 720 200"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            <defs>
              <linearGradient id="dash-bar-pink" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff5c8a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#e94560" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="dash-bar-purple" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#5227ff" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id="dash-area" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff5c8a" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ff5c8a" stopOpacity="0" />
              </linearGradient>
              <filter id="dash-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
              <line x1="60" y1="40" x2="660" y2="40" />
              <line x1="60" y1="80" x2="660" y2="80" />
              <line x1="60" y1="120" x2="660" y2="120" />
              <line x1="60" y1="160" x2="660" y2="160" />
            </g>
            <g fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="JetBrains Mono, monospace" textAnchor="end">
              <text x="52" y="44">100</text>
              <text x="52" y="84">75</text>
              <text x="52" y="124">50</text>
              <text x="52" y="164">25</text>
            </g>
            <g fill="url(#dash-bar-purple)" filter="url(#dash-glow)">
              <rect x="90" y="90" width="44" height="70" rx="4" />
              <rect x="160" y="65" width="44" height="95" rx="4" />
              <rect x="230" y="105" width="44" height="55" rx="4" />
              <rect x="300" y="45" width="44" height="115" rx="4" />
              <rect x="370" y="30" width="44" height="130" rx="4" />
            </g>
            <g fill="url(#dash-bar-pink)" filter="url(#dash-glow)">
              <rect x="100" y="105" width="24" height="55" rx="3" />
              <rect x="170" y="85" width="24" height="75" rx="3" />
              <rect x="240" y="120" width="24" height="40" rx="3" />
              <rect x="310" y="70" width="24" height="90" rx="3" />
              <rect x="380" y="50" width="24" height="110" rx="3" />
            </g>
            <path
              d="M440 145 C480 130 520 110 560 85 600 60 640 38 660 30"
              fill="none"
              stroke="#ff5c8a"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#dash-glow)"
            />
            <path
              d="M440 145 C480 130 520 110 560 85 600 60 640 38 660 30 L660 160 L440 160 Z"
              fill="url(#dash-area)"
            />
            <circle cx="660" cy="30" r="5" fill="#ff5c8a" filter="url(#dash-glow)" />
            <g fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              <text x="112" y="180">Jan</text>
              <text x="182" y="180">Feb</text>
              <text x="252" y="180">Mar</text>
              <text x="322" y="180">Apr</text>
              <text x="392" y="180">May</text>
              <text x="550" y="180">Trend</text>
            </g>
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: '#3F3F46' }}>&copy; 2025 Growth Report AI. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes gr-cta-pulse {
          0%, 100% { box-shadow: 0 0 32px rgba(124,58,237,0.55), 0 0 64px rgba(236,72,153,0.35); }
          50%      { box-shadow: 0 0 48px rgba(124,58,237,0.75), 0 0 96px rgba(236,72,153,0.5); }
        }
        @media (max-width: 768px) {
          section { padding-left: 1rem !important; padding-right: 1rem !important; }
        }
      `}</style>
    </div>
  );
}
