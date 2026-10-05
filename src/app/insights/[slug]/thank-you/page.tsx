import { notFound } from "next/navigation";
import { ConversionEvent } from "@/components/analytics/conversion-event";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { getInsight, getInsights } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getInsights()
    .filter((i) => i.gated)
    .map((i) => ({ slug: i.slug }));
}

export const metadata = buildMetadata({
  title: "Thanks",
  description: "Your report request was received.",
  path: "/insights/thank-you",
  noindex: true,
});

/** Separate thank-you URL per gated asset, for conversion tracking. */
export default async function ReportThankYou(props: PageProps<"/insights/[slug]/thank-you">) {
  const { slug } = await props.params;
  const insight = getInsight(slug);
  if (!insight || !insight.gated) notFound();
  const available = insight.release === "available";
  return (
    <Container className="py-16 lg:py-24">
      <ConversionEvent
        name="thank_you_viewed"
        props={{ page: `/insights/${slug}/thank-you`, kind: "report" }}
      />
      <div className="mx-auto max-w-2xl">
        <Badge tone="verified">{available ? "On its way" : "You're on the list"}</Badge>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
          {available ? "Check your inbox." : "We'll email you on release day."}
        </h1>
        <p className="text-muted mt-4 text-lg">
          {available
            ? `${insight.title} is on its way to your work email.`
            : `${insight.title} — ${insight.releaseLabel}. You'll be among the first to get it.`}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/submit-a-role">Submit a role</ButtonLink>
          <ButtonLink href="/insights" variant="secondary">
            More insights
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
