import 'styles/globals.css';
import { Toaster } from '@/components/Atoms/Toast';
import React from 'react';
import { getSession } from '@/lib/session';
import { headers } from 'next/headers';
import { ClientSessionProvider } from '@/prisma/providers/SessionProvider';

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout  =async ({ children }: RootLayoutProps) => {
    const session = await getSession(headers().get('cookie'));
  return (
    <html
      lang="en"
      className="dark:bg-black bg-white text-slate-900 dark:text-white antialiased"
    >
      <head />
      <body className="min-h-screen">
                  <ClientSessionProvider session={session}>

        {children}
        </ClientSessionProvider></body>
      <Toaster position="bottom-right" />
    </html>
  );
};

export default RootLayout;
