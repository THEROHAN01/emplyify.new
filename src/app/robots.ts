import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { absoluteUrl } from "@/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments (draft content visible) are never indexed.
  if (env.contentPreview) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/*/thank-you", "/jobs/*/applied"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
