import { cn } from "@/lib/utils/cn";

const palette = ["#00c2ff", "#007dfb", "#740cf5", "#ff9702", "#01bfa3"];

/**
 * A ring of small people in the logo's five colours: the Emplyify mark
 * ("five people joined in a circle") repeated as a slow-turning motif.
 * Decorative only. The spin stops for visitors who prefer reduced motion.
 */
export function PeopleRing({
  count = 30,
  size = 640,
  mono,
  className,
}: {
  count?: number;
  size?: number;
  /** Single colour (e.g. "rgba(255,255,255,0.35)") instead of the brand palette. */
  mono?: string;
  className?: string;
}) {
  const r = 280;
  return (
    <svg
      aria-hidden
      viewBox="-320 -320 640 640"
      width={size}
      height={size}
      className={cn("motion-safe:animate-[spin_60s_linear_infinite]", className)}
    >
      {Array.from({ length: count }, (_, i) => {
        const a = (i / count) * 360;
        const fill = mono ?? palette[i % palette.length];
        return (
          <g key={i} transform={`rotate(${a}) translate(0 ${-r})`}>
            <circle cx="0" cy="-14" r="9" fill={fill} />
            <path d="M-14 12c0-11 6-18 14-18s14 7 14 18z" fill={fill} />
          </g>
        );
      })}
    </svg>
  );
}
