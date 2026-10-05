import Link from "next/link";
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
import { Card } from "@/components/ui/card";
import { FaqList } from "@/components/ui/faq";
import { Section, SectionHeading } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { citySalaryBands, getCities, getCity, getRole, getRoles } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const dynamicParams = false;

/** 6 role families × 3 cities = 18 programmatic pages, each with city-specific data. */
export function generateStaticParams() {
  return getRoles().flatMap((r) => getCities().map((c) => ({ role: r.slug, city: c.slug })));
}

export async function generateMetadata(props: PageProps<"/hire/[role]/[city]">) {
  const { role: rs, city: cs } = await props.params;
  const role = getRole(rs);
  const city = getCity(cs);
  if (!role || !city) return {};
  return buildMetadata({
    title: `Hire ${role.title.toLowerCase()} in ${city.name}`,
    description: `Hire ${role.title.toLowerCase()} in ${city.name}: ${city.name} salary bands, notice-period norms, hiring clusters and a vetted shortlist in 72 hours.`,
    path: `/hire/${role.slug}/${city.slug}`,
  });
}

export default async function RoleCityPage(props: PageProps<"/hire/[role]/[city]">) {
  const { role: rs, city: cs } = await props.params;
  const role = getRole(rs);
  const city = getCity(cs);
  if (!role || !city) notFound();

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { name: "Hire talent", path: "/hire" },
          { name: role.title, path: `/hire/${role.slug}` },
          { name: city.name, path: `/hire/${role.slug}/${city.slug}` },
        ]}
        eyebrow={`${city.name}, ${city.state}`}
        title={`Hire ${role.title.toLowerCase()} in ${city.name}`}
        intro={city.talentSupply}
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
        <RoleFacts role={role} cityName={city.name} />
      </Section>
      <Section labelledBy="salary">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading
              id="salary"
              eyebrow="Salary bands"
              title={`${role.title} salaries in ${city.name}`}
              className="mb-6"
            />
            <SalaryTable
              bands={citySalaryBands(role.salaryBands, city)}
              caption={`${role.title}, ${city.name} — fixed annual CTC`}
            />
            <p className="text-muted mt-3 text-sm">{SALARY_FOOTNOTE}</p>
          </div>
          <div className="space-y-4">
            <Card>
              <h3 className="font-bold">Notice periods in {city.name}</h3>
              <p className="text-muted mt-2">{city.noticePeriodNorm}</p>
            </Card>
            <Card>
              <h3 className="font-bold">Local hiring notes</h3>
              <ul className="text-muted mt-2 list-disc space-y-1 pl-5">
                {city.hiringNotes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="font-bold">Where the talent works</h3>
              <p className="text-muted mt-2">{city.gccClusters.map((c) => c.name).join(" · ")}</p>
              <Link
                href={`/gcc/${city.slug}`}
                className="text-accent mt-3 inline-block font-semibold hover:underline"
              >
                GCC hiring in {city.name} →
              </Link>
            </Card>
          </div>
        </div>
      </Section>
      <SkillsWeVet role={role} />
      <InterviewLoop role={role} />
      <Section labelledBy="faq">
        <SectionHeading id="faq" title="Questions" />
        <div className="max-w-3xl">
          <FaqList faqs={[...role.faqs, ...city.faqs.slice(0, 1)]} />
        </div>
      </Section>
      <RoleBrief role={role} location={city.name as "Pune" | "Bengaluru" | "Hyderabad"} />
      <RoleLinks role={role} currentCity={city.slug} />
    </>
  );
}
