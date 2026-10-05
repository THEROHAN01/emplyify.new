import Link from "next/link";
import { BriefForm } from "@/components/forms/brief-form";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/layout";
import type { RolePage } from "@/content/types";
import { getCaseStudiesFor, getCities, getJobs } from "@/lib/content";
import { briefFormProps } from "@/lib/content/forms";

const availabilityLabel = {
  high: "Good supply",
  moderate: "Moderate supply",
  scarce: "Scarce — plan early",
} as const;

export function RoleFacts({ role, cityName }: { role: RolePage; cityName?: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <p className="text-muted text-sm">Shortlist</p>
        <p className="tabular text-accent font-mono text-2xl font-bold">72 hours</p>
      </Card>
      <Card>
        <p className="text-muted text-sm">
          Typical time to hire{cityName ? ` in ${cityName}` : ""}
        </p>
        <p className="tabular font-mono text-2xl font-bold">
          {role.typicalTimeToHireDays.min}–{role.typicalTimeToHireDays.max} days
        </p>
      </Card>
      <Card>
        <p className="text-muted text-sm">Talent availability</p>
        <p className="mt-1">
          <Badge tone={role.availability === "scarce" ? "pending" : "verified"}>
            {availabilityLabel[role.availability]}
          </Badge>
        </p>
      </Card>
    </div>
  );
}

export function SkillsWeVet({ role }: { role: RolePage }) {
  return (
    <Section labelledBy="skills">
      <SectionHeading
        id="skills"
        eyebrow="Our screen"
        title={`Skills we vet for ${role.title.toLowerCase()}`}
        intro={role.intro}
      />
      <div className="border-line bg-surface overflow-x-auto rounded-[12px] border">
        <table className="w-full text-left">
          <thead>
            <tr className="border-line border-b">
              <th scope="col" className="px-6 py-3">
                Skill
              </th>
              <th scope="col" className="px-6 py-3">
                How we evidence it
              </th>
            </tr>
          </thead>
          <tbody>
            {role.skillsWeVet.map((s) => (
              <tr key={s.name} className="border-line border-b last:border-0">
                <th scope="row" className="px-6 py-3 font-semibold">
                  {s.name}
                </th>
                <td className="text-muted px-6 py-3">{s.how}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

export function InterviewLoop({ role }: { role: RolePage }) {
  return (
    <Section tone="surface" labelledBy="loop">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="loop"
            eyebrow="Sample interview loop"
            title="A loop that respects candidates' time"
            className="mb-6"
          />
          <ol className="space-y-3">
            {role.interviewLoop.map((s, i) => (
              <li key={s.stage} className="border-line bg-bg rounded-lg border p-4">
                <p className="font-semibold">
                  {i + 1}. {s.stage} <span className="text-muted font-normal">· {s.duration}</span>
                </p>
                <p className="text-muted text-sm">{s.focus}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Screening questions we ask</h2>
          <ul className="space-y-3">
            {role.screeningQuestions.map((q) => (
              <li key={q} className="border-line bg-bg rounded-lg border p-4">
                “{q}”
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function RoleLinks({ role, currentCity }: { role: RolePage; currentCity?: string }) {
  const caseStudy = getCaseStudiesFor({ family: role.family })[0];
  const jobs = getJobs({ family: role.family }).slice(0, 3);
  return (
    <Section labelledBy="related">
      <SectionHeading id="related" title="Related" />
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <h3 className="font-bold">By city</h3>
          <ul className="mt-3 space-y-2">
            {currentCity && (
              <li>
                <Link href={`/hire/${role.slug}`} className="text-accent hover:underline">
                  {role.title} across India
                </Link>
              </li>
            )}
            {getCities()
              .filter((c) => c.slug !== currentCity)
              .map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/hire/${role.slug}/${c.slug}`}
                    className="text-accent hover:underline"
                  >
                    Hire {role.title.toLowerCase()} in {c.name}
                  </Link>
                </li>
              ))}
          </ul>
        </Card>
        <Card>
          <h3 className="font-bold">Pricing</h3>
          <p className="text-muted mt-2">
            8.33–16.67% of fixed CTC by seniority, pay on hire, 90-day replacement.
          </p>
          <Link
            href="/pricing"
            className="text-accent mt-3 inline-block font-semibold hover:underline"
          >
            Fee calculator →
          </Link>
        </Card>
        <Card>
          <h3 className="font-bold">{caseStudy ? "Case study" : "Proof"}</h3>
          {caseStudy ? (
            <Link
              href={`/case-studies/${caseStudy.slug}`}
              className="text-accent mt-2 block hover:underline"
            >
              {caseStudy.headline}
            </Link>
          ) : (
            <>
              <p className="text-muted mt-2">
                See a sample {role.singular.toLowerCase()} shortlist with evidence per skill.
              </p>
              <Link
                href={`/sample-shortlist?family=${role.family}`}
                className="text-accent mt-3 inline-block font-semibold hover:underline"
              >
                Sample shortlist →
              </Link>
            </>
          )}
          {jobs.length > 0 && (
            <ul className="mt-4 space-y-1 text-sm">
              {jobs.map((j) => (
                <li key={j.slug}>
                  <Link href={`/jobs/${j.slug}`} className="hover:underline">
                    {j.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </Section>
  );
}

export function RoleBrief({
  role,
  location,
}: {
  role: RolePage;
  location?: "Pune" | "Bengaluru" | "Hyderabad";
}) {
  return (
    <Section tone="accent" labelledBy="brief">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading
          id="brief"
          eyebrow="Two-minute brief"
          title={`Hiring ${role.title.toLowerCase()}${location ? ` in ${location}` : ""}?`}
          intro="We've pre-filled the role. A recruiter replies within 4 business hours; your shortlist follows within 72 hours."
        />
        <BriefForm
          {...briefFormProps()}
          defaults={{ roleFamily: role.family, roleTitle: role.singular, location }}
          source={`role:${role.slug}`}
        />
      </div>
    </Section>
  );
}
