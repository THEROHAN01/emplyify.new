"use client";
/**
 * Typed analytics events (playbook "Event plan"). Events go to Plausible
 * and/or PostHog only after analytics consent; otherwise they are dropped.
 * A `dataLayer` push is kept for tag-manager setups.
 */
import { hasAnalyticsConsent } from "./consent";

export type AnalyticsEvent =
  | { name: "cta_click"; props: { cta_name: string; page: string; position: string } }
  | { name: "brief_started"; props: { page: string } }
  | {
      name: "brief_step";
      props: { step: number; role_family?: string; seniority?: string; openings?: number };
    }
  | {
      name: "brief_submitted";
      props: { role_family: string; seniority: string; openings: number; track: string };
    }
  | { name: "call_booked"; props: { source_page: string; utm_source?: string } }
  | { name: "pricing_calculator_used"; props: { role: string; ctc_band: string } }
  | { name: "sample_dossier_downloaded"; props: { role_family: string } }
  | { name: "report_downloaded"; props: { report_name: string } }
  | { name: "candidate_signup"; props: { role: string; source: string } }
  | { name: "job_apply"; props: { role: string; source: string } }
  | { name: "assistant_handoff"; props: { topic: string } }
  | { name: "jd_assistant_used"; props: { source: string } }
  | { name: "interview_prep_used"; props: { role: string; source: string } }
  | {
      name: "thank_you_viewed";
      props: { page: string; kind: "brief" | "candidate_signup" | "job_apply" | "report" };
    };

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
    posthog?: { capture: (event: string, props?: Props) => void };
    dataLayer?: unknown[];
  }
}

export function track<E extends AnalyticsEvent>(name: E["name"], props: E["props"]) {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  const p = props as Props;
  window.plausible?.(name, { props: p });
  window.posthog?.capture(name, p);
  (window.dataLayer ??= []).push({ event: name, ...p });
  if (process.env.NODE_ENV === "development") console.debug("[track]", name, p);
}

/** ₹ band label for calculator events (never send raw CTC). */
export function ctcBand(lpa: number): string {
  if (lpa < 10) return "<10";
  if (lpa < 20) return "10-20";
  if (lpa < 35) return "20-35";
  if (lpa < 60) return "35-60";
  return "60+";
}
