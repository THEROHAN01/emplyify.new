/**
 * Content repository. Pages read content only through these functions, so
 * swapping the local files for Sanity (or the ATS for jobs) is a change in
 * this folder alone. All functions are synchronous today; keep call sites
 * tolerant of a future async switch by wrapping in server components.
 */
import { env } from "@/lib/env";
import { caseStudies } from "@/content/case-studies";
import { cities } from "@/content/cities";
import { insights } from "@/content/insights";
import { jobs } from "@/content/jobs";
import { legalDocs } from "@/content/legal";
import { roleFamilies, roles } from "@/content/roles";
import { services } from "@/content/services";
import type { CitySlug, PublishStatus, RoleFamilySlug, SalaryBand } from "@/content/types";

export function isVisible(item: { status: PublishStatus }, preview = env.contentPreview): boolean {
  return item.status === "published" || preview;
}

// Services
export const getServices = () => services;
export const getService = (slug: string) => services.find((s) => s.slug === slug);

// Roles
export const getRoleFamilies = () => roleFamilies;
export const getRoleFamily = (slug: RoleFamilySlug) => roleFamilies.find((f) => f.slug === slug);
export const getRoles = () => roles;
export const getRole = (slug: string) => roles.find((r) => r.slug === slug);
export const getRoleByFamily = (family: RoleFamilySlug) => roles.find((r) => r.family === family);

// Cities
export const getCities = () => cities;
export const getCity = (slug: string) => cities.find((c) => c.slug === slug);

/** Indicative city band: national baseline × city index, rounded to whole LPA. */
export function citySalaryBands(bands: SalaryBand[], city: { salaryIndex: number }): SalaryBand[] {
  return bands.map((b) => ({
    ...b,
    minLpa: Math.round(b.minLpa * city.salaryIndex),
    maxLpa: Math.round(b.maxLpa * city.salaryIndex),
  }));
}

// Case studies
export const getCaseStudies = () => caseStudies.filter((c) => isVisible(c));
export const getCaseStudy = (slug: string) => getCaseStudies().find((c) => c.slug === slug);
export const getCaseStudiesFor = (filter: { family?: RoleFamilySlug }) =>
  getCaseStudies().filter((c) => !filter.family || c.roleFamily === filter.family);

// Jobs
export function getJobs(filter: { family?: RoleFamilySlug; city?: CitySlug | "remote" } = {}) {
  return jobs
    .filter((j) => isVisible(j))
    .filter((j) => !filter.family || j.roleFamily === filter.family)
    .filter((j) => !filter.city || j.city === filter.city)
    .sort((a, b) => b.postedAt.localeCompare(a.postedAt));
}
export const getJob = (slug: string) => getJobs().find((j) => j.slug === slug);

// Insights
export const getInsights = () =>
  insights.filter((i) => isVisible(i)).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
export const getInsight = (slug: string) => getInsights().find((i) => i.slug === slug);

// Legal
export const getLegalDocs = () => legalDocs;
export const getLegalDoc = (slug: string) => legalDocs.find((d) => d.slug === slug);

export function cityName(slug: CitySlug | "remote"): string {
  return slug === "remote" ? "Remote" : (getCity(slug)?.name ?? slug);
}
