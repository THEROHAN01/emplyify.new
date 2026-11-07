import type { Cta } from "./types";

export const site = {
  name: "Emplyify",
  legalName: "Emplyify",
  tagline: "Connecting Talent. Building Teams.",
  /** One-liner (Business Document, "Brand, voice and contact"). */
  oneLiner:
    "Pan-India recruitment and staffing for IT and Non-IT roles: permanent, contract and bulk hiring.",
  positioning:
    "Emplyify is a Pune-based recruitment and staffing partner that delivers screened shortlists for IT and Non-IT roles across India.",
  /** Proof line (brand book "Core lines to reuse"). */
  proofLine: "Screened shortlists in 72 hours. A real reply in 4 business hours.",
  description:
    "Pune-based, pan-India recruitment and staffing for IT and Non-IT roles: permanent recruitment, contract staffing, leadership search and bulk hiring. An initial shortlist within 72 hours of a confirmed brief, with a 90-day free replacement on permanent hires.",
  email: {
    hello: "hello@emplyify.com",
    candidates: "talent@emplyify.com",
    privacy: "privacy@emplyify.com",
    grievance: "grievance@emplyify.com",
  },
  office: {
    city: "Pune",
    region: "Maharashtra",
    country: "IN",
    hours: "Mon–Fri, 9:30–18:30 IST",
    coverage: "Pan-India",
  },
  promises: {
    shortlistHours: 72,
    replyBusinessHours: 4,
    feedbackHours: 48,
    shortlistSize: "3–5",
    replacementDays: 90,
    candidateUpdateBusinessDays: 2,
    autoCloseDays: 21,
  },
  social: {
    linkedin: "https://www.linkedin.com/company/emplyify",
  },
} as const;

/** CTA vocabulary — the playbook allows only these labels. */
export const ctas = {
  submitRole: { label: "Submit a role", href: "/submit-a-role" },
  bookCall: { label: "Book a hiring call", href: "/book-a-call" },
  gccTeam: { label: "Talk to our GCC team", href: "/book-a-call?team=gcc" },
  talentIndex: {
    label: "Download the Talent Index",
    href: "/insights/india-gcc-tech-talent-index",
  },
  joinNetwork: { label: "Join the talent network", href: "/candidates/join" },
  browseRoles: { label: "Browse roles", href: "/jobs" },
} satisfies Record<string, Cta>;
