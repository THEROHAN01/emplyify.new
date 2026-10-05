import "server-only";
import { env } from "@/lib/env";
import type { Attribution } from "@/lib/leads/schema";
import { log, skipped, type IntegrationResult } from "./logger";

/**
 * HubSpot Forms API v3 (no private app token required). Field names must
 * exist as contact properties in HubSpot; custom ones are prefixed `emplyify_`.
 */
export async function submitHubspotForm(
  formId: string | undefined,
  fields: Record<string, string | number | boolean | undefined>,
  attribution: Attribution,
): Promise<IntegrationResult> {
  if (!env.hubspotPortalId || !formId) return skipped("hubspot");

  const utmFields = {
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_term: attribution.utm_term,
    utm_content: attribution.utm_content,
    emplyify_landing_page: attribution.landingPage,
    emplyify_referrer: attribution.referrer,
  };

  const body = {
    fields: Object.entries({ ...fields, ...utmFields })
      .filter(([, v]) => v !== undefined && v !== "")
      .map(([name, value]) => ({ objectTypeId: "0-1", name, value: String(value) })),
    context: {
      hutk: attribution.hutk,
      pageUri: attribution.pageUri,
      pageName: attribution.pageUri
        ? new URL(attribution.pageUri, env.siteUrl).pathname
        : undefined,
    },
  };

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${env.hubspotPortalId}/${formId}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!res.ok) {
      const detail = (await res.text()).slice(0, 300);
      log("error", "hubspot.submit_failed", { status: res.status, detail });
      return { integration: "hubspot", ok: false, detail: `HTTP ${res.status}` };
    }
    return { integration: "hubspot", ok: true };
  } catch (err) {
    log("error", "hubspot.submit_error", { message: (err as Error).message });
    return { integration: "hubspot", ok: false, detail: "network" };
  }
}
