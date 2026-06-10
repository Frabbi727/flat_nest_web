"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, Clock, Send, X, XCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatDetailVM } from "@/viewmodels/useChatDetailVM";
import { useAuthStore } from "@/store/auth.store";
import { resolveImageUrl, cn } from "@/lib/utils";
import Link from "next/link";

export default function ChatDetailView({ chatId }: { chatId: string }) {
  const {
    messages,
    chatStatus,
    isLoading,
    chat,
    sendMessage,
    sendPending,
    acceptChat,
    acceptPending,
    rejectChat,
    rejectPending,
  } = useChatDetailVM(chatId);
  const { user } = useAuthStore();
  const isOwner = user?.role === "owner";
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || sendPending) return;
    sendMessage(trimmed);
    setText("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] max-w-2xl mx-auto">
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-background">
        <Link href="/messages" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        {chat && (
          <>
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={resolveImageUrl(chat.other_user.avatar_url)}
                alt={chat.other_user.name}
              />
              <AvatarFallback>
                {chat.other_user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{chat.other_user.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {chat.listing.title}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {isLoading
          ? [1, 2, 3].map((i) => (
              <div key={i} className="flex gap-2">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-10 w-48 rounded-xl" />
              </div>
            ))
          : messages.map((msg) => {
              const isOwn = msg.sender_id === user?.id;
              return (
                <div
                  key={msg.id}
                  className={cn("flex gap-2", isOwn && "flex-row-reverse")}
                >
                  {!isOwn && (
                    <Avatar className="w-7 h-7 shrink-0">
                      <AvatarImage
                        src={resolveImageUrl(msg.sender?.avatar_url)}
                        alt={msg.sender?.name ?? ""}
                      />
                      <AvatarFallback>
                        {msg.sender?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[70%] rounded-2xl px-3 py-2 text-sm",
                      isOwn
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-muted rounded-tl-sm"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
        <div ref={bottomRef} />
      </div>

      {/* Footer — never render the input unless the chat is accepted (§15) */}
      {!isLoading &&
        (chatStatus === "accepted" ? (
          <div className="border-t px-4 py-3 flex gap-2 bg-background">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message…"
              rows={1}
              className="flex-1 resize-none rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 bg-background"
            />
            <Button
              onClick={handleSend}
              disabled={!text.trim() || sendPending}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        ) : chatStatus === "rejected" ? (
          <div className="border-t px-4 py-4 bg-background">
            <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <XCircle className="w-4 h-4" />
              This chat request was declined.
            </p>
          </div>
        ) : isOwner ? (
          <div className="border-t px-4 py-4 bg-background space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              This renter wants to chat about your listing.
            </p>
            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => acceptChat()}
                disabled={acceptPending || rejectPending}
              >
                <Check className="w-4 h-4 mr-1" />
                Accept Request
              </Button>
              <Button
                className="flex-1"
                variant="outline"
                onClick={() => rejectChat()}
                disabled={acceptPending || rejectPending}
              >
                <X className="w-4 h-4 mr-1" />
                Reject Request
              </Button>
            </div>
          </div>
        ) : (
          <div className="border-t px-4 py-4 bg-background">
            <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Waiting for the owner to accept your chat request.
            </p>
          </div>
        ))}
    </div>
  );
}
