export interface TemplateMetadata {
  id: string;
  industries: string[]; // industries this template is optimized for
  tags: string[];
}

export function scoreTemplate(template: TemplateMetadata, industry: string): number {
  let score = 0;

  // Exact industry match: +10 points
  if (template.industries.includes(industry)) {
    score += 10;
  }

  // Tag includes industry (case-insensitive): +5 points
  const industryLower = industry.toLowerCase();
  if (template.tags.some((tag) => tag.toLowerCase().includes(industryLower))) {
    score += 5;
  }

  return score;
}

export function getRecommendedTemplate(
  templates: TemplateMetadata[],
  industry: string
): string | null {
  let bestId: string | null = null;
  let bestScore = 0;

  for (const template of templates) {
    const score = scoreTemplate(template, industry);
    if (score > bestScore) {
      bestScore = score;
      bestId = template.id;
    }
  }

  return bestScore > 0 ? bestId : null;
}
