import { ReducedMotionProvider } from '@/lib/wizard/reduced-motion';
import { LayoutGroup } from 'framer-motion';

export default function NewLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReducedMotionProvider>
      <LayoutGroup>{children}</LayoutGroup>
    </ReducedMotionProvider>
  );
}
