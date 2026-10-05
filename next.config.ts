import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const calOrigin = (() => {
  try {
    return process.env.NEXT_PUBLIC_CAL_LINK ? new URL(process.env.NEXT_PUBLIC_CAL_LINK).origin : "https://cal.com";
  } catch {
    return "https://cal.com";
  }
})();
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";
const posthogAssets = posthogHost.replace(/\/\/([a-z]+)\.i\./, "//$1-assets.i.");

/**
 * Content-Security-Policy. Marketing pages are statically generated, so we
 * can't use per-request nonces without giving up SSG; inline scripts are
 * therefore allowed but every external origin is pinned. See docs/SECURITY.md.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://plausible.io https://challenges.cloudflare.com ${posthogAssets}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' https://plausible.io ${posthogHost} ${posthogAssets}${isDev ? " ws:" : ""}`,
  `frame-src https://challenges.cloudflare.com ${calOrigin}`,
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/api/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
    ];
  },
  async redirects() {
    return [
      // Playbook URL variants → canonical pages.
      { source: "/gcc-hiring/:city", destination: "/gcc/:city", permanent: true },
      { source: "/gcc-hiring", destination: "/gcc", permanent: true },
      { source: "/sitemap", destination: "/site-map", permanent: true },
      { source: "/privacy", destination: "/legal/privacy", permanent: true },
      { source: "/terms", destination: "/legal/terms", permanent: true },
    ];
  },
};

export default nextConfig;
