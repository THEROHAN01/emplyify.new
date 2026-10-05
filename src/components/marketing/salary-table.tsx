import type { SalaryBand } from "@/content/types";
import { formatLpaRange } from "@/lib/utils/format";

const labels: Record<SalaryBand["seniority"], string> = {
  junior: "Junior",
  mid: "Mid",
  senior: "Senior",
  lead: "Lead / manager",
};

export function SalaryTable({ bands, caption }: { bands: SalaryBand[]; caption: string }) {
  return (
    <div className="border-line bg-surface overflow-x-auto rounded-2xl border">
      <table className="w-full text-left text-sm sm:text-base">
        <caption className="text-muted px-6 pt-4 text-left text-sm">{caption}</caption>
        <thead>
          <tr className="border-line border-b">
            <th scope="col" className="px-6 py-3 font-semibold">
              Level
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Experience
            </th>
            <th scope="col" className="px-6 py-3 font-semibold">
              Fixed CTC
            </th>
          </tr>
        </thead>
        <tbody>
          {bands.map((b) => (
            <tr key={b.seniority} className="border-line border-b last:border-0">
              <th scope="row" className="px-6 py-3 font-semibold">
                {labels[b.seniority]}
              </th>
              <td className="text-muted px-6 py-3">{b.years}</td>
              <td className="tabular px-6 py-3 font-semibold">
                {formatLpaRange(b.minLpa, b.maxLpa)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const SALARY_FOOTNOTE =
  "Indicative ranges compiled by Emplyify from market data, Q4 2026. They are a starting point for budgeting, not an offer benchmark; our Talent Index will replace them with pipeline data.";
