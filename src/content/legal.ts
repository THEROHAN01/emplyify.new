import type { LegalDoc } from "./types";
import { site } from "./site";

/**
 * Plain-language policies aligned to India's Digital Personal Data Protection
 * Act, 2023. These are drafts for legal review (launch checklist item:
 * "confirm with a lawyer"); `LEGAL_REVIEWED` flips the review banner off.
 */
export const LEGAL_REVIEWED = false;

const updatedAt = "2026-10-05";

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy notice",
    description:
      "What personal data Emplyify collects, why, how long we keep it and your rights under the DPDP Act.",
    updatedAt,
    sections: [
      {
        heading: "Who we are",
        body: [
          `${site.legalName} ("we") is a recruitment company based in ${site.office.city}, India. We act as a Data Fiduciary for the personal data described in this notice.`,
        ],
      },
      {
        heading: "What we collect",
        body: [
          "From candidates: your name, contact details, CV, work history, skills, current and expected compensation, notice period, location preferences and interview notes.",
          "From employers: your name, work email, phone, company and the details of the roles you share with us.",
          "From everyone: technical data such as IP address (stored as a one-way hash), browser type and, only with your consent, analytics about how you use the site.",
        ],
      },
      {
        heading: "Why we use it",
        body: [
          "To match candidates with roles, share candidate profiles with employers (only with the candidate's consent for each role), run interviews, respond to enquiries, send the updates you asked for and meet legal obligations.",
          "We use AI tools to help search, parse CVs and draft summaries. A recruiter reviews every shortlist, and AI never rejects a candidate on its own. See our Responsible AI policy.",
        ],
      },
      {
        heading: "Consent",
        body: [
          "We ask for clear, specific consent when you upload a CV and again before we share your profile with any employer. You can withdraw consent at any time by emailing " +
            site.email.privacy +
            "; withdrawal is as easy as giving consent and does not affect processing that happened before it.",
        ],
      },
      {
        heading: "Who we share it with",
        body: [
          "Employers you have agreed to be introduced to; service providers who process data on our behalf under contract (hosting, email, CRM, AI APIs, analytics); and authorities where the law requires it. We do not sell personal data.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "Candidate profiles: 24 months after your last interaction with us, then deleted unless you ask us to keep them. Employer enquiries: for the duration of our relationship plus 3 years for accounting and legal purposes. AI prompt and output logs: personal data removed after 30 days.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You can ask to access, correct, update or erase your data; withdraw consent; nominate someone to exercise your rights; and raise a grievance. Email " +
            site.email.privacy +
            ". We respond within 30 days. If you are not satisfied, you can contact our Grievance Officer and, after that, the Data Protection Board of India.",
        ],
      },
      {
        heading: "Security",
        body: [
          "CVs are stored in private, encrypted storage and accessed through short-lived links. Staff accounts use multi-factor authentication and role-based access. We test backups regularly.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of service",
    description:
      "Terms for employers using Emplyify, including fees, the 90-day replacement guarantee and non-solicitation.",
    updatedAt,
    sections: [
      {
        heading: "Scope",
        body: [
          "These terms apply to employers who submit roles or engage Emplyify. A signed engagement letter or order form takes precedence over this page where they differ.",
        ],
      },
      {
        heading: "Fees",
        body: [
          "Per-hire fees are 8.33% (junior), 12.5% (mid) or 16.67% (senior and leadership) of the hire's annual fixed CTC, plus GST at 18%. Fees are due 15 days after the candidate's joining date. Talent Pod and Hiring Sprint fees are set out in the order form.",
        ],
      },
      {
        heading: "Introductions",
        body: [
          "A candidate is introduced when we share their profile with you with their consent. A fee is payable if you, or an affiliate, hire an introduced candidate for any role within 12 months of the introduction.",
        ],
      },
      {
        heading: "90-day replacement",
        body: [
          "If a hire resigns or is dismissed for performance or conduct within 90 days of joining, we will run a replacement search for the same role at no additional fee, provided invoices are paid on time. The guarantee does not apply to redundancy, a material change in the role, or changes in the hire's compensation.",
        ],
      },
      {
        heading: "Non-solicitation",
        body: [
          "Neither party will solicit the other's employees involved in the engagement for 12 months after it ends, other than through general advertising.",
        ],
      },
      {
        heading: "Data protection",
        body: [
          "Each party complies with the DPDP Act, 2023. You will use candidate data only to assess the candidate for the role they consented to and delete it when the process ends, unless you hire them.",
        ],
      },
      {
        heading: "Liability and law",
        body: [
          "Our total liability is limited to the fees paid for the relevant hire. These terms are governed by the laws of India, and the courts of Pune have jurisdiction.",
        ],
      },
    ],
  },
  {
    slug: "candidate-consent",
    title: "Candidate consent",
    description:
      "Exactly what you agree to when you apply or join the Emplyify talent network, and how to withdraw.",
    updatedAt,
    sections: [
      {
        heading: "When you upload a CV or join the network",
        body: [
          "You agree that we may store your profile and CV, use AI tools to parse it and suggest matching roles, and contact you by email or WhatsApp about roles that fit. We will not call you without a booked slot.",
        ],
      },
      {
        heading: "Before we share your profile",
        body: [
          "We ask separately, for each role and each employer, before sharing your profile. We tell you the company (or describe it, for confidential searches) and the salary band. Saying no has no effect on other roles.",
        ],
      },
      {
        heading: "Our promises to you",
        body: [
          `A status update within ${site.promises.candidateUpdateBusinessDays} business days at every stage. If a process stalls for ${site.promises.autoCloseDays} days we close it and tell you why. A short reason for every outcome.`,
        ],
      },
      {
        heading: "Withdrawing consent",
        body: [
          `Email ${site.email.privacy} with the subject "Withdraw consent". We stop processing and delete your data within 30 days, except where the law requires us to keep it.`,
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie policy",
    description:
      "Which cookies and similar technologies emplyify.com uses and how to control them.",
    updatedAt,
    sections: [
      {
        heading: "Strictly necessary",
        body: [
          "We store your cookie choice and short-lived campaign (UTM) parameters so we can attribute your enquiry. These do not track you across sites and need no consent.",
        ],
      },
      {
        heading: "Analytics (optional)",
        body: [
          "With your consent we use privacy-friendly analytics to understand which pages help visitors. Form fields are always masked. Analytics scripts do not load until you accept.",
        ],
      },
      {
        heading: "Bot protection",
        body: [
          "Forms use Cloudflare Turnstile to stop spam. It may set a functional cookie when you submit a form.",
        ],
      },
      {
        heading: "Changing your choice",
        body: ["Use the “Cookie settings” link in the footer at any time."],
      },
    ],
  },
  {
    slug: "grievance",
    title: "Grievance officer",
    description: "How to raise a data protection or service grievance with Emplyify.",
    updatedAt,
    sections: [
      {
        heading: "Contact",
        body: [
          `Grievance Officer, ${site.legalName}, ${site.office.city}, ${site.office.region}, India. Email: ${site.email.grievance}.`,
        ],
      },
      {
        heading: "What happens next",
        body: [
          "We acknowledge every grievance within 2 business days and resolve it within 30 days. If you are not satisfied with our response, you may approach the Data Protection Board of India.",
        ],
      },
    ],
  },
];

export const responsibleAi: LegalDoc = {
  slug: "responsible-ai",
  title: "Responsible AI policy",
  description: "Where Emplyify uses AI, where humans decide, and the safeguards we run.",
  updatedAt,
  sections: [
    {
      heading: "Where AI works",
      body: [
        "Searching our network and public profiles, parsing CVs, ranking matches against a brief, drafting outreach and dossier summaries, turning a pasted job description into a structured brief, and generating interview-prep questions.",
      ],
    },
    {
      heading: "Where humans decide",
      body: [
        "A senior recruiter interviews every shortlisted candidate and signs off every shortlist. AI never rejects a candidate on its own — every rejection has a human reviewer. Recruiters edit every AI-drafted message before it is sent.",
      ],
    },
    {
      heading: "Fairness",
      body: [
        "Every month we test matching for skew on gender, college and location proxies, and fix what we find. We do not use photos, age, caste, religion or marital status in matching.",
      ],
    },
    {
      heading: "Transparency",
      body: [
        "AI-generated content and AI interactions on this site are labelled. Answers from AI features cite where they came from, and hand off to a person when they are unsure.",
      ],
    },
    {
      heading: "Data",
      body: [
        "Prompts and outputs are logged for audit, with personal data removed after 30 days. We use AI providers under data processing agreements that prohibit training on your data.",
      ],
    },
  ],
};
