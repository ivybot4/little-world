import { Link } from 'react-router-dom';
import { projects } from '../config/projects';
import './ProjectsPage.css';

export function ProjectsPage() {
  return (
    <div className="projects-page">
      <header className="projects-header">
        <Link to="/" className="projects-home-btn">
          GO HOME
        </Link>
        <p className="projects-author">NAVYA JAIN</p>
        <h1 className="projects-title">PROJECTS</h1>
      </header>

      <main className="projects-grid-container">
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-image-frame">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  draggable={false}
                />
              </div>

              <div className="project-actions">
                <button
                  type="button"
                  className="project-action-btn"
                  onClick={() => {
                    if (project.detailsUrl) {
                      window.open(project.detailsUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  DETAILS
                </button>
                <button
                  type="button"
                  className="project-action-btn"
                  onClick={() => {
                    if (project.githubUrl) {
                      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  GITHUB
                </button>
                <button
                  type="button"
                  className="project-action-btn"
                  onClick={() => {
                    if (project.tryUrl) {
                      window.open(project.tryUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  TRY HERE!
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
