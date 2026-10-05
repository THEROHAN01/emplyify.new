import Link from "next/link";
import { JobCard } from "@/components/marketing/job-card";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import type { CitySlug, RoleFamilySlug } from "@/content/types";
import { getCities, getJobs, getRoleFamilies } from "@/lib/content";
import { env } from "@/lib/env";
import { buildMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils/cn";

export const metadata = buildMetadata({
  title: "Tech jobs in Pune, Bengaluru and Hyderabad",
  description:
    "Curated AI/ML, data, cloud, full-stack, embedded and product roles with salary bands, team, stack and interview stages on every listing.",
  path: "/jobs",
});

export default async function JobsPage(props: PageProps<"/jobs">) {
  const sp = await props.searchParams;
  const families = getRoleFamilies();
  const cities = getCities();
  const family = families.find((f) => f.slug === sp.role)?.slug as RoleFamilySlug | undefined;
  const city = (sp.city === "remote" ? "remote" : cities.find((c) => c.slug === sp.city)?.slug) as
    CitySlug | "remote" | undefined;
  const jobs = getJobs({ family, city });
  const any = getJobs().length > 0;

  const chip = (active: boolean) =>
    cn(
      "min-h-11 rounded-full border px-4 py-2 text-sm font-semibold",
      active
        ? "border-accent bg-accent text-accent-ink"
        : "border-line bg-surface hover:border-accent",
    );
  const href = (next: { role?: string; city?: string }) => {
    const q = new URLSearchParams(Object.entries(next).filter(([, v]) => v) as [string, string][]);
    return `/jobs${q.size ? `?${q}` : ""}`;
  };

  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: "Jobs", path: "/jobs" }]}
        eyebrow="Open roles"
        title="Curated tech roles, salary band on every one"
        intro="Each listing shows the team, stack, salary band, interview stages and how long the process takes."
      />
      <Container className="py-10">
        {env.contentPreview && any && (
          <p className="border-line bg-warn-bg text-warn mb-6 rounded-lg border px-4 py-3 text-sm">
            Preview mode: draft example roles are visible. They are hidden in production until real
            roles are published.
          </p>
        )}
        {any && (
          <div className="mb-8 space-y-3">
            <nav aria-label="Filter by role family" className="flex flex-wrap gap-2">
              <Link href={href({ city })} className={chip(!family)}>
                All roles
              </Link>
              {families.map((f) => (
                <Link
                  key={f.slug}
                  href={href({ role: f.slug, city })}
                  className={chip(family === f.slug)}
                >
                  {f.name}
                </Link>
              ))}
            </nav>
            <nav aria-label="Filter by city" className="flex flex-wrap gap-2">
              <Link href={href({ role: family })} className={chip(!city)}>
                All cities
              </Link>
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={href({ role: family, city: c.slug })}
                  className={chip(city === c.slug)}
                >
                  {c.name}
                </Link>
              ))}
              <Link
                href={href({ role: family, city: "remote" })}
                className={chip(city === "remote")}
              >
                Remote
              </Link>
            </nav>
          </div>
        )}

        {jobs.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((j) => (
              <JobCard key={j.slug} job={j} />
            ))}
          </div>
        ) : (
          <Card className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-bold">
              {any
                ? "No roles match those filters right now."
                : "No open roles are listed right now."}
            </h2>
            <p className="text-muted mt-3">
              Join the talent network and tell us what you're looking for. We'll contact you only
              when a role fits — with the salary band upfront.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/candidates/join">Join the talent network</ButtonLink>
              {any && (
                <ButtonLink href="/jobs" variant="secondary">
                  Clear filters
                </ButtonLink>
              )}
            </div>
          </Card>
        )}
      </Container>
    </>
  );
}
