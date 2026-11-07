import Image from "next/image";
import type { TeamMember } from "@/content/types";
import { cn } from "@/lib/utils/cn";

/** Brand book: team photos are circles with a 4px ring cycling blue, violet, orange, teal, cyan. */
const rings = [
  "ring-brand-blue",
  "ring-brand-violet",
  "ring-brand-orange",
  "ring-brand-teal",
  "ring-brand-cyan",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

export function TeamPhoto({
  member,
  index,
  size = 160,
}: {
  member: TeamMember;
  index: number;
  size?: number;
}) {
  const ring = cn("rounded-full ring-4 ring-offset-4 ring-offset-surface", rings[index % rings.length]);
  return member.photo ? (
    <Image
      src={member.photo}
      alt={`${member.name}, ${member.title}`}
      width={size}
      height={size}
      className={cn("aspect-square object-cover", ring)}
      style={{ width: size, height: size }}
    />
  ) : (
    <span
      role="img"
      aria-label={`${member.name}, ${member.title} (photo coming soon)`}
      className={cn("bg-accent-soft text-accent font-display flex items-center justify-center font-bold", ring)}
      style={{ width: size, height: size, fontSize: size / 3.2 }}
    >
      {initials(member.name)}
    </span>
  );
}

/** Full cards with bios (About page). */
export function TeamGrid({ team }: { team: TeamMember[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((m, i) => (
        <li key={m.name} className="flex flex-col items-center text-center">
          <TeamPhoto member={m} index={i} />
          <p className="font-display mt-6 text-xl font-bold">{m.name}</p>
          <p className="text-accent text-sm font-semibold">{m.title}</p>
          <p className="text-muted mt-3 max-w-sm text-[15px]">{m.bio}</p>
        </li>
      ))}
    </ul>
  );
}

/** Compact strip: photo, name and title (home page). */
export function TeamStrip({ team }: { team: TeamMember[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
      {team.map((m, i) => (
        <li key={m.name} className="flex flex-col items-center text-center">
          <TeamPhoto member={m} index={i} size={112} />
          <p className="mt-5 font-bold">{m.name}</p>
          <p className="text-muted text-sm">{m.title}</p>
        </li>
      ))}
    </ul>
  );
}
