"use client";

import { useEffect, useRef, useState } from "react";
import { stepIllustrations } from "@/components/visuals/step-illustrations";
import { cn } from "@/lib/utils/cn";

type Step = { step: string; when: string; detail: string };

const clamp = (v: number) => Math.min(1, Math.max(0, v));

function StepCard({ s, i }: { s: Step; i: number }) {
  const Art = stepIllustrations[i];
  return (
    <>
      <div>
        <p className="font-display text-accent text-4xl">{i + 1}</p>
        <h3 className="mt-3 text-[1.6rem] leading-[1.05] [overflow-wrap:anywhere] xl:text-[1.9rem]">{s.step}</h3>
        <p className="label text-muted mt-4">{s.when}</p>
        <p className="text-muted mt-3 text-[15px]">{s.detail}</p>
      </div>
      {Art && (
        <div className="mx-auto mt-6 w-full max-w-[11rem]">
          <Art />
        </div>
      )}
    </>
  );
}

/**
 * "How it works". On large screens the section pins for several screen
 * heights: the statement shows first, then cross-fades into a row of step
 * cards that arrive one at a time while the counter ticks up. Small screens
 * and reduced-motion visitors get a plain list.
 */
export function HowSteps({ steps, title, intro }: { steps: Step[]; title: string; intro: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const f = frameRef.current;
      if (!section || !f) return;
      const total = section.offsetHeight - f.offsetHeight;
      setP(clamp((64 - section.getBoundingClientRect().top) / total));
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
  }, [pinned]);

  // Timeline: statement until 8%, grid fades in by 16%, then one card every 12%.
  const introOut = clamp((p - 0.06) / 0.08);
  const gridIn = clamp((p - 0.1) / 0.06);
  const shown = steps.filter((_, i) => p > 0.16 + i * 0.12).length;

  const bar = (count: number) => (
    <div className="border-line flex h-[53px] shrink-0 items-center justify-between border-b px-5 md:px-10">
      <p className="label text-accent">How it works</p>
      <p className="label text-muted tabular" aria-hidden>
        {count} / {steps.length}
      </p>
    </div>
  );

  if (!pinned) {
    return (
      <section aria-labelledby="how" className="border-line border-b bg-white">
        {bar(steps.length)}
        <div className="px-5 py-20 text-center md:px-10">
          <h2 id="how" className="text-[2.75rem] sm:text-6xl">
            {title}
          </h2>
          <p className="text-muted mx-auto mt-6 max-w-xl text-lg">{intro}</p>
        </div>
        <ol className="border-line grid border-t sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.step} className="border-line flex flex-col border-b px-5 py-10 sm:border-r md:px-8">
              <StepCard s={s} i={i} />
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section ref={sectionRef} aria-labelledby="how" className="border-line relative h-[420svh] border-b bg-white">
      <div ref={frameRef} className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col overflow-hidden">
        {bar(shown)}
        <div className="relative flex-1">
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center"
            style={{
              opacity: 1 - introOut,
              transform: `translateY(${-40 * introOut}px)`,
              pointerEvents: introOut > 0.5 ? "none" : undefined,
            }}
          >
            <h2 id="how" className="text-6xl lg:text-[5.5rem]">
              {title}
            </h2>
            <p className="text-muted mt-6 max-w-xl text-lg">{intro}</p>
          </div>

          <ol
            className="absolute inset-0 grid grid-cols-6"
            style={{ opacity: gridIn, visibility: gridIn === 0 ? "hidden" : undefined }}
          >
            {steps.map((s, i) => (
              <li
                key={s.step}
                className={cn(
                  "border-line flex flex-col justify-between border-r px-5 pt-10 pb-8 last:border-r-0 xl:px-7",
                  "transition-[opacity,translate] duration-700 ease-out",
                  i < shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                )}
              >
                <StepCard s={s} i={i} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
