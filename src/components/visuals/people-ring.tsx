"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";

const palette = ["#00c2ff", "#007dfb", "#740cf5", "#ff9702", "#01bfa3"];

/**
 * The logo idea, "people joined in a circle", drawn as a ring: each figure is
 * a head above a curved body that reaches round to its neighbours, so the
 * bodies form one continuous chain.
 */
function Ring({ count, mono }: { count: number; mono?: string }) {
  const R = 236; // radius of the body chain
  const step = (2 * Math.PI) / count;
  const gap = step * 0.3;
  return (
    <svg viewBox="-320 -320 640 640" className="size-full overflow-visible" aria-hidden>
      <circle r={R - 58} fill="none" stroke={mono ?? "#ffffff"} strokeOpacity="0.22" strokeDasharray="1 9" strokeLinecap="round" strokeWidth="2" />
      {Array.from({ length: count }, (_, i) => {
        const a0 = i * step + gap / 2;
        const a1 = (i + 1) * step - gap / 2;
        const mid = (a0 + a1) / 2;
        const color = mono ?? palette[i % palette.length];
        const p = (a: number, r: number) => `${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`;
        // Body: a thick arc segment with round ends.
        const body = `M ${p(a0, R)} A ${R} ${R} 0 0 1 ${p(a1, R)}`;
        return (
          <g key={i}>
            <path d={body} stroke={color} strokeWidth="30" strokeLinecap="round" fill="none" />
            <circle
              cx={Math.cos(mid) * (R + 50)}
              cy={Math.sin(mid) * (R + 50)}
              r="21"
              fill={color}
            />
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
  count = 12,
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
export function PeopleRing({ className, mono, count = 12 }: { className?: string; mono?: string; count?: number }) {
  return (
    <div aria-hidden className={className}>
      <Ring count={count} mono={mono} />
    </div>
  );
}
