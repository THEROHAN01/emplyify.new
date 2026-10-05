import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/*
 * Product-style illustrations of each hiring step, drawn in markup (no images:
 * crisp at any size, tiny payload). They are decorative — each figure carries
 * a text description for screen readers and the copy beside it says the same.
 */

function Window({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="border-line bg-surface w-full overflow-hidden rounded-2xl border shadow-[0_24px_48px_-28px_rgba(11,27,51,0.35)]">
      <div className="border-line flex items-center justify-between gap-3 border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="bg-line size-2.5 rounded-full" />
          <span className="bg-line size-2.5 rounded-full" />
          <span className="bg-line size-2.5 rounded-full" />
          <span className="ml-2 text-xs font-semibold">{title}</span>
        </div>
        {badge}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

const Pill = ({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "signal" | "warn";
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
      tone === "neutral" && "bg-bg text-ink",
      tone === "accent" && "bg-accent-soft text-accent",
      tone === "signal" && "bg-signal-bg text-signal",
      tone === "warn" && "bg-warn-bg text-warn",
    )}
  >
    {children}
  </span>
);

const Tick = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="text-signal shrink-0">
    <path
      d="m3 7.3 2.6 2.6L11 4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function BriefMock() {
  return (
    <Window
      title="Submit a role"
      badge={<span className="text-muted text-[11px]">Step 2 of 3</span>}
    >
      <div className="mb-4 flex gap-1.5">
        <span className="bg-accent h-1 flex-1 rounded-full" />
        <span className="bg-accent h-1 flex-1 rounded-full" />
        <span className="bg-line h-1 flex-1 rounded-full" />
      </div>
      <p className="text-muted text-[11px] font-medium">Role title</p>
      <p className="border-line mt-1 rounded-lg border px-3 py-2 text-sm">Senior Data Engineer</p>
      <p className="text-muted mt-3 text-[11px] font-medium">Must-have skills</p>
      <div className="border-line mt-1 flex flex-wrap gap-1.5 rounded-lg border px-2 py-2">
        <Pill tone="accent">Spark</Pill>
        <Pill tone="accent">Databricks</Pill>
        <Pill tone="accent">SQL</Pill>
        <Pill tone="accent">Airflow</Pill>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div>
          <p className="text-muted text-[11px] font-medium">Budget (₹ LPA)</p>
          <p className="border-line tabular mt-1 rounded-lg border px-3 py-2 text-sm">30 – 40</p>
        </div>
        <div>
          <p className="text-muted text-[11px] font-medium">Location</p>
          <p className="border-line mt-1 rounded-lg border px-3 py-2 text-sm">Pune · Hybrid</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-muted text-[11px]">Filled from your JD</span>
        <span className="bg-accent rounded-full px-4 py-1.5 text-xs font-semibold text-white">
          Continue
        </span>
      </div>
    </Window>
  );
}

const matches = [
  {
    a: "A",
    role: "Senior Data Engineer · banking GCC",
    fit: 92,
    tag: "Screen booked",
    tone: "signal" as const,
  },
  {
    a: "B",
    role: "Data Engineer · health-tech",
    fit: 86,
    tag: "Screen booked",
    tone: "signal" as const,
  },
  { a: "C", role: "Analytics Engineer · retail", fit: 78, tag: "Reviewing", tone: "warn" as const },
  { a: "D", role: "Data Engineer · logistics", fit: 71, tag: "Ranked", tone: "neutral" as const },
];

export function SearchMock() {
  return (
    <Window title="Matches · Senior Data Engineer" badge={<Pill tone="accent">AI-ranked</Pill>}>
      <ul className="space-y-3">
        {matches.map((m) => (
          <li key={m.a} className="flex items-center gap-3">
            <span className="bg-bg flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
              {m.a}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-xs font-semibold">{m.role}</p>
                <span className="tabular text-xs font-semibold">{m.fit}</span>
              </div>
              <div className="bg-bg mt-1.5 h-1.5 rounded-full">
                <div className="bg-accent h-1.5 rounded-full" style={{ width: `${m.fit}%` }} />
              </div>
            </div>
            <Pill tone={m.tone}>{m.tag}</Pill>
          </li>
        ))}
      </ul>
      <p className="text-muted border-line mt-4 border-t pt-3 text-[11px]">
        Ranked against your must-haves. Recruiters screen the top matches.
      </p>
    </Window>
  );
}

export function VerifyMock() {
  return (
    <Window title="Dossier · Candidate A" badge={<Pill tone="signal">Verified</Pill>}>
      <div className="flex items-center gap-3">
        <span className="bg-accent-soft text-accent flex size-10 items-center justify-center rounded-full text-sm font-semibold">
          A
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold">Senior Data Engineer, banking GCC</p>
          <p className="text-muted text-xs">8 yrs · Hyderabad · 90 days notice</p>
        </div>
        <span className="tabular text-xl font-bold">92</span>
      </div>
      <ul className="mt-4 space-y-2">
        {[
          ["Databricks", "Led migration, Unity Catalog roll-out"],
          ["Spark", "Tuned skewed joins; walked through job plans"],
          ["SQL modelling", "Live modelling exercise"],
        ].map(([skill, proof]) => (
          <li key={skill} className="bg-bg flex items-start gap-2 rounded-lg px-3 py-2">
            <Tick />
            <span className="text-xs">
              <span className="font-semibold">{skill}</span>{" "}
              <span className="text-muted">— {proof}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="border-line mt-4 flex items-center justify-between border-t pt-3">
        <span className="text-muted text-[11px]">Interviewed and signed off</span>
        <span className="text-[11px] font-semibold">Senior recruiter</span>
      </div>
    </Window>
  );
}

export function HireMock() {
  return (
    <Window title="Offer · Senior Data Engineer" badge={<Pill tone="signal">Accepted</Pill>}>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          ["Offer", "Accepted"],
          ["Notice", "60 days"],
          ["Fee", "On joining"],
        ].map(([k, v]) => (
          <div key={k} className="bg-bg rounded-lg px-2 py-3">
            <p className="text-muted text-[11px]">{k}</p>
            <p className="mt-0.5 text-sm font-semibold">{v}</p>
          </div>
        ))}
      </div>
      <p className="text-muted mt-4 text-[11px] font-medium">90-day replacement cover</p>
      <div className="bg-bg relative mt-2 h-2 rounded-full">
        <div className="bg-signal h-2 w-1/3 rounded-full" />
      </div>
      <div className="text-muted mt-1.5 flex justify-between text-[11px]">
        <span>Joined</span>
        <span>Day 30</span>
        <span>Day 90</span>
      </div>
      <div className="mt-4 space-y-2">
        {[
          "Joining-day check-in",
          "Day-30 check-in with the manager",
          "Free replacement if the hire leaves",
        ].map((t) => (
          <p key={t} className="flex items-center gap-2 text-xs">
            <Tick />
            {t}
          </p>
        ))}
      </div>
    </Window>
  );
}

export interface ShowcaseStep {
  sla: string;
  title: string;
  body: string;
  points: string[];
  visual: ReactNode;
  visualLabel: string;
}

export const showcaseSteps: ShowcaseStep[] = [
  {
    sla: "Step 1 · 2 minutes",
    title: "Brief us in two minutes",
    body: "Submit a role online or brief us on a 20-minute call. Paste a job description and we fill in the skills and a budget suggestion for you.",
    points: ["No sales call needed", "Must-haves and budget confirmed in writing"],
    visual: <BriefMock />,
    visualLabel: "Illustration of the role brief form with must-have skills and budget filled in.",
  },
  {
    sla: "Step 2 · 0–48 hours",
    title: "AI searches, recruiters screen",
    body: "Our agents search our network and public profiles and rank every match against your must-haves. Recruiters run structured screens with the strongest.",
    points: [
      "Ranked against your must-haves, not keywords",
      "Notice period and CTC checked on the first call",
    ],
    visual: <SearchMock />,
    visualLabel: "Illustration of a ranked list of candidate matches with fit scores.",
  },
  {
    sla: "Step 3 · by 72 hours",
    title: "A senior recruiter verifies every candidate",
    body: "You get three to five people, each with a dossier: evidence for every must-have, notice period, expected CTC, honest risks and the recruiter's sign-off.",
    points: ["Evidence per skill, verified or flagged", "Signed off by a senior recruiter"],
    visual: <VerifyMock />,
    visualLabel: "Illustration of a candidate dossier with verified skill evidence.",
  },
  {
    sla: "Step 4 · 90-day cover",
    title: "You hire, we stand behind it",
    body: "We run scheduling, feedback and the offer, and stay close through the notice period. Pay only when the hire joins.",
    points: ["Fee due only on joining", "Free replacement for 90 days"],
    visual: <HireMock />,
    visualLabel: "Illustration of an accepted offer with a 90-day replacement cover tracker.",
  },
];

/** Alternating text / product-illustration rows. */
export function ProcessShowcase({ steps = showcaseSteps }: { steps?: ShowcaseStep[] }) {
  return (
    <ol className="space-y-16 lg:space-y-24">
      {steps.map((s, i) => (
        <li key={s.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className={cn(i % 2 === 1 && "lg:order-2")}>
            <p className="text-accent text-sm font-semibold">{s.sla}</p>
            <h3 className="mt-2 text-2xl font-bold sm:text-[1.75rem]">{s.title}</h3>
            <p className="text-muted mt-3 text-lg">{s.body}</p>
            <ul className="mt-5 space-y-2">
              {s.points.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Tick />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <figure
            role="img"
            aria-label={s.visualLabel}
            className="bg-bg flex items-center rounded-3xl p-6 sm:p-10"
          >
            <div aria-hidden className="mx-auto w-full max-w-md">
              {s.visual}
            </div>
          </figure>
        </li>
      ))}
    </ol>
  );
}
