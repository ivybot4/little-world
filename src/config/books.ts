export interface BookConfig {
  id: string;
  title: string;
  author: string;
  /** Optional custom cover image URL (uses styled book cover if omitted) */
  coverImage?: string;
  /** Optional custom spine image URL (uses styled book spine if omitted) */
  spineImage?: string;
  /** Accent color for the book spine & cover */
  color: string;
}

export const books: BookConfig[] = [
  {
    id: 'book-1',
    title: 'The Death of Ivan Ilyich',
    author: 'Leo Tolstoy',
    coverImage: '/images/books/ivan-ilyich-cover.svg?v=2',
    spineImage: '/images/books/ivan-ilyich-spine.svg?v=2',
    color: '#8C231F',
  },
  {
    id: 'book-2',
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    coverImage: '/images/books/little-prince-cover.svg',
    spineImage: '/images/books/little-prince-spine.svg?v=2',
    color: '#A63A28',
  },
  {
    id: 'book-3',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: '/images/books/midnight-library-cover.svg',
    spineImage: '/images/books/midnight-library-spine.svg',
    color: '#13314C',
  },
];
