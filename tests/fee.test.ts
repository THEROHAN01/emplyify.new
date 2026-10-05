import { describe, expect, it } from "vitest";
import { estimateFee, seniorityFromYears } from "@/lib/pricing/fee";

describe("estimateFee", () => {
  it("charges one month (8.33%) for junior roles", () => {
    const e = estimateFee("junior", 12);
    expect(e.percent).toBe(8.33);
    expect(e.feeInr).toBe(99_960);
    expect(e.gstInr).toBe(Math.round(99_960 * 0.18));
    expect(e.totalInr).toBe(e.feeInr + e.gstInr);
  });

  it("charges 12.5% for mid and 16.67% for senior and lead", () => {
    expect(estimateFee("mid", 20).feeInr).toBe(250_000);
    expect(estimateFee("senior", 40).feeInr).toBe(666_800);
    expect(estimateFee("lead", 60).percent).toBe(16.67);
  });

  it("rejects non-positive CTC", () => {
    expect(() => estimateFee("mid", 0)).toThrow(RangeError);
    expect(() => estimateFee("mid", Number.NaN)).toThrow(RangeError);
  });
});

describe("seniorityFromYears", () => {
  it.each([
    [1, "junior"],
    [3, "mid"],
    [6, "senior"],
    [12, "lead"],
  ])("%i years → %s", (years, tier) => expect(seniorityFromYears(years)).toBe(tier));
});
