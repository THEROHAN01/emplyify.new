import { beforeEach, describe, expect, it } from "vitest";
import { rateLimit, resetRateLimits } from "@/lib/security/rate-limit";
import { validateCv } from "@/lib/security/upload";

const PDF = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31]);
const ZIP = new Uint8Array([0x50, 0x4b, 0x03, 0x04]);
const EXE = new Uint8Array([0x4d, 0x5a, 0x90, 0x00]);

describe("validateCv", () => {
  it("accepts real PDFs and DOCX files", () => {
    expect(validateCv("cv.pdf", 1000, PDF)).toMatchObject({ ok: true, kind: "pdf" });
    expect(validateCv("CV.DOCX", 1000, ZIP)).toMatchObject({ ok: true, kind: "docx" });
  });

  it("rejects renamed executables, wrong extensions, empty and oversized files", () => {
    expect(validateCv("cv.pdf", 1000, EXE).ok).toBe(false);
    expect(validateCv("cv.exe", 1000, EXE).ok).toBe(false);
    expect(validateCv("cv.pdf", 0, PDF).ok).toBe(false);
    expect(validateCv("cv.pdf", 6 * 1024 * 1024, PDF).ok).toBe(false);
  });
});

describe("rateLimit", () => {
  beforeEach(() => resetRateLimits());

  it("allows up to the limit within a window, then blocks with retry-after", () => {
    const now = 1_000_000;
    for (let i = 0; i < 3; i++) expect(rateLimit("k", 3, 60_000, now).ok).toBe(true);
    const blocked = rateLimit("k", 3, 60_000, now + 1000);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(59);
  });

  it("resets after the window", () => {
    const now = 2_000_000;
    for (let i = 0; i < 4; i++) rateLimit("k2", 3, 60_000, now);
    expect(rateLimit("k2", 3, 60_000, now + 60_001).ok).toBe(true);
  });
});
