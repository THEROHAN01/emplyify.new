import { NextResponse } from "next/server";
import { z } from "zod";
import { answerFeedback, prepQuestions } from "@/lib/ai/interview-prep";
import { ROLE_FAMILIES, SENIORITIES } from "@/lib/leads/schema";
import { noStore, parseJson } from "@/lib/security/api";
import { clientIp, isSameOrigin } from "@/lib/security/request";
import { rateLimit } from "@/lib/security/rate-limit";

const schema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("questions"),
    family: z.enum(ROLE_FAMILIES),
    seniority: z.enum(SENIORITIES),
    jobSlug: z.string().max(120).optional(),
  }),
  z.object({
    mode: z.literal("feedback"),
    family: z.enum(ROLE_FAMILIES),
    seniority: z.enum(SENIORITIES),
    jobSlug: z.string().max(120).optional(),
    question: z.string().trim().min(5).max(500),
    answer: z
      .string()
      .trim()
      .min(20, "Write at least a couple of sentences so we can give useful feedback.")
      .max(4000),
  }),
]);

export async function POST(req: Request) {
  if (!isSameOrigin(req))
    return NextResponse.json({ ok: false, error: "Cross-site request blocked." }, { status: 403 });
  const rl = rateLimit(`prep:${clientIp(req)}`, 30, 60 * 60_000);
  if (!rl.ok)
    return NextResponse.json(
      {
        ok: false,
        error: "That's a lot of practice for one hour — take a break and come back soon.",
      },
      { status: 429 },
    );

  const parsed = await parseJson(req, schema);
  if ("response" in parsed) return parsed.response;
  const d = parsed.data;

  if (d.mode === "questions") {
    const result = await prepQuestions({
      family: d.family,
      seniority: d.seniority,
      jobSlug: d.jobSlug,
    });
    return NextResponse.json({ ok: true, ...result }, { headers: noStore });
  }
  const result = await answerFeedback(d);
  return NextResponse.json({ ok: true, ...result }, { headers: noStore });
}
