/**
 * Content model. These shapes mirror the planned Sanity schemas so the local
 * files in /src/content can be swapped for CMS queries behind
 * /src/lib/content without touching pages or components.
 */

export type PublishStatus = "published" | "draft";

export interface Faq {
  q: string;
  a: string;
}

export interface Cta {
  label: string;
  href: string;
}

export type RoleFamilySlug = "ai-ml" | "data" | "cloud-devops" | "full-stack" | "embedded" | "product";

export type Seniority = "junior" | "mid" | "senior" | "lead";

export type CitySlug = "pune" | "bengaluru" | "hyderabad";

export interface SalaryBand {
  seniority: Seniority;
  years: string;
  minLpa: number;
  maxLpa: number;
}

export interface RolePage {
  /** URL segment under /hire, e.g. "machine-learning-engineers" */
  slug: string;
  family: RoleFamilySlug;
  /** Plural, used in headings: "Machine learning engineers" */
  title: string;
  /** Singular, used in briefs: "Machine Learning Engineer" */
  singular: string;
  shortDescription: string;
  intro: string;
  skillsWeVet: { name: string; how: string }[];
  typicalTimeToHireDays: { min: number; max: number };
  availability: "high" | "moderate" | "scarce";
  interviewLoop: { stage: string; duration: string; focus: string }[];
  screeningQuestions: string[];
  /** National baseline; city pages apply the city multiplier. */
  salaryBands: SalaryBand[];
  faqs: Faq[];
  keywords: string[];
}

export interface City {
  slug: CitySlug;
  name: string;
  state: string;
  /** Multiplier applied to national salary baselines for indicative city bands. */
  salaryIndex: number;
  gccClusters: { name: string; note: string }[];
  talentSupply: string;
  noticePeriodNorm: string;
  hiringNotes: string[];
  gccIntro: string;
  faqs: Faq[];
}

export interface Service {
  slug: string;
  name: string;
  navLabel: string;
  outcome: string;
  summary: string;
  whoFor: string[];
  included: string[];
  process: { step: string; sla: string; detail: string }[];
  pricing: { headline: string; detail: string; bullets: string[] };
  faqs: Faq[];
  primaryCta: Cta;
}

export interface CaseStudy {
  slug: string;
  status: PublishStatus;
  client: string;
  clientType: "GCC" | "Product company" | "Startup";
  roleFamily: RoleFamilySlug;
  headline: string;
  challenge: string;
  approach: string[];
  results: { value: string; label: string }[];
  quote?: { text: string; name: string; title: string };
  publishedAt: string;
}

export interface Job {
  /** Readable slug + short id: senior-ml-engineer-pune-x7k2 */
  slug: string;
  id: string;
  status: PublishStatus;
  title: string;
  roleFamily: RoleFamilySlug;
  seniority: Seniority;
  city: CitySlug | "remote";
  workMode: "On-site" | "Hybrid" | "Remote";
  employmentType: "FULL_TIME" | "CONTRACTOR";
  company: { descriptor: string; size: string; disclosed: boolean };
  salary: { minLpa: number; maxLpa: number };
  experienceYears: { min: number; max: number };
  team: string;
  stack: string[];
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  interviewStages: { stage: string; duration: string }[];
  expectedTimelineDays: number;
  noticePeriodMaxDays: number;
  postedAt: string;
  validThrough: string;
}

export interface Insight {
  slug: string;
  status: PublishStatus;
  kind: "Talent Index" | "Salary benchmark" | "Hiring guide";
  title: string;
  description: string;
  publishedAt: string;
  /** Gated assets collect an email before the download (or the release notice). */
  gated: boolean;
  /** "upcoming" reports collect sign-ups and email the PDF on release. */
  release: "available" | "upcoming";
  /** Expected release, shown for upcoming reports. */
  releaseLabel?: string;
  /** Private path of the PDF, sent by email after the form — never linked publicly. */
  assetPath?: string;
  readingMinutes: number;
  body: { heading: string; paragraphs: string[] }[];
  takeaways: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: { heading: string; body: string[] }[];
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  photo: string;
  linkedin?: string;
}
