'use client';

import { SessionProvider, SessionProviderProps } from 'next-auth/react';

export const ClientSessionProvider = (props: SessionProviderProps) => {
  return <SessionProvider {...props} />;
}