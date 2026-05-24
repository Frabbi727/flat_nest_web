"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatListVM } from "@/viewmodels/useChatListVM";
import { resolveImageUrl } from "@/lib/utils";

export default function MessagesPage() {
  const { chats, isLoading, error } = useChatListVM();

  return (
    <main className="max-w-2xl mx-auto px-4 py-4 space-y-4">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h1 className="text-xl font-bold">Messages</h1>
      </div>

      {error && <p className="text-destructive text-sm">{error}</p>}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 p-3 border rounded-xl">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : chats.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No conversations yet.</p>
          <p className="text-sm mt-1">
            Start a chat from any listing detail page.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {chats.map((chat) => (
            <Link
              key={chat.id}
              href={`/messages/${chat.id}`}
              className="flex items-center gap-3 p-3 border rounded-xl hover:bg-muted transition-colors"
            >
              <Avatar className="w-10 h-10 shrink-0">
                <AvatarImage
                  src={resolveImageUrl(chat.other_user.avatar_url)}
                  alt={chat.other_user.name}
                />
                <AvatarFallback>
                  {chat.other_user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{chat.other_user.name}</p>
                  {chat.unread_count > 0 && (
                    <span className="text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">
                      {chat.unread_count}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {chat.listing.title}
                </p>
                {chat.last_message && (
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
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
