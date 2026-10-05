import type { SampleCandidate, SampleShortlist } from "@/content/sample-shortlists";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

const initial = (alias: string) =>
  alias
    .replace(/^Candidate\s+/i, "")
    .slice(0, 1)
    .toUpperCase();

function Avatar({ alias, size = "md" }: { alias: string; size?: "sm" | "md" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "bg-accent-soft text-accent flex shrink-0 items-center justify-center rounded-full font-semibold",
        size === "md" ? "size-12 text-lg" : "size-9 text-sm",
      )}
    >
      {initial(alias)}
    </span>
  );
}

function FitScore({ score }: { score: number }) {
  return (
    <div className="text-right">
      <span className="tabular text-ink block text-2xl font-bold">{score}</span>
      <span className="text-muted text-xs">fit score</span>
    </div>
  );
}

/** Candidate profile card (anonymised sample): who, evidence per skill, notice/CTC, recruiter sign-off. */
export function ShortlistCard({
  candidate,
  role,
  className,
  headingLevel: Heading = "h3",
}: {
  candidate: SampleCandidate;
  role?: string;
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <article
      className={cn("border-line bg-surface rounded-2xl border p-6", className)}
      aria-label={`Sample candidate: ${candidate.alias}`}
    >
      <div className="flex items-start gap-4">
        <Avatar alias={candidate.alias} />
        <div className="min-w-0 flex-1">
          <Heading className="text-lg font-bold">{candidate.alias}</Heading>
          <p className="text-muted text-sm">
            {candidate.headline} · {candidate.years} yrs · {candidate.location}
          </p>
        </div>
        <FitScore score={candidate.fitScore} />
      </div>

      <p className="mt-5 text-[15px] leading-relaxed">{candidate.summary}</p>

      <div className="mt-5">
        <p className="text-muted mb-2 text-xs font-medium">Evidence{role ? ` for ${role}` : ""}</p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Evidence for must-have skills">
          {candidate.evidence.map((e) => (
            <li key={e.skill}>
              <Badge tone={e.verified ? "verified" : "pending"}>
                {e.skill}
                <span className="sr-only">
                  {e.verified ? " — verified" : " — partially evidenced"}
                </span>
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      <dl className="border-line mt-5 grid grid-cols-2 gap-3 border-t pt-4 text-sm">
        <div>
          <dt className="text-muted">Notice period</dt>
          <dd className="tabular font-semibold">{candidate.noticeDays} days</dd>
        </div>
        <div>
          <dt className="text-muted">Expected CTC</dt>
          <dd className="tabular font-semibold">₹{candidate.expectedCtcLpa} LPA</dd>
        </div>
      </dl>

      <p className="bg-bg mt-4 rounded-xl px-4 py-3 text-sm">
        <span className="text-signal font-semibold">Recruiter note · </span>
        {candidate.recruiterNote}
      </p>
    </article>
  );
}

/** Hero visual: a product-style window showing a sample shortlist. Labelled as a sample. */
export function ShortlistPreview({ shortlist }: { shortlist: SampleShortlist }) {
  return (
    <figure
      className="border-line bg-surface overflow-hidden rounded-2xl border shadow-[0_24px_60px_-28px_rgba(11,27,51,0.35)]"
      aria-label="Sample shortlist preview"
    >
      <div className="border-line flex items-center justify-between gap-3 border-b px-5 py-3.5">
        <div className="min-w-0">
          <p className="text-muted text-xs">Shortlist · sample</p>
          <p className="truncate text-sm font-semibold">{shortlist.role}</p>
        </div>
        <Badge tone="verified">Recruiter verified</Badge>
      </div>
      <ul className="divide-line divide-y">
        {shortlist.candidates.map((c) => (
          <li key={c.alias} className="flex items-center gap-3 px-5 py-4">
            <Avatar alias={c.alias} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{c.alias}</p>
              <p className="text-muted truncate text-xs">
                {c.headline} · {c.years} yrs · {c.noticeDays}d notice
              </p>
              <div className="mt-1.5 hidden flex-wrap gap-1 sm:flex">
                {c.evidence.slice(0, 3).map((e) => (
                  <span
                    key={e.skill}
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-medium",
                      e.verified ? "bg-signal-bg text-signal" : "bg-warn-bg text-warn",
                    )}
                  >
                    {e.skill}
                  </span>
                ))}
              </div>
            </div>
            <span className="tabular text-ink text-lg font-bold">{c.fitScore}</span>
          </li>
        ))}
      </ul>
      <figcaption className="bg-bg text-muted px-5 py-3 text-xs">
        Illustrative candidates. Real dossiers are shared only with candidate consent.
      </figcaption>
    </figure>
  );
}
