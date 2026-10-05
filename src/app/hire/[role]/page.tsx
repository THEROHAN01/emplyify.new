import { notFound } from "next/navigation";
import {
  InterviewLoop,
  RoleBrief,
  RoleFacts,
  RoleLinks,
  SkillsWeVet,
} from "@/components/marketing/role-sections";
import { SALARY_FOOTNOTE, SalaryTable } from "@/components/marketing/salary-table";
import { ButtonLink } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq";
import { Section, SectionHeading } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { citySalaryBands, getCities, getRole, getRoles } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getRoles().map((r) => ({ role: r.slug }));
}

export async function generateMetadata(props: PageProps<"/hire/[role]">) {
  const { role: slug } = await props.params;
  const role = getRole(slug);
  if (!role) return {};
  return buildMetadata({
    title: `Hire ${role.title.toLowerCase()} in India`,
    description: `${role.shortDescription} Vetted shortlist in 72 hours, salary bands for Pune, Bengaluru and Hyderabad, and published fees.`,
    path: `/hire/${role.slug}`,
  });
}

export default async function RolePageView(props: PageProps<"/hire/[role]">) {
  const { role: slug } = await props.params;
  const role = getRole(slug);
  if (!role) notFound();
  const cities = getCities();

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { name: "Hire talent", path: "/hire" },
          { name: role.title, path: `/hire/${role.slug}` },
        ]}
        eyebrow="Hire"
        title={`Hire ${role.title.toLowerCase()}, shortlisted in 72 hours`}
        intro={role.shortDescription}
        actions={
          <>
            <ButtonLink href="#brief" size="lg">
              Submit a role
            </ButtonLink>
            <ButtonLink href="/book-a-call" size="lg" variant="secondary">
              Book a hiring call
            </ButtonLink>
          </>
        }
      />
      <Section labelledBy="facts" className="pb-0 lg:pb-0">
        <h2 id="facts" className="sr-only">
          Key facts
        </h2>
        <RoleFacts role={role} />
      </Section>
      <SkillsWeVet role={role} />
      <Section tone="surface" labelledBy="salary">
        <SectionHeading
          id="salary"
          eyebrow="Salary bands"
          title={`${role.title} salaries by city`}
          intro="Fixed annual CTC by experience. Use these to sanity-check your budget before you brief us."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {cities.map((c) => (
            <div key={c.slug}>
              <h3 className="mb-3 text-lg font-bold">{c.name}</h3>
              <SalaryTable
                bands={citySalaryBands(role.salaryBands, c)}
                caption={`${role.title}, ${c.name}`}
              />
            </div>
          ))}
        </div>
        <p className="text-muted mt-4 text-sm">{SALARY_FOOTNOTE}</p>
      </Section>
      <InterviewLoop role={role} />
      <Section labelledBy="faq">
        <SectionHeading id="faq" title={`Hiring ${role.title.toLowerCase()}: questions`} />
        <div className="max-w-3xl">
          <FaqList faqs={role.faqs} />
        </div>
      </Section>
      <RoleBrief role={role} />
      <RoleLinks role={role} />
    </>
  );
}
