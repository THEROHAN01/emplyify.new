import { IconTile, type IconName } from "@/components/ui/icons";
import { FinalCta } from "@/components/marketing/cta-band";
import { LinkCard } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { industries, nonItFunctions } from "@/content/company";
import { getRoleFamilies, getRoleByFamily, getServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Hire IT and Non-IT talent in India",
  description:
    "Hire IT specialists (AI/ML, data, cloud and DevOps, full-stack, embedded, product) and Non-IT talent (sales, marketing, finance, HR, operations, customer service) across India, with a shortlist in 48 hours.",
  path: "/hire",
});

export default function HireIndex() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: "Hire talent", path: "/hire" }]}
        eyebrow="Hire talent"
        title="IT and Non-IT talent, across India"
        intro="Choose an IT specialism to see the skills we screen for, salary bands by city and a sample interview loop, or brief us on any Non-IT role."
      />
      <Section labelledBy="families">
        <SectionHeading id="families" eyebrow="IT and technical" title="IT specialisms" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getRoleFamilies().map((f) => {
            const r = getRoleByFamily(f.slug)!;
            return (
              <LinkCard
                key={f.slug}
                href={`/hire/${r.slug}`}
                title={r.title}
                icon={<IconTile name={f.slug} tone="ink" />}
              >
                {r.shortDescription}
              </LinkCard>
            );
          })}
        </div>
      </Section>
      <Section tone="surface" labelledBy="non-it">
        <SectionHeading
          id="non-it"
          eyebrow="Non-IT"
          title="Business and support functions"
          intro="Screened by recruiters who hire for these functions every week."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nonItFunctions.map((f) => (
            <Card key={f}>
              <h3 className="font-bold">{f}</h3>
            </Card>
          ))}
        </div>
        <p className="text-muted mt-10 text-sm font-medium">Industries we hire for</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {industries.map((i) => (
            <li key={i} className="border-line bg-surface rounded-full border px-4 py-1.5 text-sm">
              {i}
            </li>
          ))}
        </ul>
      </Section>
      <Section labelledBy="services">
        <SectionHeading id="services" title="Ways to work with us" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getServices().map((s) => (
            <LinkCard
              key={s.slug}
              href={`/services/${s.slug}`}
              title={s.name}
              icon={<IconTile name={s.slug as IconName} />}
            >
              {s.outcome}
            </LinkCard>
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
