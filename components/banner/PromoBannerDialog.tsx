"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBannerVM } from "@/viewmodels/useBannerVM";
import { resolveImageUrl, cn } from "@/lib/utils";
import type { BannerImage } from "@/types/api";

const AUTO_ADVANCE_MS = 5_000;

function CarouselSlide({ image, title }: { image: BannerImage; title: string }) {
  const picture = (
    <Image
      src={resolveImageUrl(image.image_url)}
      alt={title}
      fill
      className="object-cover"
      sizes="(max-width: 640px) 100vw, 512px"
    />
  );
  if (!image.target_url) {
    return <div className="relative w-full shrink-0 aspect-video">{picture}</div>;
  }
  return (
    <a
      href={image.target_url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block w-full shrink-0 aspect-video"
    >
      {picture}
    </a>
  );
}

export default function PromoBannerDialog() {
  const { banner, images, isVisible, dismiss } = useBannerVM();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isVisible || images.length <= 1) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      AUTO_ADVANCE_MS
    );
    return () => clearInterval(timer);
  }, [isVisible, images.length]);

  if (!banner) return null;

  return (
    <Dialog open={isVisible} onOpenChange={(open) => !open && dismiss()}>
      <DialogContent
        className="p-0 gap-0 overflow-hidden sm:max-w-lg"
        showCloseButton={false}
      >
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {images.map((img) => (
                <CarouselSlide key={img.id} image={img} title={banner.title} />
              ))}
            </div>
          </div>

          {/* The "X" — hides this campaign on this device until a new one launches */}
          <button
            onClick={dismiss}
            aria-label="Close banner"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-1.5 shadow"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>

          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-5 bg-white" : "w-1.5 bg-white/60"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        <div className="px-4 py-3 space-y-1">
          <DialogTitle>{banner.title}</DialogTitle>
          {banner.description && (
            <DialogDescription>{banner.description}</DialogDescription>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
