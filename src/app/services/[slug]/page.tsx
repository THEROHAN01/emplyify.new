import { notFound } from "next/navigation";
import { FinalCta } from "@/components/marketing/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaqList } from "@/components/ui/faq";
import { Section, SectionHeading } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { ctas } from "@/content/site";
import { getCaseStudies, getService, getServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceSchema } from "@/lib/seo/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({
    title: `${s.name} — ${s.outcome}`,
    description: s.summary,
    path: `/services/${s.slug}`,
  });
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();
  const caseStudy = getCaseStudies()[0];
  const secondary =
    service.primaryCta.href === ctas.submitRole.href ? ctas.bookCall : ctas.submitRole;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { name: "Services", path: "/hire" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
        eyebrow={service.name}
        title={service.outcome}
        intro={service.summary}
        actions={
          <>
            <ButtonLink href={service.primaryCta.href} size="lg">
              {service.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={secondary.href} size="lg" variant="secondary">
              {secondary.label}
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="who">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="who" title="Who it's for" className="mb-6" />
            <ul className="space-y-3">
              {service.whoFor.map((w) => (
                <li key={w} className="flex gap-3">
                  <span aria-hidden className="text-accent">
                    →
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">What's included</h2>
            <ul className="space-y-3">
              {service.included.map((w) => (
                <li key={w} className="flex gap-3">
                  <span aria-hidden className="text-signal">
                    ✓
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="process">
        <SectionHeading id="process" eyebrow="Process" title="How it runs, with timelines" />
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {service.process.map((p, i) => (
            <li key={p.step} className="border-line bg-bg rounded-[12px] border p-6">
              <span className="tabular text-accent font-mono text-sm font-bold">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-bold">{p.step}</h3>
              <Badge tone="sla" className="mt-2">
                {p.sla}
              </Badge>
              <p className="text-muted mt-3">{p.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="price">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionHeading
            id="price"
            eyebrow="Pricing"
            title={service.pricing.headline}
            intro={service.pricing.detail}
            className="mb-0"
          />
          <Card>
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.pricing.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span aria-hidden className="text-signal">
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <ButtonLink href="/pricing" variant="secondary" className="mt-6">
              See full pricing and calculator
            </ButtonLink>
          </Card>
        </div>
      </Section>

      {caseStudy && (
        <Section tone="surface" labelledBy="case">
          <SectionHeading id="case" eyebrow="Case study" title={caseStudy.headline} />
          <ButtonLink href={`/case-studies/${caseStudy.slug}`} variant="link">
            Read case study →
          </ButtonLink>
        </Section>
      )}

      <Section tone={caseStudy ? "default" : "surface"} labelledBy="faq">
        <SectionHeading id="faq" title="Questions we get asked" />
        <div className="max-w-3xl">
          <FaqList faqs={service.faqs} />
        </div>
      </Section>

      <FinalCta primary={service.primaryCta} secondary={secondary} />
      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
