import { NextResponse } from "next/server";
import { processApplication } from "@/lib/candidates/pipeline";
import { getJob } from "@/lib/content";
import { applicationSchema, attributionSchema, fieldErrors } from "@/lib/leads/schema";
import { noStore } from "@/lib/security/api";
import { guardFormRequest } from "@/lib/security/guard";
import { clientIp, hashIp } from "@/lib/security/request";
import { MAX_CV_BYTES, validateCv } from "@/lib/security/upload";

/** One-step application: multipart form with optional CV (or LinkedIn). */
export async function POST(req: Request) {
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_CV_BYTES + 64 * 1024) {
    return NextResponse.json(
      {
        ok: false,
        fieldErrors: { cv: "Your CV must be under 5 MB." },
        error: "Your CV must be under 5 MB.",
      },
      { status: 413 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't read that upload. Try again." },
      { status: 400 },
    );
  }

  const fields = Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === "string"));
  const parsed = applicationSchema.safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const job = getJob(data.jobSlug);
  if (!job)
    return NextResponse.json(
      { ok: false, error: "This role has closed. Browse other open roles." },
      { status: 404 },
    );

  const blocked = await guardFormRequest(req, {
    name: "apply",
    limit: 6,
    turnstileToken: data.turnstileToken,
    honeypot: data.website,
  });
  if (blocked) return blocked;

  const file = form.get("cv");
  let cv: Parameters<typeof processApplication>[1] = null;
  if (file instanceof File && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const check = validateCv(file.name, file.size, new Uint8Array(bytes.slice(0, 8)));
    if (!check.ok)
      return NextResponse.json(
        { ok: false, error: check.error, fieldErrors: { cv: check.error } },
        { status: 400 },
      );
    cv = { bytes, kind: check.kind, mime: check.mime };
  } else if (!data.linkedin) {
    const msg = "Upload your CV or add your LinkedIn URL — one is enough.";
    return NextResponse.json({ ok: false, error: msg, fieldErrors: { cv: msg } }, { status: 400 });
  }

  let attribution = {};
  try {
    attribution = attributionSchema.parse(JSON.parse(data.attribution ?? "{}"));
  } catch {
    /* ignore malformed attribution */
  }

  const { ref } = await processApplication(
    data,
    cv,
    { slug: job.slug, title: job.title },
    { ipHash: hashIp(clientIp(req)), attribution },
  );
  return NextResponse.json({ ok: true, ref }, { headers: noStore });
}
