/** Cookie-consent state. Strictly-necessary storage needs no consent; analytics does. */
export type ConsentChoice = "accepted" | "rejected";

export const CONSENT_KEY = "emplyify_consent_v1";
export const CONSENT_EVENT = "emplyify:consent";

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    /* storage blocked: choice lasts for this page view only */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}

export function hasAnalyticsConsent(): boolean {
  return readConsent() === "accepted";
}

export function openConsentSettings() {
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: "open" }));
}
