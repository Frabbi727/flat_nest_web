import AuthGate from "@/components/auth/AuthGate";
import Navbar from "@/components/layout/Navbar";

export default function RenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate>
      <Navbar />
      {children}
    </AuthGate>
  );
}
