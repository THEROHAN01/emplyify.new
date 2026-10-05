import type { CaseStudy } from "./types";

/**
 * Named, client-approved case studies only. The playbook ships these after
 * the first three clients; until then pages show an honest empty state and
 * point to the sample shortlist. Never add placeholder testimonials.
 */
export const caseStudies: CaseStudy[] = [];
