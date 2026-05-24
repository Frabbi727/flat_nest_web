"use client";

import QueryProvider from "@/components/providers/QueryProvider";
import AuthHydrator from "@/components/providers/AuthHydrator";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <AuthHydrator>{children}</AuthHydrator>
    </QueryProvider>
  );
}
