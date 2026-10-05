/**
 * Structured server logging. Never pass raw personal data here: use ids,
 * hashes and counts. Logs feed Sentry/Vercel log drains in production.
 */
type Level = "info" | "warn" | "error";

export function log(level: Level, event: string, data: Record<string, unknown> = {}) {
  const line = JSON.stringify({ level, event, at: new Date().toISOString(), ...data });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.info(line);
}

export interface IntegrationResult {
  integration: string;
  ok: boolean;
  skipped?: boolean;
  detail?: string;
}

export const skipped = (integration: string): IntegrationResult => ({
  integration,
  ok: true,
  skipped: true,
});
