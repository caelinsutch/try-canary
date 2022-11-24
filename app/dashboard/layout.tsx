import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";

import { DashboardNav } from "@/components/Dashboard/DashboardNav";
import { UserAccountNav } from "@/components/UserAccountNav";
import { Icons } from "@/components/icons";
import { getUser } from "@/lib/ServerUtils/getUser";
import { Header } from "@/components/Organisms/Header";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  return (
    <div className="mx-auto flex h-screen max-w-[1440px] flex-col space-y-6 overflow-hidden px-6">
      <Header user={user} />

      <div className="grid grid-cols-[200px_1fr] gap-12">
        <aside className="flex w-[200px] flex-col">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
