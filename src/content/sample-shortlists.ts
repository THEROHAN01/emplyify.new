import type { RoleFamilySlug } from "./types";

/**
 * Anonymised SAMPLE dossiers (playbook: "Sample shortlist generator — pre-approved
 * samples only"). Candidates are illustrative composites, not real people, and
 * every surface that renders them labels them as a sample.
 */
export interface SampleCandidate {
  alias: string;
  headline: string;
  years: number;
  location: string;
  noticeDays: number;
  expectedCtcLpa: string;
  fitScore: number;
  summary: string;
  evidence: { skill: string; proof: string; verified: boolean }[];
  risks: string[];
  recruiterNote: string;
}

export interface SampleShortlist {
  family: RoleFamilySlug;
  role: string;
  company: string;
  mustHaves: string[];
  candidates: SampleCandidate[];
}

export const sampleShortlists: SampleShortlist[] = [
  {
    family: "ai-ml",
    role: "Senior ML Engineer (LLM platform)",
    company: "Series C SaaS product company, Pune (hybrid)",
    mustHaves: ["Python", "Production LLM / retrieval", "Evaluation pipelines", "AWS"],
    candidates: [
      {
        alias: "Candidate A",
        headline: "Senior ML Engineer, B2B SaaS",
        years: 7,
        location: "Pune",
        noticeDays: 60,
        expectedCtcLpa: "48–52",
        fitScore: 92,
        summary: "Led the retrieval and evaluation stack behind a customer-support assistant serving enterprise accounts; cut answer-escalation rate by building an offline eval set from support tickets.",
        evidence: [
          { skill: "Production LLM / retrieval", proof: "Owned hybrid search + reranking in production for 18 months", verified: true },
          { skill: "Evaluation pipelines", proof: "Built regression eval run on every prompt change", verified: true },
          { skill: "Python", proof: "Live code review of a past PR", verified: true },
          { skill: "AWS", proof: "SageMaker and Lambda deployments", verified: false },
        ],
        risks: ["Has a pending counter-offer conversation", "Prefers 2 office days a week"],
        recruiterNote: "Strongest on evaluation discipline of anyone we screened. Ask about cost controls in round two.",
      },
      {
        alias: "Candidate B",
        headline: "ML Engineer, fintech",
        years: 5,
        location: "Bengaluru (open to Pune)",
        noticeDays: 30,
        expectedCtcLpa: "38–42",
        fitScore: 86,
        summary: "Built fraud-detection models and a feature store; for the past year has run an internal document-extraction service on hosted LLMs.",
        evidence: [
          { skill: "Python", proof: "Maintainer of internal feature-store library", verified: true },
          { skill: "Production LLM / retrieval", proof: "Document extraction service, ~40k docs/day", verified: true },
          { skill: "Evaluation pipelines", proof: "Precision/recall dashboards; lighter on LLM evals", verified: false },
          { skill: "AWS", proof: "EKS and S3; certified Solutions Architect", verified: true },
        ],
        risks: ["Relocation from Bengaluru needed", "Less depth in retrieval than A"],
        recruiterNote: "Fast to join (30 days) and below budget. Good fit if the role leans to platform over research.",
      },
      {
        alias: "Candidate C",
        headline: "Applied Scientist, e-commerce",
        years: 8,
        location: "Pune",
        noticeDays: 90,
        expectedCtcLpa: "55–60",
        fitScore: 81,
        summary: "Ranking and recommendation background moving into LLM work; published internal evaluation methodology adopted across three teams.",
        evidence: [
          { skill: "Evaluation pipelines", proof: "Authored team-wide offline/online metric playbook", verified: true },
          { skill: "Python", proof: "Take-home review", verified: true },
          { skill: "Production LLM / retrieval", proof: "Six months of RAG prototyping, one launch", verified: false },
          { skill: "AWS", proof: "Mostly GCP; some AWS", verified: false },
        ],
        risks: ["90-day notice", "Above top of budget"],
        recruiterNote: "Senior thinker — consider if you want someone to set evaluation standards for the team.",
      },
    ],
  },
  {
    family: "data",
    role: "Senior Data Engineer (lakehouse)",
    company: "Global insurer GCC, Hyderabad",
    mustHaves: ["Spark", "Databricks", "SQL modelling", "Airflow"],
    candidates: [
      {
        alias: "Candidate A",
        headline: "Senior Data Engineer, banking GCC",
        years: 8,
        location: "Hyderabad",
        noticeDays: 90,
        expectedCtcLpa: "36–40",
        fitScore: 90,
        summary: "Migrated a 40-pipeline Hadoop estate to Databricks; owns data-quality contracts for finance reporting.",
        evidence: [
          { skill: "Databricks", proof: "Led migration, Unity Catalog roll-out", verified: true },
          { skill: "Spark", proof: "Tuned skewed joins; walked through job plans", verified: true },
          { skill: "SQL modelling", proof: "Live modelling exercise", verified: true },
          { skill: "Airflow", proof: "Managed DAGs, backfill strategy", verified: true },
        ],
        risks: ["90-day notice, no buy-out"],
        recruiterNote: "Best all-round match. Start the process now to account for notice.",
      },
      {
        alias: "Candidate B",
        headline: "Data Engineer, health-tech",
        years: 5,
        location: "Hyderabad",
        noticeDays: 45,
        expectedCtcLpa: "28–32",
        fitScore: 84,
        summary: "Built streaming ingestion on Kafka and Delta Lake for clinical data; strong on testing and data contracts.",
        evidence: [
          { skill: "Spark", proof: "Structured Streaming in production", verified: true },
          { skill: "Databricks", proof: "Two years on the platform", verified: true },
          { skill: "SQL modelling", proof: "Solid, less dimensional modelling", verified: false },
          { skill: "Airflow", proof: "Uses Databricks Workflows instead", verified: false },
        ],
        risks: ["Less orchestration depth"],
        recruiterNote: "Strong engineer with a shorter notice period; within budget.",
      },
      {
        alias: "Candidate C",
        headline: "Analytics Engineer moving to platform",
        years: 6,
        location: "Pune (open to relocate)",
        noticeDays: 60,
        expectedCtcLpa: "30–34",
        fitScore: 78,
        summary: "dbt and warehouse modelling expert growing into Spark; led a cost-reduction project on the warehouse.",
        evidence: [
          { skill: "SQL modelling", proof: "Exceptional; best modelling exercise of the batch", verified: true },
          { skill: "Spark", proof: "One year, mostly PySpark", verified: false },
          { skill: "Databricks", proof: "Recent, one project", verified: false },
          { skill: "Airflow", proof: "Three years of DAG ownership", verified: true },
        ],
        risks: ["Needs relocation", "Lighter on Spark tuning"],
        recruiterNote: "Consider if modelling quality for reporting is the main pain point.",
      },
    ],
  },
  {
    family: "cloud-devops",
    role: "Platform Engineer (Kubernetes)",
    company: "Series B logistics platform, Bengaluru",
    mustHaves: ["Kubernetes", "Terraform", "AWS", "Observability"],
    candidates: [
      {
        alias: "Candidate A",
        headline: "Senior SRE, consumer app",
        years: 7,
        location: "Bengaluru",
        noticeDays: 60,
        expectedCtcLpa: "40–44",
        fitScore: 91,
        summary: "Runs multi-cluster EKS for a high-traffic consumer app; led incident-review practice and halved paging volume by re-tuning alerts.",
        evidence: [
          { skill: "Kubernetes", proof: "Cluster upgrades and capacity planning", verified: true },
          { skill: "Terraform", proof: "Module library across 30+ services", verified: true },
          { skill: "AWS", proof: "Production ownership", verified: true },
          { skill: "Observability", proof: "Prometheus/Grafana, SLO design", verified: true },
        ],
        risks: ["Expects a staff-level title in 12–18 months"],
        recruiterNote: "Clear first choice on skills and on-call maturity.",
      },
      {
        alias: "Candidate B",
        headline: "DevOps Engineer, SaaS",
        years: 4,
        location: "Bengaluru",
        noticeDays: 30,
        expectedCtcLpa: "24–27",
        fitScore: 82,
        summary: "Built CI/CD and GitOps workflows with Argo CD; cut deploy time from 40 to 8 minutes.",
        evidence: [
          { skill: "Kubernetes", proof: "Argo CD, Helm", verified: true },
          { skill: "Terraform", proof: "Good, smaller estate", verified: true },
          { skill: "AWS", proof: "Mostly GCP", verified: false },
          { skill: "Observability", proof: "Datadog user rather than designer", verified: false },
        ],
        risks: ["AWS gap", "Less incident leadership"],
        recruiterNote: "Strong mid-level option, joins in 30 days.",
      },
    ],
  },
  {
    family: "full-stack",
    role: "Senior Full-stack Engineer (React + Node)",
    company: "Seed-stage B2B startup, Pune",
    mustHaves: ["React / Next.js", "Node.js", "PostgreSQL", "Product ownership"],
    candidates: [
      {
        alias: "Candidate A",
        headline: "Founding engineer, B2B SaaS",
        years: 6,
        location: "Pune",
        noticeDays: 30,
        expectedCtcLpa: "32–36",
        fitScore: 89,
        summary: "Second engineer at a startup acquired last year; owned billing and onboarding flows end to end.",
        evidence: [
          { skill: "React / Next.js", proof: "Shipped app router migration", verified: true },
          { skill: "Node.js", proof: "Billing service design walk-through", verified: true },
          { skill: "PostgreSQL", proof: "Indexing and migration stories", verified: true },
          { skill: "Product ownership", proof: "Ran customer calls weekly", verified: true },
        ],
        risks: ["Looking for meaningful ESOPs"],
        recruiterNote: "Founder-quality hire. Move fast — has two other processes.",
      },
      {
        alias: "Candidate B",
        headline: "Senior Engineer, e-commerce",
        years: 7,
        location: "Pune",
        noticeDays: 60,
        expectedCtcLpa: "30–34",
        fitScore: 83,
        summary: "Strong frontend performance specialist; improved checkout conversion through Core Web Vitals work.",
        evidence: [
          { skill: "React / Next.js", proof: "Performance case study", verified: true },
          { skill: "Node.js", proof: "BFF layer, less backend depth", verified: false },
          { skill: "PostgreSQL", proof: "Moderate", verified: false },
          { skill: "Product ownership", proof: "Worked closely with PMs", verified: true },
        ],
        risks: ["Backend depth lighter than A"],
        recruiterNote: "Excellent if the next six months are frontend-heavy.",
      },
    ],
  },
  {
    family: "embedded",
    role: "Senior AUTOSAR Engineer",
    company: "European automotive GCC, Pune",
    mustHaves: ["Embedded C", "Classic AUTOSAR", "CAN", "ISO 26262 exposure"],
    candidates: [
      {
        alias: "Candidate A",
        headline: "Senior Embedded Engineer, tier-1 supplier",
        years: 9,
        location: "Pune",
        noticeDays: 90,
        expectedCtcLpa: "30–34",
        fitScore: 90,
        summary: "BSW configuration and integration on Classic AUTOSAR for powertrain ECUs; led two ASPICE assessments.",
        evidence: [
          { skill: "Classic AUTOSAR", proof: "BSW/MCAL configuration with Vector tools", verified: true },
          { skill: "Embedded C", proof: "Debugging walk-through", verified: true },
          { skill: "CAN", proof: "CANoe, diagnostics (UDS)", verified: true },
          { skill: "ISO 26262 exposure", proof: "ASIL-B project artefacts", verified: true },
        ],
        risks: ["90-day notice"],
        recruiterNote: "Exact domain match.",
      },
      {
        alias: "Candidate B",
        headline: "Embedded Software Engineer, EV start-up",
        years: 5,
        location: "Pune",
        noticeDays: 30,
        expectedCtcLpa: "18–21",
        fitScore: 80,
        summary: "Battery-management firmware on RTOS; moving into AUTOSAR over the past year.",
        evidence: [
          { skill: "Embedded C", proof: "Strong; RTOS and drivers", verified: true },
          { skill: "CAN", proof: "Daily use", verified: true },
          { skill: "Classic AUTOSAR", proof: "One year", verified: false },
          { skill: "ISO 26262 exposure", proof: "Limited", verified: false },
        ],
        risks: ["Less AUTOSAR depth"],
        recruiterNote: "High-potential, lower cost, joins fast.",
      },
    ],
  },
  {
    family: "product",
    role: "Senior Product Manager (developer platform)",
    company: "Global SaaS GCC, Bengaluru",
    mustHaves: ["Technical product experience", "Discovery", "Metrics ownership", "Stakeholder management"],
    candidates: [
      {
        alias: "Candidate A",
        headline: "Senior PM, API platform",
        years: 8,
        location: "Bengaluru",
        noticeDays: 60,
        expectedCtcLpa: "55–60",
        fitScore: 88,
        summary: "Ex-engineer who owned a public API platform; led a pricing and rate-limit redesign with clear adoption metrics.",
        evidence: [
          { skill: "Technical product experience", proof: "Former backend engineer, 3 yrs", verified: true },
          { skill: "Discovery", proof: "Customer interview programme", verified: true },
          { skill: "Metrics ownership", proof: "Owned API adoption and churn", verified: true },
          { skill: "Stakeholder management", proof: "Cross-region launch", verified: true },
        ],
        risks: ["At the top of budget"],
        recruiterNote: "Engineers will trust this PM quickly.",
      },
    ],
  },
];

export function getSampleShortlist(family: RoleFamilySlug): SampleShortlist {
  return sampleShortlists.find((s) => s.family === family) ?? sampleShortlists[0];
}
