/**
 * Deterministic fallbacks used when the AI provider is not configured or
 * fails. They keep the features useful (and testable) without an API key.
 */
import { roles } from "@/content/roles";
import type { RoleFamilySlug, Seniority } from "@/content/types";

const SKILL_LEXICON = [
  "Python", "Java", "Go", "Rust", "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Angular", "Vue",
  "Spring Boot", "Django", "FastAPI", "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "Spark",
  "Airflow", "dbt", "Databricks", "Snowflake", "BigQuery", "AWS", "Azure", "GCP", "Kubernetes", "Docker",
  "Terraform", "Ansible", "Jenkins", "GitHub Actions", "Prometheus", "Grafana", "PyTorch", "TensorFlow",
  "scikit-learn", "LLM", "RAG", "NLP", "Computer Vision", "MLOps", "Embedded C", "C++", "AUTOSAR", "RTOS",
  "Embedded Linux", "CAN", "ISO 26262", "Microservices", "GraphQL", "REST", "System design",
];

const FAMILY_SIGNALS: Record<RoleFamilySlug, string[]> = {
  "ai-ml": ["machine learning", "ml engineer", "llm", "deep learning", "pytorch", "tensorflow", "data scientist", "nlp", "computer vision"],
  data: ["data engineer", "spark", "airflow", "etl", "warehouse", "lakehouse", "databricks", "snowflake", "dbt"],
  "cloud-devops": ["devops", "sre", "site reliability", "kubernetes", "terraform", "platform engineer", "infrastructure"],
  "full-stack": ["full stack", "full-stack", "frontend", "backend", "react", "node", "web developer", "software engineer"],
  embedded: ["embedded", "firmware", "autosar", "rtos", "microcontroller", "automotive", "can bus"],
  product: ["product manager", "product owner", "roadmap", "product management"],
};

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function extractSkills(text: string): string[] {
  const found: string[] = [];
  for (const skill of SKILL_LEXICON) {
    const re = new RegExp(`(^|[^a-z0-9])${escapeRe(skill.toLowerCase())}([^a-z0-9]|$)`, "i");
    if (re.test(text.toLowerCase())) found.push(skill);
  }
  return found;
}

export function detectFamily(text: string): RoleFamilySlug {
  const t = text.toLowerCase();
  let best: RoleFamilySlug = "full-stack";
  let bestHits = 0;
  for (const [family, signals] of Object.entries(FAMILY_SIGNALS) as [RoleFamilySlug, string[]][]) {
    const hits = signals.filter((s) => t.includes(s)).length;
    if (hits > bestHits) {
      best = family;
      bestHits = hits;
    }
  }
  return best;
}

export function detectSeniority(text: string): Seniority {
  const t = text.toLowerCase();
  const years = [...t.matchAll(/(\d{1,2})\s*\+?\s*(?:-|to|–)?\s*\d{0,2}\s*(?:years|yrs)/g)].map((m) => Number(m[1]));
  const minYears = years.length ? Math.min(...years) : undefined;
  if (/\b(head of|director|principal|staff|engineering manager|lead)\b/.test(t) || (minYears ?? 0) >= 10) return "lead";
  if (/\bsenior\b|\bsr\.?\b/.test(t) || (minYears ?? 0) >= 6) return "senior";
  if ((minYears ?? 3) >= 3) return "mid";
  return "junior";
}

function detectLocation(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("bengaluru") || t.includes("bangalore")) return "Bengaluru";
  if (t.includes("hyderabad")) return "Hyderabad";
  if (t.includes("pune")) return "Pune";
  if (t.includes("remote")) return "Remote (India)";
  return "Not specified";
}

function detectTitle(text: string): string {
  const firstLine = text.split("\n").map((l) => l.trim()).find((l) => l.length > 3 && l.length < 90);
  return firstLine?.replace(/^(job title|title|role|position)\s*[:\-–]\s*/i, "") ?? "Role from job description";
}

export function heuristicBrief(text: string) {
  const roleFamily = detectFamily(text);
  const seniority = detectSeniority(text);
  const location = detectLocation(text);
  const role = roles.find((r) => r.family === roleFamily)!;
  const band = role.salaryBands.find((b) => b.seniority === seniority)!;
  const mult = location === "Bengaluru" ? 1.08 : location === "Pune" ? 0.95 : 1;
  const skills = extractSkills(text);
  return {
    roleTitle: detectTitle(text),
    roleFamily,
    seniority,
    mustHaveSkills: skills.slice(0, 6),
    niceToHaveSkills: skills.slice(6, 10),
    location,
    suggestedBudgetMinLpa: Math.round(band.minLpa * mult),
    suggestedBudgetMaxLpa: Math.round(band.maxLpa * mult),
    summary: `A ${seniority}-level ${role.singular.toLowerCase()} role${location !== "Not specified" ? ` based in ${location}` : ""}. A recruiter will confirm must-haves and budget on your call.`,
    openQuestions: ["Which skills are true must-haves?", "What notice period can you accept?", "What does the interview loop look like?"],
    source: "heuristic" as const,
  };
}
