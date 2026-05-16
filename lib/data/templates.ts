import type { TemplateMetadata } from '@/lib/wizard/template-recommendations';

export interface Template extends TemplateMetadata {
  name: string;
  description: string;
  previewColor: string;
  sections: string[];
}

export const TEMPLATES: Template[] = [
  {
    id: 'growth-pulse',
    name: 'Growth Pulse',
    description: 'Monthly KPI snapshot with trend analysis',
    industries: ['Tech', 'Finance'],
    tags: ['metrics', 'kpi', 'monthly'],
    previewColor: '#7C3AED',
    sections: ['Executive Summary', 'KPI Dashboard', 'Trend Analysis', 'Next Steps'],
  },
  {
    id: 'creator-report',
    name: 'Creator Report',
    description: 'Audience & engagement deep-dive',
    industries: ['Music', 'Entertainment'],
    tags: ['audience', 'engagement', 'social'],
    previewColor: '#EC4899',
    sections: ['Audience Growth', 'Engagement Metrics', 'Top Content', 'Revenue'],
  },
  {
    id: 'brand-momentum',
    name: 'Brand Momentum',
    description: 'Brand awareness & sentiment tracking',
    industries: ['Fashion', 'Entertainment'],
    tags: ['brand', 'awareness', 'sentiment'],
    previewColor: '#F97316',
    sections: ['Brand Score', 'Sentiment', 'Reach', 'Competitive'],
  },
  {
    id: 'revenue-lens',
    name: 'Revenue Lens',
    description: 'Revenue attribution & forecasting',
    industries: ['Finance', 'Tech'],
    tags: ['revenue', 'forecast', 'attribution'],
    previewColor: '#EAB308',
    sections: ['Revenue Overview', 'Attribution', 'Forecast', 'Recommendations'],
  },
  {
    id: 'health-pulse',
    name: 'Health Pulse',
    description: 'Health & wellness metrics report',
    industries: ['Health'],
    tags: ['wellness', 'metrics', 'health'],
    previewColor: '#14B8A6',
    sections: ['Health Metrics', 'Trends', 'Benchmarks', 'Action Plan'],
  },
  {
    id: 'sports-analytics',
    name: 'Sports Analytics',
    description: 'Performance & fan engagement analytics',
    industries: ['Sports'],
    tags: ['performance', 'fans', 'analytics'],
    previewColor: '#22C55E',
    sections: ['Performance', 'Fan Metrics', 'Social', 'Sponsorship'],
  },
];
