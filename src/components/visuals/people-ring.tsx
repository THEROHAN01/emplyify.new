"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";

const palette = ["#00c2ff", "#007dfb", "#740cf5", "#ff9702", "#01bfa3"];

/**
 * The logo idea, "people joined in a circle": small figures (head and
 * shoulders) evenly spaced round a ring, cycling the logo's five colours.
 */
function Ring({ count, mono }: { count: number; mono?: string }) {
  const r = 280;
  return (
    <svg viewBox="-320 -320 640 640" className="size-full overflow-visible" aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const fill = mono ?? palette[i % palette.length];
        return (
          <g key={i} transform={`rotate(${(i / count) * 360}) translate(0 ${-r})`}>
            <circle cx="0" cy="-14" r="9" fill={fill} />
            <path d="M-14 12c0-11 6-18 14-18s14 7 14 18z" fill={fill} />
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Corner ring that grows from 40% to full size as its section scrolls into
 * view (anchored on the corner it sits in) and turns slowly while visible.
 * Static, full size and still for visitors who prefer reduced motion.
 */
export function GrowingRing({
  corner = "top-right",
  count = 30,
  mono,
  opacity = 0.6,
  className,
}: {
  corner?: "top-right" | "bottom-left";
  opacity?: number;
  count?: number;
  mono?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.closest("section");
    if (!el || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--ring-scale", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section's top reaches the bottom of the screen, 1 once it is near the top.
      const t = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.9)));
      const eased = 1 - Math.pow(1 - t, 3);
      el.style.setProperty("--ring-scale", (0.4 + 0.6 * eased).toFixed(3));
      el.style.setProperty("--ring-play", r.bottom > 0 && r.top < vh ? "running" : "paused");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const topRight = corner === "top-right";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "absolute size-[26rem] sm:size-[36rem] lg:size-[40rem]",
          topRight ? "-top-[9rem] -right-[10rem] sm:-top-[13rem] sm:-right-[8rem]" : "-bottom-[14rem] -left-[12rem]",
          className,
        )}
        style={{
          opacity,
          transform: "scale(var(--ring-scale, 0.4))",
          transformOrigin: topRight ? "calc(100% - 9rem) 12rem" : "12rem calc(100% - 14rem)",
          willChange: "transform",
        }}
      >
        <div
          className="size-full animate-[spin_38s_linear_infinite] motion-reduce:animate-none"
          style={{ animationPlayState: "var(--ring-play, paused)" }}
        >
          <Ring count={count} mono={mono} />
        </div>
      </div>
    </div>
  );
}

/** Static ring for places without scroll growth. */
export function PeopleRing({ className, mono, count = 30 }: { className?: string; mono?: string; count?: number }) {
  return (
    <div aria-hidden className={className}>
      <Ring count={count} mono={mono} />
    </div>
  );
}
