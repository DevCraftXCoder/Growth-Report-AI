'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface RecommendedBadgeProps {
  visible: boolean;
}

export function RecommendedBadge({ visible }: RecommendedBadgeProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="pulse-glow"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '3px 10px',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.02em',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(236,72,153,0.25))',
            border: '1px solid rgba(124,58,237,0.45)',
            color: '#C084FC',
            whiteSpace: 'nowrap',
            '--glow-color': 'rgba(124,58,237,0.4)',
          } as React.CSSProperties}
        >
          ✦ Recommended
        </motion.span>
      )}
    </AnimatePresence>
  );
}
