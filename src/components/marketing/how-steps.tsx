"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

type Step = { step: string; when: string; detail: string };

/**
 * "How it works": a sticky label bar with a live step counter, a large
 * statement, then the steps revealing one by one as they scroll into view.
 */
export function HowSteps({ steps, title, intro }: { steps: Step[]; title: string; intro: string }) {
  const [seen, setSeen] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = Number((e.target as HTMLElement).dataset.index);
          setSeen((s) => Math.max(s, i + 1));
        }
      },
      { threshold: 0.4 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="how" className="border-line border-b bg-white">
      <div className="border-line bg-surface sticky top-16 z-10 border-b">
        <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between px-5 md:px-10">
          <p className="label text-accent">How it works</p>
          <p className="label text-muted tabular" aria-hidden>
            {seen} / {steps.length}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-5 py-24 text-center md:px-10 lg:py-36">
        <h2 id="how" className="text-[2.75rem] sm:text-6xl lg:text-[5rem]">
          {title}
        </h2>
        <p className="text-muted mx-auto mt-6 max-w-xl text-lg">{intro}</p>
      </div>
      <ol className="border-line mx-auto grid max-w-[1440px] border-t sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li
            key={s.step}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className={cn(
              "border-line border-b px-5 py-10 transition-[opacity,translate] duration-700 ease-out sm:border-r md:px-10 lg:py-14",
              "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
              i < seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
          >
            <p className="font-display text-accent text-5xl">{i + 1}</p>
            <h3 className="mt-4 text-4xl lg:text-5xl">{s.step}</h3>
            <p className="label text-muted mt-5">{s.when}</p>
            <p className="text-muted mt-3 max-w-sm text-[15px]">{s.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
