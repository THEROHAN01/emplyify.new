import { comparison } from "@/content/company";

/** Emplyify vs a typical agency vs in-house. Market columns describe common practice, not named firms. */
export function ComparisonTable() {
  return (
    <div className="border-line bg-surface overflow-x-auto rounded-2xl border">
      <table className="w-full min-w-[640px] text-left">
        <thead>
          <tr className="border-line border-b">
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Criterion</span>
            </th>
            <th scope="col" className="bg-accent-soft text-accent px-6 py-3">
              Emplyify
            </th>
            <th scope="col" className="px-6 py-3">
              Typical agency
            </th>
            <th scope="col" className="px-6 py-3">
              In-house only
            </th>
          </tr>
        </thead>
        <tbody>
          {comparison.map((r) => (
            <tr key={r.row} className="border-line border-b last:border-0">
              <th scope="row" className="px-6 py-3 font-semibold">
                {r.row}
              </th>
              <td className="bg-accent-soft/60 px-6 py-3 font-semibold">{r.emplyify}</td>
              <td className="text-muted px-6 py-3">{r.agency}</td>
              <td className="text-muted px-6 py-3">{r.inhouse}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
