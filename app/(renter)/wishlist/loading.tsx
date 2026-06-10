import ListingCardSkeleton from "@/components/listing/ListingCardSkeleton";

export default function WishlistLoading() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ width: 120, height: 28, borderRadius: 8, background: "#EFF1F4", marginBottom: 24 }} />
      <ListingCardSkeleton count={4} />
    </main>
  );
}
