import { createHash } from "node:crypto";
import { env } from "@/lib/env";

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown").trim();
}

/** One-way, salted IP hash for consent and audit records (no raw IPs stored). */
export function hashIp(ip: string): string {
  return createHash("sha256").update(`${env.ipHashSalt}:${ip}`).digest("hex").slice(0, 32);
}

/** Rejects cross-site form posts: Origin must match the site (or be absent for same-origin fetch). */
export function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    return new URL(origin).host === host || origin === env.siteUrl;
  } catch {
    return false;
  }
}
