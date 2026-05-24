import { Suspense } from "react";
import { fetchListingTypes, fetchAmenities } from "@/services/MetaService";
import HomeClient from "@/components/listing/HomeClient";
import ListingCardSkeleton from "@/components/listing/ListingCardSkeleton";
import Navbar from "@/components/layout/Navbar";
import AuthModal from "@/components/auth/AuthModal";

export default async function HomePage() {
  const [listingTypes, amenities] = await Promise.all([
    fetchListingTypes(),
    fetchAmenities(),
  ]);

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-4 space-y-4 w-full">
        <Suspense fallback={<ListingCardSkeleton count={6} />}>
          <HomeClient listingTypes={listingTypes} amenities={amenities} />
        </Suspense>
      </main>
      <AuthModal />
    </>
  );
}
