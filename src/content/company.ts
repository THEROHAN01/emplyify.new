/**
 * Company facts from the Emplyify Business Document (the single source of
 * truth). Change the document first, then this file.
 */

export const problems = [
  {
    problem: "Piles of CVs, not a shortlist",
    fix: "Three to five screened candidates",
    detail:
      "Every candidate is screened by a recruiter on skills, motivation, notice period and CTC, with a short fit summary and a senior recruiter's sign-off.",
  },
  {
    problem: "Weeks to the first good candidate",
    fix: "An initial shortlist in 48 hours",
    detail:
      "With 30–90 day notice periods, every lost week pushes the joining date further out. The clock starts the moment your brief is confirmed.",
  },
  {
    problem: "Unclear fees, weak follow-through",
    fix: "Published fees and a written replacement",
    detail:
      "Fees agreed up front, nothing payable until the hire joins, a weekly status report and a 90-day free replacement on permanent hires.",
  },
];

/** The five-step process (Business Document, "How we work"). */
export const processSteps = [
  {
    step: "Requirement understanding",
    when: "Day 0",
    detail:
      "A calibration call or written brief. Must-haves and budget are confirmed in writing, and the 48-hour clock starts.",
  },
  {
    step: "Talent sourcing",
    when: "From day 0",
    detail: "Job portals, LinkedIn, referrals, our candidate database and AI-assisted search.",
  },
  {
    step: "Screening and shortlist",
    when: "By 48 hours",
    detail:
      "A recruiter screen on skills, motivation, notice period and CTC, then three to five candidates submitted, each with a fit summary and recruiter sign-off.",
  },
  {
    step: "Interview coordination",
    when: "Feedback in 48 hours",
    detail: "We schedule every round and chase feedback so no candidate goes cold.",
  },
  {
    step: "Offer and joining follow-up",
    when: "Through joining",
    detail:
      "Offer support, check-ins through the notice period, day-one follow-up, then check-ins at day 30, 60 and 90.",
  },
];

export const sourcingChannels = [
  { name: "Job portals", detail: "Naukri, Monster, Indeed and Apna" },
  {
    name: "Professional networks",
    detail: "LinkedIn, professional communities and industry networks",
  },
  {
    name: "Direct reach",
    detail: "Referrals, our candidate database and direct outreach",
  },
];

export const commitments = [
  { value: "48 hours", label: "To an initial shortlist once the brief is confirmed" },
  { value: "4 hours", label: "Business-hours reply to every new requirement" },
  { value: "48 hours", label: "To chase interview feedback after every round" },
  { value: "90 days", label: "Free replacement if a permanent hire leaves early" },
];

export const commitmentsNote =
  "The 48-hour shortlist depends on role complexity and candidate availability. Replacement covers resignation or performance exits within 90 days of joining, not redundancy or a change of role.";

export const industries = [
  "IT and software",
  "IT services and consulting",
  "Banking and financial services",
  "Manufacturing and engineering",
  "Healthcare and pharma",
  "Logistics and supply chain",
  "Retail and e-commerce",
  "Telecom",
  "Professional services",
  "Infrastructure and construction",
];

export const itFunctions = [
  "Software development and engineering",
  "Cloud, DevOps and infrastructure",
  "Data and analytics",
  "Cybersecurity",
];

export const nonItFunctions = [
  "Sales and business development",
  "Marketing",
  "Finance and accounting",
  "Human resources",
  "Operations and administration",
  "Customer service",
];

export const clientStages = [
  { name: "Startups", detail: "Building first teams, one key hire at a time." },
  { name: "SMBs", detail: "Filling roles without a full-time recruiter." },
  { name: "Mid-sized firms", detail: "Scaling functions and opening new locations." },
  {
    name: "Enterprises and GCCs",
    detail: "Specialist and volume hiring alongside in-house teams.",
  },
];

/** "Why Emplyify" comparison. Market columns describe common practice, not named firms. */
export const comparison = [
  {
    row: "Fee",
    emplyify: "Published, 1–2 months of CTC",
    agency: "Often negotiated case by case",
    inhouse: "Recruiter salary, tools and job ads",
  },
  {
    row: "First shortlist",
    emplyify: "48 hours",
    agency: "Often 1–3 weeks",
    inhouse: "Depends on team capacity",
  },
  {
    row: "What you receive",
    emplyify: "3–5 screened candidates with a fit summary",
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
    row: "Visibility",
    emplyify: "Shared status and weekly report",
    agency: "Updates on request",
    inhouse: "Your own tracker",
  },
];

export const trustPoints = [
  {
    title: "Consent first",
    detail: "A candidate's CV is shared only with their consent, logged with time and purpose.",
  },
  { title: "Private storage", detail: "CVs sit in private storage, and shared links expire." },
  { title: "People decide", detail: "AI helps us search. It never rejects a candidate on its own." },
  {
    title: "Built for India's rules",
    detail: "Data handling aligned with the DPDP Act.",
  },
];

/** Non-IT functions shown as role cards beside the IT specialisms. */
export const nonItRoleCards = [
  {
    title: "Sales and business development",
    blurb: "Field sales, inside sales, key accounts and BD managers.",
  },
  { title: "Marketing", blurb: "Digital, brand, performance and content marketers." },
  { title: "Finance and accounting", blurb: "Accountants, analysts, controllers and finance heads." },
  { title: "Human resources", blurb: "HR generalists, HRBPs, talent acquisition and payroll." },
  {
    title: "Operations and administration",
    blurb: "Operations, supply chain, admin and facilities roles.",
  },
  { title: "Customer service", blurb: "Support executives, team leads and service managers." },
];

/** Background video clips (free Pexels licence), trimmed to 10s, muted. */
export const media = {
  hero: { src: "/media/hero.mp4", poster: "/media/hero-poster.jpg" },
  boardroom: { src: "/media/boardroom.mp4", poster: "/media/boardroom-poster.jpg" },
};
