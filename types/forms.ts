import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerStep1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .min(11, "Phone must be 11 digits")
    .max(14, "Phone too long"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const createListingStep1Schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  listing_type_id: z.number({ error: "Select a listing type" }),
  price: z.number({ error: "Price is required" }).min(1),
  beds: z.number({ error: "Beds is required" }).min(0),
  baths: z.number({ error: "Baths is required" }).min(0),
  deposit: z.number().optional(),
  size: z.number().optional(),
  description: z.string().optional(),
  amenities: z.array(z.number()).optional(),
  available_from: z.string().optional(),
  floor_no: z.number().optional(),
  facing_id: z.number().optional(),
});

export const locationSchema = z.object({
  area: z.string().min(2, "Area is required"),
  division_id: z.number({ error: "Select a division" }),
  district_id: z.number({ error: "Select a district" }),
  upazila_id: z.number({ error: "Select an upazila" }),
  union_id: z.number().optional().nullable(),
  road: z.string().optional(),
  house_name: z.string().optional(),
  block: z.string().optional(),
  section: z.string().optional(),
  coord_y: z.number(),
  coord_x: z.number(),
  amenities: z.array(z.number()).optional(),
});

export const ownerInfoSchema = z.object({
  owner_name: z.string().min(2, "Name is required"),
  owner_phone: z
    .string()
    .min(11, "Phone must be at least 11 digits"),
  owner_alt_phone: z.string().optional(),
  owner_email: z.string().email().optional().or(z.literal("")),
  preferred_contact: z.enum(["phone", "email", "chat"]),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterStep1Form = z.infer<typeof registerStep1Schema>;
export type CreateListingStep1Form = z.infer<typeof createListingStep1Schema>;
export type LocationForm = z.infer<typeof locationSchema>;
export type OwnerInfoForm = z.infer<typeof ownerInfoSchema>;
