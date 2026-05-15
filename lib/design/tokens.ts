// Design tokens — Growth Report AI
// Spec §3.1 colors + §3.2 typography + §3.4 animation vocabulary

export const colors = {
  bg:       '#07070A',
  panel:    '#0F1117',
  card:     '#12141C',
  border:   'rgba(255, 255, 255, 0.06)',
  borderHi: 'rgba(255, 255, 255, 0.10)',

  text: {
    primary:   '#FFFFFF',
    secondary: '#A1A1AA',
    muted:     '#71717A',
  },

  accent: {
    purple:      '#7C3AED',
    pink:        '#EC4899',
    gradient:    'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
    glowPurple:  'rgba(124, 58, 237, 0.25)',
    glowPink:    'rgba(236, 72, 153, 0.15)',
  },

  status: {
    success: '#22C55E',
    danger:  '#EF4444',
    warn:    '#F59E0B',
    info:    '#3B82F6',
  },
} as const;

export const typography = {
  fontSans: 'Inter, system-ui, sans-serif',
  fontMono: '"JetBrains Mono", "Fira Code", monospace',
  scale: [12, 14, 16, 18, 24, 32, 48, 64] as const,
  weights: {
    hero:    800,
    heading: 600,
    body:    400,
    medium:  500,
    numeral: 700,
  },
} as const;

export const chartTheme = {
  axis:          { stroke: '#27272A', fontSize: 11, tickLine: false },
  grid:          { stroke: '#1C1C22', strokeDasharray: '3 3' },
  tooltip:       { bg: '#12141C', border: '1px solid rgba(255,255,255,0.06)' },
  primaryLine:   { stroke: '#8B5CF6', strokeWidth: 2.5, dot: false },
  secondaryLine: { stroke: '#EC4899', strokeWidth: 2,   dot: false },
  area:          {
    gradientFrom: 'rgba(124,58,237,0.30)',
    gradientTo:   'rgba(124,58,237,0.00)',
  },
} as const;

// Framer-motion variant presets — keep in sync with §3.4
export const motionVariants = {
  fadeIn: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  },
  slideUpFade: {
    hidden:  { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  },
  stagger: {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.07 } },
  },
} as const;
