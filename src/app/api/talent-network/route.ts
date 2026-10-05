import { NextResponse } from "next/server";
import { processTalentNetwork } from "@/lib/candidates/pipeline";
import { talentNetworkSchema } from "@/lib/leads/schema";
import { noStore, parseJson } from "@/lib/security/api";
import { guardFormRequest } from "@/lib/security/guard";
import { clientIp, hashIp } from "@/lib/security/request";

export async function POST(req: Request) {
  const parsed = await parseJson(req, talentNetworkSchema);
  if ("response" in parsed) return parsed.response;
  const { data } = parsed;

  const blocked = await guardFormRequest(req, {
    name: "talent-network",
    limit: 5,
    turnstileToken: data.turnstileToken,
    honeypot: data.website,
  });
  if (blocked) return blocked;

  const { ref } = await processTalentNetwork(data, { ipHash: hashIp(clientIp(req)) });
  return NextResponse.json({ ok: true, ref }, { headers: noStore });
}
