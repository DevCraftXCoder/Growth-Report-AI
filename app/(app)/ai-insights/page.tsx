'use client';

import * as React from 'react';
import type { AIInsight } from '@/lib/data/types';
import PageHeader from '@/components/growth/PageHeader';
import GlassPanel from '@/components/growth/GlassPanel';
import GradientButton from '@/components/growth/GradientButton';
import AIInsightPanel from '@/components/growth/AIInsightPanel';

// ---------------------------------------------------------------------------
// InsightGenerator
// ---------------------------------------------------------------------------

function InsightGenerator() {
  const [prompt, setPrompt] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedContent, setGeneratedContent] = React.useState<string | null>(null);

  function handleGenerate() {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setGeneratedContent(null);

    setTimeout(() => {
      const insight =
        `Your TikTok engagement is outperforming your Spotify growth by a factor of 3x, ` +
        `which signals that short-form video is your primary discovery surface right now. ` +
        `Double down on posting frequency to 3–4 videos per week with strong hooks in the ` +
        `first 2 seconds to maximize saves and shares.\n\n` +
        `On the revenue side, the 2.4% dip traces back to Underground+ trial churn expiring ` +
        `without converting. Pair your next single drop with a 7-day trial CTA on the ` +
        `smart-link footer — users who engage with a release are 4x more likely to subscribe ` +
        `within 48 hours of first listen.\n\n` +
        `For next month: prioritize one playlist pitch campaign via SubmitHub targeting ` +
        `editorial playlists in your genre, and repurpose your top-performing TikTok audio ` +
        `as a Reel and YouTube Short to extend reach without additional production cost.`;
      setGeneratedContent(insight);
      setIsGenerating(false);
    }, 2000);
  }

  return (
    <GlassPanel>
      <label
        style={{
          display: 'block',
          fontSize: 12,
          fontWeight: 600,
          color: '#A1A1AA',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '0.75rem',
        }}
      >
        Ask AI
      </label>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="What should I focus on next month?"
        rows={3}
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10,
          padding: '0.75rem 1rem',
          fontSize: 14,
          color: '#FFFFFF',
          resize: 'none',
          outline: 'none',
          lineHeight: 1.6,
          boxSizing: 'border-box',
          marginBottom: '0.875rem',
          fontFamily: 'inherit',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: generatedContent ? '1.25rem' : 0 }}>
        <GradientButton
          size="sm"
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
        >
          {isGenerating ? 'Generating…' : 'Generate Insight'}
        </GradientButton>
      </div>

      {(isGenerating || generatedContent) && (
        <AIInsightPanel
          content={generatedContent ?? undefined}
          isStreaming={isGenerating}
        />
      )}
    </GlassPanel>
  );
}

// ---------------------------------------------------------------------------
// PreviousInsights
// ---------------------------------------------------------------------------

function PreviousInsights({ insights }: { insights: AIInsight[] }) {
  if (insights.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: '#FFFFFF',
          margin: 0,
        }}
      >
        Previous Insights
      </h2>

      {insights.map((insight) => (
        <GlassPanel key={insight.id}>
          <div style={{ marginBottom: '0.5rem' }}>
            <p
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: '#FFFFFF',
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {insight.prompt}
            </p>
            <p
              style={{
                fontSize: 12,
                color: '#71717A',
                marginTop: 4,
                margin: '4px 0 0 0',
              }}
            >
              Generated on May 12, 2026
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginTop: '0.875rem' }}>
            {insight.sections.map((section, i) => (
              <div key={i}>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#FFFFFF',
                    margin: '0 0 0.3rem 0',
                  }}
                >
                  {section.heading}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: '#A1A1AA',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AIInsightsPage() {
  const [insights, setInsights] = React.useState<AIInsight[]>([]);

  React.useEffect(() => {
    import('@/lib/data/api').then(({ fetchInsights }) =>
      fetchInsights().then(setInsights)
    );
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', padding: '2rem' }}>
      <PageHeader
        title="AI Insights"
        description="Ask the AI anything about your growth metrics and get actionable recommendations."
      />

      <InsightGenerator />

      <PreviousInsights insights={insights} />
    </div>
  );
}
