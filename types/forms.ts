import { z } from "zod";

// Coerce "" / non-numeric input to undefined so empty fields fail with a
// clear "required" message instead of a NaN type error.
const coerceEmpty = (val: unknown) =>
  val === "" || val == null || Number.isNaN(Number(val))
    ? undefined
    : Number(val);

// The casts pin the schema input type to `number` — z.preprocess widens it
// to `unknown`, which breaks zodResolver's typing against useForm<...>.
const optionalNumber = z.preprocess(
  coerceEmpty,
  z.number().optional()
) as unknown as z.ZodType<number | undefined, number | undefined>;

const requiredNumber = (message: string) =>
  z.preprocess(coerceEmpty, z.number({ error: message })) as unknown as z.ZodType<
    number,
    number
  >;

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerStep1Schema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required")
      .refine(
        (v) => v.trim().split(/\s+/).filter(Boolean).length >= 2,
        { message: "Please enter your first and last name" }
      ),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .regex(/^01[3-9]\d{8}$/, "Enter a valid 11-digit BD number (01XXXXXXXXX)"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export const createListingStep1Schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  listing_type_id: requiredNumber("Select a listing type"),
  price: requiredNumber("Price is required").refine((val) => val >= 1, {
    message: "Price must be greater than 0",
  }),
  beds: requiredNumber("Beds is required").refine((val) => val >= 0, {
    message: "Beds cannot be negative",
  }),
  baths: requiredNumber("Baths is required").refine((val) => val >= 0, {
    message: "Baths cannot be negative",
  }),
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
  division_id: requiredNumber("Select a division"),
  district_id: requiredNumber("Select a district"),
  upazila_id: requiredNumber("Select an upazila"),
  union_id: optionalNumber.nullable(),
  road: z.string().optional(),
  house_name: z.string().optional(),
  block: z.string().optional(),
  section: z.string().optional(),
  coord_y: requiredNumber("Pick a location on the map"),
  coord_x: requiredNumber("Pick a location on the map"),
  amenities: z.array(z.number()).optional(),
});

export const ownerInfoSchema = z.object({
  owner_name: z.string().min(2, "Name is required"),
  owner_phone: z
    .string()
    .min(11, "Phone must be at least 11 digits"),
  owner_alt_phone: z.string().optional(),
  owner_email: z.string().email().optional().or(z.literal("")),
  preferred_contact: z.enum(["call", "whatsapp", "both"]),
});

export const googleBasicSchema = z
  .object({
    phone: z
      .string()
      .regex(/^01[3-9]\d{8}$/, "Enter a valid 11-digit BD number (01XXXXXXXXX)"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterStep1Form = z.infer<typeof registerStep1Schema>;
export type GoogleBasicForm = z.infer<typeof googleBasicSchema>;
export type CreateListingStep1Form = z.infer<typeof createListingStep1Schema>;
export type LocationForm = z.infer<typeof locationSchema>;
export type OwnerInfoForm = z.infer<typeof ownerInfoSchema>;