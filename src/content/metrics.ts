/**
 * Live proof metrics. Principle 4: no unverifiable stats at launch.
 * A metric with value `null` renders as a "publishing after N shortlists"
 * placeholder. Update these from the ATS once real data exists (target: an
 * automated job writing to Supabase and read at build/ISR time).
 */
export interface ProofMetric {
  id: string;
  label: string;
  value: string | null;
  /** Shown under the number: how it is measured. */
  method: string;
  /** Shown while value is null. */
  pending: string;
}

export const proofMetrics: ProofMetric[] = [
  {
    id: "median-shortlist",
    label: "Median brief → shortlist",
    value: null,
    method: "Median hours from confirmed brief to verified shortlist, trailing 90 days.",
    pending: "Live after our first 10 shortlists",
  },
  {
    id: "hires",
    label: "Hires made",
    value: null,
    method: "Candidates who joined a client, all time.",
    pending: "Published from our first hire",
  },
  {
    id: "retention",
    label: "Still in role after 90 days",
    value: null,
    method: "Share of hires still employed 90 days after joining.",
    pending: "Published after 90 days of hires",
  },
];

/** Logos require written permission. Empty until approved. */
export const clientLogos: { name: string; src: string; width: number; height: number }[] = [];
