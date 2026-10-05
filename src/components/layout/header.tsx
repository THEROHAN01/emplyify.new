"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { NavLink } from "@/content/navigation";
import type { Cta } from "@/content/types";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { track } from "@/lib/analytics/events";
import { cn } from "@/lib/utils/cn";
import { Logo } from "./logo";

function useDismiss(open: boolean, close: () => void, ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onClick = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && close();
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, close, ref]);
}

function MenuLinks({ links, onNavigate }: { links: NavLink[]; onNavigate: () => void }) {
  return (
    <ul className="space-y-1">
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} onClick={onNavigate} className="block rounded-lg px-3 py-2 hover:bg-accent-soft">
            <span className="font-semibold">{l.label}</span>
            {l.description && <span className="block text-sm text-muted">{l.description}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Dropdown({ label, children, wide }: { label: string; children: (close: () => void) => React.ReactNode; wide?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const close = () => setOpen(false);
  useDismiss(open, close, ref);
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-11 items-center gap-1 rounded-lg px-3 font-medium hover:text-accent"
      >
        {label}
        <span aria-hidden className={cn("text-xs transition-transform duration-200", open && "rotate-180")}>
          ▾
        </span>
      </button>
      <div
        id={id}
        hidden={!open}
        className={cn(
          "absolute left-0 top-full z-50 mt-2 rounded-[12px] border border-line bg-surface p-4 shadow-xl",
          wide ? "w-[min(760px,90vw)]" : "w-80",
        )}
      >
        {children(close)}
      </div>
    </div>
  );
}

export interface HeaderNav {
  hireMenu: { services: NavLink[]; roles: NavLink[] };
  gccMenu: NavLink[];
  primaryNav: NavLink[];
  ctas: { submitRole: Cta; joinNetwork: Cta };
}

export function HeaderClient({ hireMenu, gccMenu, primaryNav, ctas }: HeaderNav) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const isCandidatePage = pathname.startsWith("/jobs") || pathname.startsWith("/candidates");

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
  }, [drawerOpen]);

  // Close the drawer on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setDrawerOpen(false);
  }

  const cta = isCandidatePage ? ctas.joinNetwork : ctas.submitRole;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/80">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <Dropdown label="Hire talent" wide>
            {(close) => (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="mb-2 px-3 text-sm font-semibold uppercase tracking-wider text-muted">Services</p>
                  <MenuLinks links={hireMenu.services} onNavigate={close} />
                </div>
                <div>
                  <p className="mb-2 px-3 text-sm font-semibold uppercase tracking-wider text-muted">Role families</p>
                  <MenuLinks links={hireMenu.roles.map(({ label, href }) => ({ label, href }))} onNavigate={close} />
                  <Link href="/hire" onClick={close} className="mt-2 block px-3 text-sm font-semibold text-accent hover:underline">
                    All roles →
                  </Link>
                </div>
              </div>
            )}
          </Dropdown>
          {primaryNav.slice(0, 2).map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined} className="flex min-h-11 items-center rounded-lg px-3 font-medium hover:text-accent aria-[current=page]:text-accent">
              {l.label}
            </Link>
          ))}
          <Dropdown label="For GCCs">{(close) => <MenuLinks links={gccMenu} onNavigate={close} />}</Dropdown>
          {primaryNav.slice(2).map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname.startsWith(l.href) ? "page" : undefined} className="flex min-h-11 items-center rounded-lg px-3 font-medium hover:text-accent aria-[current=page]:text-accent">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={isCandidatePage ? "/" : "/jobs"}
            className="hidden min-h-11 items-center px-2 text-sm font-semibold text-muted underline-offset-4 hover:text-accent hover:underline sm:flex"
          >
            {isCandidatePage ? "Hiring? For employers" : "Find jobs"}
          </Link>
          <ButtonLink
            href={cta.href}
            className="hidden sm:inline-flex"
            onClick={() => track("cta_click", { cta_name: cta.label, page: pathname, position: "header" })}
          >
            {cta.label}
          </ButtonLink>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-lg border border-line lg:hidden"
            aria-expanded={drawerOpen}
            aria-controls="mobile-menu"
            onClick={() => setDrawerOpen((o) => !o)}
          >
            <span className="sr-only">{drawerOpen ? "Close menu" : "Open menu"}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              {drawerOpen ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {drawerOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-line bg-bg lg:hidden">
          <Container className="space-y-6 py-6">
            <ButtonLink href={cta.href} className="w-full" size="lg">
              {cta.label}
            </ButtonLink>
            <div>
              <p className="mb-2 px-3 text-sm font-semibold uppercase tracking-wider text-muted">Hire talent</p>
              <MenuLinks links={[...hireMenu.services, { label: "All role families", href: "/hire" }]} onNavigate={() => setDrawerOpen(false)} />
            </div>
            <MenuLinks links={primaryNav.slice(0, 2)} onNavigate={() => setDrawerOpen(false)} />
            <div>
              <p className="mb-2 px-3 text-sm font-semibold uppercase tracking-wider text-muted">For GCCs</p>
              <MenuLinks links={gccMenu} onNavigate={() => setDrawerOpen(false)} />
            </div>
            <MenuLinks
              links={[...primaryNav.slice(2), { label: "Find jobs", href: "/jobs" }, { label: "For candidates", href: "/candidates" }, { label: "Contact", href: "/contact" }]}
              onNavigate={() => setDrawerOpen(false)}
            />
          </Container>
        </nav>
      )}
    </header>
  );
}
