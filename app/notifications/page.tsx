"use client";

import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotificationsVM } from "@/viewmodels/useNotificationsVM";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import AuthGate from "@/components/auth/AuthGate";

function NotificationsContent() {
  const {
    notifications,
    isLoading,
    unreadCount,
    markAllRead,
    markAllReadPending,
    currentPage,
    totalPages,
    loadNextPage,
  } = useNotificationsVM();
  const router = useRouter();

  const handleTap = (kind: string, referenceId: string | null) => {
    if (kind === "new_message" && referenceId) {
      router.push(`/messages/${referenceId}`);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => markAllRead()}
            disabled={markAllReadPending}
          >
            <CheckCheck className="w-4 h-4 mr-1" />
            Mark all read
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-xl p-3 space-y-1.5">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Bell className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => handleTap(n.kind, n.reference_id)}
              className={cn(
                "w-full text-left border rounded-xl p-3 hover:bg-muted transition-colors",
                n.is_unread && "border-primary/30 bg-primary/5"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-sm">{n.title}</p>
                <span className="text-xs text-muted-foreground shrink-0">
                  {n.time}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{n.body}</p>
            </button>
          ))}
          {currentPage < totalPages && (
            <Button
              variant="outline"
              className="w-full"
              onClick={loadNextPage}
            >
              Load more
            </Button>
          )}
        </div>
      )}
    </main>
  );
}

export default function NotificationsPage() {
  return (
    <AuthGate>
      <NotificationsContent />
    </AuthGate>
  );
}
