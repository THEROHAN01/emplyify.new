import type { Metadata } from "next";
import { site } from "@/content/site";
import { env } from "@/lib/env";

/**
 * Page metadata builder: unique title + description per page, canonical URL,
 * Open Graph and Twitter cards. Title template in the root layout appends the brand.
 */
export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  absoluteTitle?: boolean;
}): Metadata {
  const url = `${env.siteUrl}${opts.path === "/" ? "" : opts.path}`;
  const fullTitle = opts.absoluteTitle ? opts.title : `${opts.title} | ${site.name}`;
  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: { title: fullTitle, description: opts.description, url, siteName: site.name, type: "website", locale: "en_IN" },
    twitter: { card: "summary_large_image", title: fullTitle, description: opts.description },
    robots: opts.noindex ? { index: false, follow: true } : undefined,
  };
}

export const absoluteUrl = (path: string) => `${env.siteUrl}${path}`;
