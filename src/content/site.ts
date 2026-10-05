import type { Cta } from "./types";

export const site = {
  name: "Emplyify",
  legalName: "Emplyify",
  tagline: "Vetted tech talent, shortlisted in 72 hours.",
  positioning:
    "Emplyify is the AI-native hiring partner for India's tech and GCC teams — vetted shortlists in 72 hours, verified by humans, priced transparently.",
  description:
    "AI does the searching. Senior recruiters vouch for every shortlist. Hire AI/ML, data, cloud, full-stack and embedded engineers in Pune, Bengaluru and Hyderabad.",
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
  },
  promises: {
    shortlistHours: 72,
    replyBusinessHours: 4,
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
