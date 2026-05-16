'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/wizard/reduced-motion';
import type { Template } from '@/lib/data/templates';
import { RecommendedBadge } from './RecommendedBadge';
import '@/styles/wizard.css';

interface TemplateCardProps {
  template: Template;
  selected: boolean;
  recommended: boolean;
  onClick: () => void;
}

export function TemplateCard({ template, selected, recommended, onClick }: TemplateCardProps) {
  const reducedMotion = useReducedMotion();

  const hoverProps = reducedMotion
    ? {}
    : {
        whileHover: {
          scale: 1.02,
          boxShadow: `0 0 20px ${template.previewColor}40`,
        },
      };

  return (
    <motion.div
      {...hoverProps}
      onClick={onClick}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="glass-panel"
      style={{
        position: 'relative',
        minHeight: 200,
        display: 'flex',
        cursor: 'pointer',
        overflow: 'hidden',
        border: selected
          ? `2px solid ${template.previewColor}`
          : '1px solid rgba(255,255,255,0.08)',
        boxShadow: selected
          ? `0 0 18px ${template.previewColor}50`
          : undefined,
        transition: 'border 0.18s ease, box-shadow 0.18s ease',
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          width: 3,
          flexShrink: 0,
          background: template.previewColor,
          alignSelf: 'stretch',
        }}
      />

      {/* Content */}
      <div style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
          <h3
            style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 600,
              color: '#fff',
              lineHeight: 1.3,
            }}
          >
            {template.name}
          </h3>
          <RecommendedBadge visible={recommended} />
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.5,
          }}
        >
          {template.description}
        </p>

        {/* Sections preview */}
        <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {template.sections.map((section) => (
            <span
              key={section}
              style={{
                fontSize: 11,
                padding: '2px 8px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.45)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {section}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
