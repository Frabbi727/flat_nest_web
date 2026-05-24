import ChatDetailView from "@/components/chat/ChatDetailView";

export default async function ChatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ChatDetailView chatId={id} />;
}
