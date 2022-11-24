import { headers } from "next/headers";

import { getSession } from "@/lib/session";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { DashboardShell } from "@/components/Dashboard/DashboardShell";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { db } from "@/lib/db";
import { CreateProjectButton } from "@/components/CreateProjectButton";
import NextLink from "next/link";

const getProjects = async () => {
	const session = await getSession(headers().get("cookie"));
	return db.project.findMany({
		where: {
			creatorId: session?.user?.id,
		},
	});
};

export default async function DashboardPage() {
	const projects = await getProjects();

	return (
		<DashboardShell>
			<DashboardHeader heading="Projects" text="Create and view projects.">
				<CreateProjectButton />
			</DashboardHeader>
			<div>
				{projects.length === 0 ? (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name="logo" />
						<EmptyPlaceholder.Title>No projects found</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							No projects found, create one.
						</EmptyPlaceholder.Description>
					</EmptyPlaceholder>
				) : (
					<div className="grid grid-cols-1 gap-4">
						{projects.map((project) => (
							<NextLink key={project.id} href={`/dashboard/${project.id}`}>
								<div className="bg-gray-50 radius-2 border-gray-100 border-2 px-2 py-4">
									<h2 className="text-gray-800 font-semibold">
										{project.name}
									</h2>
								</div>
							</NextLink>
						))}
					</div>
				)}
			</div>
		</DashboardShell>
	);
}
