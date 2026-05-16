'use client';

import { useIndustryAccent } from '@/lib/wizard/use-industry-accent';

export interface IndustryItem {
  id: string;
  label: string;
  icon: string;
}

export const INDUSTRIES: IndustryItem[] = [
  { id: 'Tech',          label: 'Tech',          icon: '🖥' },
  { id: 'Music',         label: 'Music',          icon: '🎵' },
  { id: 'Fashion',       label: 'Fashion',        icon: '👗' },
  { id: 'Sports',        label: 'Sports',         icon: '⚽' },
  { id: 'Food',          label: 'Food',           icon: '🍕' },
  { id: 'Finance',       label: 'Finance',        icon: '💰' },
  { id: 'Health',        label: 'Health',         icon: '🏥' },
  { id: 'Entertainment', label: 'Entertainment',  icon: '🎬' },
];

interface IndustryPillProps {
  industry: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}

export function IndustryPill({ industry, icon, active, onClick }: IndustryPillProps) {
  const accent = useIndustryAccent(industry);

  const inlineVars = active
    ? ({
        '--glow-color': accent.glow,
        '--ring-color': accent.ring,
      } as React.CSSProperties)
    : undefined;

  return (
    <button
      type="button"
      className={`industry-pill${active ? ' industry-pill--active' : ''}`}
      style={inlineVars}
      onClick={onClick}
      aria-pressed={active}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{industry}</span>
    </button>
  );
}
