export type ProjectTag =
  | 'ai-engineering'
  | 'inference'
  | 'from-scratch'
  | 'deep-learning'
  | 'frontend';

export type ProjectFilterId = 'all' | ProjectTag;

export const PROJECT_FILTERS: { id: ProjectFilterId; label: string }[] = [
  { id: 'all', label: 'VIEW ALL' },
  { id: 'ai-engineering', label: 'AI ENGINEERING' },
  { id: 'inference', label: 'INFERENCE' },
  { id: 'deep-learning', label: 'DEEP LEARNING' },
  { id: 'frontend', label: 'FRONTEND' },
  { id: 'from-scratch', label: 'FROM SCRATCH' },
];

export interface ProjectConfig {
  id: string;
  title: string;
  image: string;
  tags: ProjectTag[];
  detailsUrl?: string;
  githubUrl?: string;
  tryUrl?: string;
}

export const projects: ProjectConfig[] = [
  {
    id: 'find-a-book',
    title: 'Find a Book',
    image: '/images/projects/book-recommendation.png',
    tags: ['ai-engineering', 'deep-learning', 'inference'],
  },
  {
    id: 'aviation-llm',
    title: 'Multimodal Fine-tuning',
    image: '/images/projects/aviation-llm.png',
    tags: ['ai-engineering'],
  },
  {
    id: 'paligemma',
    title: 'Paligemma from Scratch',
    image: '/images/projects/multimodal.png',
    tags: ['from-scratch', 'deep-learning'],
  },
  {
    id: 'adam-optimizer',
    title: 'Adam Optimizer from Scratch',
    image: '/images/projects/adam-optimizer.png',
    tags: ['from-scratch', 'deep-learning'],
  },
  {
    id: 'wordle',
    title: 'Wordle',
    image: '/images/projects/wordle.png',
    tags: ['frontend'],
  },
];
