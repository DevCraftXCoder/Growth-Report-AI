'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export type WizardStep = 'brief' | 'template' | 'generate';

export interface BriefState {
  entity: string;
  industry: string;
  period: string;
  briefText: string;
  useBriefMode: boolean; // true = free-text brief, false = structured form
}

export interface WizardState {
  step: WizardStep;
  brief: BriefState;
  selectedTemplate: string | null;
  customTemplateFile: File | null;
}

const DEFAULT_BRIEF: BriefState = {
  entity: '',
  industry: '',
  period: '',
  briefText: '',
  useBriefMode: false,
};

const VALID_STEPS = new Set<WizardStep>(['brief', 'template', 'generate']);

function parseStep(raw: string | null): WizardStep {
  if (raw && VALID_STEPS.has(raw as WizardStep)) {
    return raw as WizardStep;
  }
  return 'brief';
}

interface UseWizardStateReturn {
  state: WizardState;
  setStep: (step: WizardStep) => void;
  updateBrief: (patch: Partial<BriefState>) => void;
  setTemplate: (id: string | null) => void;
  setCustomTemplate: (file: File | null) => void;
}

export function useWizardState(): UseWizardStateReturn {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStepLocal] = useState<WizardStep>(() =>
    parseStep(searchParams.get('step'))
  );
  const [brief, setBrief] = useState<BriefState>(DEFAULT_BRIEF);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customTemplateFile, setCustomTemplateFile] = useState<File | null>(null);

  // Hydrate step from URL on mount and whenever searchParams changes
  useEffect(() => {
    const urlStep = parseStep(searchParams.get('step'));
    setStepLocal(urlStep);
  }, [searchParams]);

  const setStep = useCallback(
    (nextStep: WizardStep) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('step', nextStep);
      router.replace(`?${params.toString()}`);
      // Local state updated by the useEffect above via searchParams change
    },
    [router, searchParams]
  );

  const updateBrief = useCallback((patch: Partial<BriefState>) => {
    setBrief((prev) => ({ ...prev, ...patch }));
  }, []);

  const setTemplate = useCallback((id: string | null) => {
    setSelectedTemplate(id);
  }, []);

  const setCustomTemplate = useCallback((file: File | null) => {
    setCustomTemplateFile(file);
  }, []);

  const state: WizardState = {
    step,
    brief,
    selectedTemplate,
    customTemplateFile,
  };

  return { state, setStep, updateBrief, setTemplate, setCustomTemplate };
}
