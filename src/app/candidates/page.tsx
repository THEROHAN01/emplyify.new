import Link from "next/link";
import { PipelineTracker } from "@/components/visuals/pipeline-tracker";
import { JobCard } from "@/components/marketing/job-card";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { ctas, site } from "@/content/site";
import { getJobs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "For engineers: get matched, prepped and kept in the loop",
  description:
    "Curated AI/ML, data, cloud, full-stack and embedded roles with salary bands. No spam calls, status updates at every stage and feedback on every application.",
  path: "/candidates",
});

const stages = ["Received", "Screened", "Shared (with your OK)", "Interview", "Outcome + feedback"];
const stageDetails = [
  "Confirmation email",
  "Recruiter call you book",
  "Only after you agree",
  "Prep for this exact loop",
  "A reason, whatever the result",
];

export default function CandidatesHub() {
  const jobs = getJobs().slice(0, 3);
  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: "For candidates", path: "/candidates" }]}
        eyebrow="For engineers"
        title="Get matched, prepped and kept in the loop."
        intro="Curated roles with the salary band upfront, no calls you didn't book, and a real answer on every application."
        actions={
          <>
            <ButtonLink href={ctas.joinNetwork.href} size="lg">
              {ctas.joinNetwork.label}
            </ButtonLink>
            <ButtonLink href={ctas.browseRoles.href} size="lg" variant="secondary">
              {ctas.browseRoles.label}
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="promises">
        <SectionHeading id="promises" title="Our promises to you" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Salary band on every role", "So you can decide before the first conversation."],
            ["No spam calls", "First contact by email or WhatsApp. Calls only in slots you book."],
            [
              `Updates within ${site.promises.candidateUpdateBusinessDays} business days`,
              `At every stage. If a process stalls for ${site.promises.autoCloseDays} days, we close it and tell you why.`,
            ],
            [
              "Your profile, your call",
              "We ask before sharing your profile with each employer, every time.",
            ],
          ].map(([t, d]) => (
            <Card key={t}>
              <h3 className="font-bold">{t}</h3>
              <p className="text-muted mt-2">{d}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="surface" labelledBy="stages">
        <SectionHeading
          id="stages"
          eyebrow="Always know where you stand"
          title="Every application moves through five visible stages"
        />
        <div className="border-line bg-surface rounded-2xl border p-6 sm:p-8">
          <p className="text-muted mb-6 text-sm font-medium">
            Example application · Senior ML Engineer
          </p>
          <PipelineTracker
            label="Example application status"
            current={2}
            steps={stages.map((label, i) => ({ label, detail: stageDetails[i] }))}
          />
        </div>
        <p className="text-muted mt-4">
          Updates arrive by email today; a live status portal and WhatsApp updates are coming next.
        </p>
      </Section>

      <Section labelledBy="tools">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <h2 id="tools" className="text-xl font-bold">
              Interview prep
            </h2>
            <p className="text-muted mt-2">
              Practice questions for the actual role, with feedback on your answers.
            </p>
            <Link
              href="/candidates/interview-prep"
              className="text-accent mt-4 inline-block font-semibold hover:underline"
            >
              Start practising →
            </Link>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Talent network</h2>
            <p className="text-muted mt-2">
              Tell us once what you want. We'll only reach out when a role fits.
            </p>
            <Link
              href="/candidates/join"
              className="text-accent mt-4 inline-block font-semibold hover:underline"
            >
              Join the talent network →
            </Link>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Your data</h2>
            <p className="text-muted mt-2">
              What we store, why, for how long — and how to see or delete it.
            </p>
            <Link
              href="/candidates/your-data"
              className="text-accent mt-4 inline-block font-semibold hover:underline"
            >
              How we treat your data →
            </Link>
          </Card>
        </div>
      </Section>

      <Section tone="surface" labelledBy="roles">
        <SectionHeading id="roles" title="Open roles" />
        {jobs.length > 0 ? (
          <div className="grid gap-3 lg:grid-cols-2">
            {jobs.map((j) => (
              <JobCard key={j.slug} job={j} />
            ))}
          </div>
        ) : (
          <p className="text-muted">
            No open roles are listed right now. Join the talent network and we'll contact you when
            one fits.
          </p>
        )}
        <ButtonLink href="/jobs" variant="secondary" className="mt-8">
          Browse roles
        </ButtonLink>
      </Section>
    </>
  );
}
