import { notFound } from "next/navigation";
import { FinalCta } from "@/components/marketing/cta-band";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { getCaseStudies, getCaseStudy } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/case-studies/[slug]">) {
  const { slug } = await props.params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return buildMetadata({
    title: c.headline,
    description: c.challenge.slice(0, 155),
    path: `/case-studies/${c.slug}`,
  });
}

export default async function CaseStudyPage(props: PageProps<"/case-studies/[slug]">) {
  const { slug } = await props.params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { name: "Case studies", path: "/case-studies" },
          { name: c.client, path: `/case-studies/${c.slug}` },
        ]}
        eyebrow={`${c.client} · ${c.clientType}`}
        title={c.headline}
      />
      <Section labelledBy="numbers">
        <h2 id="numbers" className="sr-only">
          Results
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.results.map((r) => (
            <Card key={r.label}>
              <p className="tabular text-accent font-mono text-3xl font-bold">{r.value}</p>
              <p className="text-muted mt-1">{r.label}</p>
            </Card>
          ))}
        </div>
        <div className="prose-body mt-12 max-w-3xl">
          <h2>The challenge</h2>
          <p>{c.challenge}</p>
          <h2>Our approach</h2>
          <ul>
            {c.approach.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        {c.quote && (
          <blockquote className="border-accent mt-10 max-w-3xl border-l-4 pl-6 text-xl">
            “{c.quote.text}”
            <footer className="text-muted mt-3 text-base">
              — {c.quote.name}, {c.quote.title}
            </footer>
          </blockquote>
        )}
      </Section>
      <FinalCta />
    </>
  );
}
