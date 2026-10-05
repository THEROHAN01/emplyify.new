import "server-only";
import { env } from "@/lib/env";
import { log, skipped, type IntegrationResult } from "./logger";

/** Recruiter alert via Slack incoming webhook. Keep PII minimal: name + company only. */
export async function alertSlack(text: string): Promise<IntegrationResult> {
  if (!env.slackWebhookUrl) return skipped("slack");
  try {
    const res = await fetch(env.slackWebhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(5000),
    });
    return { integration: "slack", ok: res.ok, detail: res.ok ? undefined : `HTTP ${res.status}` };
  } catch (err) {
    log("error", "slack.alert_error", { message: (err as Error).message });
    return { integration: "slack", ok: false, detail: "network" };
  }
}
