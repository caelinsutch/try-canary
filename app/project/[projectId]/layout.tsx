import { getUser } from '@/lib/ServerUtils/getUser';
import { Header } from '@/components/Organisms/Header';
import { getSession } from '@/lib/session';
import { db } from '@/lib/db';

const getProject = async (projectId: string) => {
  return db.project.findFirst({
    where: {
      id: projectId,
    },
  });
};

type ProjectPageProps = {
  params: { projectId: string };
  children: React.ReactNode;
};

const ProjectLayout = async ({
  params: { projectId },
  children,
}: ProjectPageProps) => {
  const user = await getUser();
  const project = await getProject(projectId);

  return (
    <div className="mx-auto flex h-screen max-w-[1440px] flex-col space-y-6 overflow-hidden px-6">
      <Header user={user} project={project} />
      <main>{children}</main>
    </div>
  );
};

export default ProjectLayout;
