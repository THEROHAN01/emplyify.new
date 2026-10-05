import type { Service } from "./types";
import { ctas } from "./site";

const sharedFaqs = {
  guarantee: {
    q: "What happens if a hire leaves in the first 90 days?",
    a: "We replace them free of charge. If the hire leaves or is let go for performance within 90 days of joining, we run a fresh search at no additional fee. The terms are written into your agreement.",
  },
  exclusivity: {
    q: "Do you need exclusivity on the role?",
    a: "No. We work well alongside your in-house team and other partners. If two sources submit the same candidate, the first submission with the candidate's consent and a timestamp counts.",
  },
  confidentiality: {
    q: "Can you run a confidential search?",
    a: "Yes. We describe the role without naming your company until a candidate has passed our screen and signed an NDA where you require one. Confidential searches add no fee.",
  },
  notice: {
    q: "How do you handle 60–90 day notice periods?",
    a: "We screen for notice period on the first call and show it on every dossier. For urgent roles we prioritise candidates serving notice or with buy-out options, and we stay in touch through the notice period to reduce dropouts.",
  },
  cvDumps: {
    q: "Will you send us a pile of CVs?",
    a: "No. You get three to five candidates, each with a written fit summary, evidence for every must-have skill and a recruiter's sign-off. Quality over volume is the whole point.",
  },
  ai: {
    q: "Does AI make decisions about candidates?",
    a: "AI searches, ranks and drafts summaries. A senior recruiter interviews every candidate and decides who goes on your shortlist. AI never rejects a candidate on its own.",
  },
};

export const services: Service[] = [
  {
    slug: "tech-hiring",
    name: "Tech Hiring",
    navLabel: "Tech Hiring",
    outcome: "Three to five vetted engineers on your desk in 72 hours.",
    summary:
      "Per-hire recruiting for engineering, data and product roles. You brief us once; we return a short, evidenced shortlist and run the process to offer.",
    whoFor: [
      "Engineering managers at Series B+ product companies hiring 1–4 roles",
      "Founders and CTOs building the first 5–20 person engineering team",
      "GCC teams that need a specialist search alongside in-house TA",
    ],
    included: [
      "A 20-minute calibration call, or a written brief if you prefer",
      "AI-assisted search across our network and public profiles",
      "A recruiter screen on skills, motivation, notice period and CTC",
      "Shortlist dossier: fit summary, evidence per must-have, risks",
      "Interview scheduling, feedback collection and offer support",
      "90-day free replacement",
    ],
    process: [
      {
        step: "Brief",
        sla: "Day 0",
        detail:
          "Submit a role in two minutes or brief us on a call. We confirm must-haves and budget in writing.",
      },
      {
        step: "Search and screen",
        sla: "0–48 hours",
        detail:
          "AI agents search and rank; recruiters run structured screens with the top matches.",
      },
      {
        step: "Verified shortlist",
        sla: "By 72 hours",
        detail: "A senior recruiter signs off three to five candidates with a dossier for each.",
      },
      {
        step: "Interviews to offer",
        sla: "Typically 2–4 weeks",
        detail:
          "We schedule, chase feedback within 48 hours and support the offer and notice period.",
      },
    ],
    pricing: {
      headline: "8.33–16.67% of annual CTC",
      detail:
        "Equal to one to two months of the hire's fixed CTC, set by seniority. Pay only when the candidate joins.",
      bullets: [
        "No retainer",
        "No fee until the hire joins",
        "90-day free replacement",
        "GST extra at 18%",
      ],
    },
    faqs: [
      sharedFaqs.cvDumps,
      sharedFaqs.guarantee,
      sharedFaqs.exclusivity,
      sharedFaqs.notice,
      sharedFaqs.confidentiality,
      sharedFaqs.ai,
    ],
    primaryCta: ctas.submitRole,
  },
  {
    slug: "talent-pods",
    name: "Talent Pods",
    navLabel: "Talent Pods",
    outcome: "An embedded recruiting team that ships hires every week.",
    summary:
      "For teams hiring five or more roles a quarter. A dedicated recruiter and our AI agents work inside your process, on a monthly fee with a reduced per-hire fee.",
    whoFor: [
      "GCCs scaling a function from 20 to 200 people",
      "Product companies with a sustained hiring plan across several teams",
      "TA leads who need capacity without adding headcount",
    ],
    included: [
      "A named, dedicated recruiter who joins your stand-ups and tools",
      "AI sourcing and screening agents tuned to your roles",
      "Weekly pipeline report: funnel, time-in-stage, offer acceptance",
      "Employer-brand outreach drafts reviewed by your team",
      "Reduced per-hire fee on every hire",
      "90-day free replacement on every hire",
    ],
    process: [
      {
        step: "Hiring plan",
        sla: "Week 0",
        detail: "We map roles, priorities and interview loops with your TA and hiring managers.",
      },
      {
        step: "Pod set-up",
        sla: "Week 1",
        detail:
          "Your recruiter gets access to your ATS or uses ours; agents are calibrated on two sample roles.",
      },
      {
        step: "Rolling shortlists",
        sla: "72 hours per new role",
        detail: "Every new role gets a verified shortlist within 72 hours of its brief.",
      },
      {
        step: "Weekly review",
        sla: "Every week",
        detail: "A written report and a 30-minute review to re-prioritise roles.",
      },
    ],
    pricing: {
      headline: "Monthly fee + reduced per-hire fee",
      detail:
        "The monthly fee depends on pod size and role mix. We quote it in writing after a 20-minute call — no surprises later.",
      bullets: [
        "Minimum three-month term",
        "Per-hire fee lower than our standard rate",
        "Scale the pod up or down monthly",
        "GST extra at 18%",
      ],
    },
    faqs: [
      {
        q: "How is a Talent Pod different from RPO?",
        a: "A pod is smaller and faster to start: one dedicated recruiter plus our AI agents, set up in a week, on a three-month minimum. Traditional RPO contracts usually take months to negotiate and lock you in for a year or more.",
      },
      {
        q: "Can the pod use our ATS?",
        a: "Yes. The recruiter works in your ATS if you give access. If you don't have one, we run the pipeline in ours and share a live view.",
      },
      {
        q: "What if our hiring slows down?",
        a: "You can resize the pod with 30 days' notice after the minimum term. Hires already in process keep their reduced fee.",
      },
      sharedFaqs.guarantee,
      sharedFaqs.confidentiality,
      sharedFaqs.ai,
    ],
    primaryCta: ctas.bookCall,
  },
  {
    slug: "gcc-hiring-sprints",
    name: "GCC Hiring Sprints",
    navLabel: "GCC Hiring Sprints",
    outcome: "Stand up a 10–50 person GCC team in 30–90 days.",
    summary:
      "A fixed-scope project for GCC launches and expansions. A dedicated pod hires your founding team in India against a written plan and weekly milestones.",
    whoFor: [
      "Global companies opening a GCC in Pune, Bengaluru or Hyderabad",
      "Existing GCCs launching a new capability such as AI, data or embedded",
      "Heads of TA who need a launch partner with a fixed budget",
    ],
    included: [
      "Market map: salary benchmarks, talent supply and competitor GCCs per city",
      "Hiring plan with role sequencing — leads first, then teams",
      "A dedicated pod: lead recruiter, sourcers and AI agents",
      "Employer-brand starter kit for your India launch",
      "Weekly steering report and a shared live tracker",
      "Compliance support: background checks and DPDP-aligned data handling",
    ],
    process: [
      {
        step: "Launch workshop",
        sla: "Week 0",
        detail: "A half-day session to agree roles, levels, budget and success metrics.",
      },
      {
        step: "Market map",
        sla: "Week 1",
        detail: "City-level salary and supply data so you can set competitive bands.",
      },
      {
        step: "Leads first",
        sla: "Weeks 1–4",
        detail: "We hire engineering leads and managers first so they can shape their teams.",
      },
      {
        step: "Team build-out",
        sla: "Weeks 3–12",
        detail: "Rolling 72-hour shortlists for every role, with weekly steering reviews.",
      },
    ],
    pricing: {
      headline: "Fixed project fee + per-hire fee",
      detail:
        "Quoted as a fixed fee for the sprint plus a per-hire fee below our standard rate. Typical sprints run 30–90 days for 10–50 roles.",
      bullets: [
        "Fixed, written scope",
        "Weekly milestones",
        "Per-hire fee below standard rate",
        "GST extra at 18%",
      ],
    },
    faqs: [
      {
        q: "Which cities do you cover for GCC launches?",
        a: "Pune, Bengaluru and Hyderabad today. We publish salary and supply data for each in our Talent Index.",
      },
      {
        q: "Can you help before our legal entity is set up?",
        a: "Yes. We can start the market map and leadership search while your entity or employer-of-record arrangement is being finalised.",
      },
      {
        q: "How do you hire leaders before teams?",
        a: "We sequence the plan so engineering managers and principal engineers join first. They then interview and help sell their own teams, which improves offer acceptance.",
      },
      sharedFaqs.guarantee,
      sharedFaqs.notice,
      sharedFaqs.confidentiality,
      sharedFaqs.ai,
    ],
    primaryCta: ctas.gccTeam,
  },
  {
    slug: "leadership-hiring",
    name: "Leadership Hiring",
    navLabel: "Leadership",
    outcome: "Engineering leaders who have built what you are building.",
    summary:
      "Confidential searches for engineering managers, directors, heads of data and site leaders. Smaller shortlists, deeper references.",
    whoFor: [
      "GCCs appointing a site lead or head of engineering",
      "Scale-ups hiring their first director or VP of engineering",
      "Teams replacing a leader confidentially",
    ],
    included: [
      "Search strategy agreed in writing, including target companies",
      "Confidential outreach led by a senior partner",
      "Structured leadership interviews and two references per finalist",
      "Shortlist of two to four finalists with a written assessment",
      "Offer and onboarding support",
      "90-day free replacement",
    ],
    process: [
      {
        step: "Search brief",
        sla: "Week 0",
        detail:
          "A working session with the hiring executive to define the mandate and the scorecard.",
      },
      {
        step: "Market map",
        sla: "Week 1",
        detail: "A named target list and an honest read on availability and pay.",
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
      headline: "16.67% of annual CTC",
      detail:
        "Equal to two months of fixed CTC. Leadership searches can be retained in stages on request; otherwise you pay on hire.",
      bullets: [
        "Pay on hire by default",
        "Optional staged retainer",
        "90-day free replacement",
        "GST extra at 18%",
      ],
    },
    faqs: [
      {
        q: "How long does a leadership search take?",
        a: "Finalists usually arrive within two to four weeks. Most leaders have 60–90 days' notice, so plan for a start date about three months after the brief.",
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
];
