import type { Faq, Seniority } from "./types";

/**
 * Per-hire fee by seniority, as a share of annual fixed CTC.
 * 8.33% = 1 month, 12.5% = 1.5 months, 16.67% = 2 months.
 * Must match the client contract (launch checklist: "Pricing matches contract").
 */
export const perHireFees: Record<Seniority, { percent: number; months: number; label: string }> = {
  junior: { percent: 8.33, months: 1, label: "Junior (1–3 yrs)" },
  mid: { percent: 12.5, months: 1.5, label: "Mid (3–6 yrs)" },
  senior: { percent: 16.67, months: 2, label: "Senior (6–10 yrs)" },
  lead: { percent: 16.67, months: 2, label: "Lead / manager (10+ yrs)" },
};

export const GST_RATE = 0.18;
export const REPLACEMENT_DAYS = 90;

/** Set when the founder approves a published floor; null renders "quoted per pod". */
export const podFromMonthlyInr: number | null = null;

export const plans = [
  {
    id: "per-hire",
    name: "Per hire",
    for: "1–4 roles",
    price: "8.33–16.67%",
    priceNote: "of annual fixed CTC, by seniority",
    includes: [
      "Verified shortlist in 72 hours",
      "Interview scheduling and offer support",
      "90-day free replacement",
      "Pay only when the hire joins",
    ],
    cta: { label: "Submit a role", href: "/submit-a-role" },
    featured: false,
  },
  {
    id: "talent-pod",
    name: "Talent Pod",
    for: "5+ roles a quarter",
    price: "Monthly fee",
    priceNote: "+ reduced per-hire fee",
    includes: [
      "Named, embedded recruiter",
      "AI sourcing and screening agents",
      "Weekly pipeline report",
      "90-day free replacement on every hire",
    ],
    cta: { label: "Book a hiring call", href: "/book-a-call?plan=talent-pod" },
    featured: true,
  },
  {
    id: "hiring-sprint",
    name: "Hiring Sprint",
    for: "GCC launch, 10–50 roles",
    price: "Fixed project fee",
    priceNote: "+ per-hire fee",
    includes: [
      "Dedicated pod for 30–90 days",
      "City market map and salary benchmarks",
      "Leads-first hiring plan",
      "Weekly steering report",
    ],
    cta: { label: "Talk to our GCC team", href: "/book-a-call?team=gcc" },
    featured: false,
  },
] as const;

/** Comparison rows. "Typical" columns describe common market practice, not named competitors. */
export const comparison = [
  {
    row: "Fee",
    emplyify: "8.33–16.67% of CTC, published",
    agency: "Often 15–20%+, negotiated",
    inhouse: "Recruiter salary, tools and job ads",
  },
  {
    row: "Time to first shortlist",
    emplyify: "72 hours",
    agency: "1–3 weeks",
    inhouse: "Depends on recruiter capacity",
  },
  {
    row: "What you receive",
    emplyify: "3–5 candidates with evidence and sign-off",
    agency: "Often a batch of CVs",
    inhouse: "Applicants to screen yourself",
  },
  {
    row: "Replacement",
    emplyify: "90 days, free, in writing",
    agency: "Often 30–60 days",
    inhouse: "Re-run the search yourself",
  },
  {
    row: "Pipeline visibility",
    emplyify: "Shared status and weekly report",
    agency: "Email updates on request",
    inhouse: "Your ATS",
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: "When do we pay?",
    a: "For per-hire roles, we invoice when the candidate joins. Payment terms are 15 days from the joining date. Talent Pods are invoiced monthly in advance; Hiring Sprints by milestone.",
  },
  {
    q: "What counts as CTC for the fee?",
    a: "Annual fixed compensation in the offer letter. We exclude variable pay, joining bonuses, ESOPs and relocation unless you ask us to include them.",
  },
  {
    q: "Is GST included?",
    a: "No. GST at 18% is added to every invoice. The calculator on this page shows the total with GST.",
  },
  {
    q: "How does the 90-day replacement work?",
    a: "If the hire resigns or is let go for performance within 90 days of joining, we run a new search for the same role at no fee. It does not apply to redundancy or a change in the role's scope.",
  },
  {
    q: "Are there any other charges?",
    a: "No hidden fees. Background verification can be added at cost if you want us to run it. Talent Pods and Sprints are quoted in writing before work starts.",
  },
  {
    q: "Do you offer discounts for volume?",
    a: "Yes — that is what Talent Pods are for. Five or more roles a quarter usually costs less on a pod than on per-hire fees.",
  },
  {
    q: "What if we hire a candidate for a different role?",
    a: "The standard fee for the role they join applies, as long as we introduced them in the past 12 months.",
  },
];
