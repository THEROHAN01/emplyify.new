import { notFound } from "next/navigation";
import { ReportForm } from "@/components/forms/report-form";
import { FinalCta } from "@/components/marketing/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/layout";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getInsight, getInsights } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/schema";
import { formatLongDate } from "@/lib/utils/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return getInsights().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const i = getInsight(slug);
  if (!i) return {};
  return buildMetadata({ title: i.title, description: i.description, path: `/insights/${i.slug}` });
}

export default async function InsightPage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const insight = getInsight(slug);
  if (!insight) notFound();
  const cta = insight.release === "available" ? "Download report" : "Email me the first edition";

  return (
    <>
      <Container className="py-10 lg:py-14">
        <Breadcrumbs
          items={[
            { name: "Insights", path: "/insights" },
            { name: insight.title, path: `/insights/${insight.slug}` },
          ]}
        />
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <article>
            <div className="flex flex-wrap gap-2">
              <Badge>{insight.kind}</Badge>
              {insight.release === "upcoming" && (
                <Badge tone="pending">{insight.releaseLabel}</Badge>
              )}
            </div>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{insight.title}</h1>
            <p className="text-muted mt-3 text-lg">{insight.description}</p>
            <p className="text-muted mt-2 text-sm">
              {formatLongDate(insight.publishedAt)} · {insight.readingMinutes} min read
            </p>
            <div className="prose-body mt-8">
              {insight.body.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </section>
              ))}
            </div>
          </article>
          <aside className="space-y-6">
            <Card>
              <h2 className="font-bold">Key takeaways</h2>
              <ul className="text-muted mt-3 space-y-2">
                {insight.takeaways.map((t) => (
                  <li key={t}>– {t}</li>
                ))}
              </ul>
            </Card>
            {insight.gated && (
              <Card className="lg:sticky lg:top-24">
                <h2 className="text-lg font-bold">
                  {insight.release === "available" ? "Get the full PDF" : "Get it on release day"}
                </h2>
                <p className="text-muted mt-1 mb-4 text-sm">We'll email it to you. No spam.</p>
                <ReportForm reportSlug={insight.slug} cta={cta} />
              </Card>
            )}
          </aside>
        </div>
      </Container>
      <FinalCta />
      <JsonLd data={articleSchema(insight)} />
    </>
  );
}
