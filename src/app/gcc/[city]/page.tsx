import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/marketing/cta-band";
import { SALARY_FOOTNOTE } from "@/components/marketing/salary-table";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaqList } from "@/components/ui/faq";
import { Section, SectionHeading } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { ctas } from "@/content/site";
import { citySalaryBands, getCaseStudies, getCities, getCity, getRoles } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { formatLpaRange } from "@/lib/utils/format";

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
        <div className="border-line bg-bg overflow-x-auto rounded-2xl border">
          <table className="w-full text-left">
            <thead>
              <tr className="border-line border-b">
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Mid (3–6 yrs)
                </th>
                <th scope="col" className="px-6 py-3">
                  Senior (6–10 yrs)
                </th>
              </tr>
            </thead>
            <tbody>
              {getRoles().map((r) => {
                const bands = citySalaryBands(r.salaryBands, city);
                const mid = bands.find((b) => b.seniority === "mid")!;
                const senior = bands.find((b) => b.seniority === "senior")!;
                return (
                  <tr key={r.slug} className="border-line border-b last:border-0">
                    <th scope="row" className="px-6 py-3 font-semibold">
                      <Link
                        href={`/hire/${r.slug}/${city.slug}`}
                        className="text-accent hover:underline"
                      >
                        {r.title}
                      </Link>
                    </th>
                    <td className="tabular px-6 py-3">{formatLpaRange(mid.minLpa, mid.maxLpa)}</td>
                    <td className="tabular px-6 py-3">
                      {formatLpaRange(senior.minLpa, senior.maxLpa)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-muted mt-3 text-sm">{SALARY_FOOTNOTE}</p>
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
