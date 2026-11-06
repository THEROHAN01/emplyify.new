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

/**
 * Partner logos shown under the proof bar. Each requires written permission
 * from the company. Display sizes are optically balanced (square marks taller,
 * wide wordmarks capped at ~150px) from 96px-tall sources in /public/partners.
 */
export const clientLogos: { name: string; src: string; width: number; height: number }[] = [
  { name: "Bajaj", src: "/partners/bajaj.png", width: 40, height: 48 },
  { name: "Mastercard", src: "/partners/mastercard.png", width: 65, height: 40 },
  { name: "Cognizant", src: "/partners/cognizant.png", width: 151, height: 27 },
  { name: "Pratiti", src: "/partners/pratiti.png", width: 114, height: 40 },
  { name: "IBN Technologies", src: "/partners/ibn.png", width: 113, height: 40 },
  { name: "Biz4Solutions", src: "/partners/biz4solutions.png", width: 48, height: 48 },
  { name: "Patterns7", src: "/partners/patterns7.png", width: 40, height: 48 },
  { name: "BrillianTech", src: "/partners/brilliantech.png", width: 148, height: 25 },
  { name: "Uniwave Software", src: "/partners/uniwave.png", width: 151, height: 35 },
];
