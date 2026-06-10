"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useUserSync } from "@/hooks/useUserSync";

export default function AuthHydrator({
  children,
}: {
  children: React.ReactNode;
}) {
  useUserSync();

  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}
