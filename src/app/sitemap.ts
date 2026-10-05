import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/metadata";
import { allRoutes } from "@/lib/seo/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes().map((r) => ({
    url: absoluteUrl(r.path === "/" ? "" : r.path),
    lastModified: r.lastModified ? new Date(r.lastModified) : undefined,
    priority: r.priority,
  }));
}
