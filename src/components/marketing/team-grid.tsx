import Image from "next/image";
import type { TeamMember } from "@/content/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

/** Editorial team grid: square photos in bordered cells, name in serif, title as a label. */
export function TeamGrid({ team, bios = true }: { team: TeamMember[]; bios?: boolean }) {
  return (
    <ul className="border-line grid border-t border-l sm:grid-cols-2 lg:grid-cols-3">
      {team.map((m) => (
        <li key={m.name} className="border-line group border-r border-b p-5">
          <div className="bg-bg aspect-square overflow-hidden">
            {m.photo ? (
              <Image
                src={m.photo}
                alt={`${m.name}, ${m.title}`}
                width={480}
                height={480}
                className="size-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
              />
            ) : (
              <span
                role="img"
                aria-label={`${m.name}, ${m.title}`}
                className="font-display text-accent flex size-full items-center justify-center text-7xl"
              >
                {initials(m.name)}
              </span>
            )}
          </div>
          <p className="font-display mt-6 text-3xl">{m.name}</p>
          <p className="label text-accent mt-2 leading-relaxed">{m.title}</p>
          {bios && <p className="text-muted mt-4 text-[15px]">{m.bio}</p>}
        </li>
      ))}
    </ul>
  );
}
