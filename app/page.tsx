'use client';

import * as React from 'react';
import Link from 'next/link';
import { TrendingUp, BarChart3, FileText } from 'lucide-react';
import {
  motion,
  useInView,
  useMotionValue,
  animate,
  type Variants,
} from 'framer-motion';
import Logo from '@/components/growth/Logo';
import GradientButton from '@/components/growth/GradientButton';
import { LiveChart } from '@/components/wizard/LiveChart';
import { useReducedMotion } from '@/lib/wizard/reduced-motion';

// ---------------------------------------------------------------------------
// Animated count-up stat
// ---------------------------------------------------------------------------

interface StatItem {
  raw: number;
  display: (v: number) => string;
  label: string;
}

const STATS: StatItem[] = [
  {
    raw: 12400,
    display: (v) => `${(v / 1000).toFixed(1)}K`,
    label: 'avg followers tracked',
  },
  {
    raw: 8.4,
    display: (v) => `${v.toFixed(1)}%`,
    label: 'engagement rate',
  },
  {
    raw: 48700,
    display: (v) => `${(v / 1000).toFixed(1)}K`,
    label: 'monthly plays analyzed',
  },
];

function AnimatedStat({ item }: { item: StatItem }) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = React.useState(item.display(0));

  React.useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(item.display(item.raw));
      return;
    }
    const controls = animate(motionVal, item.raw, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(item.display(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, item, motionVal]);

  return (
    <span
      ref={ref}
      style={{
        fontSize: 22,
        fontWeight: 800,
        background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontFamily: 'var(--font-mono, monospace)',
        letterSpacing: '-0.02em',
      }}
    >
      {display}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Feature cards data
// ---------------------------------------------------------------------------

const FEATURES = [
  {
    icon: 'trending' as const,
    title: 'AI Growth Insights',
    description:
      'Get personalized recommendations generated from your actual data. Know your next move before competitors do.',
  },
  {
    icon: 'bar' as const,
    title: 'Multi-Platform Tracking',
    description:
      'Spotify, Apple Music, YouTube, TikTok and more — all aggregated into a single real-time view.',
  },
  {
    icon: 'file' as const,
    title: 'Actionable Reports',
    description:
      'Shareable PDF reports with AI-written summaries, graded performance scores, and clear next steps.',
  },
] as const;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LandingPage() {
  const reduced = useReducedMotion();

  const cardVariants: Variants = {
    rest: { y: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' },
    hover: reduced
      ? {}
      : { y: -4, boxShadow: '0 8px 32px rgba(124,58,237,0.18)' },
  };

  const iconVariants: Variants = {
    rest: { scale: 1 },
    hover: reduced ? {} : { scale: 1.1 },
  };

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
      {/* ------------------------------------------------------------------ */}
      {/* 3. Floating glow background layer (CSS-only, no canvas)             */}
      {/* ------------------------------------------------------------------ */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.18) 0%, transparent 70%),' +
            'radial-gradient(ellipse 60% 40% at 80% 80%, rgba(236,72,153,0.10) 0%, transparent 60%)',
        }}
      />

      {/* All page content sits above the glow layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* ---------------------------------------------------------------- */}
        {/* Nav                                                              */}
        {/* ---------------------------------------------------------------- */}
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
            <Logo size={28} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link
                href="/login"
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#A1A1AA',
                  textDecoration: 'none',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 8,
                }}
              >
                Sign In
              </Link>
              <Link href="/new" style={{ textDecoration: 'none' }}>
                <GradientButton size="sm">Get Started</GradientButton>
              </Link>
            </div>
          </div>
        </nav>

        {/* ---------------------------------------------------------------- */}
        {/* Hero                                                             */}
        {/* ---------------------------------------------------------------- */}
        <section
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            /* 10. mobile responsive — desktop default */
            padding: 'clamp(3rem, 5vw, 6rem) 1.5rem 5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          {/* 7. Dynamic gradient lighting orb */}
          <div
            className="hero-glow-orb"
            aria-hidden
            style={{
              position: 'absolute',
              top: -80,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 600,
              height: 200,
              background: 'radial-gradient(ellipse, rgba(124,58,237,0.25), transparent 70%)',
              filter: 'blur(40px)',
              animation: reduced ? 'none' : 'hero-glow 4s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />

          {/* Eyebrow pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.85rem',
              borderRadius: 999,
              border: '1px solid rgba(124,58,237,0.35)',
              background: 'rgba(124,58,237,0.08)',
              marginBottom: '1.75rem',
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#A78BFA',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              AI-Powered Growth Analytics
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
              color: '#FFFFFF',
            }}
          >
            Turn Your Streams Into{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Strategy.
            </span>
          </h1>

          {/* Sub-copy */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#71717A',
              lineHeight: 1.7,
              maxWidth: 540,
              margin: '0 auto 2rem',
            }}
          >
            Know exactly what&apos;s working &mdash; and what isn&apos;t &mdash; across every
            platform, powered by AI.
          </p>

          {/* 4. Animated chart preview */}
          <div
            className="glass-panel"
            style={{
              maxWidth: 600,
              margin: '0 auto 2rem',
              padding: '1.25rem 1rem 0.75rem',
              height: 200,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 4,
              }}
            >
              <span style={{ fontSize: 11, color: '#71717A', fontWeight: 500 }}>
                Monthly Streams
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: '#22C55E',
                  fontWeight: 600,
                  background: 'rgba(34,197,94,0.1)',
                  padding: '2px 8px',
                  borderRadius: 999,
                }}
              >
                +34.2%
              </span>
            </div>
            <LiveChart height={148} />
          </div>

          {/* 1. Fixed hero CTAs */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/new" style={{ textDecoration: 'none' }}>
              <GradientButton size="lg">Generate Free Report</GradientButton>
            </Link>
            <Link href="/reports" style={{ textDecoration: 'none' }}>
              <GradientButton variant="secondary" size="lg">
                View Reports
              </GradientButton>
            </Link>
          </div>

          {/* 8. Trust metric badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1.25rem',
              fontSize: 12,
              color: '#52525B',
            }}
          >
            <div
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#22C55E',
                flexShrink: 0,
              }}
            />
            3 creators joined in the last hour · 98% satisfaction
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 2. Social proof bar — animated count-up                          */}
        {/* ---------------------------------------------------------------- */}
        <section style={{ maxWidth: 1120, margin: '0 auto', padding: '0 1.5rem 5rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            {STATS.map((item) => (
              <div
                key={item.label}
                style={{
                  borderRadius: 999,
                  border: '1px solid rgba(124,58,237,0.2)',
                  background: 'rgba(124,58,237,0.05)',
                  padding: '0.75rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  justifyContent: 'center',
                }}
              >
                <AnimatedStat item={item} />
                <span style={{ fontSize: 13, color: '#71717A', fontWeight: 500 }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Features grid — 5 & 6: hover + scroll-in animations             */}
        {/* ---------------------------------------------------------------- */}
        <section style={{ maxWidth: 1120, margin: '0 auto', padding: '0 1.5rem 6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                marginBottom: '0.75rem',
              }}
            >
              Everything you need to grow
            </h2>
            <p style={{ fontSize: 15, color: '#71717A', maxWidth: 420, margin: '0 auto' }}>
              One dashboard. All your platforms. AI-generated action plans.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {FEATURES.map(({ icon, title, description }, index) => (
              /* 9. Cinematic scroll-in + 5. hover lift — two separate motion.div wrappers */
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <motion.div
                  variants={cardVariants}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: '#0F1117',
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    cursor: 'pointer',
                    height: '100%',
                  }}
                >
                {/* 6. Icon hover scale */}
                <motion.div
                  variants={iconVariants}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {icon === 'trending' && <TrendingUp size={20} color="#FFFFFF" strokeWidth={2} />}
                  {icon === 'bar' && <BarChart3 size={20} color="#FFFFFF" strokeWidth={2} />}
                  {icon === 'file' && <FileText size={20} color="#FFFFFF" strokeWidth={2} />}
                </motion.div>
                <div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#71717A', lineHeight: 1.65 }}>{description}</p>
                </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* How it works                                                      */}
        {/* ---------------------------------------------------------------- */}
        <section style={{ maxWidth: 1120, margin: '0 auto', padding: '0 1.5rem 6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                marginBottom: '0.5rem',
              }}
            >
              How it works
            </h2>
            <p style={{ fontSize: 15, color: '#71717A' }}>Up and running in under 2 minutes.</p>
          </div>

          <div
            style={{
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '2rem 2.5rem',
              maxWidth: 680,
              margin: '0 auto',
            }}
          >
            {[
              {
                step: 1,
                title: 'Connect Platforms',
                body: 'Link your Spotify, Apple Music, YouTube, TikTok, and other distribution accounts in seconds.',
              },
              {
                step: 2,
                title: 'Run AI Analysis',
                body: 'Our AI processes your metrics, detects patterns, and benchmarks your performance against similar artists.',
              },
              {
                step: 3,
                title: 'Get Your Report',
                body: 'Receive a full growth report with a letter grade, key findings, and a prioritized action plan.',
              },
            ].map(({ step, title, body }, idx) => (
              <div key={step}>
                <div
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'flex-start',
                    padding: '1.25rem 0',
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: 13,
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginTop: 2,
                    }}
                  >
                    {step}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: '#FFFFFF',
                        marginBottom: '0.3rem',
                      }}
                    >
                      {title}
                    </h3>
                    <p style={{ fontSize: 14, color: '#71717A', lineHeight: 1.6 }}>{body}</p>
                  </div>
                </div>
                {idx < 2 && (
                  <div
                    style={{
                      height: 1,
                      background: 'rgba(255,255,255,0.06)',
                      marginLeft: '3.25rem',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Bottom CTA section                                               */}
        {/* ---------------------------------------------------------------- */}
        <section
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            padding: '0 1.5rem 7rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              borderRadius: 24,
              border: '1px solid rgba(124,58,237,0.25)',
              background:
                'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(236,72,153,0.06) 100%)',
              padding: '4rem 2rem',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
              }}
            >
              Ready to grow?
            </h2>
            <p
              style={{
                fontSize: 16,
                color: '#71717A',
                lineHeight: 1.7,
                maxWidth: 400,
                margin: '0 auto 2.25rem',
              }}
            >
              Join independent artists who use AI to make smarter decisions about their music
              careers.
            </p>
            <Link href="/new" style={{ textDecoration: 'none' }}>
              <GradientButton size="lg">Get Started Free</GradientButton>
            </Link>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Footer                                                           */}
        {/* ---------------------------------------------------------------- */}
        <footer
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '1.5rem',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 13, color: '#3F3F46' }}>
            &copy; 2025 Growth Report AI. All rights reserved.
          </p>
        </footer>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 10. Mobile responsive styles                                        */}
      {/* ------------------------------------------------------------------ */}
      <style>{`
        @media (max-width: 768px) {
          .landing-hero-section {
            padding: 4rem 1rem 3rem !important;
          }
          .landing-social-proof {
            flex-direction: column !important;
          }
          .landing-features-grid {
            grid-template-columns: 1fr !important;
          }
          .landing-cta-row {
            flex-direction: column !important;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
