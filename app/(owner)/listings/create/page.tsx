"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { toast } from "sonner";
import {
  createListingStep1Schema,
  locationSchema,
  ownerInfoSchema,
  type CreateListingStep1Form,
  type LocationForm,
  type OwnerInfoForm,
} from "@/types/forms";
import { useCreateListingVM } from "@/viewmodels/useCreateListingVM";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import type { GeoItem, Amenity, ListingType } from "@/types/api";

const LocationMapPicker = dynamic(
  () => import("@/components/owner/LocationMapPicker"),
  { ssr: false }
);

// ── Emoji map for amenities ───────────────────────────────────────
const AMENITY_EMOJI: Record<string, string> = {
  "Wi-Fi": "📶",
  "WiFi": "📶",
  "Wifi": "📶",
  "Parking": "🅿️",
  "Gas line": "🔥",
  "Gas": "🔥",
  "Lift": "🛗",
  "Elevator": "🛗",
  "Generator": "⚡",
  "Gym": "🏋️",
  "Roof access": "🏠",
  "Rooftop": "🏠",
  "Furnished": "🛋️",
  "AC": "❄️",
  "Air conditioning": "❄️",
  "Security": "🔒",
  "CCTV": "📷",
  "Cable TV": "📺",
  "TV": "📺",
  "Hot water": "🚿",
  "Water": "💧",
  "Swimming pool": "🏊",
  "Internet": "🌐",
};

function getEmoji(label: string) {
  const key = Object.keys(AMENITY_EMOJI).find(
    (k) => label.toLowerCase().includes(k.toLowerCase())
  );
  return key ? AMENITY_EMOJI[key] : "✨";
}

// ── Left stepper sidebar ──────────────────────────────────────────
const STEPS = [
  { n: 1, label: "Basics" },
  { n: 2, label: "Photos & description" },
  { n: 3, label: "Location & amenities" },
  { n: 4, label: "Contact info" },
  { n: 5, label: "Review & publish" },
];

function StepperSidebar({ current }: { current: number }) {
  return (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        padding: "40px 24px",
        borderRight: "1px solid #EFF1F4",
        background: "#fff",
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#8A8A8E",
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          marginBottom: 28,
        }}
      >
        Post a flat
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {STEPS.map(({ n, label }) => {
          const done = n < current;
          const active = n === current;
          return (
            <div
              key={n}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 0",
              }}
            >
              {/* Circle */}
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: done
                    ? "#1A6B72"
                    : active
                    ? "#1A6B72"
                    : "transparent",
                  border: done || active ? "none" : "1.5px solid #D1D5DB",
                }}
              >
                {done ? (
                  <Check style={{ width: 13, height: 13, color: "#fff" }} />
                ) : (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: active ? "#fff" : "#8A8A8E",
                    }}
                  >
                    {String(n).padStart(2, "0")}
                  </span>
                )}
              </div>
              {/* Label */}
              <div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: active ? 600 : 400,
                    color: active ? "#1C1C1E" : done ? "#5B5B62" : "#8A8A8E",
                  }}
                >
                  {label}
                </p>
                {active && (
                  <p style={{ fontSize: 11, color: "#1A6B72", fontWeight: 500, marginTop: 1 }}>
                    You are here
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

// ── Shared helpers ────────────────────────────────────────────────
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label style={{ fontSize: 13, color: "#5B5B62" }}>{label}</Label>
      {children}
      {error && <p style={{ fontSize: 12, color: "#FF6B6B" }}>{error}</p>}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  height: 44,
  borderRadius: 10,
  fontSize: 14,
  border: "1px solid #E5E7EB",
};

const selectStyle: React.CSSProperties = {
    width: "100%",
    height: 44,
    borderRadius: 10,
    border: "1px solid #E5E7EB",
    padding: "0 12px",
    fontSize: 14,
    color: "#1C1C1E",
    background: "#fff",
    outline: "none",
    cursor: "pointer",
  };

// ── Step 1: Basics ────────────────────────────────────────────────
function Step1Basics({
  onSubmit,
  pending,
}: {
  onSubmit: (d: CreateListingStep1Form) => void;
  pending: boolean;
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateListingStep1Form>({
    resolver: zodResolver(createListingStep1Schema),
  });

  const { data: listingTypes = [] } = useQuery<ListingType[]>({
    queryKey: ["listing-types"],
    queryFn: () => api.get("/listing-types").then((r) => r.data.data),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field label="Listing Title *" error={errors.title?.message}>
        <Input {...register("title")} placeholder="e.g. Spacious 3 Bed Apartment in Mirpur" style={inputStyle} />
      </Field>
       <Field label="Listing Type *" error={errors.listing_type_id?.message}>
        <select {...register("listing_type_id")} style={selectStyle}>
          <option value="">Select a type</option>
          {listingTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Monthly Rent (৳) *" error={errors.price?.message}>
          <Input type="number" placeholder="25000" {...register("price")} style={inputStyle} />
        </Field>
        <Field label="Deposit (৳)">
          <Input type="number" placeholder="50000" {...register("deposit")} style={inputStyle} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Bedrooms *" error={errors.beds?.message}>
          <Input type="number" placeholder="3" {...register("beds")} style={inputStyle} />
        </Field>
        <Field label="Bathrooms *" error={errors.baths?.message}>
          <Input type="number" placeholder="2" {...register("baths")} style={inputStyle} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Size (sqft)">
          <Input type="number" placeholder="1200" {...register("size")} style={inputStyle} />
        </Field>
        <Field label="Floor No.">
          <Input type="number" placeholder="4" {...register("floor_no")} style={inputStyle} />
        </Field>
      </div>
      <Field label="Description">
        <textarea
          {...register("description")}
          placeholder="Describe the listing…"
          style={{
            width: "100%",
            borderRadius: 10,
            border: "1px solid #E5E7EB",
            padding: "10px 12px",
            fontSize: 14,
            minHeight: 96,
            resize: "none",
            outline: "none",
            fontFamily: "inherit",
            color: "#1C1C1E",
          }}
        />
      </Field>
      <FormActions onBack={undefined} pending={pending} label="Continue" />
    </form>
  );
}

// ── Step 2: Photos ────────────────────────────────────────────────
function Step2Photos({
  onSubmit,
  pending,
  onBack,
}: {
  onSubmit: (files: File[]) => void;
  pending: boolean;
  onBack: () => void;
}) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const validFiles = selected.filter(file => {
      if (file.size > 200 * 1024) {
        toast.error(`${file.name} is too large. Max size is 200 KB.`);
        return false;
      }
      return true;
    });

    setFiles(validFiles);
    setPreviews(validFiles.map((f) => URL.createObjectURL(f)));
  };

  return (
    <div className="space-y-5">
      <input type="file" multiple accept="image/jpeg,image/png" id="photo-input" className="hidden" onChange={handleFileChange} />
      {previews.length === 0 ? (
        <label
          htmlFor="photo-input"
          style={{
            display: "block",
            border: "2px dashed #E5E7EB",
            borderRadius: 14,
            padding: "56px 24px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8A8A8E" strokeWidth="1.5" style={{ margin: "0 auto 12px" }}>
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#1C1C1E" }}>Upload photos</p>
          <p style={{ fontSize: 12, color: "#8A8A8E", marginTop: 4 }}>JPG, PNG · up to 200 KB each</p>
        </label>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {previews.map((src, i) => (
              <div key={i} style={{ aspectRatio: "1", borderRadius: 10, overflow: "hidden" }}>
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
          <label htmlFor="photo-input" style={{ fontSize: 13, color: "#1A6B72", cursor: "pointer", fontWeight: 500 }}>
            Change photos
          </label>
        </div>
      )}
      <FormActions
        onBack={onBack}
        pending={pending}
        label={files.length > 0 ? `Upload ${files.length} photo${files.length > 1 ? "s" : ""}` : "Skip for now"}
        onContinue={() => onSubmit(files)}
        skipForm
      />
    </div>
  );
}

// ── Step 3: Location & Amenities ──────────────────────────────────
function Step3Location({
  onSubmit,
  pending,
  onBack,
}: {
  onSubmit: (d: LocationForm) => void;
  pending: boolean;
  onBack: () => void;
}) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<LocationForm>({
    resolver: zodResolver(locationSchema),
    defaultValues: { coord_y: 23.8103, coord_x: 90.4125 },
  });

  const coordY = watch("coord_y") ?? 23.8103;
  const coordX = watch("coord_x") ?? 90.4125;
  const divisionId = watch("division_id");
  const districtId = watch("district_id");
  const upazilaId = watch("upazila_id");
  const unionId = watch("union_id");
  const selectedAmenities = watch("amenities") ?? [];

  const { data: divisions = [] } = useQuery<GeoItem[]>({
    queryKey: ["geo-divisions"],
    queryFn: () => api.get("/geo/divisions").then((r) => r.data.data),
  });
  const { data: districts = [] } = useQuery<GeoItem[]>({
    queryKey: ["geo-districts", divisionId],
    queryFn: () => api.get(`/geo/districts/${divisionId}`).then((r) => r.data.data),
    enabled: !!divisionId,
  });
  const { data: upazilas = [] } = useQuery<GeoItem[]>({
    queryKey: ["geo-upazilas", districtId],
    queryFn: () => api.get(`/geo/upazilas/${districtId}`).then((r) => r.data.data),
    enabled: !!districtId,
  });
  const { data: unions = [] } = useQuery<GeoItem[]>({
    queryKey: ["geo-unions", upazilaId],
    queryFn: () => api.get(`/geo/unions/${upazilaId}`).then((r) => r.data.data),
    enabled: !!upazilaId,
  });
  const { data: amenities = [] } = useQuery<Amenity[]>({
    queryKey: ["amenities"],
    queryFn: () => api.get("/amenities").then((r) => r.data.data),
  });

  const toggleAmenity = (id: number) => {
    const current = selectedAmenities ?? [];
    const next = current.includes(id)
      ? current.filter((a) => a !== id)
      : [...current, id];
    setValue("amenities", next);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Neighbourhood + House */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Neighborhood" error={errors.area?.message}>
          <Input {...register("area")} placeholder="Banani" style={inputStyle} />
        </Field>
        <Field label="House & road number">
          <Input {...register("house_name")} placeholder="House 24, Road 11" style={inputStyle} />
        </Field>
      </div>

      {/* Geo dropdowns */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Division">
          <select
            style={selectStyle}
            {...register("division_id")}
            onChange={(e) => {
              setValue("division_id", Number(e.target.value));
              setValue("district_id", 0 as never);
              setValue("upazila_id", 0 as never);
            }}
          >
            <option value="">Select division</option>
            {divisions.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </Field>
        <Field label="District">
          <select
            style={selectStyle}
            {...register("district_id")}
            disabled={!divisionId}
            onChange={(e) => {
              setValue("district_id", Number(e.target.value));
              setValue("upazila_id", 0 as never);
            }}
          >
            <option value="">Select district</option>
            {districts.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Upazila / Thana">
          <select
            style={selectStyle}
            {...register("upazila_id")}
            disabled={!districtId}
            onChange={(e) => {
              setValue("upazila_id", Number(e.target.value));
              setValue("union_id", null);
            }}
          >
            <option value="">Select upazila</option>
            {upazilas.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </Field>
        <Field label="Union">
          <select
            style={selectStyle}
            {...register("union_id")}
            disabled={!upazilaId}
            onChange={(e) => setValue("union_id", e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">Select union</option>
            {unions.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </Field>
      </div>

      {/* Map */}
      <div>
        <p style={{ fontSize: 13, color: "#5B5B62", marginBottom: 8 }}>
          Pin on map{" "}
          <span style={{ fontSize: 12, color: "#8A8A8E" }}>
            — click or drag the marker
          </span>
        </p>
        <LocationMapPicker
          lat={coordY}
          lng={coordX}
          onChange={(lat, lng) => {
            setValue("coord_y", lat);
            setValue("coord_x", lng);
          }}
        />
        <p style={{ fontSize: 11, color: "#8A8A8E", marginTop: 6 }}>
          Exact street address is only shown to renters you've replied to.
        </p>
      </div>

      {/* Amenities */}
      {amenities.length > 0 && (
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: "#5B5B62", marginBottom: 10 }}>
            Amenities{" "}
            <span style={{ fontWeight: 400, color: "#8A8A8E" }}>· Select all that apply</span>
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))",
              gap: 10,
            }}
          >
            {amenities.map((a) => {
              const checked = selectedAmenities.includes(a.id);
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => toggleAmenity(a.id)}
                  style={{
                    height: 48,
                    borderRadius: 10,
                    border: `1.5px solid ${checked ? "#1A6B72" : "#E5E7EB"}`,
                    background: checked ? "#E6F0F1" : "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "0 14px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {/* Checkbox */}
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 5,
                      border: `1.5px solid ${checked ? "#1A6B72" : "#D1D5DB"}`,
                      background: checked ? "#1A6B72" : "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {checked && (
                      <Check style={{ width: 11, height: 11, color: "#fff" }} />
                    )}
                  </div>
                  <span style={{ fontSize: 12 }}>{getEmoji(a.label)}</span>
                  <span style={{ fontSize: 13, color: checked ? "#1A6B72" : "#1C1C1E", fontWeight: checked ? 500 : 400 }}>
                    {a.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <FormActions onBack={onBack} pending={pending} label="Continue" />
    </form>
  );
}

// ── Step 4: Contact Info ──────────────────────────────────────────
function Step4OwnerInfo({
  onSubmit,
  pending,
  onBack,
}: {
  onSubmit: (d: OwnerInfoForm) => void;
  pending: boolean;
  onBack: () => void;
}) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<OwnerInfoForm>({
    resolver: zodResolver(ownerInfoSchema),
    defaultValues: { preferred_contact: "call" },
  });
  const preferred = watch("preferred_contact");

  const contactOptions: { value: OwnerInfoForm["preferred_contact"]; label: string; emoji: string }[] = [
    { value: "call", label: "Phone call", emoji: "📞" },
    { value: "whatsapp", label: "WhatsApp", emoji: "💬" },
    { value: "both", label: "Call & WhatsApp", emoji: "📱" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field label="Your Name *" error={errors.owner_name?.message}>
        <Input {...register("owner_name")} placeholder="Full name" style={inputStyle} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Primary Phone *" error={errors.owner_phone?.message}>
          <Input {...register("owner_phone")} placeholder="01711000000" style={inputStyle} />
        </Field>
        <Field label="Alternate Phone">
          <Input {...register("owner_alt_phone")} placeholder="Optional" style={inputStyle} />
        </Field>
      </div>
      <Field label="Email" error={errors.owner_email?.message}>
        <Input {...register("owner_email")} placeholder="owner@email.com" style={inputStyle} />
      </Field>
      <div>
        <p style={{ fontSize: 13, color: "#5B5B62", marginBottom: 8 }}>Preferred contact method</p>
        <div className="flex gap-2">
          {contactOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setValue("preferred_contact", opt.value)}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 10,
                border: `1.5px solid ${preferred === opt.value ? "#1A6B72" : "#E5E7EB"}`,
                background: preferred === opt.value ? "#E6F0F1" : "#fff",
                color: preferred === opt.value ? "#1A6B72" : "#5B5B62",
                fontSize: 12,
                fontWeight: preferred === opt.value ? 600 : 400,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <span>{opt.emoji}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <FormActions onBack={onBack} pending={pending} label="Continue" />
    </form>
  );
}

// ── Step 5: Review ────────────────────────────────────────────────
function Step5Review({
  onSubmit,
  pending,
  onBack,
  draftListingId,
}: {
  onSubmit: () => void;
  pending: boolean;
  onBack: () => void;
  draftListingId: string | null;
}) {
  return (
    <div className="space-y-5">
      <div
        style={{
          border: "1px solid #EFF1F4",
          borderRadius: 16,
          padding: 24,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
            background: "#E6F0F1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A6B72" strokeWidth="2.2">
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </div>
        <p style={{ fontSize: 18, fontWeight: 700, color: "#1C1C1E", marginBottom: 8 }}>
          Ready to publish!
        </p>
        <p style={{ fontSize: 14, color: "#5B5B62", lineHeight: 1.6 }}>
          Your listing will be reviewed by the FlatNest team. Once approved, it
          will be visible to renters across Dhaka.
        </p>
        {draftListingId && (
          <p style={{ fontSize: 12, color: "#8A8A8E", marginTop: 12 }}>
            Listing ID:{" "}
            <code style={{ fontFamily: "monospace", color: "#1C1C1E" }}>
              {draftListingId}
            </code>
          </p>
        )}
      </div>
      <FormActions
        onBack={onBack}
        pending={pending}
        label="Submit for review"
        onContinue={onSubmit}
        skipForm
      />
    </div>
  );
}

// ── Form action bar (Back | Save draft | Continue) ────────────────
function FormActions({
  onBack,
  pending,
  label,
  onContinue,
  skipForm,
}: {
  onBack?: () => void;
  pending: boolean;
  label: string;
  onContinue?: () => void;
  skipForm?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        paddingTop: 24,
        borderTop: "1px solid #EFF1F4",
        marginTop: 8,
      }}
    >
      <button
        type="button"
        onClick={onBack}
        disabled={!onBack}
        style={{
          height: 44,
          padding: "0 20px",
          borderRadius: 10,
          border: "1px solid #E5E7EB",
          background: "#fff",
          fontSize: 14,
          color: !onBack ? "#D1D5DB" : "#5B5B62",
          cursor: !onBack ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        ← Back
      </button>

      <div className="flex items-center" style={{ gap: 12 }}>
        <button
          type="button"
          style={{
            height: 44,
            padding: "0 20px",
            borderRadius: 10,
            border: "none",
            background: "transparent",
            fontSize: 14,
            color: "#8A8A8E",
            cursor: "pointer",
          }}
        >
          Save draft
        </button>
        <button
          type={skipForm ? "button" : "submit"}
          onClick={skipForm ? onContinue : undefined}
          disabled={pending}
          style={{
            height: 44,
            padding: "0 28px",
            borderRadius: 10,
            border: "none",
            background: pending ? "#93C5C9" : "#1A6B72",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            cursor: pending ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {pending ? "Saving…" : label}
          {!pending && <span>→</span>}
        </button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────
const STEP_HEADINGS = [
  { title: "Basics", subtitle: "Tell us about your flat — the key details renters care about." },
  { title: "Photos & description", subtitle: "Great photos and a clear description attract more renters." },
  { title: "Location & amenities", subtitle: "Pin your flat on the map and tell renters what's included. Exact street address is only shown to renters you've replied to." },
  { title: "Contact info", subtitle: "How should interested renters reach you?" },
  { title: "Review & publish", subtitle: "One last check before your listing goes live." },
];

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

  const heading = STEP_HEADINGS[currentStep - 1];

  return (
    <div className="flex" style={{ minHeight: "calc(100vh - 57px)" }}>
      <StepperSidebar current={currentStep} />

      {/* Right: form area */}
      <main
        style={{
          flex: 1,
          background: "#F7F8FA",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "48px 40px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 620 }}>
          {/* Step heading */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1C1C1E", marginBottom: 8 }}>
              {heading.title}
            </h1>
            <p style={{ fontSize: 14, color: "#5B5B62", lineHeight: 1.5 }}>
              {heading.subtitle}
            </p>
          </div>

          {/* Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #EFF1F4",
              padding: "28px 28px 24px",
            }}
          >
            {currentStep === 1 && (
              <Step1Basics onSubmit={submitStep1} pending={step1Pending} />
            )}
            {currentStep === 2 && (
              <Step2Photos onSubmit={submitStep2} pending={step2Pending} onBack={goBack} />
            )}
            {currentStep === 3 && (
              <Step3Location onSubmit={submitStep3} pending={step3Pending} onBack={goBack} />
            )}
            {currentStep === 4 && (
              <Step4OwnerInfo onSubmit={submitStep4} pending={step4Pending} onBack={goBack} />
            )}
            {currentStep === 5 && (
              <Step5Review
                onSubmit={submitStep5}
                pending={step5Pending}
                onBack={goBack}
                draftListingId={draftListingId}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}