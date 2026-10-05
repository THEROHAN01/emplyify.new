import type { BriefInput } from "./schema";
import { isFreeEmail } from "./free-email";

export type LeadTrack = "talent-pod" | "per-hire";
export type LeadTemperature = "hot" | "warm";

export interface LeadScore {
  track: LeadTrack;
  temperature: LeadTemperature;
  score: number;
  reasons: string[];
}

/**
 * Playbook routing rule: GCC or 5+ roles = hot (Talent Pod track);
 * 1–4 roles = per-hire track. The numeric score orders the recruiter queue.
 */
export function scoreBrief(
  brief: Pick<BriefInput, "companyType" | "openings" | "seniority" | "workEmail" | "budgetMaxLpa">,
): LeadScore {
  const reasons: string[] = [];
  let score = 40;

  const isGcc = brief.companyType === "GCC";
  const isVolume = brief.openings >= 5;

  if (isGcc) {
    score += 30;
    reasons.push("GCC");
  }
  if (isVolume) {
    score += 25;
    reasons.push(`${brief.openings} openings`);
  } else if (brief.openings > 1) {
    score += 5 * (brief.openings - 1);
  }
  if (brief.seniority === "senior" || brief.seniority === "lead") {
    score += 10;
    reasons.push("senior role");
  }
  if (brief.budgetMaxLpa >= 40) score += 5;
  if (isFreeEmail(brief.workEmail)) {
    score -= 15;
    reasons.push("personal email");
  }

  const hot = isGcc || isVolume;
  return {
    track: hot ? "talent-pod" : "per-hire",
    temperature: hot ? "hot" : "warm",
    score: Math.max(0, Math.min(100, score)),
    reasons,
  };
}
