import "server-only";
import { NextResponse } from "next/server";
import type { z } from "zod";
import { fieldErrors } from "@/lib/leads/schema";

const MAX_JSON_BYTES = 64 * 1024;

/** Read + validate a JSON body. Returns parsed data or a 400/413 response. */
export async function parseJson<S extends z.ZodType>(
  req: Request,
  schema: S,
): Promise<{ data: z.infer<S>; raw: Record<string, unknown> } | { response: NextResponse }> {
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_JSON_BYTES) {
    return {
      response: NextResponse.json(
        { ok: false, error: "That's too much text. Shorten it and try again." },
        { status: 413 },
      ),
    };
  }
  let raw: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > MAX_JSON_BYTES) throw new Error("too large");
    raw = JSON.parse(text);
  } catch {
    return {
      response: NextResponse.json(
        { ok: false, error: "We couldn't read that request. Refresh the page and try again." },
        { status: 400 },
      ),
    };
  }
  const result = schema.safeParse(raw);
  if (!result.success) {
    return {
      response: NextResponse.json(
        {
          ok: false,
          error: "Check the highlighted fields.",
          fieldErrors: fieldErrors(result.error),
        },
        { status: 400 },
      ),
    };
  }
  return { data: result.data, raw };
}

export const noStore = { "cache-control": "no-store" };
