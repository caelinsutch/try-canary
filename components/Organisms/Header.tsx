import Link from 'next/link';
import { Icons } from '@/components/Icons';
import { UserAccountNav } from '@/components/UserAccountNav';
import { User } from 'next-auth';
import { Project } from '@/lib/prisma';

type HeaderProps = {
  user?: Pick<User, 'name' | 'image' | 'email'>;
  project?: Pick<Project, 'name' | 'logo' | 'id'>;
};

export const Header = ({ user, project }: HeaderProps) => (
  <header className="flex h-[64px] items-center justify-between pl-2">
    {project ? (
      <Link href={`/project/${project.id}`} className="flex items-center space-x-2">
				{project.logo ? (
					<img src={project.logo} alt={project.name} className="h-8 w-8 rounded-full" />
				) : (
        <span className="text-lg font-bold dark:text-white text-slate-900">
          {project.name}
        </span>
				)}
      </Link>
    ) : (
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="dark:text-white text-slate-900" />
        <span className="text-lg font-bold dark:text-white text-slate-900">
          Try Canary
        </span>
      </Link>
    )}
    <UserAccountNav
      user={{
        name: user.name,
        image: user.image,
        email: user.email,
      }}
    />
  </header>
);
