import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { DashboardShell } from "@/components/Dashboard/DashboardShell";
import { ProjectItem } from "@/components/ProjectItem";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts." />
      <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
        <ProjectItem.Skeleton />
        <ProjectItem.Skeleton />
        <ProjectItem.Skeleton />
        <ProjectItem.Skeleton />
        <ProjectItem.Skeleton />
      </div>
    </DashboardShell>
  );
}
