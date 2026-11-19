import { Route, Routes } from 'react-router-dom';
import { AboutPage } from './pages/AboutPage';
import { BookReviewPage } from './pages/BookReviewPage';
import { LibraryPage } from './pages/LibraryPage';
import { MuseumPage } from './pages/MuseumPage';
import { WorldPage } from './pages/WorldPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<WorldPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/library/:bookId" element={<BookReviewPage />} />
      <Route path="/museum" element={<MuseumPage />} />
    </Routes>
  );
}
