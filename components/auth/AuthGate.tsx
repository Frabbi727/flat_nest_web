"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function AuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // window.location instead of usePathname() — reading the pathname during
      // render breaks partial prerendering of dynamic routes
      const here = window.location.pathname + window.location.search;
      router.push(`/login?next=${encodeURIComponent(here)}`);
    } else if (user && !user.is_complete) {
      if (user.phone === null) {
        router.push("/register?googleUser=true");
      } else {
        router.push(user.role === null ? "/register/role" : "/register/avatar");
      }
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || (user && !user.is_complete)) return null;
  return <>{children}</>;
}
