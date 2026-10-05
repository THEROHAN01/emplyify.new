import { describe, expect, it } from "vitest";
import { isFreeEmail } from "@/lib/leads/free-email";
import { scoreBrief } from "@/lib/leads/scoring";

const base = {
  companyType: "Product company" as const,
  openings: 1,
  seniority: "mid" as const,
  workEmail: "em@acme.io",
  budgetMaxLpa: 30,
};

describe("scoreBrief", () => {
  it("routes GCCs to the Talent Pod track as hot", () => {
    const s = scoreBrief({ ...base, companyType: "GCC" });
    expect(s.track).toBe("talent-pod");
    expect(s.temperature).toBe("hot");
  });

  it("routes 5+ openings to the Talent Pod track", () => {
    expect(scoreBrief({ ...base, openings: 5 }).track).toBe("talent-pod");
  });

  it("routes 1–4 openings at non-GCCs to per-hire", () => {
    const s = scoreBrief({ ...base, openings: 4 });
    expect(s.track).toBe("per-hire");
    expect(s.temperature).toBe("warm");
  });

  it("penalises personal email and clamps to 0–100", () => {
    const personal = scoreBrief({ ...base, workEmail: "x@gmail.com" });
    expect(personal.score).toBeLessThan(scoreBrief(base).score);
    const max = scoreBrief({
      ...base,
      companyType: "GCC",
      openings: 50,
      seniority: "lead",
      budgetMaxLpa: 90,
    });
    expect(max.score).toBeLessThanOrEqual(100);
  });
});

describe("isFreeEmail", () => {
  it("detects consumer domains case-insensitively", () => {
    expect(isFreeEmail("A@Gmail.com")).toBe(true);
    expect(isFreeEmail("a@rediffmail.com")).toBe(true);
    expect(isFreeEmail("a@acme.in")).toBe(false);
  });
});
