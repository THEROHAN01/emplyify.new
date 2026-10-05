import { Badge } from "@/components/ui/badge";

export const hiringSteps = [
  {
    title: "You brief us",
    sla: "2 minutes",
    who: "You",
    body: "Submit a role online or brief us on a 20-minute call. We confirm must-haves, budget and timeline in writing.",
  },
  {
    title: "AI searches and screens",
    sla: "0–48 hours",
    who: "AI + recruiter",
    body: "Our agents search our network and public profiles, rank matches against your must-haves and draft evidence. Recruiters run structured screens.",
  },
  {
    title: "A senior recruiter verifies",
    sla: "By 72 hours",
    who: "Human",
    body: "Every candidate is interviewed and signed off by a senior recruiter. You get three to five candidates, each with a dossier.",
  },
  {
    title: "You hire, we guarantee",
    sla: "90-day cover",
    who: "You + us",
    body: "We run scheduling, feedback and offer support. Pay only when the hire joins, with a 90-day free replacement.",
  },
];

export function HiringSteps() {
  return (
    <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {hiringSteps.map((s, i) => (
        <li key={s.title} className="relative rounded-[12px] border border-line bg-surface p-6">
          <span className="tabular font-mono text-sm font-bold text-accent">0{i + 1}</span>
          <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge tone="sla">{s.sla}</Badge>
            <Badge tone={s.who === "Human" ? "verified" : s.who.includes("AI") ? "ai" : "neutral"}>{s.who}</Badge>
          </div>
          <p className="mt-3 text-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
