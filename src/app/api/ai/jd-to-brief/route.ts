import { NextResponse } from "next/server";
import { z } from "zod";
import { jdToBrief } from "@/lib/ai/jd-to-brief";
import { noStore, parseJson } from "@/lib/security/api";
import { clientIp } from "@/lib/security/request";
import { rateLimit } from "@/lib/security/rate-limit";
import { isSameOrigin } from "@/lib/security/request";

const schema = z.object({
  jobDescription: z.string().trim().min(80, "Paste the full job description first.").max(20000),
});

export async function POST(req: Request) {
  if (!isSameOrigin(req))
    return NextResponse.json({ ok: false, error: "Cross-site request blocked." }, { status: 403 });
  const rl = rateLimit(`jd:${clientIp(req)}`, 10, 60 * 60_000);
  if (!rl.ok)
    return NextResponse.json(
      {
        ok: false,
        error: "You've used the assistant a lot this hour. Fill the form manually, or try later.",
      },
      { status: 429 },
    );

  const parsed = await parseJson(req, schema);
  if ("response" in parsed) return parsed.response;

  const brief = await jdToBrief(parsed.data.jobDescription);
  return NextResponse.json({ ok: true, brief }, { headers: noStore });
}
