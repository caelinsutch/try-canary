import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/Atoms/Skeleton";
import { Project } from "@/lib/prisma";
import React from "react";

type ProjectItemProps = {
  post: Pick<Project, "id" | "name" | "createdAt">;
};

export const ProjectItem: React.FC<ProjectItemProps> = ({ post }) => (
  <div className="flex items-center justify-between p-4">
    <div className="grid gap-1">
      <Link
        href={`/editor/${post.id}`}
        className="font-semibold hover:underline"
      >
        {post.name}
      </Link>
      <div>
        <p className="text-sm text-slate-600">
          {formatDate(post.createdAt?.toDateString())}
        </p>
      </div>
    </div>
  </div>
);

ProjectItem.Skeleton = () => (
  <div className="p-4">
    <div className="space-y-3">
      <Skeleton className="h-5 w-2/5" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  </div>
);
