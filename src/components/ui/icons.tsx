import type { ReactNode, SVGProps } from "react";

/**
 * Line icon set: 24px grid, 1.75 stroke, round caps/joins, currentColor.
 * One family for services, role families and promises — keep additions in this style.
 */
function Icon({ children, ...props }: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export const icons = {
  // Services
  "tech-hiring": (
    <Icon>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5" />
      <path d="m15.5 9.5 2 2 4-4" />
    </Icon>
  ),
  "talent-pods": (
    <Icon>
      <circle cx="12" cy="7" r="3" />
      <circle cx="5" cy="10" r="2.25" />
      <circle cx="19" cy="10" r="2.25" />
      <path d="M6.5 20c.6-3.3 2.8-5 5.5-5s4.9 1.7 5.5 5M1.5 18c.3-1.8 1.4-3 3-3.3M22.5 18c-.3-1.8-1.4-3-3-3.3" />
    </Icon>
  ),
  "gcc-hiring-sprints": (
    <Icon>
      <path d="M3 21h18M5 21V9l7-5 7 5v12" />
      <path d="M9 21v-5h6v5M9 11h.01M15 11h.01" />
    </Icon>
  ),
  "leadership-hiring": (
    <Icon>
      <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
    </Icon>
  ),
  // Role families
  "ai-ml": (
    <Icon>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9.5 10h5v4h-5zM9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" />
    </Icon>
  ),
  data: (
    <Icon>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
      <path d="M4.5 5.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6M4.5 11.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
    </Icon>
  ),
  "cloud-devops": (
    <Icon>
      <path d="M7 18.5a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.4 1.6A3.7 3.7 0 0 1 17.5 18.5z" />
      <path d="m10.5 12.5-2 2 2 2M13.5 12.5l2 2-2 2" />
    </Icon>
  ),
  "full-stack": (
    <Icon>
      <rect x="2.5" y="4" width="19" height="14" rx="2" />
      <path d="M2.5 8h19M8 21h8M9.5 12.5l-2 1.5 2 1.5M14.5 12.5l2 1.5-2 1.5" />
    </Icon>
  ),
  embedded: (
    <Icon>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="9" cy="9" r="1.5" />
      <path d="M9 10.5V15h6M15 9h-3M4 15H2M4 9H2M22 9h-2M22 15h-2" />
    </Icon>
  ),
  product: (
    <Icon>
      <path d="M12 3v3M12 18v3M4.2 6.2l2.1 2.1M17.7 15.7l2.1 2.1M3 12h3M18 12h3M4.2 17.8l2.1-2.1M17.7 8.3l2.1-2.1" />
      <circle cx="12" cy="12" r="3.5" />
    </Icon>
  ),
  // Promises / general
  clock: (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Icon>
  ),
  rupee: (
    <Icon>
      <path d="M7 4.5h10M7 9h10M9.5 4.5c3.5 0 5 1.6 5 4.5s-2 4.5-5 4.5H7l7.5 6.5" />
    </Icon>
  ),
  shield: (
    <Icon>
      <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6z" />
      <path d="m9 12 2 2 4-4" />
    </Icon>
  ),
  chat: (
    <Icon>
      <path d="M20.5 12a8 8 0 0 1-11.8 7L3.5 20.5 5 15.8A8 8 0 1 1 20.5 12z" />
    </Icon>
  ),
  noCall: (
    <Icon>
      <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5V18a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
      <path d="m15 4 5 5M20 4l-5 5" />
    </Icon>
  ),
  target: (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </Icon>
  ),
  search: (
    <Icon>
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-4.5-4.5" />
    </Icon>
  ),
  dossier: (
    <Icon>
      <path d="M6 2.5h8.5L19 7v13.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-17a1 1 0 0 1 1-1z" />
      <path d="M14 2.5V7h5M8.5 12h7M8.5 15.5h7M8.5 8.5H11" />
    </Icon>
  ),
  scale: (
    <Icon>
      <path d="M12 3v18M7 21h10M4 7h16M4 7l-2.5 6a3 3 0 0 0 5 0zM20 7l-2.5 6a3 3 0 0 0 5 0z" />
    </Icon>
  ),
  lock: (
    <Icon>
      <rect x="4.5" y="10.5" width="15" height="10.5" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </Icon>
  ),
} as const;

export type IconName = keyof typeof icons;

/** Icon in a soft square tile, the standard anchor for cards. */
export function IconTile({
  name,
  tone = "accent",
}: {
  name: IconName;
  tone?: "accent" | "ink" | "signal";
}) {
  const tones = {
    accent: "bg-accent-soft text-accent",
    ink: "bg-bg text-ink",
    signal: "bg-signal-bg text-signal",
  };
  return (
    <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}>
      {icons[name]}
    </span>
  );
}
