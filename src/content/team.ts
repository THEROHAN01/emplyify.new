import type { TeamMember } from "./types";

/**
 * The team, in the order set in the Business Document ("Team and leadership").
 * Square headshots live in /public/team; a member without a photo shows
 * initials until one is supplied.
 */
export const team: TeamMember[] = [
  {
    name: "Suraj Patil",
    title: "Founder & Head – Staffing Solutions",
    bio: "A recruitment professional with over 6 years of experience in Talent Acquisition. He brings expertise in understanding client hiring requirements, talent sourcing and recruitment strategy, with a focus on building effective talent connections.",
    photo: "/team/suraj-patil.jpg",
  },
  {
    name: "Rohan Salunkhe",
    title: "Co-Founder & Head – HR Intelligence",
    bio: "A key member of the founding team, responsible for strengthening the organisation's hiring intelligence approach. He focuses on talent insights, recruitment strategy and identifying effective ways to address evolving hiring requirements.",
    photo: "/team/rohan-salunkhe.jpg",
  },
  {
    name: "Rajan Darekar",
    title: "Head – HR Strategies",
    bio: "An HR professional with over 15 years of experience in Human Resources. He brings extensive industry knowledge and experience in HR practices, workforce management and people-related business requirements.",
    photo: "/team/rajan-darekar.jpg",
  },
  {
    name: "Vishal Vishwakarma",
    title: "Business Specialist & Recruitment Lead",
    bio: "A business development and recruitment professional involved in building client relationships and managing recruitment requirements. He works closely with organisations to understand their hiring needs and connect them with relevant talent.",
    photo: "/team/vishal-vishwakarma.jpg",
  },
  {
    name: "Mayuri Patil",
    title: "Recruitment Specialist",
    bio: "An experienced recruitment professional with over 4 years of experience in recruitment. She brings expertise in candidate sourcing, profile screening and recruitment coordination, supporting hiring requirements across different roles.",
  },
];

/** Recruiter desks used to name an owner on the brief confirmation page. */
export const recruiterDesks: Record<string, { name: string | null; desk: string }> = {
  "ai-ml": { name: null, desk: "AI/ML desk" },
  data: { name: null, desk: "Data desk" },
  "cloud-devops": { name: null, desk: "Cloud & DevOps desk" },
  "full-stack": { name: null, desk: "Product engineering desk" },
  embedded: { name: null, desk: "Embedded & automotive desk" },
  product: { name: null, desk: "Product desk" },
};
