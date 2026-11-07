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

/** The four commercial models (Business Document, "Pricing and commercial terms"). */
export const plans = [
  {
    id: "permanent",
    name: "Permanent hiring",
    for: "1–10 open roles",
    price: "8.33–16.67%",
    priceNote: "of annual fixed CTC, by seniority",
    includes: [
      "Initial shortlist in 48 hours",
      "Interview scheduling and offer support",
      "90-day free replacement",
      "Pay only when the hire joins",
    ],
    cta: { label: "Submit a role", href: "/submit-a-role" },
    featured: true,
  },
  {
    id: "bulk",
    name: "Bulk and volume",
    for: "10+ similar roles",
    price: "Per drive",
    priceNote: "reduced per-hire fee or a fixed drive fee",
    includes: [
      "Dedicated recruiter team",
      "Drive plan with weekly targets",
      "Weekly drive report",
      "90-day free replacement on permanent hires",
    ],
    cta: { label: "Book a hiring call", href: "/book-a-call?plan=bulk" },
    featured: false,
  },
  {
    id: "contract",
    name: "Contract staffing",
    for: "Project or temporary needs",
    price: "Monthly",
    priceNote: "service fee per contractor, quoted in writing",
    includes: [
      "Screened contract candidates in 48 hours",
      "Payroll and statutory compliance (PF, ESI, PT)",
      "Monthly billing",
      "One point of contact for extensions",
    ],
    cta: { label: "Book a hiring call", href: "/book-a-call?plan=contract" },
    featured: false,
  },
  {
    id: "leadership",
    name: "Senior and leadership",
    for: "Head, VP and CXO roles",
    price: "Per search",
    priceNote: "share of annual CTC, part paid at milestones",
    includes: [
      "Confidential search",
      "Two to four finalists with assessments",
      "Two references per finalist",
      "90-day free replacement",
    ],
    cta: { label: "Book a hiring call", href: "/book-a-call?plan=leadership" },
    featured: false,
  },
] as const;

/** Standard terms from the Master Services Agreement. */
export const standardTerms = [
  "No fee until the hire joins; invoice on the joining date, payment due within 15 days.",
  "GST extra at 18%.",
  "Annual fixed CTC excludes variable pay, joining bonus, ESOPs and relocation.",
  "90-day free replacement for resignation or performance exits; not for redundancy or role change.",
  "Mutual non-solicit for 12 months; 30 days' notice to terminate. Fees for candidates who have already joined stay payable.",
  "Contract staffing: monthly billing, a markup on CTC, and payroll and statutory compliance (PF, ESI, PT) set in a schedule.",
];

export { comparison } from "./company";

export const pricingFaqs: Faq[] = [
  {
    q: "When do we pay?",
    a: "For permanent hires, we invoice on the joining date and payment is due within 15 days. Contract staffing is billed monthly. Leadership searches are billed at agreed milestones.",
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
    a: "No hidden fees. Bulk drives, contract staffing and leadership searches are quoted in writing before work starts.",
  },
  {
    q: "Do you offer discounts for volume?",
    a: "Yes. Ten or more similar roles run as a bulk hiring drive, with a reduced per-hire fee or a fixed drive fee.",
  },
  {
    q: "What if we hire a candidate for a different role?",
    a: "The standard fee for the role they join applies, as long as we introduced them in the past 12 months.",
  },
];
