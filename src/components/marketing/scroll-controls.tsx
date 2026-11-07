"use client";

/** Previous/next buttons for a horizontally scrolling row (the row hides its scrollbar). */
export function ScrollControls({ target, label }: { target: string; label: string }) {
  const move = (dir: 1 | -1) => {
    const el = document.getElementById(target);
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  const btn =
    "flex size-8 items-center justify-center border border-white/40 transition-colors hover:bg-white hover:text-accent";
  return (
    <div className="flex gap-2">
      <button type="button" className={btn} onClick={() => move(-1)} aria-label={`Previous ${label}`}>
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <path d="M9 2 4 7l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
      <button type="button" className={btn} onClick={() => move(1)} aria-label={`Next ${label}`}>
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <path d="m5 2 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
    </div>
  );
}
