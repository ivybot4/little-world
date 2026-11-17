export type ProjectTag =
  | 'ai-engineering'
  | 'inference'
  | 'from-scratch'
  | 'deep-learning'
  | 'games'
  | 'frontend';

export type ProjectFilterId = 'all' | ProjectTag;

export const PROJECT_FILTERS: { id: ProjectFilterId; label: string }[] = [
  { id: 'all', label: 'VIEW ALL' },
  { id: 'ai-engineering', label: 'AI ENGINEERING' },
  { id: 'inference', label: 'INFERENCE' },
  { id: 'deep-learning', label: 'DEEP LEARNING' },
  { id: 'frontend', label: 'FRONTEND' },
  { id: 'from-scratch', label: 'FROM SCRATCH' },
  { id: 'games', label: 'GAMES'},
];

export interface ProjectConfig {
  id: string;
  title: string;
  image: string;
  tags: ProjectTag[];
  description: string[];
  detailsUrl?: string;
  githubUrl?: string;
  tryUrl?: string;
}

export const projects: ProjectConfig[] = [
  {
    id: 'speech',
    title: 'On-Device Speech',
    image: '/images/projects/device-speech.png',
    tags: ['inference'],
    description: [
      'Coming soon',
    ],
    githubUrl: 'https://github.com',
    tryUrl: 'https://navyajain.dev',
  },
/*  {
    id: 'book-rec',
    title: 'Find a Book',
    image: '/images/projects/book-recommendation.png',
    tags: ['ai-engineering', 'deep-learning'],
    description: [
      'Coming soon',
    ],
    githubUrl: 'https://github.com',
    tryUrl: 'https://navyajain.dev',
  },
  
  {
    id: 'project3',
    title: 'Mini vLLM from Scratch',
    image: '/images/projects/inference-eng.png',
    tags: ['inference', 'deep-learning', 'from-scratch'],
    description: [
      'Coming soon',
    ],
    githubUrl: 'https://github.com',
    tryUrl: 'https://navyajain.dev',
  },
  {
    id: 'project4',
    title: 'Aviation vLLM',
    image: '/images/projects/aviation-llm.png',
    tags: ['ai-engineering'],
    description: [
      'Coming soon',
    ],
    githubUrl: 'https://github.com',
    tryUrl: 'https://navyajain.dev',
  },
  {
    id: 'project5',
    title: 'World Model from Scratch',
    image: '/images/projects/world-model.png',
    tags: ['deep-learning', 'from-scratch'],
    description: [
      'Coming soon',
    ],
    githubUrl: 'https://github.com',
    tryUrl: 'https://navyajain.dev',
  },
  {
    id: 'project6',
    title: 'Paligemma',
    image: '/images/projects/multimodal.png',
    tags: ['from-scratch', 'deep-learning'],
    description: [
      'Coming soon',
    ],
    githubUrl: 'https://github.com',
    tryUrl: 'https://navyajain.dev',
  },
  {
    id: 'project7',
    title: 'Adam Optimizer',
    image: '/images/projects/adam-optimizer.png',
    tags: ['from-scratch', 'deep-learning'],
    description: [
      'Coming soon',
    ],
    githubUrl: 'https://github.com',
    tryUrl: 'https://navyajain.dev',
  },
  {
    id: 'project8',
    title: 'Wordle',
    image: '/images/projects/wordle.png',
    tags: ['frontend', 'games'],
    description: [
      'Coming soon',
    ],
    githubUrl: 'https://github.com',
    tryUrl: 'https://navyajain.dev',
  },
  {
    id: 'project9',
    title: 'Portfolio Website',
    image: '/images/projects/interactive-website.png',
    tags: ['frontend'],
    description: [
      'Coming soon',
    ],
    githubUrl: 'https://github.com',
    tryUrl: 'https://navyajain.dev',
  },*/
];
