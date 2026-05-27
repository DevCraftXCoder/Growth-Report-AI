'use client';

import { useIndustryAccent } from '@/lib/wizard/use-industry-accent';

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
