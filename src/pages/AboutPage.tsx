import { Link } from 'react-router-dom';
import './AboutPage.css';

export function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-container">
        <header className="about-header">
          <Link to="/" className="about-back-btn">
            GO BACK
          </Link>
          <h1 className="about-name">Welcome to Ivy's Crayons</h1>
        </header>

        <main className="about-content">
          <p className="about-description">
            This site is a personal archive of interesting bits of art, culture and history.
          </p>
        </main>
      </div>
    </div>
  );
}
