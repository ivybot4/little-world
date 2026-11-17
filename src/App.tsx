import { Route, Routes } from 'react-router-dom';
import { AboutPage } from './pages/AboutPage';
import { BookReviewPage } from './pages/BookReviewPage';
import { LibraryPage } from './pages/LibraryPage';
import { MuseumPage } from './pages/MuseumPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { WorldPage } from './pages/WorldPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<WorldPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/library/:bookId" element={<BookReviewPage />} />
      <Route path="/museum" element={<MuseumPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
    </Routes>
  );
}
