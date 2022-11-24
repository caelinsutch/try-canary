import { getSession } from "@/lib/session";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

const getProject = async (projectId: string) => {
  const session = await getSession(headers().get("cookie"));

  return db.project.findFirst({
    where: {
      id: projectId,
      creatorId: session?.user?.id,
    },
  });
};

type ProjectPageProps = {
  params: { projectId: string };
};

const ProjectPage = async ({ params: { projectId } }: ProjectPageProps) => {
  const project = await getProject(projectId);

  if (!project) return notFound();
};

export default ProjectPage;
