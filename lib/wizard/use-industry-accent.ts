import { useMemo } from 'react';

export interface IndustryAccent {
  glow: string;
  gradient: string;
  ring: string;
}

const INDUSTRY_MAP: Record<string, IndustryAccent> = {
  Tech: {
    glow: 'rgba(124,58,237,0.45)',
    gradient: 'linear-gradient(135deg,#7C3AED,#4F46E5)',
    ring: '#7C3AED',
  },
  Music: {
    glow: 'rgba(236,72,153,0.45)',
    gradient: 'linear-gradient(135deg,#EC4899,#BE185D)',
    ring: '#EC4899',
  },
  Fashion: {
    glow: 'rgba(251,113,133,0.45)',
    gradient: 'linear-gradient(135deg,#FB7185,#E11D48)',
    ring: '#FB7185',
  },
  Sports: {
    glow: 'rgba(34,197,94,0.45)',
    gradient: 'linear-gradient(135deg,#22C55E,#15803D)',
    ring: '#22C55E',
  },
  Food: {
    glow: 'rgba(249,115,22,0.45)',
    gradient: 'linear-gradient(135deg,#F97316,#C2410C)',
    ring: '#F97316',
  },
  Finance: {
    glow: 'rgba(234,179,8,0.45)',
    gradient: 'linear-gradient(135deg,#EAB308,#A16207)',
    ring: '#EAB308',
  },
  Health: {
    glow: 'rgba(20,184,166,0.45)',
    gradient: 'linear-gradient(135deg,#14B8A6,#0F766E)',
    ring: '#14B8A6',
  },
  Entertainment: {
    glow: 'rgba(168,85,247,0.45)',
    gradient: 'linear-gradient(135deg,#A855F7,#7E22CE)',
    ring: '#A855F7',
  },
};

const DEFAULT_ACCENT: IndustryAccent = {
  glow: 'rgba(124,58,237,0.35)',
  gradient: 'linear-gradient(135deg,#7C3AED,#EC4899)',
  ring: '#7C3AED',
};

export function useIndustryAccent(industry: string): IndustryAccent {
  return useMemo(() => {
    return INDUSTRY_MAP[industry] ?? DEFAULT_ACCENT;
  }, [industry]);
}
