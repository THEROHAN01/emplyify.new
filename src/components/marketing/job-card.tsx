import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Job, RoleFamilySlug } from "@/content/types";
import { cityName } from "@/lib/content";
import { formatLpaRange } from "@/lib/utils/format";

const familyTile: Record<RoleFamilySlug, string> = {
  "ai-ml": "AI",
  data: "DE",
  "cloud-devops": "OP",
  "full-stack": "FS",
  embedded: "EM",
  product: "PM",
};

const postedFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  timeZone: "Asia/Kolkata",
});

/** Job listing row: company tile, title, company · location, salary, meta. */
export function JobCard({ job }: { job: Job }) {
  return (
    <article className="group border-line bg-surface hover:border-ink/20 relative flex h-full gap-4 rounded-2xl border p-5 transition-[border-color,box-shadow] duration-200 hover:shadow-[0_12px_32px_-16px_rgba(11,27,51,0.25)]">
      <span
        aria-hidden
        className="bg-bg text-ink flex size-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
      >
        {familyTile[job.roleFamily]}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-muted truncate text-sm">
          {job.company.descriptor}
          {!job.company.disclosed && " · confidential"}
        </p>
        <h3 className="mt-0.5 text-[17px] leading-snug font-bold">
          <Link
            href={`/jobs/${job.slug}`}
            className="group-hover:underline after:absolute after:inset-0"
          >
            {job.title}
          </Link>
        </h3>
        <p className="text-muted mt-0.5 text-sm">
          {cityName(job.city)} · {job.workMode}
        </p>
        <p className="tabular mt-3 font-semibold">
          {formatLpaRange(job.salary.minLpa, job.salary.maxLpa)}{" "}
          <span className="text-muted text-sm font-normal">fixed</span>
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {job.status === "draft" && <Badge tone="draft">Draft preview</Badge>}
          <Badge>
            {job.experienceYears.min}–{job.experienceYears.max} yrs
          </Badge>
          {job.stack.slice(0, 2).map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
          <span className="text-muted ml-auto text-xs">
            Posted {postedFmt.format(new Date(job.postedAt))}
          </span>
        </div>
      </div>
    </article>
  );
}
