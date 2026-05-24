import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { STORAGE_URL } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolveImageUrl(url: string | null | undefined): string {
  if (!url) return "/placeholder-listing.jpg";
  return url.startsWith("/") ? `${STORAGE_URL}${url}` : url;
}

export function getThumbnail(
  photos: { url: string; position: number }[]
): string {
  if (!photos?.length) return "/placeholder-listing.jpg";
  const sorted = [...photos].sort((a, b) => a.position - b.position);
  return resolveImageUrl(sorted[0].url);
}

export function formatPrice(price: number): string {
  return `৳${price.toLocaleString("en-BD")}`;
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "Available Now";
  return new Date(dateString).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

