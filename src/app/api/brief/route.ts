import { NextResponse } from "next/server";
import { processBrief } from "@/lib/leads/pipeline";
import { briefSchema } from "@/lib/leads/schema";
import { noStore, parseJson } from "@/lib/security/api";
import { guardFormRequest } from "@/lib/security/guard";
import { clientIp, hashIp } from "@/lib/security/request";

export async function POST(req: Request) {
  const parsed = await parseJson(req, briefSchema);
  if ("response" in parsed) return parsed.response;
  const { data } = parsed;

  const blocked = await guardFormRequest(req, {
    name: "brief",
    limit: 5,
    turnstileToken: data.turnstileToken,
    honeypot: data.website,
  });
  if (blocked) return blocked;

  const outcome = await processBrief(data, { ipHash: hashIp(clientIp(req)) });
  return NextResponse.json({ ok: true, ...outcome }, { headers: noStore });
}
