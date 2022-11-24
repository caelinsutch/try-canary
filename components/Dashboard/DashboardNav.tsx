'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { Icon, Icons } from '@/components/Icons';

export type NavigationItem = {
  title: string;
  href: string;
  disabled?: boolean;
  icon?: Icon;
};

export const navigationItems: NavigationItem[] = [
  {
    title: 'Projects',
    href: '/dashboard',
    icon: Icons.post,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Icons.settings,
  },
];

export function DashboardNav() {
  const path = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {navigationItems.map((navigationItem, index) => {
        const base = (
          <span
            className={clsx(
              'group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800',
              path === navigationItem.href
                ? 'bg-slate-200 dark:bg-slate-600'
                : 'transparent',
              navigationItem.disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            <navigationItem.icon className="mr-2 h-4 w-4" />
            <span>{navigationItem.title}</span>
          </span>
        );
        return navigationItem.disabled ? (
          base
        ) : (
          <Link
            key={index}
            href={navigationItem.disabled ? '/' : navigationItem.href}
          >
            {base}
          </Link>
        );
      })}
    </nav>
  );
}
