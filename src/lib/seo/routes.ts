/**
 * Single registry of public, indexable routes. Feeds sitemap.xml, the HTML
 * sitemap page and the internal link checker test, so they never drift.
 */
import {
  getCaseStudies,
  getCities,
  getInsights,
  getJobs,
  getLegalDocs,
  getRoles,
  getServices,
} from "@/lib/content";

export interface RouteEntry {
  path: string;
  title: string;
  group: "Employers" | "GCCs" | "Roles" | "Candidates" | "Jobs" | "Company" | "Insights" | "Legal";
  priority: number;
  lastModified?: string;
}

export function allRoutes(): RouteEntry[] {
  const routes: RouteEntry[] = [
    { path: "/", title: "Home", group: "Employers", priority: 1 },
    { path: "/how-it-works", title: "How it works", group: "Employers", priority: 0.9 },
    { path: "/pricing", title: "Pricing", group: "Employers", priority: 0.9 },
    { path: "/submit-a-role", title: "Submit a role", group: "Employers", priority: 0.9 },
    { path: "/book-a-call", title: "Book a hiring call", group: "Employers", priority: 0.8 },
    { path: "/sample-shortlist", title: "Sample shortlist", group: "Employers", priority: 0.7 },
    { path: "/case-studies", title: "Case studies", group: "Employers", priority: 0.7 },
    ...getServices().map((s) => ({
      path: `/services/${s.slug}`,
      title: s.name,
      group: "Employers" as const,
      priority: 0.8,
    })),
    { path: "/hire", title: "Hire talent", group: "Roles", priority: 0.8 },
    ...getRoles().flatMap((r) => [
      {
        path: `/hire/${r.slug}`,
        title: `Hire ${r.title.toLowerCase()}`,
        group: "Roles" as const,
        priority: 0.8,
      },
      ...getCities().map((c) => ({
        path: `/hire/${r.slug}/${c.slug}`,
        title: `Hire ${r.title.toLowerCase()} in ${c.name}`,
        group: "Roles" as const,
        priority: 0.7,
      })),
    ]),
    { path: "/gcc", title: "For GCCs", group: "GCCs", priority: 0.8 },
    ...getCities().map((c) => ({
      path: `/gcc/${c.slug}`,
      title: `GCC hiring in ${c.name}`,
      group: "GCCs" as const,
      priority: 0.7,
    })),
    ...getCaseStudies()
      .filter((c) => c.status === "published")
      .map((c) => ({
        path: `/case-studies/${c.slug}`,
        title: c.headline,
        group: "Employers" as const,
        priority: 0.6,
        lastModified: c.publishedAt,
      })),
    { path: "/candidates", title: "For candidates", group: "Candidates", priority: 0.7 },
    {
      path: "/candidates/join",
      title: "Join the talent network",
      group: "Candidates",
      priority: 0.7,
    },
    {
      path: "/candidates/interview-prep",
      title: "Interview prep",
      group: "Candidates",
      priority: 0.6,
    },
    {
      path: "/candidates/your-data",
      title: "How we treat your data",
      group: "Candidates",
      priority: 0.4,
    },
    { path: "/jobs", title: "Jobs", group: "Jobs", priority: 0.8 },
    ...getJobs()
      .filter((j) => j.status === "published")
      .map((j) => ({
        path: `/jobs/${j.slug}`,
        title: j.title,
        group: "Jobs" as const,
        priority: 0.6,
        lastModified: j.postedAt,
      })),
    { path: "/insights", title: "Insights", group: "Insights", priority: 0.6 },
    ...getInsights()
      .filter((i) => i.status === "published")
      .map((i) => ({
        path: `/insights/${i.slug}`,
        title: i.title,
        group: "Insights" as const,
        priority: 0.6,
        lastModified: i.publishedAt,
      })),
    { path: "/about", title: "About", group: "Company", priority: 0.5 },
    {
      path: "/about/responsible-ai",
      title: "Responsible AI policy",
      group: "Company",
      priority: 0.4,
    },
    { path: "/contact", title: "Contact", group: "Company", priority: 0.5 },
    { path: "/site-map", title: "Sitemap", group: "Company", priority: 0.2 },
    ...getLegalDocs().map((d) => ({
      path: `/legal/${d.slug}`,
      title: d.title,
      group: "Legal" as const,
      priority: 0.2,
      lastModified: d.updatedAt,
    })),
  ];
  return routes;
}
