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

export function AiHumanSplit() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-[12px] border border-line bg-surface p-6">
        <h3 className="flex items-center gap-2 text-lg font-bold">
          <span aria-hidden className="text-accent">✦</span> What AI does
        </h3>
        <ul className="mt-4 space-y-3 text-muted">
          {aiWork.map((w) => (
            <li key={w} className="flex gap-2">
              <span aria-hidden>–</span>
              {w}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[12px] border-2 border-signal bg-surface p-6">
        <h3 className="flex items-center gap-2 text-lg font-bold">
          <span aria-hidden className="text-signal">✓</span> What our recruiters decide
        </h3>
        <ul className="mt-4 space-y-3 text-muted">
          {humanWork.map((w) => (
            <li key={w} className="flex gap-2">
              <span aria-hidden>–</span>
              {w}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
