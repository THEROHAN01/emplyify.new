import type { SampleCandidate } from "@/content/sample-shortlists";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

/** Signature UI: candidate summary, fit score and evidence chips. Always labelled SAMPLE. */
export function ShortlistCard({
  candidate,
  role,
  compact = false,
  className,
  headingLevel: Heading = "h3",
}: {
  candidate: SampleCandidate;
  role?: string;
  compact?: boolean;
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <article
      className={cn("border-line bg-surface rounded-[12px] border p-5 shadow-sm", className)}
      aria-label={`Sample shortlist card: ${candidate.alias}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-muted text-sm font-semibold tracking-wider uppercase">
            Sample · {role ?? "Shortlist"}
          </p>
          <Heading className="mt-1 text-lg font-bold">{candidate.alias}</Heading>
          <p className="text-muted text-sm">
            {candidate.headline} · {candidate.years} yrs · {candidate.location}
          </p>
        </div>
        <div className="text-right">
          <span className="tabular text-accent block font-mono text-3xl font-bold">
            {candidate.fitScore}
          </span>
          <span className="text-muted text-sm">fit score</span>
        </div>
      </div>

      {!compact && <p className="mt-4 text-sm">{candidate.summary}</p>}

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Evidence for must-have skills">
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

      <dl className="border-line mt-4 grid grid-cols-2 gap-3 border-t pt-4 text-sm">
        <div>
          <dt className="text-muted">Notice</dt>
          <dd className="tabular font-mono font-semibold">{candidate.noticeDays} days</dd>
        </div>
        <div>
          <dt className="text-muted">Expected CTC</dt>
          <dd className="tabular font-mono font-semibold">₹{candidate.expectedCtcLpa} LPA</dd>
        </div>
      </dl>

      <div className="bg-signal-bg text-signal mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
        <span aria-hidden>✓</span>
        <span>
          <strong>Recruiter verified.</strong>{" "}
          {compact ? "Interviewed and signed off." : candidate.recruiterNote}
        </span>
      </div>
    </article>
  );
}
