import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Job } from "@/content/types";
import { cityName } from "@/lib/content";
import { formatLpaRange } from "@/lib/utils/format";

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="group border-line bg-surface hover:border-accent relative flex h-full flex-col rounded-[12px] border p-5 transition-colors">
      <div className="flex flex-wrap gap-2">
        {job.status === "draft" && <Badge tone="draft">Draft preview</Badge>}
        <Badge>{job.workMode}</Badge>
      </div>
      <h3 className="mt-3 text-lg font-bold">
        <Link href={`/jobs/${job.slug}`} className="after:absolute after:inset-0">
          {job.title}
        </Link>
      </h3>
      <p className="text-muted text-sm">
        {job.company.disclosed
          ? job.company.descriptor
          : `${job.company.descriptor} (confidential)`}{" "}
        · {cityName(job.city)}
      </p>
      <p className="tabular text-accent mt-3 font-mono font-bold">
        {formatLpaRange(job.salary.minLpa, job.salary.maxLpa)}
      </p>
      <p className="text-muted text-sm">
        {job.experienceYears.min}–{job.experienceYears.max} yrs · {job.stack.slice(0, 3).join(", ")}
      </p>
    </article>
  );
}
