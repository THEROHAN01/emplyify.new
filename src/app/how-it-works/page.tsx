import { AiHumanSplit } from "@/components/marketing/ai-split";
import { FinalCta } from "@/components/marketing/cta-band";
import { ProcessShowcase } from "@/components/visuals/process-showcase";
import { PipelineTracker } from "@/components/visuals/pipeline-tracker";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { Stat } from "@/components/ui/stat";
import { proofMetrics } from "@/content/metrics";
import { ctas, site } from "@/content/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "How it works",
  description:
    "From brief to hire: the SLA for each step, exactly what AI does and what recruiters decide, and a sample shortlist dossier.",
  path: "/how-it-works",
});

const slaTable = [
  { step: "Confirmation email with next steps", sla: "Within 2 minutes" },
  {
    step: "Recruiter reply to confirm the brief",
    sla: `Within ${site.promises.replyBusinessHours} business hours`,
  },
  {
    step: "Verified shortlist of 3–5 candidates",
    sla: `Within ${site.promises.shortlistHours} hours of confirmed brief`,
  },
  { step: "Interview feedback chased", sla: "Within 48 hours of each interview" },
  {
    step: "Candidate status updates",
    sla: `Every ${site.promises.candidateUpdateBusinessDays} business days, at every stage`,
  },
  {
    step: "Replacement if a hire leaves",
    sla: `Within ${site.promises.replacementDays} days of joining, free`,
  },
];

const qualityMetrics = [
  { name: "Brief → shortlist time", detail: "Median hours, published once we have 10 shortlists." },
  {
    name: "Shortlist → interview rate",
    detail: "Share of shortlisted candidates you choose to interview.",
  },
  { name: "Offer acceptance", detail: "Share of offers accepted, and why candidates declined." },
  { name: "90-day retention", detail: "Share of hires still in role after 90 days." },
  {
    name: "Candidate NPS",
    detail: "Asked after every application, whatever the outcome. Target ≥ 40.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: "How it works", path: "/how-it-works" }]}
        eyebrow="How it works"
        title="AI does the searching. Recruiters vouch for every shortlist."
        intro="Four steps, each with a written SLA. Here's exactly what happens after you submit a role."
        actions={
          <>
            <ButtonLink href={ctas.submitRole.href} size="lg">
              {ctas.submitRole.label}
            </ButtonLink>
            <ButtonLink href="/sample-shortlist" size="lg" variant="secondary">
              View a sample shortlist
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="steps">
        <SectionHeading id="steps" title="The four steps" />
        <ProcessShowcase />
      </Section>

      <Section tone="surface" labelledBy="slas">
        <SectionHeading
          id="slas"
          eyebrow="Service levels"
          title="Promises we put in writing"
          intro="Every role moves through the same visible pipeline. This is what a search looks like on day three."
        />
        <div className="border-line bg-surface mb-10 rounded-2xl border p-6 sm:p-8">
          <p className="text-muted mb-6 text-sm font-medium">
            Example pipeline · Senior Data Engineer
          </p>
          <PipelineTracker
            label="Example hiring pipeline"
            current={2}
            steps={[
              { label: "Brief confirmed", detail: "Within 4 business hours" },
              { label: "Search and screen", detail: "0–48 hours" },
              { label: "Shortlist sent", detail: "By 72 hours" },
              { label: "Interviews", detail: "Feedback chased in 48h" },
              { label: "Offer and joining", detail: "90-day cover starts" },
            ]}
          />
        </div>
        <div className="border-line bg-surface overflow-x-auto rounded-2xl border">
          <table className="w-full text-left">
            <thead>
              <tr className="border-line border-b">
                <th scope="col" className="px-6 py-3">
                  What
                </th>
                <th scope="col" className="px-6 py-3">
                  When
                </th>
              </tr>
            </thead>
            <tbody>
              {slaTable.map((r) => (
                <tr key={r.step} className="border-line border-b last:border-0">
                  <td className="px-6 py-3">{r.step}</td>
                  <td className="px-6 py-3 font-semibold">{r.sla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section labelledBy="split">
        <SectionHeading
          id="split"
          eyebrow="Human + AI"
          title="Who does what"
          intro="AI makes us fast. People make the decisions that matter."
        />
        <AiHumanSplit />
      </Section>

      <Section tone="surface" labelledBy="dossier">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            id="dossier"
            eyebrow="What you receive"
            title="A dossier, not a CV dump"
            intro="For every candidate: a fit summary, evidence for each must-have, notice period and CTC, risks, and the recruiter's note."
            className="mb-0"
          />
          <Card>
            <ul className="space-y-3">
              {[
                "Fit score against your must-haves",
                "Evidence per skill — verified or partially evidenced",
                "Notice period, expected CTC and location",
                "Honest risks: counter-offers, relocation, gaps",
                "Recruiter sign-off with a note on how to interview",
              ].map((x) => (
                <li key={x} className="flex gap-2">
                  <span aria-hidden className="text-signal">
                    ✓
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <ButtonLink href="/sample-shortlist" className="mt-6">
              View a sample shortlist
            </ButtonLink>
          </Card>
        </div>
      </Section>

      <Section labelledBy="quality">
        <SectionHeading
          id="quality"
          eyebrow="Quality"
          title="The metrics we track — and will publish"
          intro="We publish numbers only when they're real. Each one states how it's measured."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {proofMetrics.map((m) => (
            <Card key={m.id}>
              <Stat value={m.value} label={m.label} footnote={m.method} pending={m.pending} />
            </Card>
          ))}
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {qualityMetrics.map((q) => (
            <li key={q.name} className="border-line bg-surface rounded-lg border px-4 py-3">
              <strong>{q.name}</strong> <span className="text-muted">— {q.detail}</span>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta />
    </>
  );
}
