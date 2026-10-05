import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/marketing/cta-band";
import { SALARY_FOOTNOTE } from "@/components/marketing/salary-table";
import { RangeChart } from "@/components/visuals/range-chart";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaqList } from "@/components/ui/faq";
import { Section, SectionHeading } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { ctas } from "@/content/site";
import { citySalaryBands, getCaseStudies, getCities, getCity, getRoles } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCities().map((c) => ({ city: c.slug }));
}

export async function generateMetadata(props: PageProps<"/gcc/[city]">) {
  const { city: cs } = await props.params;
  const city = getCity(cs);
  if (!city) return {};
  return buildMetadata({
    title: `GCC hiring in ${city.name}`,
    description: `Set up or scale a GCC team in ${city.name}: talent supply, salary benchmarks, clusters such as ${city.gccClusters[0].name}, notice-period norms and a hiring partner.`,
    path: `/gcc/${city.slug}`,
  });
}

export default async function GccCityPage(props: PageProps<"/gcc/[city]">) {
  const { city: cs } = await props.params;
  const city = getCity(cs);
  if (!city) notFound();
  const caseStudy = getCaseStudies().find((c) => c.clientType === "GCC");

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { name: "For GCCs", path: "/gcc" },
          { name: city.name, path: `/gcc/${city.slug}` },
        ]}
        eyebrow={`GCC hiring · ${city.name}`}
        title={`GCC hiring in ${city.name}`}
        intro={city.gccIntro}
        actions={
          <>
            <ButtonLink href={ctas.gccTeam.href} size="lg">
              {ctas.gccTeam.label}
            </ButtonLink>
            <ButtonLink href={ctas.talentIndex.href} size="lg" variant="secondary">
              {ctas.talentIndex.label}
            </ButtonLink>
          </>
        }
      />
      <Section labelledBy="supply">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="supply"
              eyebrow="Talent supply"
              title={`The ${city.name} talent market`}
              intro={city.talentSupply}
              className="mb-6"
            />
            <Card>
              <h3 className="font-bold">Notice-period norms</h3>
              <p className="text-muted mt-2">{city.noticePeriodNorm}</p>
            </Card>
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">GCC clusters</h2>
            <ul className="space-y-3">
              {city.gccClusters.map((c) => (
                <li key={c.name} className="border-line bg-surface rounded-lg border p-4">
                  <strong>{c.name}</strong>
                  <p className="text-muted text-sm">{c.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="benchmarks">
        <SectionHeading
          id="benchmarks"
          eyebrow="Salary benchmarks"
          title={`Salary benchmarks in ${city.name}`}
          intro="Fixed annual CTC for mid and senior engineers. Each role page has the full range."
        />
        <RangeChart
          title={`${city.name} salary benchmarks by role`}
          toggleLabel="Choose a seniority level"
          groups={(["mid", "senior"] as const).map((level) => ({
            id: level,
            label: level === "mid" ? "Mid (3–6 yrs)" : "Senior (6–10 yrs)",
            rows: getRoles().map((r) => {
              const b = citySalaryBands(r.salaryBands, city).find((x) => x.seniority === level)!;
              return {
                label: r.title.replace(/ engineers$| developers$| managers$/i, ""),
                min: b.minLpa,
                max: b.maxLpa,
              };
            }),
          }))}
          caption={SALARY_FOOTNOTE}
        />
        <p className="text-muted mt-6 text-sm">
          Full bands by role:{" "}
          {getRoles().map((r, i) => (
            <span key={r.slug}>
              {i > 0 && " · "}
              <Link href={`/hire/${r.slug}/${city.slug}`} className="text-accent hover:underline">
                {r.title}
              </Link>
            </span>
          ))}
        </p>
      </Section>

      <Section labelledBy="notes">
        <SectionHeading id="notes" title={`Hiring in ${city.name}: what we've learned`} />
        <ul className="grid gap-4 md:grid-cols-3">
          {city.hiringNotes.map((n) => (
            <li key={n} className="border-line bg-surface rounded-2xl border p-6">
              {n}
            </li>
          ))}
        </ul>
        {caseStudy && (
          <Link
            href={`/case-studies/${caseStudy.slug}`}
            className="text-accent mt-8 inline-block font-semibold hover:underline"
          >
            Case study: {caseStudy.headline} →
          </Link>
        )}
      </Section>

      <Section tone="surface" labelledBy="faq">
        <SectionHeading id="faq" title="Questions" />
        <div className="max-w-3xl">
          <FaqList faqs={city.faqs} />
        </div>
      </Section>

      <FinalCta
        title={`Building a team in ${city.name}?`}
        body="Get a market map, salary benchmarks and a hiring plan with weekly milestones."
        primary={ctas.gccTeam}
        secondary={ctas.talentIndex}
      />
    </>
  );
}
