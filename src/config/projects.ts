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
    id: 'project-2',
    title: 'Project 2',
    image: '/images/projects/book-recommendation.png',
  },
  {
    id: 'project-3',
    title: 'Project 3',
    image: '/images/projects/book-recommendation.png',
  },
  {
    id: 'project-4',
    title: 'Project 4',
    image: '/images/projects/book-recommendation.png',
  },
  {
    id: 'project-5',
    title: 'Project 5',
    image: '/images/projects/book-recommendation.png',
  },
  {
    id: 'project-6',
    title: 'Project 6',
    image: '/images/projects/book-recommendation.png',
  },
];
