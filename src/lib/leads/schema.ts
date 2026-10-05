/**
 * Form schemas shared by the client (inline validation) and the API routes
 * (authoritative validation). Messages follow the microcopy rule: explain the
 * fix in one line.
 */
import { z } from "zod";

// Our CSP forbids eval; jitless mode stops zod probing `new Function`.
z.config({ jitless: true });

export const ROLE_FAMILIES = [
  "ai-ml",
  "data",
  "cloud-devops",
  "full-stack",
  "embedded",
  "product",
] as const;
export const SENIORITIES = ["junior", "mid", "senior", "lead"] as const;
export const WORK_MODES = ["On-site", "Hybrid", "Remote"] as const;
export const COMPANY_TYPES = [
  "GCC",
  "Product company",
  "Startup",
  "Services company",
  "Other",
] as const;
export const CONTACT_PREFS = ["Email", "Phone", "WhatsApp"] as const;
export const LOCATIONS = ["Pune", "Bengaluru", "Hyderabad", "Remote (India)", "Other"] as const;

const trimmed = (max: number, message: string) =>
  z.string().trim().min(1, message).max(max, `Keep this under ${max} characters.`);

const phone = z
  .string()
  .trim()
  .regex(/^\+?[0-9 ()-]{8,18}$/, "Enter a phone number with country code, e.g. +91 98765 43210.");

export const email = z
  .string()
  .trim()
  .toLowerCase()
  .email("Enter a valid email address, e.g. name@company.com.");

/** Attribution captured client-side and forwarded to the CRM. */
export const attributionSchema = z
  .object({
    utm_source: z.string().max(200).optional(),
    utm_medium: z.string().max(200).optional(),
    utm_campaign: z.string().max(200).optional(),
    utm_term: z.string().max(200).optional(),
    utm_content: z.string().max(200).optional(),
    landingPage: z.string().max(500).optional(),
    referrer: z.string().max(500).optional(),
    pageUri: z.string().max(500).optional(),
    hutk: z.string().max(200).optional(),
  })
  .partial()
  .default({});

export type Attribution = z.infer<typeof attributionSchema>;

const security = {
  turnstileToken: z.string().max(4096).optional(),
  /** Honeypot: real users never fill this. */
  website: z.string().max(500).optional(),
};

export const briefRoleStep = z.object({
  roleTitle: trimmed(120, "Enter the role title, e.g. Senior Data Engineer."),
  roleFamily: z.enum(ROLE_FAMILIES, { message: "Choose the closest role family." }),
  seniority: z.enum(SENIORITIES, { message: "Choose a seniority level." }),
  location: z.enum(LOCATIONS, { message: "Choose where the hire will work." }),
  workMode: z.enum(WORK_MODES, { message: "Choose on-site, hybrid or remote." }),
  openings: z.coerce
    .number({ message: "Enter how many people you need to hire." })
    .int("Use a whole number.")
    .min(1, "Enter at least 1 opening.")
    .max(500, "For more than 500 openings, book a call instead."),
});

export const briefDetailsStep = z
  .object({
    mustHaveSkills: z
      .array(z.string().trim().min(1).max(60))
      .min(1, "Add at least one must-have skill.")
      .max(12, "Keep it to 12 must-haves or fewer — the rest are nice-to-haves."),
    budgetMinLpa: z.coerce
      .number({ message: "Enter the lower end of the budget." })
      .min(1, "Enter a budget in ₹ LPA, e.g. 25.")
      .max(500),
    budgetMaxLpa: z.coerce
      .number({ message: "Enter the upper end of the budget." })
      .min(1, "Enter a budget in ₹ LPA, e.g. 35.")
      .max(500),
    targetStart: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a target start date.")
      .optional()
      .or(z.literal("")),
    jobDescription: z
      .string()
      .trim()
      .max(20000, "Paste a shorter description (under 20,000 characters).")
      .optional(),
  })
  .refine((d) => d.budgetMaxLpa >= d.budgetMinLpa, {
    path: ["budgetMaxLpa"],
    message: "The upper budget must be at least the lower budget.",
  });

export const briefYouStep = z.object({
  name: trimmed(120, "Enter your name."),
  workEmail: email,
  company: trimmed(160, "Enter your company name."),
  companyType: z.enum(COMPANY_TYPES, { message: "Choose your company type." }),
  phone,
  contactPreference: z.enum(CONTACT_PREFS, { message: "Choose how we should contact you." }),
  consent: z.literal(true, { message: "Confirm we may contact you about this role." }),
});

export const briefSchema = z
  .object({
    ...briefRoleStep.shape,
    ...briefYouStep.shape,
    attribution: attributionSchema,
    ...security,
  })
  .and(briefDetailsStep);

export type BriefInput = z.infer<typeof briefSchema>;

export const talentNetworkSchema = z.object({
  name: trimmed(120, "Enter your name."),
  email,
  phone: phone.optional().or(z.literal("")),
  roleFamily: z.enum(ROLE_FAMILIES, { message: "Choose the role family closest to your work." }),
  yearsExperience: z.coerce.number({ message: "Enter your years of experience." }).min(0).max(50),
  city: z.enum(LOCATIONS, { message: "Choose your preferred location." }),
  noticeDays: z.coerce
    .number({ message: "Enter your notice period in days." })
    .int()
    .min(0)
    .max(180),
  linkedin: z
    .string()
    .trim()
    .url("Paste the full LinkedIn URL, starting with https://")
    .optional()
    .or(z.literal("")),
  whatsappUpdates: z.boolean().default(false),
  consent: z.literal(true, { message: "Tick the box to agree to how we use your data." }),
  attribution: attributionSchema,
  ...security,
});

export type TalentNetworkInput = z.infer<typeof talentNetworkSchema>;

/** Application fields (sent as multipart with an optional CV file). */
export const applicationSchema = z.object({
  jobSlug: z.string().trim().min(1).max(120),
  name: trimmed(120, "Enter your name."),
  email,
  phone,
  linkedin: z
    .string()
    .trim()
    .url("Paste the full LinkedIn URL, starting with https://")
    .optional()
    .or(z.literal("")),
  noticeDays: z.coerce
    .number({ message: "Enter your notice period in days." })
    .int()
    .min(0)
    .max(180),
  expectedCtcLpa: z.coerce.number({ message: "Enter your expected CTC in ₹ LPA." }).min(1).max(500),
  consent: z.literal("true", { message: "Tick the box to agree to how we use your data." }),
  attribution: z.string().max(4000).optional(),
  ...security,
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const reportSchema = z.object({
  reportSlug: z.string().trim().min(1).max(120),
  name: trimmed(120, "Enter your name."),
  workEmail: email,
  company: trimmed(160, "Enter your company name."),
  consent: z.literal(true, { message: "Tick the box so we can email you the report." }),
  attribution: attributionSchema,
  ...security,
});

export type ReportInput = z.infer<typeof reportSchema>;

export const contactSchema = z.object({
  name: trimmed(120, "Enter your name."),
  email,
  topic: z.enum(["Hiring", "Candidate", "Partnership", "Press", "Data request", "Other"], {
    message: "Choose a topic.",
  }),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters).").max(5000),
  consent: z.literal(true, { message: "Confirm we may reply to you by email." }),
  attribution: attributionSchema,
  ...security,
});

export type ContactInput = z.infer<typeof contactSchema>;

/** zod issues → { field: message } for inline errors. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
