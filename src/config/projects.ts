export interface ProjectConfig {
  id: string;
  title: string;
  image: string;
  detailsUrl?: string;
  githubUrl?: string;
  tryUrl?: string;
}

export const projects: ProjectConfig[] = [
  {
    id: 'find-a-book',
    title: 'Find a Book',
    image: '/images/projects/book-recommendation.png',
  },
  {
    id: 'aviation-llm',
    title: 'Multimodal Fine-tuning',
    image: '/images/projects/aviation-llm.png',
  },
  {
    id: 'paligemma',
    title: 'Paligemma from Scratch',
    image: '/images/projects/multimodal.png',
  },
  {
    id: 'adam-optimizer',
    title: 'Adam Optimizer from Scratch',
    image: '/images/projects/adam-optimizer.png',
  },
  
];
