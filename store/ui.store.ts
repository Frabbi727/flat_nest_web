import { create } from "zustand";

interface UIState {
  authModalOpen: boolean;
  authModalMessage: string;
  openAuthModal: (message?: string) => void;
  closeAuthModal: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  authModalOpen: false,
  authModalMessage: "Sign in to continue",
  openAuthModal: (message = "Sign in to continue") =>
    set({ authModalOpen: true, authModalMessage: message }),
  closeAuthModal: () => set({ authModalOpen: false }),
}));
