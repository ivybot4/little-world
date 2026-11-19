import { Link, Navigate, useParams } from 'react-router-dom';
import { projects } from '../config/projects';
import './ProjectDetailPage.css';

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const Content = project.content;

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
          {Content ? (
            <Content />
          ) : (
            <>
              {(project.githubUrl || project.tryUrl) && (
                <div className="pc-actions" style={{ marginTop: 0, marginBottom: 24 }}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pc-action-btn"
                    >
                      GITHUB
                    </a>
                  )}
                  {project.tryUrl && (
                    <a
                      href={project.tryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pc-action-btn"
                    >
                      TRY HERE!
                    </a>
                  )}
                </div>
              )}
              {(project.description ?? []).map((paragraph, index) => (
                <p key={index} className="project-detail-paragraph">
                  {paragraph}
                </p>
              ))}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
