import EditListingView from "@/components/owner/EditListingView";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditListingView listingId={id} />;
}
