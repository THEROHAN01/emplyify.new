import { Badge } from "@/components/ui/badge";
import { LinkCard } from "@/components/ui/card";
import { Container } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { getInsights } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Insights: Talent Index, salary benchmarks and hiring guides",
  description:
    "The India GCC Tech Talent Index, salary benchmarks and practical hiring guides for engineering leaders in India.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: "Insights", path: "/insights" }]}
        eyebrow="Insights"
        title="Data and guides for hiring engineers in India"
        intro="A quarterly Talent Index built from our own pipeline, and practical guides from our recruiters."
      />
      <Container className="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
        {getInsights().map((i) => (
          <LinkCard
            key={i.slug}
            href={`/insights/${i.slug}`}
            title={i.title}
            meta={
              <div className="flex flex-wrap gap-2">
                <Badge>{i.kind}</Badge>
                {i.release === "upcoming" && (
                  <Badge tone="pending">{i.releaseLabel ?? "Coming soon"}</Badge>
                )}
                {i.gated && i.release === "available" && <Badge tone="sla">Free PDF</Badge>}
              </div>
            }
          >
            {i.description}
          </LinkCard>
        ))}
      </Container>
    </>
  );
}
