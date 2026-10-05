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
        <span className="tabular text-accent font-mono text-3xl font-bold">{value}</span>
      ) : (
        <span className="text-warn text-base font-semibold">{pending}</span>
      )}
      <span className="mt-1 font-semibold">{label}</span>
      <span className="text-muted mt-1 text-sm">{footnote}</span>
    </div>
  );
}
