import { Link, Navigate, useParams } from 'react-router-dom';
import { books } from '../config/books';
import './BookReviewPage.css';

export function BookReviewPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return <Navigate to="/library" replace />;
  }

  return (
    <div className="book-review-page">
      {/* Paper grain SVG overlay matching the Library page */}
      <svg className="book-review-grain" aria-hidden="true">
        <defs>
          <pattern
            id="book-review-grain-pat"
            width="220"
            height="220"
            patternUnits="userSpaceOnUse"
          >
            <filter id="book-review-grain-flt" x="0" y="0" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves={3}
                stitchTiles="stitch"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.45  0 0 0 0 0.42  0 0 0 0 0.38  0 0 0 0.22 0"
              />
            </filter>
            <rect width="220" height="220" filter="url(#book-review-grain-flt)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#book-review-grain-pat)" />
      </svg>

      {/* Top Go Back button */}
      <header className="book-review-header">
        <Link
          to="/library"
          state={{ activeBookId: book.id }}
          className="book-review-back-btn"
        >
          GO BACK
        </Link>
      </header>

      <main className="book-review-main">
        {/* Left: Title, Author, and Review */}
        <article className="book-review-text-col">
          <p className="book-review-author">{book.author}</p>
          <h1 className="book-review-title">{book.title}</h1>
          <div className="book-review-divider" />

          <div className="book-review-body">
            {book.review.map((paragraph, idx) => (
              <p key={idx} className="book-review-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Right: Book Cover Image */}
        <aside className="book-review-cover-col">
          {book.coverImage && (
            <img
              src={book.coverImage}
              alt={`${book.title} cover`}
              className="book-review-cover-img"
              draggable={false}
            />
          )}
        </aside>
      </main>
    </div>
  );
}
