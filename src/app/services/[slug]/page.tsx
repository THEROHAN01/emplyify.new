import { notFound } from "next/navigation";
import { FinalCta } from "@/components/marketing/cta-band";
import { IconTile, icons, type IconName } from "@/components/ui/icons";
import { PipelineTracker } from "@/components/visuals/pipeline-tracker";
import { Tick } from "@/components/visuals/mock-ui";
import { ServiceVisual } from "@/components/visuals/service-visuals";
import { JsonLd } from "@/components/seo/json-ld";
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
        aside={<ServiceVisual slug={service.slug} />}
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
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="border-line rounded-2xl border p-8">
            <IconTile name={service.slug as IconName} />
            <h2 id="who" className="mt-5 text-2xl font-bold">
              Who it's for
            </h2>
            <ul className="mt-5 space-y-3.5">
              {service.whoFor.map((w) => (
                <li key={w} className="flex gap-3">
                  <Tick />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-navy rounded-2xl p-8 text-white">
            <span className="flex size-11 items-center justify-center rounded-xl bg-white/10">
              {icons.dossier}
            </span>
            <h2 className="mt-5 text-2xl font-bold">What's included</h2>
            <ul className="mt-5 space-y-3.5">
              {service.included.map((w) => (
                <li key={w} className="flex gap-3 text-white/85">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-white/60" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="process">
        <SectionHeading id="process" eyebrow="Process" title="How it runs, with timelines" />
        <div className="border-line bg-surface rounded-2xl border p-6 sm:p-10">
          <PipelineTracker
            mode="plan"
            label={`${service.name} process`}
            steps={service.process.map((p) => ({ label: p.step, detail: p.sla, body: p.detail }))}
          />
        </div>
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
                  <Tick />
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
