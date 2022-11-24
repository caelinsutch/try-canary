import { CreateProjectButton } from '@/components/CreateProjectButton';
import { DashboardHeader } from '@/components/Dashboard/DashboardHeader';
import { DashboardShell } from '@/components/Dashboard/DashboardShell';
import { ProjectItem } from '@/components/ProjectItem';

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Projects" text="Create and view projects.">
        <CreateProjectButton />
      </DashboardHeader>
    </DashboardShell>
  );
}
