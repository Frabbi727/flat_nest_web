import OwnerGate from "@/components/auth/OwnerGate";
import Navbar from "@/components/layout/Navbar";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OwnerGate>
      <Navbar />
      {children}
    </OwnerGate>
  );
}
