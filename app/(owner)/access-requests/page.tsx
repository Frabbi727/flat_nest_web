"use client";

import Link from "next/link";
import { KeyRound, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAccessRequestsVM } from "@/viewmodels/useAccessRequestsVM";
import { resolveImageUrl, formatDate, cn } from "@/lib/utils";
import type { AccessRequestStatus } from "@/types/api";

const TABS: { value: AccessRequestStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Declined" },
];

const STATUS_BADGE: Record<AccessRequestStatus, string> = {
  pending: "text-amber-700 border-amber-300 bg-amber-50",
  accepted: "text-green-700 border-green-300 bg-green-50",
  rejected: "text-red-700 border-red-300 bg-red-50",
};

export default function AccessRequestsPage() {
  const {
    requests,
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    currentPage,
    totalPages,
    totalCount,
    setPage,
    acceptRequest,
    rejectRequest,
    isResponding,
  } = useAccessRequestsVM();

  return (
    <main className="max-w-2xl mx-auto px-4 py-4 space-y-4">
      <div className="flex items-center gap-2">
        <KeyRound className="w-5 h-5 text-primary" />
        <h1 className="text-xl font-bold">Access Requests</h1>
        {statusFilter === "pending" && totalCount > 0 && (
          <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
            {totalCount}
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        Renters asking to see your contact details and exact property location.
        Only the renters you accept can see them.
      </p>

      <div className="flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={cn(
              "h-8 px-4 rounded-full text-sm transition-colors",
              statusFilter === tab.value
                ? "bg-foreground text-background font-semibold"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-xl p-3 flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <KeyRound className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No {statusFilter === "rejected" ? "declined" : statusFilter} requests.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {requests.map((req) => (
            <div key={req.id} className="border rounded-xl p-3">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={resolveImageUrl(req.requester.avatar_url)} />
                  <AvatarFallback>
                    {req.requester.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-sm">{req.requester.name}</p>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatDate(req.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    wants to see contact details for{" "}
                    <Link
                      href={`/listings/${req.listing.id}`}
                      className="text-primary hover:underline"
                    >
                      &ldquo;{req.listing.title}&rdquo;
                    </Link>
                  </p>
                  {req.status === "pending" ? (
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        onClick={() => acceptRequest(req.id)}
                        disabled={isResponding(req.id)}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => rejectRequest(req.id)}
                        disabled={isResponding(req.id)}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Decline
                      </Button>
                    </div>
                  ) : (
                    <Badge
                      variant="outline"
                      className={cn("mt-2", STATUS_BADGE[req.status])}
                    >
                      {req.status === "accepted" ? "Accepted" : "Declined"}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
