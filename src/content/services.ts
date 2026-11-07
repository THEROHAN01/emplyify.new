import type { Service } from "./types";
import { ctas } from "./site";

/**
 * The six ways to hire (Business Document, "Services"). Fees that are not yet
 * set in the business document are shown as "quoted in writing", never as a
 * number we have not agreed.
 */

const sharedFaqs = {
  guarantee: {
    q: "What happens if a permanent hire leaves in the first 90 days?",
    a: "We replace them free of charge. If the hire resigns or leaves for performance reasons within 90 days of joining, we run a fresh search at no extra fee. It does not cover redundancy or a change of role, and the terms are written into your agreement.",
  },
  exclusivity: {
    q: "Do you need exclusivity on the role?",
    a: "No. We work alongside your in-house team and other partners. If two sources submit the same candidate, the first timestamped submission made with the candidate's consent counts.",
  },
  confidentiality: {
    q: "Can you run a confidential search?",
    a: "Yes. We describe the role without naming your company until a candidate has passed our screen and agreed to confidentiality. Confidential searches cost nothing extra.",
  },
  notice: {
    q: "How do you handle 30–90 day notice periods?",
    a: "We check notice period on the first call and show it for every candidate. For urgent roles we prioritise people already serving notice or with a buy-out option, and we stay in touch through the notice period to reduce drop-outs.",
  },
  cvDumps: {
    q: "Will you send us a pile of CVs?",
    a: "No. You get three to five screened candidates, each with a short fit summary covering skills, notice period and expected CTC, and a recruiter's sign-off.",
  },
  ai: {
    q: "Does AI make decisions about candidates?",
    a: "AI helps our recruiters search and rank profiles. A recruiter speaks to every candidate, a senior recruiter signs off every shortlist, and AI never rejects a candidate on its own.",
  },
  pan: {
    q: "Do you hire outside Pune?",
    a: "Yes. We are based in Pune and recruit across India, for on-site, hybrid and remote roles.",
  },
  pay: {
    q: "When do we pay for a permanent hire?",
    a: "Only when the candidate joins. We invoice on the joining date and payment is due within 15 days. GST is extra at 18%.",
  },
};

const standardSteps = [
  {
    step: "Requirement understanding",
    sla: "Day 0",
    detail:
      "A calibration call or a written brief. We confirm must-haves and budget in writing, and the 72-hour clock starts.",
  },
  {
    step: "Sourcing and screening",
    sla: "0–48 hours",
    detail:
      "Job portals, LinkedIn, referrals, our database and AI-assisted search, then a recruiter screen on skills, motivation, notice period and CTC.",
  },
  {
    step: "Shortlist",
    sla: "By 72 hours",
    detail: "Three to five candidates, each with a fit summary and a senior recruiter's sign-off.",
  },
  {
    step: "Interviews to joining",
    sla: "Feedback chased in 48 hours",
    detail:
      "We schedule every round, chase feedback, support the offer and stay in touch until the candidate's first day.",
  },
];

const permanentPricing = {
  headline: "8.33–16.67% of annual fixed CTC",
  detail:
    "One, one and a half or two months of the hire's fixed CTC, set by seniority. Nothing is payable until the candidate joins.",
  bullets: ["No retainer", "No fee until the hire joins", "90-day free replacement", "GST extra at 18%"],
};

export const services: Service[] = [
  {
    slug: "permanent-recruitment",
    name: "Permanent Recruitment",
    navLabel: "Permanent recruitment",
    outcome: "Full-time hires at every level, with a shortlist in 72 hours.",
    summary:
      "For one to ten open roles. You brief us once, we return three to five screened candidates and run the process through to the joining date.",
    whoFor: [
      "Startups building their first teams",
      "Growing businesses filling one to ten roles at a time",
      "HR teams that need an extra recruiter on hard-to-fill positions",
    ],
    included: [
      "A confirmed written brief",
      "An initial shortlist of 3–5 screened candidates in 72 hours",
      "Interview scheduling and feedback chasing",
      "Offer support and joining follow-up",
      "A weekly status report",
      "90-day free replacement",
    ],
    process: standardSteps,
    pricing: permanentPricing,
    faqs: [
      sharedFaqs.cvDumps,
      sharedFaqs.pay,
      sharedFaqs.guarantee,
      sharedFaqs.exclusivity,
      sharedFaqs.notice,
      sharedFaqs.confidentiality,
      sharedFaqs.ai,
    ],
    primaryCta: ctas.submitRole,
  },
  {
    slug: "contract-staffing",
    name: "Contract Staffing",
    navLabel: "Contract staffing",
    outcome: "Skilled professionals on contract, for projects and peak seasons.",
    summary:
      "We find, screen and deploy contract professionals for project, seasonal or temporary needs, and handle payroll and statutory compliance for the contract.",
    whoFor: [
      "Project teams that need skills for a fixed period",
      "Businesses covering seasonal peaks or leave",
      "Companies that want to try a role before making it permanent",
    ],
    included: [
      "A confirmed written brief and contract terms",
      "A shortlist of screened contract candidates in 72 hours",
      "Interview scheduling and onboarding coordination",
      "Monthly billing, payroll and statutory compliance (PF, ESI, PT)",
      "A single point of contact for extensions and replacements",
      "A weekly status report while roles are open",
    ],
    process: [
      standardSteps[0],
      standardSteps[1],
      standardSteps[2],
      {
        step: "Deployment and payroll",
        sla: "Monthly",
        detail:
          "The contractor joins on our payroll; we bill you monthly and handle PF, ESI and professional tax.",
      },
    ],
    pricing: {
      headline: "Monthly fee per contractor",
      detail:
        "A monthly service fee on the contractor's billed CTC, quoted in writing before anyone is deployed.",
      bullets: [
        "Billed monthly",
        "Payroll and statutory compliance included",
        "Quoted in writing per role",
        "GST extra at 18%",
      ],
    },
    faqs: [
      {
        q: "Who employs the contractor?",
        a: "Emplyify does. The contractor is on our payroll for the contract period, and we handle salary, PF, ESI and professional tax. You direct their day-to-day work.",
      },
      {
        q: "How long can a contract run?",
        a: "As long as the project needs, from a few weeks to a year or more. Extensions are agreed in writing.",
      },
      {
        q: "Can we hire a contractor permanently?",
        a: "Yes. A conversion fee applies, set out in your agreement before the contract starts.",
      },
      {
        q: "What if a contractor is not working out?",
        a: "Tell your point of contact. We discuss the issue with you and the contractor and, where needed, find a replacement.",
      },
      sharedFaqs.notice,
      sharedFaqs.pan,
      sharedFaqs.ai,
    ],
    primaryCta: ctas.bookCall,
  },
  {
    slug: "it-hiring",
    name: "IT and Technical Hiring",
    navLabel: "IT and technical hiring",
    outcome: "Technology talent across the stack, screened by recruiters who know it.",
    summary:
      "Software, cloud, data, cybersecurity and engineering roles, hired permanently or on contract. Recruiters screen against the skills you actually need, not keyword matches.",
    whoFor: [
      "Product companies and startups hiring engineers",
      "IT services firms staffing client projects",
      "Global Capability Centres (GCCs) setting up or scaling in India",
    ],
    included: [
      "A brief built around must-have skills, not a job-description copy",
      "AI-assisted search across portals, LinkedIn and our database",
      "A recruiter screen on skills, motivation, notice period and CTC",
      "3–5 screened candidates in 72 hours",
      "Interview scheduling, feedback chasing and offer support",
      "90-day free replacement on permanent hires",
    ],
    process: standardSteps,
    pricing: {
      ...permanentPricing,
      detail:
        "Permanent hires: one to two months of fixed CTC by seniority, paid on joining. Contract roles: a monthly fee per contractor, quoted in writing.",
    },
    faqs: [
      {
        q: "Which IT roles do you hire for?",
        a: "Software development and engineering, cloud and DevOps, data and analytics, AI and machine learning, cybersecurity, embedded and product roles, from junior engineers to engineering leaders.",
      },
      {
        q: "How do you check technical skills?",
        a: "Recruiters screen against the must-have skills in your brief and ask for evidence from past work. Your technical rounds stay with your team; we make sure the people reaching them are worth the time.",
      },
      sharedFaqs.cvDumps,
      sharedFaqs.guarantee,
      sharedFaqs.notice,
      sharedFaqs.ai,
    ],
    primaryCta: ctas.submitRole,
  },
  {
    slug: "non-it-recruitment",
    name: "Non-IT Recruitment",
    navLabel: "Non-IT recruitment",
    outcome: "Sales, finance, HR, operations and support hires that fit the business.",
    summary:
      "Business and support functions across industries: sales and business development, marketing, finance and accounting, human resources, operations and customer service.",
    whoFor: [
      "Manufacturing, logistics, BFSI, healthcare, retail and services companies",
      "Businesses opening a new branch or function",
      "Teams replacing a key person quickly",
    ],
    included: [
      "A confirmed written brief",
      "Sourcing across job portals, networks and referrals",
      "A recruiter screen on experience, motivation, notice period and CTC",
      "3–5 screened candidates in 72 hours",
      "Interview scheduling, offer and joining follow-up",
      "90-day free replacement on permanent hires",
    ],
    process: standardSteps,
    pricing: permanentPricing,
    faqs: [
      {
        q: "Which Non-IT roles do you hire for?",
        a: "Sales and business development, marketing, finance and accounting, human resources, operations and administration, and customer service, from executives to function heads.",
      },
      {
        q: "Which industries do you cover?",
        a: "Banking and financial services, manufacturing and engineering, healthcare and pharma, logistics and supply chain, retail and e-commerce, telecom, professional services, and infrastructure and construction.",
      },
      sharedFaqs.cvDumps,
      sharedFaqs.pay,
      sharedFaqs.guarantee,
      sharedFaqs.pan,
    ],
    primaryCta: ctas.submitRole,
  },
  {
    slug: "leadership-hiring",
    name: "Senior and Leadership Hiring",
    navLabel: "Senior and leadership",
    outcome: "Confidential searches for managers, function heads and CXOs.",
    summary:
      "Searches for senior hires where fit matters as much as skills. Smaller shortlists, deeper conversations and references on every finalist.",
    whoFor: [
      "Companies appointing a function head, VP or CXO",
      "GCCs appointing a site lead",
      "Teams replacing a leader confidentially",
    ],
    included: [
      "A search mandate and scorecard agreed in writing",
      "Confidential outreach led by a senior recruiter",
      "In-depth interviews and two references per finalist",
      "Two to four finalists with a written assessment",
      "Offer, counter-offer and notice-period support",
      "90-day free replacement",
    ],
    process: [
      {
        step: "Search brief",
        sla: "Week 0",
        detail: "A working session with the hiring executive to define the mandate and scorecard.",
      },
      {
        step: "Market map",
        sla: "Week 1",
        detail: "A target list of companies and an honest read on availability and pay.",
      },
      {
        step: "Finalists",
        sla: "Weeks 2–4",
        detail: "Two to four finalists, each with a written assessment and references.",
      },
      {
        step: "Close",
        sla: "Weeks 4–8",
        detail: "Offer strategy, counter-offer handling and notice-period support.",
      },
    ],
    pricing: {
      headline: "A share of annual CTC",
      detail:
        "Part of the fee is paid at agreed milestones and the rest when the leader joins. Quoted in writing before the search starts.",
      bullets: [
        "Quoted per search",
        "Milestone-based payments",
        "90-day free replacement",
        "GST extra at 18%",
      ],
    },
    faqs: [
      {
        q: "How long does a leadership search take?",
        a: "Finalists usually arrive within two to four weeks. Most senior people have 60–90 days' notice, so plan for a start date about three months after the brief.",
      },
      {
        q: "Do you take references?",
        a: "Yes, two structured references per finalist, with the candidate's consent and never from a current employer without permission.",
      },
      sharedFaqs.guarantee,
      sharedFaqs.confidentiality,
      sharedFaqs.exclusivity,
      sharedFaqs.ai,
    ],
    primaryCta: ctas.bookCall,
  },
  {
    slug: "bulk-hiring",
    name: "Bulk and Volume Hiring",
    navLabel: "Bulk and volume hiring",
    outcome: "Ten or more similar roles, run as one dedicated hiring drive.",
    summary:
      "For new branches, project ramp-ups and expansion. A dedicated recruiter team runs the drive with a shared tracker and a weekly report.",
    whoFor: [
      "Companies opening a new site, branch or delivery centre",
      "Sales, operations and support teams scaling quickly",
      "IT services firms ramping up for a new project",
    ],
    included: [
      "A drive plan with weekly targets agreed up front",
      "A dedicated recruiter team and one point of contact",
      "Screening to a common scorecard for every role",
      "Batch interview scheduling and offer tracking",
      "A shared tracker and a weekly drive report",
      "90-day free replacement on permanent hires",
    ],
    process: [
      {
        step: "Drive plan",
        sla: "Week 0",
        detail: "Roles, volumes, scorecard, interview slots and weekly targets agreed in writing.",
      },
      {
        step: "Sourcing at volume",
        sla: "From day 1",
        detail: "Portals, networks, referrals and our database, screened by the dedicated team.",
      },
      {
        step: "Weekly batches",
        sla: "Every week",
        detail: "Shortlists in batches, with interview days scheduled for you.",
      },
      {
        step: "Offers and joining",
        sla: "Tracked weekly",
        detail: "Offer and joining follow-up for every hire, reported against the plan.",
      },
    ],
    pricing: {
      headline: "Reduced per-hire or fixed drive fee",
      detail:
        "Volume brings the per-hire fee down, or we agree a fixed fee for the drive. Quoted in writing per drive.",
      bullets: [
        "Quoted per drive",
        "Lower cost per hire than single roles",
        "Weekly drive report",
        "GST extra at 18%",
      ],
    },
    faqs: [
      {
        q: "How many roles count as bulk hiring?",
        a: "Usually ten or more similar openings. Fewer roles run as permanent recruitment.",
      },
      {
        q: "Do you hire freshers?",
        a: "Our drives focus on experienced hires. We can include entry-level roles in a drive where the role needs it.",
      },
      {
        q: "How fast can a drive start?",
        a: "Sourcing starts the day the drive plan is agreed, with the first shortlists in the first week.",
      },
      sharedFaqs.pay,
      sharedFaqs.guarantee,
      sharedFaqs.pan,
    ],
    primaryCta: ctas.bookCall,
  },
];
