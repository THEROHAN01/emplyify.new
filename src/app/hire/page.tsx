import { FinalCta } from "@/components/marketing/cta-band";
import { LinkCard } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { getRoleFamilies, getRoleByFamily, getServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Hire tech talent in India",
  description:
    "Hire AI/ML, data, cloud and DevOps, full-stack, embedded and product talent in Pune, Bengaluru and Hyderabad — vetted shortlists in 72 hours.",
  path: "/hire",
});

export default function HireIndex() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: "Hire talent", path: "/hire" }]}
        eyebrow="Hire talent"
        title="Specialists, organised by role family"
        intro="Choose a role family to see the skills we vet, salary bands by city and a sample interview loop."
      />
      <Section labelledBy="families">
        <h2 id="families" className="sr-only">
          Role families
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getRoleFamilies().map((f) => {
            const r = getRoleByFamily(f.slug)!;
            return (
              <LinkCard key={f.slug} href={`/hire/${r.slug}`} title={r.title}>
                {r.shortDescription}
              </LinkCard>
            );
          })}
        </div>
      </Section>
      <Section tone="surface" labelledBy="services">
        <SectionHeading id="services" title="Ways to work with us" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {getServices().map((s) => (
            <LinkCard key={s.slug} href={`/services/${s.slug}`} title={s.name}>
              {s.outcome}
            </LinkCard>
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
