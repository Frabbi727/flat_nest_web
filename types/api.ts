export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "renter" | "owner" | null;
  avatar_url: string | null;
  is_complete: boolean;
}

export interface ListingType {
  id: number;
  name: string;
  label: string;
  slug: string;
}

export interface Amenity {
  id: number;
  name: string;
  label: string;
}

export interface ListingFacing {
  id: number;
  label: string;
  slug: string;
}

export interface ListingPhoto {
  id: string;
  url: string;
  position: number;
}

export interface ListingOwner {
  id: string;
  name: string;
  phone: string | null;
  avatar_url: string | null;
}

export interface GeoItem {
  id: number;
  name: string;
  bn_name: string;
}

export interface Listing {
  id: string;
  title: string;
  area: string | null;
  road_and_house: string | null;
  price: number;
  deposit: number | null;
  beds: number | null;
  baths: number | null;
  size: number | null;
  floor_no: number | null;
  facing_id: number | null;
  facing: ListingFacing | null;
  available_from: string | null;
  description: string | null;
  status: "draft" | "pending" | "active" | "rejected" | "rented";
  status_label: string;
  views: number;
  coord_x: number | null;
  coord_y: number | null;
  distance_km: number | null;
  listing_type_id: number | null;
  type: string;
  division_id: number | null;
  district_id: number | null;
  upazila_id: number | null;
  union_id: number | null;
  amenities: Amenity[];
  photos: ListingPhoto[];
  owner: ListingOwner | null;
  owner_name: string | null;
  owner_phone: string | null;
  owner_alt_phone: string | null;
  owner_email: string | null;
  preferred_contact: "phone" | "email" | "chat" | null;
  created_at: string;
}

export interface OwnerListing extends Listing {
  inquiries: number;
  rejection_reason: string | null;
}

export interface ChatMessage {
  id: string;
  chat_id: string;
  sender_id: string;
  sender: { id: string; name: string; avatar_url: string | null } | null;
  text: string;
  is_read: boolean;
  created_at: string;
}

export type ChatStatus = "pending" | "accepted" | "rejected";

export interface Chat {
  id: string;
  listing: { id: string; title: string; area: string | null };
  other_user: { id: string; name: string; avatar_url: string | null };
  last_message: ChatMessage | null;
  unread_count: number;
  status: ChatStatus;
  updated_at: string;
}

export interface ChatMessagesResponse {
  chat: { status: ChatStatus };
  messages: ChatMessage[];
}

export interface Notification {
  id: string;
  kind: string;
  title: string;
  body: string;
  time: string;
  is_unread: boolean;
  reference_id: string | null;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    unread_count?: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  registration_step: 1 | 2 | 3 | null;
  user: User;
}

export interface CreateListingStep1Payload {
  title: string;
  listing_type_id: number;
  price: number;
  beds: number;
  baths: number;
  deposit?: number;
  size?: number;
  description?: string;
  amenities?: number[];
  available_from?: string;
  floor_no?: number;
  facing_id?: number;
}

export interface LocationPayload {
  area: string;
  division_id: number;
  district_id: number;
  upazila_id: number;
  union_id?: number | null;
  road?: string;
  house_name?: string;
  block?: string;
  section?: string;
  coord_y: number;
  coord_x: number;
}

export interface OwnerInfoPayload {
  owner_name: string;
  owner_phone: string;
  owner_alt_phone?: string;
  owner_email?: string;
  preferred_contact: "phone" | "email" | "chat";
}

export interface StartChatPayload {
  listing_id: string;
  initial_message: string;
}
