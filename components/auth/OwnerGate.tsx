"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function OwnerGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user && !user.is_complete) {
      router.push(user.role === null ? "/register/role" : "/register/avatar");
    } else if (user && user.role !== "owner") {
      router.push("/");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user?.is_complete || user?.role !== "owner") return null;
  return <>{children}</>;
}
