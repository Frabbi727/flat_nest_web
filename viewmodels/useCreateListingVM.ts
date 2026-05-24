"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { listingWriteService } from "@/services/ListingWriteService";
import type {
  CreateListingStep1Payload,
  LocationPayload,
  OwnerInfoPayload,
} from "@/types/api";

export function useCreateListingVM() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [draftListingId, setDraftListingId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const step1Mutation = useMutation({
    mutationFn: (data: CreateListingStep1Payload) =>
      listingWriteService.createDraft(data),
    onSuccess: (listing) => {
      setDraftListingId(listing.id);
      setCurrentStep(2);
    },
    onError: () => toast.error("Failed to create listing. Please try again."),
  });

  const step2Mutation = useMutation({
    mutationFn: (photos: File[]) => {
      if (!draftListingId) throw new Error("No listing ID");
      return listingWriteService.uploadPhotos(draftListingId, photos);
    },
    onSuccess: () => setCurrentStep(3),
    onError: () => toast.error("Failed to upload photos. Please try again."),
  });

  const step3Mutation = useMutation({
    mutationFn: (data: LocationPayload) => {
      if (!draftListingId) throw new Error("No listing ID");
      return listingWriteService.saveLocation(draftListingId, data);
    },
    onSuccess: () => setCurrentStep(4),
    onError: () => toast.error("Failed to save location. Please try again."),
  });

  const step4Mutation = useMutation({
    mutationFn: (data: OwnerInfoPayload) => {
      if (!draftListingId) throw new Error("No listing ID");
      return listingWriteService.saveOwnerInfo(draftListingId, data);
    },
    onSuccess: () => setCurrentStep(5),
    onError: () =>
      toast.error("Failed to save contact info. Please try again."),
  });

  const step5Mutation = useMutation({
    mutationFn: () => {
      if (!draftListingId) throw new Error("No listing ID");
      return listingWriteService.submitForReview(draftListingId);
    },
    onSuccess: () => {
      setIsCompleted(true);
      toast.success("Listing submitted for review!");
      router.push("/dashboard");
    },
    onError: () =>
      toast.error("Failed to submit listing. Please try again."),
  });

  return {
    currentStep,
    draftListingId,
    isCompleted,

    submitStep1: step1Mutation.mutate,
    step1Pending: step1Mutation.isPending,
    step1Error: step1Mutation.error?.message ?? null,

    submitStep2: step2Mutation.mutate,
    step2Pending: step2Mutation.isPending,
    step2Error: step2Mutation.error?.message ?? null,

    submitStep3: step3Mutation.mutate,
    step3Pending: step3Mutation.isPending,
    step3Error: step3Mutation.error?.message ?? null,

    submitStep4: step4Mutation.mutate,
    step4Pending: step4Mutation.isPending,
    step4Error: step4Mutation.error?.message ?? null,

    submitStep5: step5Mutation.mutate,
    step5Pending: step5Mutation.isPending,
    step5Error: step5Mutation.error?.message ?? null,

    goBack: () =>
      setCurrentStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3 | 4 | 5) : s),
    ),
  };
}
