export const hiringSteps = [
  {
    title: "You brief us",
    sla: "2 minutes",
    body: "Submit a role online or brief us on a 20-minute call. We confirm must-haves, budget and timeline in writing.",
  },
  {
    title: "AI searches, recruiters screen",
    sla: "0–48 hours",
    body: "Our agents search our network and public profiles and rank matches against your must-haves. Recruiters run structured screens.",
  },
  {
    title: "A senior recruiter verifies",
    sla: "By 72 hours",
    body: "Every candidate is interviewed and signed off. You get three to five people, each with a written dossier.",
  },
  {
    title: "You hire, we guarantee",
    sla: "90-day cover",
    body: "We run scheduling, feedback and offer support. Pay only when the hire joins, with a free replacement for 90 days.",
  },
];

/** Numbered timeline. Horizontal on desktop, stacked on mobile. */
export function HiringSteps() {
  return (
    <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {hiringSteps.map((s, i) => (
        <li key={s.title} className="relative">
          <div className="flex items-center gap-3">
            <span className="bg-ink flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white">
              {i + 1}
            </span>
            <span aria-hidden className="bg-line hidden h-px flex-1 lg:block" />
          </div>
          <p className="text-accent mt-5 text-sm font-semibold">{s.sla}</p>
          <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
          <p className="text-muted mt-2">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
