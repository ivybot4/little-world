export interface BuildingConfig {
  id: string;
  name: string;
  image: string;
  /** Horizontal position as a percentage (0–100) of the base image width */
  x: number;
  /** Vertical position as a percentage (0–100) of the base image height */
  y: number;
  /** Width as a percentage (0–100) of the base image width */
  width: number;
  /** Internal React Router path */
  route: string;
}

export const buildings: BuildingConfig[] = [
  {
    id: 'cloud',
    name: "Navya's Portfolio",
    image: '/images/buildings/about.png',
    x: 42.5,
    y: -1.0,
    width: 19.5,
    route: '/about',
  },
  {
    id: 'projects',
    name: 'Projects',
    image: '/images/buildings/projects.png',
    x: 26.6,
    y: 17.7,
    width: 16.5,
    route: '/projects',
  },
  {
    id: 'museum',
    name: 'Museum',
    image: '/images/buildings/museum.png',
    x: 68.5,
    y: 7.5,
    width: 25.0,
    route: '/museum',
  },
  {
    id: 'library',
    name: 'Library',
    image: '/images/buildings/library.png?v=3',
    x: 68.0,
    y: 35.0,
    width: 21.0,
    route: '/library',
  },
];
