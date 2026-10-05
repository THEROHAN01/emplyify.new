import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { buildMetadata } from "@/lib/seo/metadata";
import { allRoutes, type RouteEntry } from "@/lib/seo/routes";

export const metadata = buildMetadata({
  title: "Sitemap",
  description: "Every page on emplyify.com.",
  path: "/site-map",
});

export default function SiteMapPage() {
  const groups = allRoutes().reduce<Record<string, RouteEntry[]>>((acc, r) => {
    (acc[r.group] ??= []).push(r);
    return acc;
  }, {});
  return (
    <>
      <PageHeader breadcrumbs={[{ name: "Sitemap", path: "/site-map" }]} title="Sitemap" />
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(groups).map(([group, routes]) => (
          <section key={group}>
            <h2 className="mb-3 text-lg font-bold">{group}</h2>
            <ul className="space-y-1.5 text-sm">
              {routes.map((r) => (
                <li key={r.path}>
                  <Link href={r.path} className="hover:text-accent hover:underline">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Container>
    </>
  );
}
