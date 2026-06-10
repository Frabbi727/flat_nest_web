"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useEditListingVM } from "@/viewmodels/useEditListingVM";

const editSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  price: z.number({ error: "Price is required" }).min(1),
  beds: z.number({ error: "Beds is required" }).min(0),
  baths: z.number({ error: "Baths is required" }).min(0),
  deposit: z.number().optional(),
  size: z.number().optional(),
  description: z.string().optional(),
  owner_name: z.string().optional(),
  owner_phone: z.string().optional(),
  owner_alt_phone: z.string().optional(),
  owner_email: z.string().email().optional().or(z.literal("")),
});

type EditForm = z.infer<typeof editSchema>;

export default function EditListingView({ listingId }: { listingId: string }) {
  const router = useRouter();
  const { listing, isLoading, updateListing, updatePending } =
    useEditListingVM(listingId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditForm>({
    resolver: zodResolver(editSchema),
  });

  useEffect(() => {
    if (listing) {
      reset({
        title: listing.title,
        price: listing.price,
        beds: listing.beds ?? undefined,
        baths: listing.baths ?? undefined,
        deposit: listing.deposit ?? undefined,
        size: listing.size ?? undefined,
        description: listing.description ?? "",
        owner_name: listing.owner_name ?? "",
        owner_phone: listing.owner_phone ?? "",
        owner_alt_phone: listing.owner_alt_phone ?? "",
        owner_email: listing.owner_email ?? "",
      });
    }
  }, [listing, reset]);

  if (isLoading) {
    return (
      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <Skeleton className="h-6 w-32" />
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </main>
    );
  }

  if (!listing) {
    return (
      <main className="max-w-lg mx-auto px-4 py-6">
        <p className="text-muted-foreground">Listing not found.</p>
      </main>
    );
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            border: "1px solid #E5E7EB",
            background: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#1C1C1E" }}>
          Edit Listing
        </h1>
      </div>

      <form onSubmit={handleSubmit((d) => updateListing(d))} className="space-y-5">
        {/* Basic info */}
        <section
          style={{
            border: "1px solid #EFF1F4",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 600, color: "#5B5B62", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Basic Info
          </p>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Title *</Label>
              <Input
                {...register("title")}
                placeholder="e.g. Spacious 3 Bed Apartment in Mirpur"
                style={{ borderRadius: 10 }}
              />
              {errors.title && (
                <p className="text-destructive text-xs">{errors.title.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Rent (৳/month) *</Label>
                <Input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="25000"
                  style={{ borderRadius: 10 }}
                />
                {errors.price && (
                  <p className="text-destructive text-xs">{errors.price.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label>Deposit (৳)</Label>
                <Input
                  type="number"
                  {...register("deposit", { valueAsNumber: true })}
                  placeholder="50000"
                  style={{ borderRadius: 10 }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Bedrooms *</Label>
                <Input
                  type="number"
                  {...register("beds", { valueAsNumber: true })}
                  placeholder="3"
                  style={{ borderRadius: 10 }}
                />
              </div>
              <div className="space-y-1">
                <Label>Bathrooms *</Label>
                <Input
                  type="number"
                  {...register("baths", { valueAsNumber: true })}
                  placeholder="2"
                  style={{ borderRadius: 10 }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Size (sqft)</Label>
              <Input
                type="number"
                {...register("size", { valueAsNumber: true })}
                placeholder="1200"
                style={{ borderRadius: 10 }}
              />
            </div>

            <div className="space-y-1">
              <Label>Description</Label>
              <textarea
                {...register("description")}
                placeholder="Describe the listing…"
                className="w-full text-sm resize-none"
                style={{
                  borderRadius: 10,
                  border: "1px solid #E5E7EB",
                  padding: "10px 12px",
                  minHeight: 88,
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
            </div>
          </div>
        </section>

        {/* Contact info */}
        <section
          style={{
            border: "1px solid #EFF1F4",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 600, color: "#5B5B62", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Contact Info
          </p>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Owner Name</Label>
              <Input
                {...register("owner_name")}
                placeholder="Your name"
                style={{ borderRadius: 10 }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Phone</Label>
                <Input
                  {...register("owner_phone")}
                  placeholder="01711000000"
                  style={{ borderRadius: 10 }}
                />
              </div>
              <div className="space-y-1">
                <Label>Alt Phone</Label>
                <Input
                  {...register("owner_alt_phone")}
                  placeholder="Optional"
                  style={{ borderRadius: 10 }}
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                {...register("owner_email")}
                placeholder="owner@email.com"
                style={{ borderRadius: 10 }}
              />
            </div>
          </div>
        </section>

        <Button
          type="submit"
          className="w-full"
          disabled={updatePending}
          style={{ height: 48, borderRadius: 12, fontSize: 15, fontWeight: 600 }}
        >
          {updatePending ? "Saving…" : "Save Changes"}
        </Button>
      </form>
    </main>
  );
}
