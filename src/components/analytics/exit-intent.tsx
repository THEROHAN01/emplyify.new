"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { track } from "@/lib/analytics/events";

const KEY = "emplyify_exit_intent_shown";
const EMPLOYER_PREFIXES = ["/", "/pricing", "/how-it-works", "/services", "/hire", "/gcc", "/case-studies"];

/** Desktop-only, once per session, employer pages only: offer the sample shortlist. */
export function ExitIntent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const employerPage = EMPLOYER_PREFIXES.some((p) => (p === "/" ? pathname === "/" : pathname.startsWith(p)));

  useEffect(() => {
    if (!employerPage) return;
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return;
    let shown = false;
    try {
      shown = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (shown) return;

    const armAt = Date.now() + 8000; // don't fire on quick bounces
    const onLeave = (e: MouseEvent) => {
      if (e.clientY > 0 || e.relatedTarget || Date.now() < armAt) return;
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      setOpen(true);
      document.removeEventListener("mouseout", onLeave);
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, [employerPage]);

  useEffect(() => {
    const d = dialogRef.current;
    if (open && d && !d.open) d.showModal();
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setOpen(false)}
      aria-labelledby="exit-title"
      className="m-auto max-w-md rounded-[12px] border border-line bg-surface p-6 text-ink shadow-2xl backdrop:bg-black/40"
    >
      <h2 id="exit-title" className="font-display text-xl font-bold">
        Before you go — see what you'd get
      </h2>
      <p className="mt-2 text-muted">
        Look at a sample shortlist dossier: three anonymised candidates, evidence for every must-have, and a recruiter's sign-off.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href="/sample-shortlist"
          className={buttonClasses("primary")}
          onClick={() => {
            track("cta_click", { cta_name: "View a sample shortlist", page: pathname, position: "exit_intent" });
            setOpen(false);
          }}
        >
          View a sample shortlist
        </Link>
        <button type="button" className={buttonClasses("ghost")} onClick={() => dialogRef.current?.close()}>
          No thanks
        </button>
      </div>
    </dialog>
  );
}
