/**
 * Central, typed access to environment configuration.
 *
 * Every integration is optional so the site builds and runs locally with zero
 * secrets: when a key is missing the matching adapter logs instead of calling
 * the vendor. `integrationStatus()` powers the startup warning in production.
 */
const read = (key: string): string | undefined => {
  const value = process.env[key];
  return value && value.trim() !== "" ? value.trim() : undefined;
};

export const env = {
  siteUrl: (
    read("NEXT_PUBLIC_SITE_URL") ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://emplyify.com")
  ).replace(/\/$/, ""),
  isProduction: process.env.NODE_ENV === "production",
  /** Show draft CMS content (sample jobs, unpublished case studies). Never on in public production. */
  contentPreview:
    read("CONTENT_PREVIEW") === "true" ||
    // Vercel preview deployments show drafts (and robots.txt blocks indexing).
    (process.env.VERCEL_ENV === "preview" && read("CONTENT_PREVIEW") !== "false") ||
    (process.env.NODE_ENV !== "production" && read("CONTENT_PREVIEW") !== "false"),

  // Public (exposed to the browser — must be NEXT_PUBLIC_ and inlined at build).
  calLink: process.env.NEXT_PUBLIC_CAL_LINK || undefined,
  calLinkGcc: process.env.NEXT_PUBLIC_CAL_LINK_GCC || process.env.NEXT_PUBLIC_CAL_LINK || undefined,
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || undefined,
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || undefined,
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || undefined,
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY || undefined,
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",

  // Server-only.
  turnstileSecret: read("TURNSTILE_SECRET_KEY"),
  hubspotPortalId: read("HUBSPOT_PORTAL_ID"),
  hubspotBriefFormId: read("HUBSPOT_BRIEF_FORM_ID"),
  hubspotContactFormId: read("HUBSPOT_CONTACT_FORM_ID"),
  hubspotReportFormId: read("HUBSPOT_REPORT_FORM_ID"),
  resendApiKey: read("RESEND_API_KEY"),
  emailFrom: read("EMAIL_FROM") ?? "Emplyify <hello@emplyify.com>",
  internalAlertEmail: read("INTERNAL_ALERT_EMAIL"),
  slackWebhookUrl: read("SLACK_LEADS_WEBHOOK_URL"),
  supabaseUrl: read("SUPABASE_URL"),
  supabaseServiceRoleKey: read("SUPABASE_SERVICE_ROLE_KEY"),
  cvBucket: read("SUPABASE_CV_BUCKET") ?? "cvs",
  anthropicApiKey: read("ANTHROPIC_API_KEY"),
  anthropicModel: read("ANTHROPIC_MODEL") ?? "claude-opus-5-5",
  ipHashSalt: read("IP_HASH_SALT") ?? "dev-only-salt",
} as const;

export function integrationStatus() {
  return {
    hubspot: Boolean(env.hubspotPortalId && env.hubspotBriefFormId),
    email: Boolean(env.resendApiKey),
    slack: Boolean(env.slackWebhookUrl),
    supabase: Boolean(env.supabaseUrl && env.supabaseServiceRoleKey),
    turnstile: Boolean(env.turnstileSecret && env.turnstileSiteKey),
    ai: Boolean(env.anthropicApiKey),
  };
}
