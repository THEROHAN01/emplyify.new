import { cn } from "@/lib/utils/cn";

/** Stat block: number, label and a method footnote (every stat states its source). */
export function Stat({
  value,
  label,
  footnote,
  pending,
  className,
}: {
  value: string | null;
  label: string;
  footnote: string;
  pending?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      {value ? (
        <span className="tabular text-ink text-[2rem] leading-tight font-bold tracking-tight">
          {value}
        </span>
      ) : (
        <span className="text-muted text-lg leading-tight font-semibold">{pending}</span>
      )}
      <span className="mt-2 font-semibold">{label}</span>
      <span className="text-muted mt-1 text-sm">{footnote}</span>
    </div>
  );
}
