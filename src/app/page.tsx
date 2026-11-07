import Image from "next/image";
import Link from "next/link";
import { FinalCta } from "@/components/marketing/cta-band";
import { ComparisonTable } from "@/components/marketing/comparison-table";
import { HowSteps } from "@/components/marketing/how-steps";
import { BgVideo } from "@/components/visuals/bg-video";
import { GrowingRing } from "@/components/visuals/people-ring";
import { Reveal } from "@/components/visuals/reveal";
import { icons, type IconName } from "@/components/ui/icons";
import { ArrowBox } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import {
  clientStages,
  industries,
  media,
  nonItRoleCards,
  problems,
  processSteps,
} from "@/content/company";
import { clientLogos } from "@/content/metrics";
import { ctas, site } from "@/content/site";
import { team } from "@/content/team";
import { getRoleFamilies, getRoleByFamily, getServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils/cn";

export const metadata = buildMetadata({
  title: `${site.name}: pan-India recruitment and staffing for IT and Non-IT roles`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

const wrap = "mx-auto w-full max-w-[1440px] px-5 md:px-10";

/** Tints behind each service icon, cycling the logo's colours. */
const tints = [
  "bg-[#e6f4ff] text-[#0062d6]",
  "bg-[#f1e9fe] text-[#5b0ac2]",
  "bg-[#fff2df] text-[#9a5a00]",
  "bg-[#e0f7f2] text-[#00755f]",
  "bg-[#e4f8ff] text-[#006f94]",
  "bg-[#eef3ff] text-[#0062d6]",
];

/**
 * Photos for the service cards, dropped in /public/services/<slug>.jpg.
 * Until a photo is added, the card shows a tinted icon.
 */
const serviceImages: Record<string, string | undefined> = {};

const stats = [
  { value: "48h", label: "To an initial shortlist" },
  { value: "4h", label: "Business-hours reply" },
  { value: "48h", label: "Interview feedback chased" },
  { value: "90 days", label: "Free replacement" },
];

export default function HomePage() {
  const services = getServices();
  const families = getRoleFamilies();
  const roleCards = [
    ...families.map((f) => ({
      category: "IT",
      title: f.name,
      blurb: f.blurb,
      href: `/hire/${getRoleByFamily(f.slug)!.slug}`,
    })),
    ...nonItRoleCards.map((r) => ({
      category: "Non-IT",
      title: r.title,
      blurb: r.blurb,
      href: "/services/non-it-recruitment",
    })),
  ];

  return (
    <>
      {/* 1 · Hero: full-bleed video, serif statement, two entry points */}
      <section
        aria-labelledby="hero-title"
        className="bg-navy relative isolate -mt-16 min-h-[min(780px,100svh)] overflow-hidden text-white lg:h-[100svh] lg:min-h-[720px]"
      >
        <BgVideo src={media.hero.src} poster={media.hero.poster} overlay="bg-navy/55" />
        <div aria-hidden className="from-navy/80 absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b to-transparent" />
        <div className={cn(wrap, "flex h-full min-h-[inherit] flex-col justify-between pt-32 pb-8 lg:pt-36")}>
          <h1 id="hero-title" className="max-w-5xl text-[3rem] leading-[0.95] sm:text-7xl lg:text-[6.5rem]">
            Connecting talent. Building teams.
          </h1>

          <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:items-end">
            <div className="text-ink max-w-md bg-white p-6">
              <p className="text-lg">
                Pan-India recruitment and staffing for IT and Non-IT roles. Screened shortlists in
                48 hours.
              </p>
              <Link
                href={ctas.submitRole.href}
                className="label border-line mt-8 flex items-center justify-between border-t pt-4 hover:text-accent"
              >
                {ctas.submitRole.label}
                <ArrowBox />
              </Link>
            </div>
            <div className="lg:justify-self-end lg:text-right">
              <p className="label text-white/80">Permanent · Contract · Leadership · Bulk</p>
              <p className="mt-3 max-w-md text-lg text-white/90 lg:ml-auto">
                From one specialist to a full team, for startups, SMBs, enterprises and GCCs across
                India.
              </p>
              <Link
                href="/candidates"
                className="label mt-6 inline-flex items-center gap-3 border border-white/40 px-5 py-3 hover:border-white"
              >
                Looking for work? Find jobs
                <ArrowBox inverted />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Services as a row of picture cards */}
      <section aria-labelledby="services" className="bg-white py-16 md:py-24">
        <div className={wrap}>
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="label text-accent">What we hire for</p>
              <h2 id="services" className="mt-5 text-[2.75rem] sm:text-6xl lg:text-[4.5rem]">
                Six ways to build your team.
              </h2>
            </div>
            <p className="text-muted max-w-sm text-lg lg:justify-self-end">
              Start with one of these, or brief us on anything. Fees agreed up front; nothing due on
              a permanent hire until they join.
            </p>
          </div>
          <ul className="border-line mt-12 grid grid-cols-2 border-t border-l md:grid-cols-3 xl:grid-cols-6">
            {services.map((s, i) => {
              const img = serviceImages[s.slug];
              return (
                <li key={s.slug} className="border-line group relative flex flex-col border-r border-b p-4">
                  <div className="aspect-square overflow-hidden">
                    {img ? (
                      <Image
                        src={img}
                        alt=""
                        width={400}
                        height={400}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div
                        className={cn(
                          "flex size-full items-center justify-center transition-transform duration-500 group-hover:scale-[1.04] [&_svg]:size-14 [&_svg]:stroke-[1.25]",
                          tints[i % tints.length],
                        )}
                      >
                        {icons[s.slug as IconName]}
                      </div>
                    )}
                  </div>
                  <h3 className="mt-5 text-[1.6rem] leading-[1.05]">{s.name}</h3>
                  <Link
                    href={`/services/${s.slug}`}
                    className="label text-ink mt-auto flex items-center justify-between gap-3 pt-8 after:absolute after:inset-0"
                  >
                    Start hiring
                    <ArrowBox />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 3 · Partner logo strip */}
      {clientLogos.length > 0 && (
        <section aria-labelledby="partners" className="border-line border-y bg-white py-6 md:py-7">
          <div className={cn(wrap, "flex flex-col gap-6")}>
            <h2 id="partners" className="label text-muted shrink-0 font-sans tracking-[0.08em]">
              Companies we partner with
            </h2>
            <ul className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
              {clientLogos.map((l) => (
                <li key={l.name}>
                  <Image
                    src={l.src}
                    alt={l.name}
                    width={l.width}
                    height={l.height}
                    className="opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 4 · Mission: brand-blue block with the turning ring */}
      <section aria-labelledby="mission" className="bg-accent relative isolate overflow-hidden text-white">
        <GrowingRing corner="top-right" mono="#ffffff" opacity={0.3} />
        <div className={cn(wrap, "flex min-h-[640px] flex-col justify-between py-16 md:py-20")}>
          <p className="label">Our mission</p>
          <Reveal>
            <h2 id="mission" className="max-w-3xl text-[2.75rem] sm:text-6xl lg:text-[5rem]">
              Recruitment starts with understanding the business.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Not simply filling vacancies. We find, screen and deliver the right people for IT and
              Non-IT roles, permanent and contract, anywhere in India. AI helps our recruiters
              search; a person signs off every shortlist.
            </p>
            <ButtonLink
              href="/about"
              variant="secondary"
              className="mt-8 border-white/60 text-white hover:border-white"
            >
              About us <ArrowBox inverted />
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* 5 · How it works: sticky counter, steps reveal on scroll */}
      <HowSteps
        steps={processSteps}
        title="Brief. Shortlist. Joining."
        intro="A complete process from a confirmed requirement to the candidate's first day, with an initial shortlist in 48 hours."
      />

      {/* 6 · Roles we fill: horizontal card row on blue */}
      <section aria-labelledby="roles" className="bg-accent overflow-hidden border-b border-white/25 text-white">
        <div className={cn(wrap, "flex h-14 items-center justify-between border-b border-white/25")}>
          <h2 id="roles" className="label font-sans tracking-[0.08em]">
            Roles we fill
          </h2>
          <Link href="/hire" className="label hover:underline">
            View all
          </Link>
        </div>
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-10 md:px-10 [scrollbar-width:thin]">
          {roleCards.map((r) => (
            <li
              key={r.title}
              className="relative flex min-h-[360px] w-[300px] shrink-0 snap-start flex-col border border-white/25 p-5 transition-colors hover:bg-white/5"
            >
              <div className="label flex justify-between text-white/80">
                <span>{r.category}</span>
                <span>48h shortlist</span>
              </div>
              <h3 className="mt-8 text-3xl">{r.title}</h3>
              <p className="mt-3 text-white/80">{r.blurb}</p>
              <div className="label mt-auto flex items-center justify-between pt-8 text-white/80">
                <span>Pan-India</span>
                <Link href={r.href} aria-label={`Hire for ${r.title}`} className="after:absolute after:inset-0">
                  <ArrowBox inverted />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 7 · Reach and promises: video with stat tiles */}
      <section aria-labelledby="reach" className="bg-navy relative isolate overflow-hidden text-white">
        <BgVideo src={media.boardroom.src} poster={media.boardroom.poster} overlay="bg-navy/70" />
        <div className={cn(wrap, "grid gap-12 py-24 lg:grid-cols-2 lg:items-center lg:py-36")}>
          <Reveal>
            <p className="label text-white/80">Why Emplyify</p>
            <h2 id="reach" className="mt-5 text-[2.75rem] sm:text-6xl">
              Pan-India reach, with promises in writing.
            </h2>
            <p className="mt-6 max-w-md text-lg text-white/85">
              Job portals, professional networks, referrals and our own database, screened by
              recruiters who answer within 4 business hours.
            </p>
            <ButtonLink
              href="/how-it-works"
              variant="secondary"
              className="mt-8 border-white/60 text-white hover:border-white"
            >
              See how it works <ArrowBox inverted />
            </ButtonLink>
          </Reveal>
          <ul className="bg-accent grid grid-cols-2">
            {stats.map((s, i) => (
              <li
                key={s.label}
                className={cn("border-white/25 p-6 md:p-8", i % 2 === 0 && "border-r", i < 2 && "border-b")}
              >
                <p className="font-display text-5xl md:text-6xl">{s.value}</p>
                <p className="label mt-3 text-white/85">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8 · Problems we fix */}
      <section aria-labelledby="problems" className="bg-white">
        <div className={cn(wrap, "py-20 lg:py-28")}>
          <p className="label text-accent">The problem we solve</p>
          <h2 id="problems" className="mt-5 max-w-3xl text-[2.75rem] sm:text-6xl">
            Hiring well takes too long.
          </h2>
        </div>
        <ul className="border-line mx-auto grid max-w-[1440px] border-t md:grid-cols-3">
          {problems.map((p, i) => (
            <li key={p.problem} className="border-line border-b px-5 py-10 md:border-r md:px-10">
              <Reveal delay={i * 120}>
                <p className="label text-muted">Instead of: {p.problem}</p>
                <h3 className="mt-6 text-4xl">{p.fix}</h3>
                <p className="text-muted mt-4">{p.detail}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* 9 · Pricing and comparison */}
      <section aria-labelledby="pricing" className="bg-bg">
        <div className={cn(wrap, "py-20 lg:py-28")}>
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="label text-accent">Published pricing</p>
              <h2 id="pricing" className="mt-5 text-[2.75rem] sm:text-6xl">
                Know the price before the first call.
              </h2>
            </div>
            <ButtonLink href="/pricing" variant="secondary" className="lg:justify-self-end">
              Pricing and fee calculator <ArrowBox />
            </ButtonLink>
          </div>
          <ul className="border-line mt-12 grid border-t border-l bg-white md:grid-cols-3">
            {[
              ["8.33–16.67%", "Permanent hire", "of annual fixed CTC by seniority, paid only when the hire joins."],
              ["Per drive", "Bulk hiring", "Ten or more similar roles at a reduced per-hire or fixed drive fee."],
              ["90 days", "Free replacement", "If a permanent hire leaves early, we search again at no fee."],
            ].map(([v, l, n]) => (
              <li key={l} className="border-line border-r border-b p-8">
                <p className="label text-muted">{l}</p>
                <p className="font-display mt-4 text-5xl">{v}</p>
                <p className="text-muted mt-4">{n}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* 10 · Industries and client stages */}
      <section aria-labelledby="clients" className="bg-white">
        <div className={cn(wrap, "py-20 lg:py-28")}>
          <p className="label text-accent">Who we serve</p>
          <h2 id="clients" className="mt-5 max-w-3xl text-[2.75rem] sm:text-6xl">
            Built for every stage of growth.
          </h2>
          <ul className="border-line mt-12 grid border-t border-l sm:grid-cols-2 lg:grid-cols-4">
            {clientStages.map((c) => (
              <li key={c.name} className="border-line border-r border-b p-6">
                <h3 className="text-3xl">{c.name}</h3>
                <p className="text-muted mt-3">{c.detail}</p>
              </li>
            ))}
          </ul>
          <p className="label text-muted mt-12">Industries we hire for</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {industries.map((i) => (
              <li key={i} className="border-line border px-4 py-2 text-sm">
                {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11 · Team */}
      <section aria-labelledby="team" className="border-line border-t bg-white">
        <div className={cn(wrap, "flex flex-col justify-between gap-6 py-20 lg:flex-row lg:items-end lg:py-24")}>
          <div>
            <p className="label text-accent">The team</p>
            <h2 id="team" className="mt-5 max-w-3xl text-[2.75rem] sm:text-6xl">
              The people behind every shortlist.
            </h2>
          </div>
          <ButtonLink href="/about#team" variant="secondary" className="self-start lg:self-auto">
            Meet the team <ArrowBox />
          </ButtonLink>
        </div>
        <ul className="border-line mx-auto grid max-w-[1440px] grid-cols-2 border-t sm:grid-cols-3 lg:grid-cols-5">
          {team.map((m) => (
            <li key={m.name} className="border-line group border-r border-b p-5">
              <div className="bg-bg aspect-square overflow-hidden">
                {m.photo && (
                  <Image
                    src={m.photo}
                    alt={`${m.name}, ${m.title}`}
                    width={400}
                    height={400}
                    className="size-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                )}
              </div>
              <p className="font-display mt-5 text-2xl">{m.name}</p>
              <p className="label text-muted mt-2 leading-relaxed">{m.title}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 12 · Finale */}
      <FinalCta />
    </>
  );
}
