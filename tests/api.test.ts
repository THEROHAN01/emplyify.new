import { beforeEach, describe, expect, it, vi } from "vitest";
import { resetRateLimits } from "@/lib/security/rate-limit";
import { validBrief } from "./fixtures";

// No integrations are configured in tests: every adapter must skip cleanly.
vi.spyOn(console, "info").mockImplementation(() => {});

const post = (url: string, body: unknown, headers: Record<string, string> = {}) =>
  new Request(`http://localhost:3000${url}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      host: "localhost:3000",
      "x-forwarded-for": "203.0.113.7",
      ...headers,
    },
    body: JSON.stringify(body),
  });

describe("POST /api/brief", async () => {
  const { POST } = await import("@/app/api/brief/route");
  beforeEach(() => resetRateLimits());

  it("accepts a valid brief and returns routing + SLA dates", async () => {
    const res = await POST(post("/api/brief", validBrief));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.ref).toMatch(/^EM-[A-Z0-9]{6}$/);
    expect(json.track).toBe("per-hire");
    expect(new Date(json.shortlistBy).getTime()).toBeGreaterThan(new Date(json.replyBy).getTime());
  });

  it("returns field errors for invalid input", async () => {
    const res = await POST(post("/api/brief", { ...validBrief, workEmail: "nope" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.fieldErrors.workEmail).toBeTruthy();
  });

  it("silently accepts honeypot submissions without processing", async () => {
    const res = await POST(post("/api/brief", { ...validBrief, website: "http://spam" }));
    const json = await res.json();
    expect(json).toEqual({ ok: true });
  });

  it("blocks cross-site posts", async () => {
    const res = await POST(post("/api/brief", validBrief, { origin: "https://evil.example" }));
    expect(res.status).toBe(403);
  });

  it("rate-limits repeated submissions", async () => {
    for (let i = 0; i < 5; i++) await POST(post("/api/brief", validBrief));
    const res = await POST(post("/api/brief", validBrief));
    expect(res.status).toBe(429);
    expect(res.headers.get("retry-after")).toBeTruthy();
  });

  it("rejects malformed JSON", async () => {
    const req = new Request("http://localhost:3000/api/brief", {
      method: "POST",
      headers: { host: "localhost:3000" },
      body: "{not json",
    });
    expect((await POST(req)).status).toBe(400);
  });
});

describe("POST /api/ai/jd-to-brief (no API key → heuristic fallback)", async () => {
  const { POST } = await import("@/app/api/ai/jd-to-brief/route");
  it("returns a structured brief", async () => {
    const jd =
      "Senior ML Engineer, Bengaluru. 7+ years. Python, PyTorch, LLM and RAG systems in production on AWS. You will own evaluation pipelines.";
    const res = await POST(post("/api/ai/jd-to-brief", { jobDescription: jd }));
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.brief.source).toBe("heuristic");
    expect(json.brief.roleFamily).toBe("ai-ml");
    expect(json.brief.mustHaveSkills).toEqual(expect.arrayContaining(["Python", "PyTorch"]));
  });
});
