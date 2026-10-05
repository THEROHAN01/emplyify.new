import "server-only";
import { env } from "@/lib/env";
import { log, skipped, type IntegrationResult } from "./logger";

export interface EmailMessage {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

/** Transactional email via Resend's REST API. */
export async function sendEmail(message: EmailMessage): Promise<IntegrationResult> {
  if (!env.resendApiKey) {
    log("info", "email.skipped", { subject: message.subject });
    return skipped("email");
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${env.resendApiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: env.emailFrom,
        to: message.to,
        subject: message.subject,
        text: message.text,
        html: message.html ?? textToHtml(message.text),
        reply_to: message.replyTo,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      log("error", "email.send_failed", { status: res.status });
      return { integration: "email", ok: false, detail: `HTTP ${res.status}` };
    }
    return { integration: "email", ok: true };
  } catch (err) {
    log("error", "email.send_error", { message: (err as Error).message });
    return { integration: "email", ok: false, detail: "network" };
  }
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Minimal, accessible HTML version of a plain-text email. */
export function textToHtml(text: string): string {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 16px">${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
    .join("");
  return `<div style="font-family:Inter,Arial,sans-serif;font-size:16px;line-height:1.6;color:#111418;max-width:560px">${paragraphs}</div>`;
}
