import { describe, expect, it } from "vitest";
import { briefSchema, fieldErrors, talentNetworkSchema } from "@/lib/leads/schema";
import { validBrief } from "./fixtures";

describe("briefSchema", () => {
  it("accepts a valid brief and coerces numbers", () => {
    const r = briefSchema.parse(validBrief);
    expect(r.openings).toBe(2);
    expect(r.budgetMaxLpa).toBe(40);
  });

  it("requires the upper budget ≥ lower budget", () => {
    const r = briefSchema.safeParse({ ...validBrief, budgetMinLpa: "50", budgetMaxLpa: "40" });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error).budgetMaxLpa).toMatch(/at least/);
  });

  it("requires consent and at least one skill, with one-line fix messages", () => {
    const r = briefSchema.safeParse({ ...validBrief, consent: false, mustHaveSkills: [] });
    expect(r.success).toBe(false);
    if (!r.success) {
      const errs = fieldErrors(r.error);
      expect(errs.consent).toBeTruthy();
      expect(errs.mustHaveSkills).toMatch(/at least one/);
    }
  });

  it("rejects invalid phone numbers", () => {
    expect(briefSchema.safeParse({ ...validBrief, phone: "abc" }).success).toBe(false);
  });
});

describe("talentNetworkSchema", () => {
  it("accepts an empty optional LinkedIn but rejects a non-URL", () => {
    const base = {
      name: "Ravi",
      email: "ravi@example.com",
      roleFamily: "ai-ml",
      yearsExperience: "5",
      city: "Pune",
      noticeDays: "60",
      consent: true,
      linkedin: "",
    };
    expect(talentNetworkSchema.safeParse(base).success).toBe(true);
    expect(talentNetworkSchema.safeParse({ ...base, linkedin: "linkedin.com/in/x" }).success).toBe(
      false,
    );
  });
});
