import 'styles/globals.css';
import { getSession } from '@/lib/session';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

interface AuthLayoutProps {
  children: React.ReactNode;
}

async function getUser() {
  const session = await getSession(headers().get('cookie'));

  if (!session?.user) {
    return null;
  }

  return session.user;
}
export default async function RootLayout({ children }: AuthLayoutProps) {
  const user = await getUser();

  if (user) {
    return redirect('/dashboard');
  }

  return <div className="grid min-h-screen grid-cols-2">{children}</div>;
}
