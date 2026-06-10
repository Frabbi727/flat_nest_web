import type { AccessRequest, AccessRequestStatus } from "@/types/api";

export interface AccessRequestFilters {
  status?: AccessRequestStatus;
  page?: number;
}

export interface AccessRequestListResult {
  requests: AccessRequest[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface AccessRequestResult {
  id: string;
  status: AccessRequestStatus;
}

export interface IAccessRequestService {
  /** Renter: ask the owner to unlock contact & exact location for a listing. */
  requestAccess(listingId: string): Promise<AccessRequestResult>;
  /** Owner: list access requests for own listings, optionally filtered by status. */
  getOwnerRequests(filters?: AccessRequestFilters): Promise<AccessRequestListResult>;
  /** Owner: grant access to the requester. */
  acceptRequest(requestId: string): Promise<AccessRequestResult>;
  /** Owner: decline the request. */
  rejectRequest(requestId: string): Promise<AccessRequestResult>;
}
