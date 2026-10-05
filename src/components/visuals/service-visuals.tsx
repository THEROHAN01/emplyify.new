import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Pill, Tick, Window } from "./mock-ui";

/*
 * One product-style illustration per service, shown in the service page
 * header. Example content only — callers render these aria-hidden inside a
 * figure with a text description.
 */

function TechHiringMock() {
  return (
    <Window
      title="Shortlist · Senior Backend Engineer"
      badge={<Pill tone="signal">Delivered in 72h</Pill>}
    >
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {["A", "B", "C", "D"].map((a) => (
            <span
              key={a}
              className="bg-accent-soft text-accent ring-surface flex size-9 items-center justify-center rounded-full text-xs font-semibold ring-2"
            >
              {a}
            </span>
          ))}
        </div>
        <p className="text-sm">
          <span className="font-semibold">4 candidates</span>{" "}
          <span className="text-muted">· each with a dossier</span>
        </p>
      </div>
      <ul className="mt-4 space-y-2">
        {[
          ["Candidate A", "Interview booked · Tue 11:00", "signal"],
          ["Candidate B", "Interview booked · Wed 15:30", "signal"],
          ["Candidate C", "Awaiting your feedback", "warn"],
          ["Candidate D", "Shortlisted", "neutral"],
        ].map(([n, s, t]) => (
          <li key={n} className="bg-bg flex items-center justify-between rounded-lg px-3 py-2">
            <span className="text-xs font-semibold">{n}</span>
            <Pill tone={t as "signal" | "warn" | "neutral"}>{s}</Pill>
          </li>
        ))}
      </ul>
      <p className="text-muted border-line mt-4 border-t pt-3 text-[11px]">
        Feedback chased within 48 hours of every interview.
      </p>
    </Window>
  );
}

const funnel = [
  ["Sourced", 100],
  ["Screened", 46],
  ["Shortlisted", 22],
  ["Interviewing", 12],
  ["Offers", 4],
] as const;

function TalentPodMock() {
  return (
    <Window title="Weekly pod report · example" badge={<Pill tone="accent">Week 6</Pill>}>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          ["Open roles", "8"],
          ["In interview", "12"],
          ["Joined", "3"],
        ].map(([k, v]) => (
          <div key={k} className="bg-bg rounded-lg px-2 py-2.5">
            <p className="tabular text-lg font-bold">{v}</p>
            <p className="text-muted text-[11px]">{k}</p>
          </div>
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {funnel.map(([label, pct]) => (
          <li key={label} className="grid grid-cols-[5.5rem_1fr] items-center gap-3">
            <span className="text-muted text-[11px]">{label}</span>
            <span className="bg-bg h-2.5 rounded-full">
              <span className="bg-accent block h-2.5 rounded-full" style={{ width: `${pct}%` }} />
            </span>
          </li>
        ))}
      </ul>
      <p className="text-muted border-line mt-4 border-t pt-3 text-[11px]">
        Shared every Friday, reviewed in a 30-minute call.
      </p>
    </Window>
  );
}

const sprint = [
  { label: "Launch workshop", start: 0, end: 1 },
  { label: "Market map", start: 1, end: 2 },
  { label: "Leads first", start: 1, end: 5 },
  { label: "Team build-out", start: 3, end: 13 },
  { label: "Weekly steering", start: 0, end: 13, light: true },
];

export function GccSprintMock() {
  const weeks = 13;
  return (
    <Window title="Sprint plan · 12 weeks" badge={<Pill tone="accent">GCC launch</Pill>}>
      <div className="text-muted mb-2 grid grid-cols-[6.5rem_1fr] gap-3 text-[10px]">
        <span />
        <div className="flex justify-between">
          {[0, 4, 8, 12].map((w) => (
            <span key={w}>Wk {w}</span>
          ))}
        </div>
      </div>
      <ul className="space-y-2.5">
        {sprint.map((r) => (
          <li key={r.label} className="grid grid-cols-[6.5rem_1fr] items-center gap-3">
            <span className="text-[11px] font-medium">{r.label}</span>
            <span className="bg-bg relative h-4 rounded-[4px]">
              <span
                className={cn(
                  "absolute inset-y-0 rounded-[4px]",
                  r.light ? "bg-accent/25" : "bg-accent",
                )}
                style={{
                  left: `${(r.start / weeks) * 100}%`,
                  width: `${((r.end - r.start) / weeks) * 100}%`,
                }}
              />
            </span>
          </li>
        ))}
      </ul>
      <p className="text-muted border-line mt-4 border-t pt-3 text-[11px]">
        Leads join first, then help hire their teams.
      </p>
    </Window>
  );
}

function LeadershipMock() {
  return (
    <Window title="Finalists · Head of Data" badge={<Pill tone="neutral">Confidential</Pill>}>
      <ul className="space-y-2.5">
        {[
          ["A", "Director of Data, fintech", "14 yrs"],
          ["B", "Head of Analytics, SaaS", "12 yrs"],
          ["C", "Data Platform Lead, GCC", "11 yrs"],
        ].map(([a, h, y]) => (
          <li key={a} className="border-line rounded-xl border p-3">
            <div className="flex items-center gap-3">
              <span className="bg-accent-soft text-accent flex size-8 items-center justify-center rounded-full text-xs font-semibold">
                {a}
              </span>
              <div className="flex-1">
                <p className="text-xs font-semibold">Finalist {a}</p>
                <p className="text-muted text-[11px]">
                  {h} · {y}
                </p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
              <span className="flex items-center gap-1">
                <Tick /> Written assessment
              </span>
              <span className="flex items-center gap-1">
                <Tick /> 2 references
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Window>
  );
}

const visuals: Record<string, { node: ReactNode; label: string }> = {
  "tech-hiring": {
    node: <TechHiringMock />,
    label: "Illustration of a delivered shortlist with interview status for each candidate.",
  },
  "talent-pods": {
    node: <TalentPodMock />,
    label: "Illustration of a weekly Talent Pod report with a hiring funnel.",
  },
  "gcc-hiring-sprints": {
    node: <GccSprintMock />,
    label: "Illustration of a 12-week GCC hiring sprint plan.",
  },
  "leadership-hiring": {
    node: <LeadershipMock />,
    label: "Illustration of a confidential leadership shortlist with assessments and references.",
  },
};

export function ServiceVisual({ slug }: { slug: string }) {
  const v = visuals[slug];
  if (!v) return null;
  return (
    <figure role="img" aria-label={v.label} className="relative">
      <div aria-hidden className="mx-auto w-full max-w-md">
        {v.node}
      </div>
    </figure>
  );
}
