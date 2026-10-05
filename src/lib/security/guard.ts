import "server-only";
import { NextResponse } from "next/server";
import { verifyTurnstile } from "@/lib/integrations/turnstile";
import { clientIp, isSameOrigin } from "./request";
import { rateLimit } from "./rate-limit";

/**
 * Shared front door for public form endpoints: origin check, rate limit and
 * bot verification. Returns a response to short-circuit, or null to proceed.
 */
export async function guardFormRequest(
  req: Request,
  opts: {
    name: string;
    limit?: number;
    windowMs?: number;
    turnstileToken?: string;
    honeypot?: string;
  },
): Promise<NextResponse | null> {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ ok: false, error: "Cross-site request blocked." }, { status: 403 });
  }
  const ip = clientIp(req);
  const rl = rateLimit(`${opts.name}:${ip}`, opts.limit ?? 5, opts.windowMs ?? 10 * 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Wait a few minutes and try again." },
      { status: 429, headers: { "retry-after": String(rl.retryAfterSeconds) } },
    );
  }
  if (opts.honeypot) {
    // Pretend success so bots learn nothing.
    return NextResponse.json({ ok: true });
  }
  if (!(await verifyTurnstile(opts.turnstileToken, ip))) {
    return NextResponse.json(
      { ok: false, error: "We couldn't verify you're human. Refresh the page and try again." },
      { status: 400 },
    );
  }
  return null;
}
