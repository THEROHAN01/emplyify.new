"use client";
import type { Attribution } from "@/lib/leads/schema";

const KEY = "emplyify_attribution_v1";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

/** First-touch attribution, kept for the session (strictly necessary for lead attribution). */
export function captureAttribution() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const data: Attribution = {
      landingPage: window.location.pathname + window.location.search,
      referrer: document.referrer || undefined,
    };
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) data[k] = v.slice(0, 200);
    }
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable */
  }
}

export function getAttribution(): Attribution {
  let stored: Attribution = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    /* ignore */
  }
  const hutk = document.cookie.match(/(?:^|; )hubspotutk=([^;]+)/)?.[1];
  return { ...stored, pageUri: window.location.href.slice(0, 500), hutk };
}
