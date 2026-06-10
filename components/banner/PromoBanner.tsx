"use client";

import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import BannerCarousel from "@/components/banner/BannerCarousel";
import { useBannerVM } from "@/viewmodels/useBannerVM";

function CloseButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white rounded-full p-1.5 shadow"
    >
      <X className="w-4 h-4 text-gray-700" />
    </button>
  );
}

/**
 * Renders both banner surfaces from one shared state:
 * - Inline carousel widget, in place (guests + logged-in users)
 * - Promo dialog, via portal (logged-in users, once per session per campaign)
 *
 * "X" on either surface permanently dismisses the campaign on this device;
 * soft-closing the dialog (Esc/backdrop) hides it for the session only.
 */
export default function PromoBanner() {
  const {
    banner,
    images,
    isVisible,
    shouldShowDialog,
    closeDialogForSession,
    dismiss,
  } = useBannerVM();

  if (!banner || !isVisible) return null;

  return (
    <>
      {/* Inline widget — always in the feed below search/filters */}
      <div className="relative rounded-2xl border overflow-hidden mb-6">
        <BannerCarousel
          images={images}
          title={banner.title}
          active={!shouldShowDialog}
          sizes="(max-width: 768px) 100vw, 1280px"
        />
        <CloseButton onClick={dismiss} label="Hide this promotion" />
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent px-4 pt-10 pb-3">
          <p className="text-white font-semibold text-sm">{banner.title}</p>
          {banner.description && (
            <p className="text-white/85 text-xs mt-0.5 line-clamp-2">
              {banner.description}
            </p>
          )}
        </div>
      </div>

      {/* Premium dialog — logged-in users, once per session */}
      <Dialog
        open={shouldShowDialog}
        onOpenChange={(open) => !open && closeDialogForSession()}
      >
        <DialogContent
          className="p-0 gap-0 overflow-hidden sm:max-w-lg"
          showCloseButton={false}
        >
          <div className="relative">
            <BannerCarousel
              images={images}
              title={banner.title}
              active={shouldShowDialog}
              sizes="(max-width: 640px) 100vw, 512px"
            />
            <CloseButton onClick={dismiss} label="Close banner" />
          </div>
          <div className="px-4 py-3 space-y-1">
            <DialogTitle>{banner.title}</DialogTitle>
            {banner.description && (
              <DialogDescription>{banner.description}</DialogDescription>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
