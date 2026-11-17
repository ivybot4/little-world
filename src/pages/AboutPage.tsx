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
          <h1 className="about-name">NAVYA JAIN</h1>
        </header>

        <main className="about-content">
          <div className="about-photo-wrap">
            <img
              src="/images/navya.png"
              alt="Navya Jain"
              className="about-photo"
              draggable={false}
            />
          </div>

          <div className="about-bio">
            <h2 className="about-heading">About Me</h2>

            <p className="about-paragraph">
              Hi, I am an AI/ML Engineer with over 2 years of experience and an M.S. in Artificial
              Intelligence from Boston University.
            </p>

            <p className="about-paragraph">
              Most of my professional experience focuses on building reliable agentic systems,
              LLM-based applications, and end-to-end machine learning pipelines deployed on cloud
              platforms.
            </p>

            <p className="about-paragraph">
              I am interested in on-device AI and quantization, along with world models.
            </p>

            <div className="about-actions">
              <a
                href="https://github.com/ivybot4"
                target="_blank"
                rel="noopener noreferrer"
                className="about-btn"
              >
                GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/navya45"
                target="_blank"
                rel="noopener noreferrer"
                className="about-btn"
              >
                LINKEDIN
              </a>
              <button type="button" className="about-btn">
                RESUME
              </button>
              <Link to="/projects" className="about-btn about-btn--projects">
                CHECK OUT MY PROJECTS HERE
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
