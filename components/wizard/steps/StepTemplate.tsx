'use client';

import { useState } from 'react';
import { useWizardState } from '@/lib/wizard/use-wizard-state';
import { getRecommendedTemplate } from '@/lib/wizard/template-recommendations';
import { TEMPLATES } from '@/lib/data/templates';
import { TemplateCard } from '@/components/wizard/TemplateCard';
import { TemplateDropzone } from '@/components/wizard/TemplateDropzone';
import { SampleReportPeek } from '@/components/wizard/SampleReportPeek';
import { AdvancedSettings } from '@/components/wizard/AdvancedSettings';
import type { Template } from '@/lib/data/templates';
import '@/styles/wizard.css';

export function StepTemplate() {
  const { state, setTemplate, setStep } = useWizardState();
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [peekTemplate, setPeekTemplate] = useState<Template | null>(null);

  const recommended = getRecommendedTemplate(TEMPLATES, state.brief.industry);

  const handleBack = () => setStep('brief');
  const handleNext = () => {
    if (state.selectedTemplate) setStep('generate');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        maxWidth: 740,
        margin: '0 auto',
        padding: '32px 16px',
      }}
    >
      {/* Header */}
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.3,
          }}
        >
          Choose a Template
        </h2>
        <p style={{ margin: '6px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>
          Pick a starting point for your report. You can customise everything after generation.
        </p>
      </div>

      {/* Template grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 14,
        }}
      >
        {TEMPLATES.map((template) => (
          <div key={template.id} style={{ position: 'relative' }}>
            <TemplateCard
              template={template}
              selected={state.selectedTemplate === template.id}
              recommended={recommended === template.id}
              onClick={() => setTemplate(template.id)}
            />
            {/* Preview link */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPeekTemplate(template);
              }}
              style={{
                position: 'absolute',
                bottom: 10,
                right: 12,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 11,
                color: 'rgba(255,255,255,0.3)',
                padding: '2px 4px',
                textDecoration: 'underline',
                textUnderlineOffset: 2,
              }}
            >
              Preview
            </button>
          </div>
        ))}
      </div>

      {/* Custom template upload */}
      <div>
        <p
          style={{
            margin: '0 0 10px',
            fontSize: 12,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Or upload your own template
        </p>
        <TemplateDropzone />
        {state.customTemplateFile && (
          <p style={{ margin: '8px 0 0', fontSize: 12, color: 'rgba(124,58,237,0.9)' }}>
            ✓ {state.customTemplateFile.name} uploaded
          </p>
        )}
      </div>

      {/* Advanced settings */}
      <AdvancedSettings
        open={advancedOpen}
        onToggle={() => setAdvancedOpen((v) => !v)}
      />

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
        <button
          onClick={handleBack}
          style={{
            padding: '11px 22px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.04)',
            color: 'rgba(255,255,255,0.65)',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={!state.selectedTemplate && !state.customTemplateFile}
          style={{
            padding: '11px 28px',
            borderRadius: 10,
            border: 'none',
            background:
              state.selectedTemplate || state.customTemplateFile
                ? 'linear-gradient(135deg, #7C3AED, #EC4899)'
                : 'rgba(255,255,255,0.07)',
            color:
              state.selectedTemplate || state.customTemplateFile
                ? '#fff'
                : 'rgba(255,255,255,0.25)',
            fontSize: 14,
            fontWeight: 600,
            cursor:
              state.selectedTemplate || state.customTemplateFile ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s ease',
          }}
        >
          Next: Generate →
        </button>
      </div>

      {/* Sample report modal */}
      <SampleReportPeek
        template={peekTemplate}
        onClose={() => setPeekTemplate(null)}
      />
    </div>
  );
}

export default StepTemplate;
