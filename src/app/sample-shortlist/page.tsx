import Link from "next/link";
import { ShortlistCard } from "@/components/marketing/shortlist-card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { PrintButton } from "@/components/marketing/print-button";
import { sampleShortlists } from "@/content/sample-shortlists";
import { getRoleFamilies } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils/cn";

export const metadata = buildMetadata({
  title: "Sample shortlist dossier",
  description:
    "See exactly what an Emplyify shortlist looks like: anonymised candidates, evidence for every must-have, risks and a recruiter's sign-off.",
  path: "/sample-shortlist",
});

export default async function SampleShortlistPage(props: PageProps<"/sample-shortlist">) {
  const sp = await props.searchParams;
  const families = getRoleFamilies();
  const chosen = sampleShortlists.find((s) => s.family === sp.family) ?? sampleShortlists[0];

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { name: "How it works", path: "/how-it-works" },
          { name: "Sample shortlist", path: "/sample-shortlist" },
        ]}
        eyebrow="Sample dossier"
        title="This is what lands in your inbox."
        intro={
          <>
            A shortlist is three to five candidates, each verified by a senior recruiter. The
            candidates below are{" "}
            <strong className="text-ink">illustrative composites, not real people</strong>; real
            dossiers are shared only with candidate consent.
          </>
        }
      />
      <Container className="py-12">
        <nav
          aria-label="Choose a role family"
          className="mb-8 flex flex-wrap gap-2"
          data-print-hide
        >
          {families.map((f) => (
            <Link
              key={f.slug}
              href={`/sample-shortlist?family=${f.slug}`}
              scroll={false}
              aria-current={chosen.family === f.slug ? "page" : undefined}
              className={cn(
                "min-h-11 rounded-full border px-4 py-2 text-sm font-semibold",
                chosen.family === f.slug
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-line bg-surface hover:border-accent",
              )}
            >
              {f.name}
            </Link>
          ))}
        </nav>

        <div className="border-line bg-surface rounded-[12px] border p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge tone="pending">Sample · anonymised</Badge>
              <h2 className="mt-3 text-2xl font-bold">{chosen.role}</h2>
              <p className="text-muted">{chosen.company}</p>
            </div>
            <div className="flex gap-2" data-print-hide>
              <PrintButton family={chosen.family} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">Must-haves agreed in the brief</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {chosen.mustHaves.map((m) => (
                <li key={m}>
                  <Badge>{m}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {chosen.candidates.map((c) => (
            <div key={c.alias}>
              <ShortlistCard candidate={c} role={chosen.role} />
              {c.risks.length > 0 && (
                <div className="border-line bg-warn-bg mt-3 rounded-lg border px-4 py-3 text-sm">
                  <strong className="text-warn">Risks to discuss:</strong> {c.risks.join(" · ")}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3" data-print-hide>
          <ButtonLink href={`/submit-a-role?family=${chosen.family}`} size="lg">
            Submit a role
          </ButtonLink>
          <ButtonLink href="/book-a-call" size="lg" variant="secondary">
            Book a hiring call
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
