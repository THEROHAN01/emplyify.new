import { roleFamilies, roles } from "./roles";
import { services } from "./services";
import { cities } from "./cities";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export const hireMenu = {
  services: services.map((s) => ({
    label: s.name,
    href: `/services/${s.slug}`,
    description: s.outcome,
  })),
  roles: roleFamilies.map((f) => {
    const role = roles.find((r) => r.family === f.slug)!;
    return { label: f.name, href: `/hire/${role.slug}`, description: f.blurb };
  }),
};

export const gccMenu: NavLink[] = [
  {
    label: "GCC hiring overview",
    href: "/gcc",
    description: "Pods, sprints and leadership for GCCs",
  },
  ...cities.map((c) => ({ label: `GCC hiring in ${c.name}`, href: `/gcc/${c.slug}` })),
  { label: "Hiring Sprints", href: "/services/gcc-hiring-sprints" },
];

export const primaryNav: NavLink[] = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Hire",
    links: [
      ...services.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
      { label: "All role families", href: "/hire" },
      { label: "Pricing", href: "/pricing" },
      { label: "Submit a role", href: "/submit-a-role" },
    ],
  },
  {
    heading: "GCCs",
    links: [
      { label: "For GCCs", href: "/gcc" },
      ...cities.map((c) => ({ label: `GCC hiring in ${c.name}`, href: `/gcc/${c.slug}` })),
    ],
  },
  {
    heading: "Candidates",
    links: [
      { label: "For candidates", href: "/candidates" },
      { label: "Browse roles", href: "/jobs" },
      { label: "Join the talent network", href: "/candidates/join" },
      { label: "Interview prep", href: "/candidates/interview-prep" },
      { label: "How we treat your data", href: "/candidates/your-data" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Sample shortlist", href: "/sample-shortlist" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Insights", href: "/insights" },
      { label: "Responsible AI", href: "/about/responsible-ai" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy notice", href: "/legal/privacy" },
      { label: "Terms of service", href: "/legal/terms" },
      { label: "Candidate consent", href: "/legal/candidate-consent" },
      { label: "Cookie policy", href: "/legal/cookies" },
      { label: "Grievance officer", href: "/legal/grievance" },
      { label: "Sitemap", href: "/site-map" },
    ],
  },
];
