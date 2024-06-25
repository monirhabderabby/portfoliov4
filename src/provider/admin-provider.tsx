"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { ReactNode } from "react";

const AdminProvider = ({ children }: { children: ReactNode }) => {
  const { isLoaded, user } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return null;
  }

  if (!process.env.NEXT_PUBLIC_ADMIN_ID) {
    return null;
  }

  const isAdmin = process.env.NEXT_PUBLIC_ADMIN_ID === user?.id;

  if (!isAdmin) {
    signOut({ redirectUrl: "/sign-in" });
  }
  return children;
};

export default AdminProvider;
