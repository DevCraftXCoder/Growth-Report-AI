'use client';

// Re-export framer-motion utilities + reduced-motion helper.
// Import from here rather than framer-motion directly so we can gate on
// prefers-reduced-motion in one place.

export {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion';

export { motionVariants } from './tokens';
