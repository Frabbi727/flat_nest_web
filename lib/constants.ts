import type { ListingFilters } from "@/types/filters";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://flatnest.techrealify.com/api/v1";

export const STORAGE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL ?? "https://flatnest.techrealify.com";

export const CHAT_POLL_INTERVAL_MS = 5_000;
export const NOTIFICATION_POLL_INTERVAL_MS = 30_000;

export const QUERY_KEYS = {
  listings: (filters?: ListingFilters) =>
    filters ? ["listings", filters] : ["listings"],
  listing: (id: string) => ["listing", id],
  listingTypes: ["listing-types"],
  amenities: ["amenities"],
  facings: ["facings"],
  divisions: ["geo-divisions"],
  districts: (divisionId: number) => ["geo-districts", divisionId],
  upazilas: (districtId: number) => ["geo-upazilas", districtId],
  unions: (upazilaId: number) => ["geo-unions", upazilaId],
  wishlist: ["wishlist"],
  ownerListings: (filters: object) => ["owner-listings", filters],
  ownerAccessRequests: (filters: object) => ["owner-access-requests", filters],
  ownerAccessRequestsPendingCount: ["owner-access-requests", "pending-count"],
  chats: ["chats"],
  chatMessages: (chatId: string) => ["chat-messages", chatId],
  notifications: (page: number) => ["notifications", page],
  notificationsUnread: ["notifications-unread"],
  activeBanner: ["active-banner"],
} as const;

// localStorage key holding the id of the banner campaign the user closed.
// A new campaign (different id) bypasses it — see docs/banner/BANNER_INTEGRATION_GUIDE.md
export const BANNER_DISMISSED_KEY = "last_dismissed_banner_id";
// sessionStorage key — the dialog pops at most once per session per campaign id
export const BANNER_SESSION_SHOWN_KEY = "session_shown_banner_id";
