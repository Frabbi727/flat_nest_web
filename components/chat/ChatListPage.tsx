"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatListVM } from "@/viewmodels/useChatListVM";
import { useAuthStore } from "@/store/auth.store";
import { resolveImageUrl } from "@/lib/utils";
import type { ChatStatus } from "@/types/api";

function StatusBadge({ status, isOwner }: { status: ChatStatus; isOwner: boolean }) {
  if (status === "accepted") return null;
  const cfg =
    status === "rejected"
      ? { label: "Rejected", color: "#991B1B", bg: "#FEE2E2" }
      : isOwner
        ? { label: "New request", color: "#B45309", bg: "#FEF3C7" }
        : { label: "Waiting for owner", color: "#B45309", bg: "#FEF3C7" };
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        borderRadius: 999,
        padding: "2px 8px",
        color: cfg.color,
        background: cfg.bg,
        whiteSpace: "nowrap",
        marginLeft: 8,
        flexShrink: 0,
      }}
    >
      {cfg.label}
    </span>
  );
}

export default function ChatListPage() {
  const { chats, isLoading, error } = useChatListVM();
  const { user } = useAuthStore();
  const isOwner = user?.role === "owner";

  return (
    <main
      style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px" }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1C1C1E" }}>
          Messages
        </h1>
      </div>

      {error && <p className="text-destructive text-sm">{error}</p>}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 items-center" style={{ padding: 16, borderRadius: 14, border: "1px solid #EFF1F4" }}>
              <Skeleton className="w-11 h-11 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : chats.length === 0 ? (
        <div
          className="text-center"
          style={{ paddingTop: 64, paddingBottom: 64 }}
        >
          <MessageCircle
            style={{ width: 40, height: 40, margin: "0 auto 12px", opacity: 0.2, color: "#1A6B72" }}
          />
          <p style={{ fontSize: 14, color: "#8A8A8E" }}>No conversations yet.</p>
          <p style={{ fontSize: 13, color: "#8A8A8E", marginTop: 4 }}>
            Renters can start a chat from any listing.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {chats.map((chat) => (
            <Link
              key={chat.id}
              href={`/messages/${chat.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                borderRadius: 14,
                border: "1px solid #EFF1F4",
                background: "#fff",
                textDecoration: "none",
              }}
            >
              <Avatar className="w-11 h-11 shrink-0">
                <AvatarImage
                  src={resolveImageUrl(chat.other_user.avatar_url)}
                  alt={chat.other_user.name}
                />
                <AvatarFallback
                  style={{ background: "#E6F0F1", color: "#0E484D", fontSize: 14, fontWeight: 600 }}
                >
                  {chat.other_user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="flex items-center justify-between">
                  <span className="flex items-center" style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#1C1C1E", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {chat.other_user.name}
                    </p>
                    <StatusBadge status={chat.status ?? "pending"} isOwner={isOwner} />
                  </span>
                  {chat.unread_count > 0 && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        background: "#1A6B72",
                        color: "#fff",
                        borderRadius: 999,
                        padding: "2px 7px",
                        marginLeft: 8,
                      }}
                    >
                      {chat.unread_count}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 12, color: "#8A8A8E", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 2 }}>
                  {chat.listing.title}
                </p>
                {chat.last_message && (
                  <p style={{ fontSize: 12, color: "#8A8A8E", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 1 }}>
                    {chat.last_message.text}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
