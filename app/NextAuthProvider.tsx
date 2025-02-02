"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export interface AuthProviderProps {
    children: React.ReactNode;
    session?: Session | null;
}

export const NextAuthProvider = ({ children, session }: Readonly<AuthProviderProps>) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};