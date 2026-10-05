import { GST_RATE, perHireFees } from "@/content/pricing";
import type { Seniority } from "@/content/types";

export interface FeeEstimate {
  seniority: Seniority;
  ctcInr: number;
  percent: number;
  months: number;
  feeInr: number;
  gstInr: number;
  totalInr: number;
}

export const LPA = 100_000;

/** Fee = % of annual fixed CTC by seniority, GST on top. Pure, unit-tested. */
export function estimateFee(seniority: Seniority, ctcLpa: number): FeeEstimate {
  if (!Number.isFinite(ctcLpa) || ctcLpa <= 0) {
    throw new RangeError("CTC must be a positive number of lakhs per annum");
  }
  const { percent, months } = perHireFees[seniority];
  const ctcInr = ctcLpa * LPA;
  const feeInr = Math.round((ctcInr * percent) / 100);
  const gstInr = Math.round(feeInr * GST_RATE);
  return { seniority, ctcInr, percent, months, feeInr, gstInr, totalInr: feeInr + gstInr };
}

/** Map years of experience to the fee seniority tier. */
export function seniorityFromYears(years: number): Seniority {
  if (years < 3) return "junior";
  if (years < 6) return "mid";
  if (years < 10) return "senior";
  return "lead";
}
