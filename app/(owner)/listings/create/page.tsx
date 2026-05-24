"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createListingStep1Schema, type CreateListingStep1Form } from "@/types/forms";
import { useCreateListingVM } from "@/viewmodels/useCreateListingVM";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-colors ${
            i < current ? "bg-primary" : "bg-muted"
          }`}
        />
      ))}
    </div>
  );
}

export default function CreateListingPage() {
  const {
    currentStep,
    submitStep1,
    step1Pending,
    submitStep2,
    step2Pending,
    submitStep3,
    step3Pending,
    submitStep4,
    step4Pending,
    submitStep5,
    step5Pending,
    goBack,
    draftListingId,
  } = useCreateListingVM();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateListingStep1Form>({
    resolver: zodResolver(createListingStep1Schema),
  });

  return (
    <main className="max-w-lg mx-auto px-4 py-4">
      <div className="flex items-center gap-3 mb-4">
        {currentStep > 1 && (
          <button onClick={goBack} className="text-muted-foreground">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-xl font-bold">
          {currentStep === 1 && "Basic Info"}
          {currentStep === 2 && "Upload Photos"}
          {currentStep === 3 && "Location"}
          {currentStep === 4 && "Contact Info"}
          {currentStep === 5 && "Review & Submit"}
        </h1>
      </div>

      <StepIndicator current={currentStep} total={5} />

      {currentStep === 1 && (
        <form
          onSubmit={handleSubmit((d) =>
            submitStep1({
              title: d.title,
              listing_type_id: d.listing_type_id,
              price: d.price,
              beds: d.beds,
              baths: d.baths,
              deposit: d.deposit,
              size: d.size,
              description: d.description,
              amenities: d.amenities,
              available_from: d.available_from,
              floor_no: d.floor_no,
              facing_id: d.facing_id,
            })
          )}
          className="space-y-4"
        >
          <div className="space-y-1">
            <Label>Title *</Label>
            <Input placeholder="e.g. Spacious 3 Bed Apartment in Mirpur" {...register("title")} />
            {errors.title && <p className="text-destructive text-xs">{errors.title.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Monthly Rent (৳) *</Label>
              <Input type="number" placeholder="25000" {...register("price", { valueAsNumber: true })} />
            </div>
            <div className="space-y-1">
              <Label>Deposit (৳)</Label>
              <Input type="number" placeholder="50000" {...register("deposit", { valueAsNumber: true })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Bedrooms *</Label>
              <Input type="number" placeholder="3" {...register("beds", { valueAsNumber: true })} />
            </div>
            <div className="space-y-1">
              <Label>Bathrooms *</Label>
              <Input type="number" placeholder="2" {...register("baths", { valueAsNumber: true })} />
            </div>
          </div>
          <div className="space-y-1">
            <Label>Description</Label>
            <textarea
              className="w-full rounded-lg border px-3 py-2 text-sm resize-none outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px]"
              placeholder="Describe the listing…"
              {...register("description")}
            />
          </div>
          <Button type="submit" className="w-full" disabled={step1Pending}>
            {step1Pending ? "Saving…" : "Continue"}
          </Button>
        </form>
      )}

      {currentStep === 2 && (
        <Step2Photos onSubmit={submitStep2} pending={step2Pending} />
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Location step — geo dropdowns and GPS picker (implementation uses{" "}
            <code>GeoService</code> + Leaflet map picker).
          </p>
          <Button
            className="w-full"
            onClick={() =>
              submitStep3({
                area: "Mirpur-10",
                division_id: 1,
                district_id: 21,
                upazila_id: 341,
                coord_y: 23.8103,
                coord_x: 90.4125,
              })
            }
            disabled={step3Pending}
          >
            {step3Pending ? "Saving…" : "Continue"}
          </Button>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Owner contact info — name, phone, email, preferred contact method.
          </p>
          <Button
            className="w-full"
            onClick={() =>
              submitStep4({
                owner_name: "Owner Name",
                owner_phone: "01711000000",
                preferred_contact: "phone",
              })
            }
            disabled={step4Pending}
          >
            {step4Pending ? "Saving…" : "Continue"}
          </Button>
        </div>
      )}

      {currentStep === 5 && (
        <div className="space-y-4">
          <div className="rounded-xl border p-4 space-y-2 text-sm">
            <p className="font-semibold">Listing ID: {draftListingId}</p>
            <p className="text-muted-foreground">
              Review your listing and submit for admin approval. Once approved,
              it will be visible to renters.
            </p>
          </div>
          <Button
            className="w-full"
            onClick={() => submitStep5()}
            disabled={step5Pending}
          >
            {step5Pending ? "Submitting…" : "Submit for Review"}
          </Button>
        </div>
      )}
    </main>
  );
}

function Step2Photos({
  onSubmit,
  pending,
}: {
  onSubmit: (files: File[]) => void;
  pending: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed rounded-xl p-8 text-center">
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          id="photo-input"
          onChange={(e) => {
            if (e.target.files?.length) {
              onSubmit(Array.from(e.target.files));
            }
          }}
        />
        <label htmlFor="photo-input" className="cursor-pointer">
          <p className="text-muted-foreground text-sm">
            Click to select photos
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            You can select multiple photos
          </p>
        </label>
      </div>
      <Button
        variant="ghost"
        className="w-full"
        onClick={() => onSubmit([])}
        disabled={pending}
      >
        Skip photos for now
      </Button>
    </div>
  );
}
