import { notFound } from "next/navigation";
import { ConversionEvent } from "@/components/analytics/conversion-event";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { site } from "@/content/site";
import { getJob } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Application received",
  description: "Your application has been received.",
  path: "/jobs/applied",
  noindex: true,
});

export default async function AppliedPage(props: PageProps<"/jobs/[slug]/applied">) {
  const { slug } = await props.params;
  const sp = await props.searchParams;
  const job = getJob(slug);
  if (!job) notFound();
  const ref = typeof sp.ref === "string" ? sp.ref.slice(0, 20) : null;
  const stages = [
    "Received",
    "Screened",
    "Shared with employer (only with your OK)",
    "Interview",
    "Outcome + feedback",
  ];

  return (
    <Container className="py-16 lg:py-24">
      <ConversionEvent
        name="thank_you_viewed"
        props={{ page: "/jobs/applied", kind: "job_apply" }}
      />
      <div className="mx-auto max-w-2xl">
        <Badge tone="verified">Application received</Badge>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
          Thanks — you've applied for {job.title}.
        </h1>
        {ref && (
          <p className="text-muted mt-3 text-lg">
            Reference <span className="text-ink font-mono font-bold">{ref}</span>. A confirmation
            email is on its way.
          </p>
        )}
        <ol className="mt-8 space-y-2" aria-label="Application status">
          {stages.map((s, i) => (
            <li
              key={s}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${i === 0 ? "border-signal bg-signal-bg" : "border-line bg-surface text-muted"}`}
            >
              <span className="tabular font-mono font-bold">{i + 1}</span>
              {s}
              {i === 0 && <span className="text-signal ml-auto text-sm font-semibold">Now</span>}
            </li>
          ))}
        </ol>
        <p className="text-muted mt-6">
          You'll hear from us within {site.promises.candidateUpdateBusinessDays} business days,
          whatever the answer.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={`/candidates/interview-prep?job=${job.slug}`}>
            Prepare for this interview
          </ButtonLink>
          <ButtonLink href="/jobs" variant="secondary">
            Browse more roles
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
