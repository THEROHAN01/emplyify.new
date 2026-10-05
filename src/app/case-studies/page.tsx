import Link from "next/link";
import { FinalCta } from "@/components/marketing/cta-band";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { getCaseStudies, getRoleFamilies } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils/cn";

export const metadata = buildMetadata({
  title: "Case studies",
  description:
    "Metric-led hiring stories from Emplyify clients — challenge, approach, numbers and a named quote. Filter by role and company type.",
  path: "/case-studies",
});

const TYPES = ["GCC", "Product company", "Startup"] as const;

export default async function CaseStudiesPage(props: PageProps<"/case-studies">) {
  const sp = await props.searchParams;
  const family = typeof sp.role === "string" ? sp.role : undefined;
  const type = typeof sp.type === "string" ? sp.type : undefined;
  const all = getCaseStudies();
  const items = all.filter(
    (c) => (!family || c.roleFamily === family) && (!type || c.clientType === type),
  );

  const chip = (active: boolean) =>
    cn(
      "inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium",
      active ? "border-ink bg-ink text-white" : "border-line bg-surface hover:border-ink",
    );
  const href = (next: { role?: string; type?: string }) => {
    const q = new URLSearchParams(Object.entries(next).filter(([, v]) => v) as [string, string][]);
    return `/case-studies${q.size ? `?${q}` : ""}`;
  };

  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: "Case studies", path: "/case-studies" }]}
        eyebrow="Case studies"
        title="Hiring stories, with the numbers"
        intro="Every case study is approved by the client and names real results. No placeholder testimonials, ever."
      />
      <Container className="py-12">
        {all.length > 0 && (
          <div className="mb-8 space-y-3">
            <nav aria-label="Filter by role" className="flex flex-wrap gap-2">
              <Link href={href({ type })} className={chip(!family)}>
                All roles
              </Link>
              {getRoleFamilies().map((f) => (
                <Link
                  key={f.slug}
                  href={href({ role: f.slug, type })}
                  className={chip(family === f.slug)}
                >
                  {f.name}
                </Link>
              ))}
            </nav>
            <nav aria-label="Filter by company type" className="flex flex-wrap gap-2">
              <Link href={href({ role: family })} className={chip(!type)}>
                All companies
              </Link>
              {TYPES.map((t) => (
                <Link key={t} href={href({ role: family, type: t })} className={chip(type === t)}>
                  {t}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {items.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {items.map((c) => (
              <Card key={c.slug}>
                <Badge>{c.clientType}</Badge>
                <h2 className="mt-3 text-xl font-bold">
                  <Link href={`/case-studies/${c.slug}`} className="hover:text-accent">
                    {c.headline}
                  </Link>
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {c.results.slice(0, 2).map((r) => (
                    <div key={r.label}>
                      <p className="tabular text-ink text-2xl font-bold">{r.value}</p>
                      <p className="text-muted text-sm">{r.label}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-bold">
              {all.length
                ? "No case studies match those filters yet."
                : "Our first case studies are with clients for approval."}
            </h2>
            <p className="text-muted mt-3">
              We publish only named, client-approved stories with real numbers. Meanwhile, see
              exactly what a shortlist looks like — or ask us for a reference call.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/sample-shortlist">View a sample shortlist</ButtonLink>
              <ButtonLink href="/book-a-call" variant="secondary">
                Book a hiring call
              </ButtonLink>
            </div>
          </Card>
        )}
      </Container>
      <FinalCta />
    </>
  );
}
