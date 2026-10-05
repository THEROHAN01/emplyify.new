import { roleFamilies, roles } from "@/content/roles";
import type { RoleFamilySlug } from "@/content/types";
import { getJobs } from ".";

/** Server-side props for client forms, so full content never ships to the browser. */
const skillSuggestions: Record<RoleFamilySlug, string[]> = {
  "ai-ml": ["Python", "PyTorch", "LLM applications", "RAG", "MLOps", "AWS SageMaker", "Evaluation"],
  data: ["SQL", "Spark", "Databricks", "Airflow", "dbt", "Snowflake", "Kafka"],
  "cloud-devops": ["Kubernetes", "Terraform", "AWS", "CI/CD", "Prometheus", "Azure", "Linux"],
  "full-stack": [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Java",
    "PostgreSQL",
    "System design",
  ],
  embedded: ["Embedded C", "C++", "Classic AUTOSAR", "CAN", "RTOS", "Embedded Linux", "ISO 26262"],
  product: [
    "B2B SaaS",
    "Discovery",
    "Roadmapping",
    "SQL",
    "API products",
    "Stakeholder management",
  ],
};

export function familyOptions() {
  return roleFamilies.map((f) => ({ value: f.slug, label: f.name }));
}

export function briefFormProps() {
  return { families: familyOptions(), skillSuggestions };
}

export function calculatorFamilies() {
  return roleFamilies.map((f) => {
    const role = roles.find((r) => r.family === f.slug)!;
    return {
      value: f.slug,
      label: f.name,
      availability: role.availability,
      days: `${role.typicalTimeToHireDays.min}–${role.typicalTimeToHireDays.max} days`,
    };
  });
}

export function prepJobOptions() {
  return getJobs().map((j) => ({
    value: j.slug,
    label: j.title,
    family: j.roleFamily,
    seniority: j.seniority,
  }));
}
