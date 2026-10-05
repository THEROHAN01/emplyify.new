import type { TeamMember } from "./types";

/**
 * Real people only (launch checklist: "Founder and team photos and bios live").
 * Add entries with photos under /public/team once approved; the About and
 * Contact pages render this list and hide the section while it is empty.
 */
export const team: TeamMember[] = [];

/** Recruiter desks used to name an owner on the brief confirmation page. */
export const recruiterDesks: Record<string, { name: string | null; desk: string }> = {
  "ai-ml": { name: null, desk: "AI/ML desk" },
  data: { name: null, desk: "Data desk" },
  "cloud-devops": { name: null, desk: "Cloud & DevOps desk" },
  "full-stack": { name: null, desk: "Product engineering desk" },
  embedded: { name: null, desk: "Embedded & automotive desk" },
  product: { name: null, desk: "Product desk" },
};
