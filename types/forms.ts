import { z } from "zod";

// Helper to handle empty numeric inputs gracefully
const optionalNumber = z.preprocess(
  (val) => (val === "" || Number.isNaN(Number(val)) ? undefined : Number(val)),
  z.number().optional()
);

const requiredNumber = z.preprocess(
  (val) => (val === "" || Number.isNaN(Number(val)) ? undefined : Number(val)),
  z.number({ required_error: "This field is required", invalid_type_error: "Must be a number" })
);

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
  listing_type_id: requiredNumber,
  price: requiredNumber.refine((val) => val !== undefined && val >= 1, { message: "Price must be greater than 0" }),
  beds: requiredNumber.refine((val) => val !== undefined && val >= 0, { message: "Beds is required" }),
  baths: requiredNumber.refine((val) => val !== undefined && val >= 0, { message: "Baths is required" }),
  deposit: optionalNumber,
  size: optionalNumber,
  description: z.string().optional(),
  amenities: z.array(z.number()).optional(),
  available_from: z.string().optional(),
  floor_no: optionalNumber,
  facing_id: optionalNumber,
});

export const locationSchema = z.object({
  area: z.string().min(2, "Area is required"),
  division_id: requiredNumber,
  district_id: requiredNumber,
  upazila_id: requiredNumber,
  union_id: optionalNumber.nullable(),
  road: z.string().optional(),
  house_name: z.string().optional(),
  block: z.string().optional(),
  section: z.string().optional(),
  coord_y: requiredNumber,
  coord_x: requiredNumber,
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