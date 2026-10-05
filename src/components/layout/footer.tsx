import Link from "next/link";
import { footerNav } from "@/content/navigation";
import { site } from "@/content/site";
import { Container } from "@/components/ui/layout";
import { CookieSettingsLink } from "@/components/analytics/cookie-settings-link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface pb-28 pt-16 lg:pb-12">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm text-muted">{site.positioning}</p>
            <address className="mt-4 text-sm not-italic text-muted">
              {site.office.city}, {site.office.region}, India
              <br />
              <a href={`mailto:${site.email.hello}`} className="text-accent hover:underline">
                {site.email.hello}
              </a>
            </address>
          </div>
          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">{group.heading}</h2>
              <ul className="space-y-2 text-sm">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-accent hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. AI-assisted, human-verified hiring.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/about/responsible-ai" className="hover:text-accent hover:underline">
              Responsible AI
            </Link>
            <Link href="/legal/privacy" className="hover:text-accent hover:underline">
              Privacy
            </Link>
            <CookieSettingsLink />
          </div>
        </div>
      </Container>
    </footer>
  );
}
