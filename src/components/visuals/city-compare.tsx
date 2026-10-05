import Link from "next/link";
import type { City, RolePage } from "@/content/types";
import { citySalaryBands } from "@/lib/content";

/**
 * Side-by-side GCC hub comparison from real content: clusters plus the
 * senior band for a reference role, drawn on one shared axis so the cities
 * are directly comparable.
 */
export function CityCompare({ cities, role }: { cities: City[]; role: RolePage }) {
  const rows = cities.map((c) => ({
    city: c,
    band: citySalaryBands(role.salaryBands, c).find((b) => b.seniority === "senior")!,
  }));
  const axisMax = Math.ceil(Math.max(...rows.map((r) => r.band.maxLpa)) / 10) * 10;
  const pct = (v: number) => `${(v / axisMax) * 100}%`;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {rows.map(({ city, band }) => (
        <article
          key={city.slug}
          className="group border-line bg-surface hover:border-ink/20 relative flex flex-col rounded-2xl border p-6 transition-[border-color,box-shadow] duration-200 hover:shadow-[0_12px_32px_-16px_rgba(11,27,51,0.25)]"
        >
          <p className="text-muted text-sm">{city.state}</p>
          <h3 className="mt-0.5 text-2xl font-bold">
            <Link href={`/gcc/${city.slug}`} className="after:absolute after:inset-0">
              {city.name}
            </Link>
          </h3>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`GCC clusters in ${city.name}`}>
            {city.gccClusters.slice(0, 3).map((c) => (
              <li key={c.name} className="bg-bg rounded-full px-2.5 py-0.5 text-[13px] font-medium">
                {c.name}
              </li>
            ))}
          </ul>
          <div className="border-line mt-6 border-t pt-5">
            <p className="text-muted text-xs font-medium">
              Senior {role.singular.toLowerCase()} · fixed CTC
            </p>
            <p className="tabular mt-1 text-xl font-bold">
              ₹{band.minLpa}–{band.maxLpa} LPA
            </p>
            <div className="bg-bg relative mt-3 h-2.5 rounded-full" aria-hidden>
              <span
                className="bg-accent absolute inset-y-0 rounded-[4px]"
                style={{ left: pct(band.minLpa), width: pct(band.maxLpa - band.minLpa) }}
              />
            </div>
            <div className="text-muted mt-1 flex justify-between text-[11px]" aria-hidden>
              <span>0</span>
              <span>{axisMax} LPA</span>
            </div>
          </div>
          <p className="text-accent mt-6 text-sm font-semibold">GCC hiring in {city.name} →</p>
        </article>
      ))}
    </div>
  );
}
