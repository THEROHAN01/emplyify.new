import Link from "next/link";
import { footerNav } from "@/content/navigation";
import { site } from "@/content/site";
import { Container } from "@/components/ui/layout";
import { CookieSettingsLink } from "@/components/analytics/cookie-settings-link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-navy border-t border-white/20 pt-20 pb-28 text-white lg:pb-12 [&_.text-muted]:text-white/65 [&_.text-ink]:text-white [&_a:hover]:text-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div className="max-w-xs">
            <Logo tone="light" />
            <p className="font-display mt-5 text-2xl">{site.tagline}</p>
            <p className="text-muted mt-2 text-sm">{site.positioning}</p>
            <address className="text-muted mt-4 text-sm not-italic">
              {site.office.city}, {site.office.region}, India
              <br />
              <a href={`mailto:${site.email.hello}`} className="text-white underline-offset-4 hover:underline">
                {site.email.hello}
              </a>
            </address>
          </div>
          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="label mb-5 font-sans text-white/60">{group.heading}</h2>
              <ul className="space-y-2 text-sm">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/85 hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="text-muted mt-14 flex flex-col gap-4 border-t border-white/20 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
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
