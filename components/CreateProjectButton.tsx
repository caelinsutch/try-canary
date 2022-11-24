'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/lib/prisma';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import toast from '@/components/Atoms/Toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyCreateSchema } from '@/lib/validations/company';
import { Dialog } from '@/components/Atoms/Dialog';

async function createProject(
  projectName: string
): Promise<Pick<Project, 'id'>> {
  const response = await fetch('/api/projects', {
    method: 'POST',
    body: JSON.stringify({
      name: projectName,
    }),
  });

  if (!response?.ok) {
    throw new Error();
  }

  return await response.json();
}

type CreateProjectButtonProps = React.HTMLAttributes<HTMLButtonElement>;

type CreateProjectData = {
  name: string;
};

export const CreateProjectButton = ({
  className,
  ...props
}: CreateProjectButtonProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectData>({
    resolver: zodResolver(companyCreateSchema),
  });
  const [open, setOpen] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onCreateCompany = async ({ name }: CreateProjectData) => {
    setIsLoading(!isLoading);

    try {
      const company = await createProject(name);
      toast({
        title: 'Project created!',
        type: 'success',
      });
      // This forces a cache invalidation.
      router.refresh();

      router.push(`/dashboard/${company.id}`);
    } catch (e) {
      toast({
        title: 'Something went wrong.',
        message: 'Project not created. Please try again.',
        type: 'error',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="relative inline-flex h-9 items-center rounded-md border border-transparent bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400"
          {...props}
        >
          New Project
        </button>
      </Dialog.Trigger>
      <Dialog.Content>
        <div className="flex items-center justify-between">
          <Dialog.Title>Create a new project</Dialog.Title>
          <Icons.close className="h-4 w-4" />
        </div>
        <div>
          <form onSubmit={handleSubmit(onCreateCompany)}>
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-400"
              >
                Project Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Company Name"
                  className="my-0 mb-2 block h-9 w-full rounded-md dark:bg-neutral-800 dark:text-white border border-slate-300 dark:border-neutral-700 py-2 px-3 text-sm dark:text-neutral-100 placeholder:text-neutral-500 dark:focus:ring-2 dark:focus:ring-offset-1 focus:ring-neutral-600 dark:hover:border-neutral-600 focus:outline-none"
                  {...register('name')}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  'inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-500 hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500',
                  {
                    'cursor-not-allowed opacity-60': isLoading,
                  },
                  className
                )}
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.add className="mr-2 h-4 w-4" />
                )}
                Create
              </button>
            </div>
          </form>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
