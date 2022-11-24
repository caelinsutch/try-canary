import { DashboardShell } from "@/components/Dashboard/DashboardShell";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";
import { BreadCrumbs } from "@/components/Atoms/BreadCrumbs";
import { Button } from "@/components/Atoms/Button";
import NextLink from "next/link";
import { ProjectSettings } from "./ProjectSettings";

const getProject = async (projectId: string) => {
	const session = await getSession(headers().get("cookie"));

	return db.project.findFirst({
		where: {
			id: projectId,
			creatorId: session?.user?.id,
		},
	});
};

type ManageProjectProps = {
	params: { projectId: string };
};

const ManageProject = async ({ params: { projectId } }: ManageProjectProps) => {
	const project = await getProject(projectId);

	if (!project) {
		notFound();
	}

	return (
		<DashboardShell>
			<BreadCrumbs
				breadCrumbs={[
					{
						name: "All Projects",
						href: "/dashboard",
					},
					{
						name: project.name,
						href: `/dashboard/${project.id}`,
						isCurrent: true,
					},
				]}
			/>
			<DashboardHeader heading={project?.name} text="Manage your project.">
				<NextLink href={`/project/${project?.id}`}>
					<Button>View Live Project</Button>
				</NextLink>
			</DashboardHeader>
			<ProjectSettings />
		</DashboardShell>
	);
};

export default ManageProject;
