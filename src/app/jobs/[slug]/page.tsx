import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplyForm } from "@/components/forms/apply-form";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/layout";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { site } from "@/content/site";
import { cityName, getJob, getJobs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { jobPostingSchema } from "@/lib/seo/schema";
import { formatLongDate, formatLpaRange } from "@/lib/utils/format";

/** Jobs change often (ATS feed): re-render at most every 5 minutes, including 404s for closed roles. */
export const revalidate = 300;

export function generateStaticParams() {
  return getJobs().map((j) => ({ slug: j.slug }));
}

export async function generateMetadata(props: PageProps<"/jobs/[slug]">) {
  const { slug } = await props.params;
  const job = getJob(slug);
  if (!job) return {};
  return buildMetadata({
    title: `${job.title}, ${cityName(job.city)} — ${formatLpaRange(job.salary.minLpa, job.salary.maxLpa)}`,
    description: `${job.summary} ${job.workMode}, ${job.experienceYears.min}–${job.experienceYears.max} years. Apply in one step.`,
    path: `/jobs/${job.slug}`,
    noindex: job.status === "draft",
  });
}

export default async function JobPage(props: PageProps<"/jobs/[slug]">) {
  const { slug } = await props.params;
  const job = getJob(slug);
  if (!job) notFound();
  const location = cityName(job.city);

  return (
    <Container className="py-10 lg:py-14">
      <Breadcrumbs
        items={[
          { name: "Jobs", path: "/jobs" },
          { name: job.title, path: `/jobs/${job.slug}` },
        ]}
      />
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <article>
          <div className="flex flex-wrap gap-2">
            {job.status === "draft" && <Badge tone="draft">Draft preview — not a live role</Badge>}
            <Badge>{job.workMode}</Badge>
            <Badge>{location}</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{job.title}</h1>
          <p className="text-muted mt-2 text-lg">
            {job.company.disclosed
              ? job.company.descriptor
              : `${job.company.descriptor} — name shared after your first conversation`}{" "}
            · {job.company.size}
          </p>

          <dl className="border-line bg-surface mt-6 grid gap-4 rounded-[12px] border p-5 sm:grid-cols-4">
            <div>
              <dt className="text-muted text-sm">Salary (fixed)</dt>
              <dd className="tabular text-accent font-mono font-bold">
                {formatLpaRange(job.salary.minLpa, job.salary.maxLpa)}
              </dd>
            </div>
            <div>
              <dt className="text-muted text-sm">Experience</dt>
              <dd className="font-semibold">
                {job.experienceYears.min}–{job.experienceYears.max} yrs
              </dd>
            </div>
            <div>
              <dt className="text-muted text-sm">Process</dt>
              <dd className="font-semibold">~{job.expectedTimelineDays} days</dd>
            </div>
            <div>
              <dt className="text-muted text-sm">Notice accepted</dt>
              <dd className="font-semibold">Up to {job.noticePeriodMaxDays} days</dd>
            </div>
          </dl>

          <div className="prose-body mt-8">
            <p className="text-lg">{job.summary}</p>
            <h2>The team</h2>
            <p>{job.team}</p>
            <h2>Stack</h2>
            <ul className="flex !list-none flex-wrap gap-2 !pl-0">
              {job.stack.map((s) => (
                <li key={s}>
                  <Badge>{s}</Badge>
                </li>
              ))}
            </ul>
            <h2>What you'll do</h2>
            <ul>
              {job.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <h2>What you'll need</h2>
            <ul>
              {job.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            {job.niceToHave.length > 0 && (
              <>
                <h2>Nice to have</h2>
                <ul>
                  {job.niceToHave.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </>
            )}
            <h2>Interview stages</h2>
            <ol>
              {job.interviewStages.map((s) => (
                <li key={s.stage}>
                  {s.stage} <span className="text-muted">· {s.duration}</span>
                </li>
              ))}
            </ol>
            <p className="text-muted text-sm">
              Posted {formatLongDate(job.postedAt)}. You'll hear from us within{" "}
              {site.promises.candidateUpdateBusinessDays} business days at every stage.
            </p>
            <h2>Equal opportunity</h2>
            <p className="text-sm">
              Emplyify and our clients welcome applicants of every gender, caste, religion, age,
              disability, sexual orientation and background. We assess skills and evidence, never
              photos or personal characteristics. Ask us for any interview adjustments you need.
            </p>
          </div>
        </article>

        <aside>
          <Card className="lg:sticky lg:top-24">
            <h2 className="text-xl font-bold">Apply in one step</h2>
            <p className="text-muted mt-1 text-sm">CV or LinkedIn — whichever is quicker.</p>
            <div className="mt-6">
              <ApplyForm jobSlug={job.slug} jobTitle={job.title} roleFamily={job.roleFamily} />
            </div>
            <p className="text-muted mt-4 text-sm">
              Want to prepare first?{" "}
              <Link
                href={`/candidates/interview-prep?job=${job.slug}`}
                className="text-accent underline"
              >
                Practise for this role
              </Link>
            </p>
          </Card>
        </aside>
      </div>
      {job.status === "published" && <JsonLd data={jobPostingSchema(job)} />}
    </Container>
  );
}
