"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Muted, looping background video under a navy overlay. Plays only while on
 * screen, never for visitors who prefer reduced motion (they see the poster).
 * Renders just the overlay when no source is configured.
 */
export function BgVideo({
  src,
  poster,
  overlay = "bg-navy/70",
  className,
}: {
  src?: string | null;
  poster?: string | null;
  overlay?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.1 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div aria-hidden className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      {src && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster ?? undefined}
          className="size-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className={cn("absolute inset-0", overlay)} />
    </div>
  );
}
