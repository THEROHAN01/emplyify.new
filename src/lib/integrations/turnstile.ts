import "server-only";
import { env } from "@/lib/env";
import { log } from "./logger";

/** Verifies a Cloudflare Turnstile token. Passes when Turnstile is not configured (dev). */
export async function verifyTurnstile(token: string | undefined, ip?: string): Promise<boolean> {
  if (!env.turnstileSecret) return true;
  if (!token) return false;
  try {
    const form = new URLSearchParams({ secret: env.turnstileSecret, response: token });
    if (ip) form.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch (err) {
    log("error", "turnstile.verify_error", { message: (err as Error).message });
    return false;
  }
}
