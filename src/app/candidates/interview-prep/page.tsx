import { InterviewPrep } from "@/components/forms/interview-prep";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { familyOptions, prepJobOptions } from "@/lib/content/forms";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "AI interview prep for tech roles",
  description:
    "Practise interview questions for the real role you're applying to — AI/ML, data, cloud, full-stack, embedded or product — and get feedback on your answers.",
  path: "/candidates/interview-prep",
});

export default async function InterviewPrepPage(props: PageProps<"/candidates/interview-prep">) {
  const sp = await props.searchParams;
  const jobs = prepJobOptions();
  const job = jobs.find((j) => j.value === sp.job);
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { name: "For candidates", path: "/candidates" },
          { name: "Interview prep", path: "/candidates/interview-prep" },
        ]}
        eyebrow="Interview prep"
        title="Practise for the interview you'll actually have"
        intro={
          <>
            Questions tied to the role and level, plus feedback on your answers.{" "}
            <Badge tone="ai">AI-assisted</Badge>{" "}
            <span className="text-sm">Answers are not stored or shared with employers.</span>
          </>
        }
      />
      <Container className="py-12">
        <InterviewPrep
          families={familyOptions()}
          jobs={jobs}
          defaults={
            job ? { family: job.family, seniority: job.seniority, jobSlug: job.value } : undefined
          }
        />
      </Container>
    </>
  );
}
