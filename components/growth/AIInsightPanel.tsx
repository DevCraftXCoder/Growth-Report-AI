'use client';

import * as React from 'react';
import { cn } from '@/lib/design/cn';
import { Skeleton } from '@/components/ui/skeleton';

export interface AIInsightPanelProps {
  content?: string;       // markdown (Wave 2 will add proper renderer)
  isStreaming?: boolean;
  className?: string;
}

export default function AIInsightPanel({ content, isStreaming, className }: AIInsightPanelProps) {
  return (
    <div
      className={cn(
        'rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[#12141C] p-5',
        className
      )}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ color: '#fff', fontSize: 12 }}>AI</span>
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF' }}>AI Insight</span>
        {isStreaming && (
          <span
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#7C3AED',
              animation: 'pulse 1s ease-in-out infinite',
            }}
          />
        )}
      </div>

      {isStreaming && !content ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Skeleton style={{ height: 14, width: '90%' }} />
          <Skeleton style={{ height: 14, width: '75%' }} />
          <Skeleton style={{ height: 14, width: '85%' }} />
        </div>
      ) : content ? (
        <p
          style={{
            fontSize: 14,
            color: '#A1A1AA',
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
          }}
        >
          {content}
          {isStreaming && (
            <span
              style={{
                display: 'inline-block',
                width: 2,
                height: 14,
                background: '#7C3AED',
                marginLeft: 2,
                animation: 'blink 0.8s step-start infinite',
              }}
            />
          )}
        </p>
      ) : (
        <p style={{ fontSize: 14, color: '#71717A', fontStyle: 'italic' }}>
          No insight generated yet. Click &ldquo;Generate&rdquo; to analyze your metrics.
        </p>
      )}

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </div>
  );
}
