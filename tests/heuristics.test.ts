import { describe, expect, it } from "vitest";
import { detectFamily, detectSeniority, extractSkills, heuristicBrief } from "@/lib/ai/heuristics";

const JD = `Senior Data Engineer
Location: Pune (Hybrid)
We are looking for a data engineer with 6+ years of experience building pipelines in Spark and Airflow on Databricks.
Strong SQL, Python and AWS required. Kafka is a plus.`;

describe("JD heuristics (AI fallback)", () => {
  it("extracts skills from the lexicon", () => {
    expect(extractSkills(JD)).toEqual(
      expect.arrayContaining(["Spark", "Airflow", "Databricks", "SQL", "Python", "AWS", "Kafka"]),
    );
    expect(extractSkills("We use Go and React")).toEqual(expect.arrayContaining(["Go", "React"]));
    expect(extractSkills("Good communication")).not.toContain("Go");
  });

  it("detects family and seniority", () => {
    expect(detectFamily(JD)).toBe("data");
    expect(detectSeniority(JD)).toBe("senior");
    expect(detectSeniority("Engineering Manager, 12 years")).toBe("lead");
    expect(detectSeniority("1-2 years experience")).toBe("junior");
  });

  it("produces a Pune-adjusted budget suggestion", () => {
    const b = heuristicBrief(JD);
    expect(b.roleTitle).toBe("Senior Data Engineer");
    expect(b.location).toBe("Pune");
    expect(b.suggestedBudgetMinLpa).toBe(Math.round(28 * 0.95));
    expect(b.source).toBe("heuristic");
  });
});
