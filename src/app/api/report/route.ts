import { NextResponse } from "next/server";
import { processReportRequest } from "@/lib/candidates/pipeline";
import { getInsight } from "@/lib/content";
import { reportSchema } from "@/lib/leads/schema";
import { noStore, parseJson } from "@/lib/security/api";
import { guardFormRequest } from "@/lib/security/guard";
import { clientIp, hashIp } from "@/lib/security/request";

export async function POST(req: Request) {
  const parsed = await parseJson(req, reportSchema);
  if ("response" in parsed) return parsed.response;
  const { data } = parsed;

  const report = getInsight(data.reportSlug);
  if (!report || !report.gated) {
    return NextResponse.json(
      { ok: false, error: "That report isn't available. Refresh the page and try again." },
      { status: 404 },
    );
  }

  const blocked = await guardFormRequest(req, {
    name: "report",
    limit: 8,
    turnstileToken: data.turnstileToken,
    honeypot: data.website,
  });
  if (blocked) return blocked;

  const { ref } = await processReportRequest(
    data,
    {
      slug: report.slug,
      title: report.title,
      available: report.release === "available",
      releaseLabel: report.releaseLabel,
    },
    { ipHash: hashIp(clientIp(req)) },
  );
  return NextResponse.json({ ok: true, ref, release: report.release }, { headers: noStore });
}
