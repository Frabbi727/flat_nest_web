"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { resolveImageUrl, cn } from "@/lib/utils";
import type { BannerImage } from "@/types/api";

const AUTO_ADVANCE_MS = 5_000;

function Slide({
  image,
  title,
  sizes,
}: {
  image: BannerImage;
  title: string;
  sizes: string;
}) {
  const picture = (
    <Image
      src={resolveImageUrl(image.image_url)}
      alt={title}
      fill
      className="object-cover"
      sizes={sizes}
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

/**
 * Auto-advancing 16:9 image carousel (max 5 slides — capped upstream).
 * Auto-play and dot indicators are disabled when there is a single image.
 */
export default function BannerCarousel({
  images,
  title,
  active = true,
  sizes = "(max-width: 640px) 100vw, 672px",
}: {
  images: BannerImage[];
  title: string;
  /** Pause auto-advance when the carousel isn't on screen (e.g. dialog closed). */
  active?: boolean;
  sizes?: string;
}) {
  const [index, setIndex] = useState(0);
  const autoPlay = active && images.length > 1;

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      AUTO_ADVANCE_MS
    );
    return () => clearInterval(timer);
  }, [autoPlay, images.length]);

  const current = Math.min(index, Math.max(images.length - 1, 0));

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img) => (
            <Slide key={img.id} image={img} title={title} sizes={sizes} />
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((img, i) => (
            <button
              key={img.id}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === current ? "w-5 bg-white" : "w-1.5 bg-white/60"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
