/** "Human + AI, visibly": the two-column split of who does what. */
export const aiWork = [
  "Searches our network and public profiles against your must-haves",
  "Ranks matches and highlights evidence for each skill",
  "Parses CVs and drafts the dossier summary",
  "Turns a pasted JD into a structured brief",
  "Drafts outreach for recruiters to edit",
];

export const humanWork = [
  "Calibrates the brief with you and owns the search",
  "Interviews every shortlisted candidate",
  "Decides who goes on the shortlist and signs it off",
  "Reviews every rejection — AI never rejects alone",
  "Runs the offer, counter-offers and notice period",
];

function List({ items, tone }: { items: string[]; tone: "light" | "dark" }) {
  return (
    <ul className="mt-6 space-y-3.5">
      {items.map((w) => (
        <li key={w} className="flex gap-3">
          <span
            aria-hidden
            className={
              tone === "dark"
                ? "mt-2.5 size-1.5 shrink-0 rounded-full bg-white/60"
                : "bg-muted/60 mt-2.5 size-1.5 shrink-0 rounded-full"
            }
          />
          <span className={tone === "dark" ? "text-white/85" : "text-muted"}>{w}</span>
        </li>
      ))}
    </ul>
  );
}

export function AiHumanSplit() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="border-line bg-surface rounded-2xl border p-8">
        <p className="text-muted text-sm font-semibold">AI assists</p>
        <h3 className="mt-1 text-xl font-bold">What our agents do</h3>
        <List items={aiWork} tone="light" />
      </div>
      <div className="bg-navy rounded-2xl p-8 text-white">
        <p className="text-sm font-semibold text-white/70">People decide</p>
        <h3 className="mt-1 text-xl font-bold">What our recruiters own</h3>
        <List items={humanWork} tone="dark" />
      </div>
    </div>
  );
}
