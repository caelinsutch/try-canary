import { headers } from "next/headers";

import { getSession } from "@/lib/session";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { DashboardShell } from "@/components/Dashboard/DashboardShell";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";

export default async function DashboardPage() {
  const session = await getSession(headers().get("cookie"));

  return (
    <DashboardShell>
      <DashboardHeader heading="Projects" text="Create and view projects.">
        Test
      </DashboardHeader>
      <div>
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No projects created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any projects yet. Start creating content.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      </div>
    </DashboardShell>
  );
}
