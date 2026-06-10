"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/ui.store";

export default function AuthModal() {
  const { authModalOpen, authModalMessage, closeAuthModal } = useUIStore();
  const router = useRouter();

  const handleLogin = () => {
    closeAuthModal();
    const here = window.location.pathname + window.location.search;
    router.push(`/login?next=${encodeURIComponent(here)}`);
  };

  const handleRegister = () => {
    closeAuthModal();
    router.push("/register");
  };

  return (
    <Dialog open={authModalOpen} onOpenChange={closeAuthModal}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Sign in required</DialogTitle>
          <DialogDescription>{authModalMessage}</DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 mt-2">
          <Button className="flex-1" onClick={handleLogin}>
            Log In
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleRegister}>
            Sign Up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
