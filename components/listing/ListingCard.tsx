"use client";

import Image from "next/image";
import { Heart, Bed, Bath, Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useUIStore } from "@/store/ui.store";
import { wishlistService } from "@/services/WishlistService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { getThumbnail, formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Listing } from "@/types/api";

interface Props {
  listing: Listing;
  saved?: boolean;
}

export default function ListingCard({ listing, saved = false }: Props) {
  const { isAuthenticated } = useAuthStore();
  const { openAuthModal } = useUIStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: () => wishlistService.toggleWishlist(listing.id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.wishlist });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wishlist });
    },
  });

  const handleCardClick = () => {
    if (!isAuthenticated) {
      openAuthModal("Sign in to view listing details and contact the owner.");
      return;
    }
    router.push(`/listings/${listing.id}`);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      openAuthModal("Sign in to save listings to your wishlist.");
      return;
    }
    toggleMutation.mutate();
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer rounded-xl overflow-hidden border bg-card shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative h-48">
        <Image
          src={getThumbnail(listing.photos)}
          alt={listing.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <button
          onClick={handleSave}
          className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow"
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart
            className={cn(
              "w-4 h-4",
              saved ? "fill-red-500 text-red-500" : "text-gray-400"
            )}
          />
        </button>
        <Badge className="absolute bottom-2 left-2 bg-white text-black hover:bg-white">
          {listing.type}
        </Badge>
      </div>
      <div className="p-3">
        <p className="font-semibold text-sm line-clamp-1">{listing.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{listing.area}</p>
        <p className="text-primary font-bold mt-1">
          {formatPrice(listing.price)}
          <span className="text-xs font-normal text-muted-foreground">/mo</span>
        </p>
        <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
          {listing.beds !== null && (
            <span className="flex items-center gap-1">
              <Bed className="w-3 h-3" />
              {listing.beds} Beds
            </span>
          )}
          {listing.baths !== null && (
            <span className="flex items-center gap-1">
              <Bath className="w-3 h-3" />
              {listing.baths} Baths
            </span>
          )}
          {listing.size !== null && (
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3 h-3" />
              {listing.size} sqft
            </span>
          )}
        </div>
        {listing.available_from === null && (
          <Badge
            variant="outline"
            className="mt-2 text-xs text-green-600 border-green-300"
          >
            Available Now
          </Badge>
        )}
      </div>
    </div>
  );
}
