import { Link, Navigate, useParams } from 'react-router-dom';
import { projects } from '../config/projects';
import './ProjectDetailPage.css';

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="project-detail-page">
      <header className="project-detail-header">
        <Link to="/projects" className="project-detail-back-btn">
          GO BACK
        </Link>
      </header>

      <main className="project-detail-main">
        <h1 className="project-detail-title">{project.title}</h1>
        <div className="project-detail-divider" />

        <div className="project-detail-body">
          {project.description.map((paragraph, index) => (
            <p key={index} className="project-detail-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </main>
    </div>
  );
}
