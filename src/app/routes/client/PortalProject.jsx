import { useParams } from 'react-router';
import { ProjectHeader } from '../../components/projects/ProjectHeader';
import { ProjectFiles } from '../../components/projects/ProjectFiles';
import { ProjectActivity } from '../../components/projects/ProjectActivity';

export function PortalProject() {
  const { projectId } = useParams();

  return (
    <section>
      <ProjectHeader projectId={projectId} />
      <div className="portal-grid">
        <ProjectFiles />
        <ProjectActivity />
      </div>
    </section>
  );
}
