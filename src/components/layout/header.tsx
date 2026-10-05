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
    const onClick = (e: MouseEvent) =>
      ref.current && !ref.current.contains(e.target as Node) && close();
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
          <Link
            href={l.href}
            onClick={onNavigate}
            className="hover:bg-accent-soft block rounded-lg px-3 py-2"
          >
            <span className="font-semibold">{l.label}</span>
            {l.description && <span className="text-muted block text-sm">{l.description}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Dropdown({
  label,
  children,
  wide,
}: {
  label: string;
  children: (close: () => void) => React.ReactNode;
  wide?: boolean;
}) {
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
        className="text-ink/80 hover:text-ink hover:bg-bg flex min-h-11 items-center gap-1 rounded-full px-2.5 text-[15px] font-medium whitespace-nowrap xl:px-3"
      >
        {label}
        <span
          aria-hidden
          className={cn("text-xs transition-transform duration-200", open && "rotate-180")}
        >
          ▾
        </span>
      </button>
      <div
        id={id}
        hidden={!open}
        className={cn(
          "border-line bg-surface absolute top-full left-0 z-50 mt-2 rounded-2xl border p-4 shadow-xl",
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
    <>
      <header className="border-line bg-surface/90 supports-[backdrop-filter]:bg-surface/75 sticky top-0 z-40 border-b backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <Dropdown label="Hire talent" wide>
              {(close) => (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-muted mb-2 px-3 text-sm font-medium">Services</p>
                    <MenuLinks links={hireMenu.services} onNavigate={close} />
                  </div>
                  <div>
                    <p className="text-muted mb-2 px-3 text-sm font-medium">Role families</p>
                    <MenuLinks
                      links={hireMenu.roles.map(({ label, href }) => ({ label, href }))}
                      onNavigate={close}
                    />
                    <Link
                      href="/hire"
                      onClick={close}
                      className="text-accent mt-2 block px-3 text-sm font-semibold hover:underline"
                    >
                      All roles →
                    </Link>
                  </div>
                </div>
              )}
            </Dropdown>
            {primaryNav.slice(0, 2).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className="text-ink/80 hover:text-ink aria-[current=page]:text-ink hover:bg-bg flex min-h-11 items-center rounded-full px-2.5 text-[15px] font-medium whitespace-nowrap xl:px-3"
              >
                {l.label}
              </Link>
            ))}
            <Dropdown label="For GCCs">
              {(close) => <MenuLinks links={gccMenu} onNavigate={close} />}
            </Dropdown>
            {primaryNav.slice(2).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname.startsWith(l.href) ? "page" : undefined}
                className="text-ink/80 hover:text-ink aria-[current=page]:text-ink hover:bg-bg flex min-h-11 items-center rounded-full px-2.5 text-[15px] font-medium whitespace-nowrap xl:px-3"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={isCandidatePage ? "/" : "/jobs"}
              className="text-muted hover:text-accent hidden min-h-11 items-center px-2 text-sm font-semibold whitespace-nowrap underline-offset-4 hover:underline sm:flex lg:hidden xl:flex"
            >
              {isCandidatePage ? "Hiring? For employers" : "Find jobs"}
            </Link>
            <ButtonLink
              href={cta.href}
              className="max-sm:hidden"
              onClick={() =>
                track("cta_click", { cta_name: cta.label, page: pathname, position: "header" })
              }
            >
              {cta.label}
            </ButtonLink>
            <button
              type="button"
              className="border-line flex size-11 items-center justify-center rounded-lg border lg:hidden"
              aria-expanded={drawerOpen}
              aria-controls="mobile-menu"
              onClick={() => setDrawerOpen((o) => !o)}
            >
              <span className="sr-only">{drawerOpen ? "Close menu" : "Open menu"}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                {drawerOpen ? (
                  <path
                    d="M4 4l12 12M16 4L4 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M3 6h14M3 10h14M3 14h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {/* Rendered outside <header>: its backdrop-filter would trap a fixed child. */}
      {drawerOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-line bg-surface fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t lg:hidden"
        >
          <Container className="space-y-6 py-6">
            <ButtonLink href={cta.href} className="w-full" size="lg">
              {cta.label}
            </ButtonLink>
            <div>
              <p className="text-muted mb-2 px-3 text-sm font-medium">Hire talent</p>
              <MenuLinks
                links={[...hireMenu.services, { label: "All role families", href: "/hire" }]}
                onNavigate={() => setDrawerOpen(false)}
              />
            </div>
            <MenuLinks links={primaryNav.slice(0, 2)} onNavigate={() => setDrawerOpen(false)} />
            <div>
              <p className="text-muted mb-2 px-3 text-sm font-medium">For GCCs</p>
              <MenuLinks links={gccMenu} onNavigate={() => setDrawerOpen(false)} />
            </div>
            <MenuLinks
              links={[
                ...primaryNav.slice(2),
                { label: "Find jobs", href: "/jobs" },
                { label: "For candidates", href: "/candidates" },
                { label: "Contact", href: "/contact" },
              ]}
              onNavigate={() => setDrawerOpen(false)}
            />
          </Container>
        </nav>
      )}
    </>
  );
}
