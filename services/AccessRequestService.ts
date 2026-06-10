import api from "@/lib/axios";
import type {
  IAccessRequestService,
  AccessRequestFilters,
  AccessRequestListResult,
  AccessRequestResult,
} from "@/services/interfaces/IAccessRequestService";

export class AccessRequestService implements IAccessRequestService {
  async requestAccess(listingId: string): Promise<AccessRequestResult> {
    const { data } = await api.post(`/listings/${listingId}/request-access`);
    return data.data;
  }

  async getOwnerRequests(
    filters?: AccessRequestFilters
  ): Promise<AccessRequestListResult> {
    const { data } = await api.get("/owner/access-requests", {
      params: filters,
    });
    return {
      requests: data.data ?? [],
      meta: data.meta ?? {
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0,
      },
    };
  }

  async acceptRequest(requestId: string): Promise<AccessRequestResult> {
    const { data } = await api.post(`/owner/access-requests/${requestId}/accept`);
    return data.data;
  }

  async rejectRequest(requestId: string): Promise<AccessRequestResult> {
    const { data } = await api.post(`/owner/access-requests/${requestId}/reject`);
    return data.data;
  }
}

export const accessRequestService: IAccessRequestService =
  new AccessRequestService();
