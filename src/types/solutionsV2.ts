export type TerritoryId = 'growth' | 'demand' | 'pricing';

export interface TerritoryItem {
  id: TerritoryId;
  title: string;
  chips: string[];
  eyebrow?: string;
  tagline?: string;
  description?: string;
}

export interface LeanSolution {
  id: string;
  territoryId: TerritoryId;
  title: string;
  tagline?: string;
  description?: string;
  resolve: string;
  delivery: string;
  impact: string;
}

export interface ImplementationStep {
  n: string;
  title: string;
  description: string;
}

export interface SummaryBullet {
  title: string;
  description: string;
}

export interface SolutionsV2Content {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  territories: {
    eyebrow: string;
    title: string;
    items: TerritoryItem[];
  };
  solutions: LeanSolution[];
  signal: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    demoInstruction: string;
    examplesTitle: string;
    examples: string[];
  };
  howWeImplement: {
    eyebrow: string;
    title: string;
    steps: ImplementationStep[];
    footer: string;
  };
  summary: {
    title: string;
    bullets: SummaryBullet[];
    ctaTitle: string;
    ctaButton: string;
  };
}
