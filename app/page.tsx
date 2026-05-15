import * as React from 'react';
import Link from 'next/link';
import { TrendingUp, BarChart3, FileText } from 'lucide-react';
import Logo from '@/components/growth/Logo';
import GradientButton from '@/components/growth/GradientButton';

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#07070A',
        color: '#FFFFFF',
        fontFamily: 'var(--font-inter, Inter, sans-serif)',
      }}
    >
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
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <GradientButton size="sm">Get Started</GradientButton>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '6rem 1.5rem 5rem',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow */}
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
            margin: '0 auto 2.5rem',
          }}
        >
          Know exactly what&apos;s working &mdash; and what isn&apos;t &mdash; across every
          platform, powered by AI.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <GradientButton size="lg">See Demo Dashboard</GradientButton>
          </Link>
          <Link href="/reports" style={{ textDecoration: 'none' }}>
            <GradientButton variant="secondary" size="lg">
              View Reports
            </GradientButton>
          </Link>
        </div>
      </section>

      {/* Social proof bar */}
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {[
            { stat: '12.4K', label: 'avg followers tracked' },
            { stat: '8.4%', label: 'engagement rate' },
            { stat: '48.7K', label: 'monthly plays analyzed' },
          ].map(({ stat, label }) => (
            <div
              key={label}
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
              <span
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
                {stat}
              </span>
              <span style={{ fontSize: 13, color: '#71717A', fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
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
          {(
            [
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
            ] as const
          ).map(({ icon, title, description }) => (
            <div
              key={title}
              style={{
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.06)',
                background: '#0F1117',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div
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
              </div>
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
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
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

      {/* CTA section */}
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
            Join independent artists who use AI to make smarter decisions about their music careers.
          </p>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <GradientButton size="lg">Get Started Free</GradientButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
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
  );
}
